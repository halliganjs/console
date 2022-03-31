import { Argv } from './types/Argv'
import { CommandArray } from './types/CommandArray'
import { IApplication } from './interfaces/IApplication'
import { IArgvParser } from './interfaces/IArgvParser'
import { ICommand } from './interfaces/Commands/ICommand'
import { IIOFactory } from './interfaces/IO/IIOFactory'

export class Application implements IApplication {
  protected argvParser: IArgvParser

  protected commands: CommandArray = []

  protected helpCommand: ICommand | null = null

  protected ioFactory: IIOFactory

  protected listCommand: ICommand | null = null

  /**
   * [constructor description]
   *
   * @param {IArgvParser} argvParser
   * @param {IIOFactory}  ioFactory
   */
  constructor (argvParser: IArgvParser, ioFactory: IIOFactory) {
    this.argvParser = argvParser
    this.ioFactory = ioFactory
  }

  /**
   * [addCommand description]
   *
   * @param  {ICommand} command
   * @return {this}
   */
  public addCommand (command: ICommand): this {
    this.commands.push(command)
    return this
  }

  /**
   * [getCommands description]
   *
   * @return {CommandArray}
   */
  public getCommands (): CommandArray {
    return this.commands
  }

  /**
   * [run description]
   *
   * @param  {Argv}            argv
   * @return {Promise<number>}
   */
  public async run (argv: Argv): Promise<number> {
    const parsedArgv = this.argvParser.parse(argv)

    // Find the command to run
    let command = this.commands.find(item => item.getName() === parsedArgv.commandName)

    // When no command is found, run the list command
    if (command === undefined) {
      if (this.listCommand === null) {
        throw new Error('No list command registered.')
      }

      command = this.listCommand
    }

    console.log(command.getArguments())

    // Create an input object
    const input = this.ioFactory.makeInput(parsedArgv)

    // Run the command
    const result = await command.handle(input, this)

    if (typeof result === 'boolean') {
      return result ? 0 : 1
    }

    return result
  }

  /**
   * [setHelpCommand description]
   *
   * @param  {ICommand} command
   * @return {this}
   */
  public setHelpCommand (command: ICommand): this {
    this.helpCommand = command
    return this
  }

  /**
   * [setListCommand description]
   *
   * @param  {ICommand} command
   * @return {this}
   */
  public setListCommand (command: ICommand): this {
    this.listCommand = command
    return this
  }
}
