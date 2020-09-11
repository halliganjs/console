export interface InputInterface {
  [key: string]: any
}

export class Input implements InputInterface {
  protected args: { [key: string]: any }
  protected commandName: string
  protected opts: { [key: string]: any }
  protected scriptName: string

  constructor (
    scriptName: string,
    commandName: string,
    args: { [key: string]: any } = {},
    opts: { [key: string]: any } = {}
  ) {
    this.scriptName = scriptName
    this.commandName = commandName
    this.args = args
    this.opts = opts
  }

  public argument (key: string): any {
    return this.args[key]
  }

  public option (key: string): any {
    return this.opts[key]
  }

  public getArguments (): object {
    return this.args
  }

  public getOptions (): object {
    return this.opts
  }

  public getCommandName (): string {
    return this.commandName
  }

  public getScriptName (): string {
    return this.scriptName
  }
}
