import { InputInterface } from '../Input'
import { OutputInterface } from '../Output'

export interface CommandInterface {
  getDescription (): string
  getSignature (): string
  handle (input: InputInterface, output: OutputInterface): number | void
}

export abstract class Command implements CommandInterface {
  protected description: string = ''
  protected signature: string = ''

  public getDescription (): string {
    return this.description
  }

  public getSignature (): string {
    return this.signature
  }

  public abstract handle (input: InputInterface, output: OutputInterface): number | void
}
