import { OutputStyler } from '../../src/IO/OutputStylers/OutputStyler'

export class Styler extends OutputStyler {
  public comment (text: string): string {
    return text
  }

  public error (text: string): string {
    return text
  }

  public info (text: string): string {
    return text
  }

  public line (text: string): string {
    return text
  }

  public question (text: string): string {
    return text
  }

  public style (text: string): string {
    return text
  }

  public getBackground (): string|null {
    return this.background
  }

  public getForeground (): string|null {
    return this.foreground
  }

  public getOptions (): Array<string> {
    return this.options
  }
}
