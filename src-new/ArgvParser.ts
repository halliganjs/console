import { ArgsArray } from './types/ArgsArray'
import { Argv } from './types/Argv'
import { IArgvParser } from './interfaces/IArgvParser'
import { OptionsObj } from './types/OptionsObj'
import { OptionValue } from './types/OptionValue'
import { ParsedArgv } from './types/ParsedArgv'

export class ArgvParser implements IArgvParser {
  public parse (argv: Argv): ParsedArgv {
    const program = argv[0]
    const path = argv[1]

    const params = argv.slice(2)

    let args: ArgsArray = []
    const options: OptionsObj = {}

    // Parse out the options and arguments
    for (const param of params) {
      if (/^(--.+|-[^-])$/.test(param)) {
        const matches = param.match(/^-+([^=]+)/)

        if (matches !== null) {
          options[matches[1]] = this.parseOptionValue(param)
        }
      } else {
        args.push(param)
      }
    }

    // Pull the command name from the final list of arguments
    const commandName = args.length > 0 ? args[0] : null

    args = args.slice(1)

    return {
      program,
      path,
      commandName,
      args,
      options
    }
  }

  protected parseOptionValue (param: string): OptionValue {
    if (param.includes('=') === false) {
      return true
    }

    const value = param.slice(param.indexOf('=') + 1)

    switch (value) {
      case '':
      case '0':
      case 'false':
        return false
      case '1':
      case 'true':
        return true
      default:
        return value
    }
  }
}
