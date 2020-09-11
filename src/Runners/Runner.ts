import { CommandInterface } from '../Commands/Command'
import { ParsedCommandInterface } from '../ParsedCommand'
import { ParsedCommandMap } from '../types/ParsedCommandMap'

export interface RunnerInterface {
  addCommand (command: CommandInterface): this
  getCommands (): ParsedCommandMap
  run (): Promise<number>
}

export abstract class Runner implements RunnerInterface {
  protected commands: ParsedCommandMap = new Map<string, ParsedCommandInterface>()

  abstract addCommand (command: CommandInterface): this

  abstract run (): Promise<number>

  public getCommands (): ParsedCommandMap {
    return this.commands
  }
}
