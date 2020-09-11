import argv, { Argv, BuilderCallback } from 'yargs'
import { CommandInterface } from '../Commands/Command'
import { Input } from '../Input'
import { Output } from '../Output'
import { ParsedCommand } from '../ParsedCommand'
import { SignatureOptionArray } from '../types/SignatureOptionArray'
import { Runner } from './Runner'
import { SignatureArgumentArray } from '../types/SignatureArgumentArray'
import { SignatureArgumentInterface } from '../interfaces/SignatureParameters/SignatureArgumentInterface'
import { SignatureOptionInterface } from '../interfaces/SignatureParameters/SignatureOptionInterface'
import { SignatureParser } from '../SignatureParser'
import { SignatureParserInterface } from '../interfaces/SignatureParserInterface'

export class YargsRunner extends Runner {
  protected signatureParser: SignatureParserInterface
  protected yargs: Argv

  public constructor (
    yargs?: Argv,
    signatureParser?: SignatureParserInterface
  ) {
    super()

    this.yargs = yargs || argv(process.argv.slice(2))
    this.signatureParser = signatureParser || new SignatureParser()
  }

  public addCommand (command: CommandInterface): this {
    const [name, args, opts] = this.signatureParser.parse(command.getSignature())

    this.yargs.command(
      name,
      command.getDescription(),
      this.makeBuilderCallback(name, args, opts)
    )

    const parsedCommand = new ParsedCommand(command, name, args, opts)

    this.commands.set(name, parsedCommand)

    return this
  }

  public async run (): Promise<number> {
    const args = this.yargs
      .help(false)
      .argv

    const name = args._[0] || 'help'

    const command = this.commands.get(name)

    if (!command) {
      throw new Error(`No command found for "${name}."`)
    }

    const inputArgs = command.getArguments().reduce((value: {[key: string]: any}, item: SignatureArgumentInterface) => {
      if (args[item.getName()] !== undefined) {
        value[item.getName()] = args[item.getName()]
      }

      return value
    }, {})

    const inputOpts = command.getOptions().reduce((value: {[key: string]: any}, item: SignatureOptionInterface) => {
      if (args[item.getName()] !== undefined) {
        value[item.getName()] = args[item.getName()]
      }

      return value
    }, {})

    const input = new Input(args.$0, args._[0], inputArgs, inputOpts)

    const output = new Output()

    const result = await command.getCommand().handle(input, output)

    return result || 0
  }

  protected makeBuilderCallback (
    name: string,
    args: SignatureArgumentArray,
    options: SignatureOptionArray
  ): BuilderCallback<{}, {}> {
    return (yargs: Argv): void => {
      yargs.usage(`Usage: $0 ${name} ${args.map(arg => arg.makeSignatureString()).join(' ')}`)

      args.forEach(arg => {
        yargs.positional(arg.getName(), {
          default: arg.getDefaultValue() || undefined,
          desc: arg.getDescription() || undefined,
          type: 'string'
        })
      })

      options.forEach(option => {
        yargs.option(option.getName(), {
          alias: option.getAliases(),
          default: option.isBoolean() ? false : (option.getDefaultValue() || undefined),
          desc: option.getDescription() || undefined,
          type: option.isBoolean() ? 'boolean' : 'string'
        })
      })
    }
  }
}
