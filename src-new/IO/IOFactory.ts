import { IIOFactory } from '../interfaces/IO/IIOFactory'
import { IInput } from '../interfaces/IO/IInput'
import { Input } from './Input'
import { ParsedArgv } from '../types/ParsedArgv'

export class IOFactory implements IIOFactory {
  makeInput (parsedArgv: ParsedArgv): IInput {
    return new Input(parsedArgv)
  }
}
