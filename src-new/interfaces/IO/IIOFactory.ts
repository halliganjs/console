import { IInput } from './IInput'
import { ParsedArgv } from '../../types/ParsedArgv'

export interface IIOFactory {
  makeInput (parsedArgv: ParsedArgv): IInput
}
