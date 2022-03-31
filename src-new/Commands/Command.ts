import { ICommand } from '../interfaces/Commands/ICommand'
import { ISignatureArgument } from '../interfaces/SignatureParameters/ISignatureArgument'
import { SignatureArgument } from '../SignatureParameters/SignatureArgument'
import { SignatureArgumentArray } from '../types/SignatureArgumentArray'

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

  protected parseParameterDescription (body: string): [string, string] {
    const [definition, ...description] = body.split(/:/)
    return [definition.trim(), description.join(':').trim()]
  }
}
