import { ICommand } from '../interfaces/Commands/ICommand'
import { ISignatureArgument } from '../interfaces/SignatureParameters/ISignatureArgument'
import { ISignatureOption } from '../interfaces/SignatureParameters/ISignatureOption'
import { SignatureArgument } from '../SignatureParameters/SignatureArgument'
import { SignatureArgumentArray } from '../types/SignatureArgumentArray'
import { SignatureOption } from '../SignatureParameters/SignatureOption'
import { SignatureOptionArray } from '../types/SignatureOptionArray'

export abstract class Command implements ICommand {
  protected signature: string = ''
  protected description: string = ''

  public abstract handle (): Promise<boolean | number> | boolean | number

  public getName (): string {
    const matches = this.signature.match(/^\s*([A-z][A-z0-9:_-]*)(?:\s+|$)/)

    if (matches === null) {
      throw new Error(`Failed to parse command name from signature "${this.signature}".`)
    }

    return matches[1]
  }

  public getArguments (): SignatureArgumentArray {
    const matches = this.signature.matchAll(/{\s*((?:.|\n)+?)\s*}/g)

    const args: SignatureArgumentArray = []

    for (const match of matches) {
      if (match[1].startsWith('--') === false) {
        args.push(this.parseArgument(match[1]))
      }
    }

    return args
  }

  public getOptions (): SignatureOptionArray {
    const matches = this.signature.matchAll(/{\s*((?:.|\n)+?)\s*}/g)

    const options: SignatureOptionArray = []

    for (const match of matches) {
      if (match[1].startsWith('--') === true) {
        options.push(this.parseOption(match[1]))
      }
    }

    return options
  }

  protected parseArgument (body: string): ISignatureArgument {
    const [definition, description] = this.parseParameterDescription(body)

    const matches = definition.match(/^([^\s]+?)\s*(=.*|\??\*?)$/)

    if (matches === null) {
      throw new Error(`Failed to parse argument's name and options from "${definition}".`)
    }

    const [name, options] = matches.slice(1)

    switch (true) {
      case options === '?*':
        return new SignatureArgument(name, description, true, true)
      case options === '?':
        return new SignatureArgument(name, description, true)
      case options === '*':
        return new SignatureArgument(name, description, false, true)
      case options.startsWith('='):
        return new SignatureArgument(name, description, true, false, options.slice(1).trim())
      default:
        return new SignatureArgument(name, description)
    }
  }

  protected parseOption (body: string): ISignatureOption {
    const [definition, description] = this.parseParameterDescription(body)

    const matches = definition.match(/^--([^\s]+?)\s*(=.*|\??\*?)$/)

    if (matches === null) {
      throw new Error(`Failed to parse optional's name and options from "${definition}".`)
    }

    const [nameAndAliases, options] = matches.slice(1)

    const aliasMatches = nameAndAliases.split('|')

    const name = (aliasMatches.pop() as string).trim()
    const aliases = aliasMatches.map(item => item.trim())

    switch (true) {
      case options.endsWith('*'):
        return new SignatureOption(name, aliases, description, false, true)
      case options.startsWith('='):
        return new SignatureOption(name, aliases, description, false, false, options.slice(1).trim())
      default:
        return new SignatureOption(name, aliases, description, true, false, false)
    }
  }

  protected parseParameterDescription (body: string): [string, string] {
    const [definition, ...description] = body.split(/:/)
    return [definition.trim(), description.join(':').trim()]
  }
}
