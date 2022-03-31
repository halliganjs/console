import { IInput } from '../interfaces/IO/IInput'
import { ParsedArgv } from '../types/ParsedArgv'

export class Input implements IInput {
  protected parsedArgv: ParsedArgv

  constructor (parsedArgv: ParsedArgv) {
    this.parsedArgv = parsedArgv
  }
}
