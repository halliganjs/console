import { Argv } from '../types/Argv'
import { ParsedArgv } from '../types/ParsedArgv'

export interface IArgvParser {
  parse (argv: Argv): ParsedArgv
}
