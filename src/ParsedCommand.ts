import { CommandInterface } from './Commands/Command'
import { SignatureArgumentArray } from './types/SignatureArgumentArray'
import { SignatureOptionArray } from './types/SignatureOptionArray'

export interface ParsedCommandInterface {
  getArguments (): SignatureArgumentArray
  getCommand (): CommandInterface
  getOptions (): SignatureOptionArray
}

export class ParsedCommand implements ParsedCommandInterface {
  protected command: CommandInterface
  protected name: string
  protected args: SignatureArgumentArray
  protected opts: SignatureOptionArray

  constructor (
    command: CommandInterface,
    name: string,
    args: SignatureArgumentArray,
    opts: SignatureOptionArray
  ) {
    this.command = command
    this.name = name
    this.args = args
    this.opts = opts
  }

  public getArguments (): SignatureArgumentArray {
    return this.args
  }

  public getCommand (): CommandInterface {
    return this.command
  }

  public getOptions (): SignatureOptionArray {
    return this.opts
  }
}
