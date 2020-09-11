import { CommandInterface } from './Commands/Command'
import { RunnerInterface } from './Runners/Runner'

export interface ApplicationInterface {
  addCommand(command: CommandInterface): this
  run (): Promise<number>
}

export class Application implements ApplicationInterface {
  protected runner: RunnerInterface

  constructor (runner: RunnerInterface) {
    this.runner = runner
  }

  addCommand (command: CommandInterface): this {
    this.runner.addCommand(command)
    return this
  }

  async run (): Promise<number> {
    const exitCode = (await this.runner.run()) || 0

    process.exitCode = exitCode

    return exitCode
  }
}
