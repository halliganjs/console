import { ISignatureOption } from '../interfaces/SignatureParameters/ISignatureOption'
import { SignatureParameter } from './SignatureParameter'
import { SignatureParameterDefaultValue } from '../types/SignatureParameterDefaultValue'

export class SignatureOption extends SignatureParameter implements ISignatureOption {
  protected aliases: Array<string>

  protected isBoolean: boolean

  constructor (
    name: string,
    aliases: Array<string> = [],
    description: string | null = null,
    isBoolean: boolean = true,
    isArray: boolean = false,
    defaultValue: SignatureParameterDefaultValue = null
  ) {
    super(name, description, isArray, defaultValue)
    this.aliases = aliases
    this.isBoolean = isBoolean
  }

  public getAliases (): Array<string> {
    return this.aliases
  }

  public getDefaultValue (): SignatureParameterDefaultValue {
    return this.getIsBoolean() ? false : this.defaultValue
  }

  public getIsBoolean (): boolean {
    return this.isBoolean
  }

  public makeSignatureString (): string {
    return `--${this.getName()}`
  }
}
