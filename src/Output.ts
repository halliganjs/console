import { Chalk, Instance } from 'chalk'

export interface OutputInterface {
  [key: string]: any
}

export class Output {
  protected chalk: Chalk

  public constructor () {
    this.chalk = new Instance()
  }

  public line (text: string) {
    console.log(text)
    return this
  }

  public info (text: string) {
    console.log(this.chalk.green(text))
    return this
  }

  public comment (text: string) {
    console.log(this.chalk.yellow(text))
    return this
  }

  public question (text: string) {
    console.log(this.chalk.black.bgCyan(text))
    return this
  }

  public error (text: string) {
    console.log(this.chalk.white.bgRed(text))
    return this
  }
}
