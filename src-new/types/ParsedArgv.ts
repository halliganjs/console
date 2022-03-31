import { ArgsArray } from './ArgsArray'
import { OptionsObj } from './OptionsObj'

export type ParsedArgv = {
  program: string,
  path: string,
  commandName: string | null,
  args: ArgsArray,
  options: OptionsObj
}
