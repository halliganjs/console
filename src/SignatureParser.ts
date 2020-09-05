import { SignatureArgument } from './SignatureParameters/SignatureArgument'
import { SignatureArgumentArray } from './types/SignatureArgumentArray'
import { SignatureArgumentInterface } from './interfaces/SignatureParameters/SignatureArgumentInterface'
import { SignatureOption } from './SignatureParameters/SignatureOption'
import { SignatureOptionArray } from './types/SignatureOptionArray'
import { SignatureOptionInterface } from './interfaces/SignatureParameters/SignatureOptionInterface'
import { SignatureParserInterface } from './interfaces/SignatureParserInterface'
import { SignatureParserResult } from './types/SignatureParserResult'

export class SignatureParser implements SignatureParserInterface {
  /**
   * Parse a signature string into an array of command name, arguments, and
   * options.
   *
   * @param  {string}                signature
   * @return {SignatureParserResult}
   */
  public parse (signature: string): SignatureParserResult {
    const name = this.parseName(signature)
    const parameters = this.parseParameters(signature)

    return [name, parameters[0], parameters[1]]
  }

  /**
   * Parse the command name from a signature string.
   *
   * @param  {string} signature
   * @return {string}
   */
  protected parseName (signature: string): string {
    const matches = signature.match(/^\s*([A-z][A-z0-9:_-]*)(?:\s+|$)/)

    if (matches === null) {
      throw new Error(`Failed to parse command name from signature "${signature}".`)
    }

    return matches[1]
  }

  /**
   * Parse the parameters, including both arguments and options, from a
   * signature string.
   *
   * @param {string} signature
   */
  protected parseParameters (signature: string): [SignatureArgumentArray, SignatureOptionArray] {
    const matches = signature.matchAll(/{\s*((?:.|\n)+?)\s*}/g)

    const args: SignatureArgumentArray = []
    const options: SignatureOptionArray = []

    for (const match of matches) {
      if (match[1].startsWith('--')) {
        options.push(this.parseOption(match[1]))
      } else {
        args.push(this.parseArgument(match[1]))
      }
    }

    return [args, options]
  }

  /**
   * Parse an argument from an argument definition string.
   *
   * @param  {string}                     body
   * @return {SignatureArgumentInterface}
   */
  protected parseArgument (body: string): SignatureArgumentInterface {
    const [definition, description] = this.parseOutDescription(body)

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

  /**
   * Parse an option from an option definition string.
   *
   * @param  {string}                   body
   * @return {SignatureOptionInterface}
   */
  protected parseOption (body: string): SignatureOptionInterface {
    const [definition, description] = this.parseOutDescription(body)

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

  /**
   * Parse the description from an argument or option definition string.
   *
   * @param {string} body
   */
  protected parseOutDescription (body: string): [string, string] {
    const [definition, ...description] = body.split(/:/)
    return [definition.trim(), description.join(':').trim()]
  }
}
