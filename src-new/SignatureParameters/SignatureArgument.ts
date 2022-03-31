import { ISignatureArgument } from '../interfaces/SignatureParameters/ISignatureArgument'
import { SignatureParameter } from './SignatureParameter'
import { SignatureParameterDefaultValue } from '../types/SignatureParameterDefaultValue'

export class SignatureArgument extends SignatureParameter implements ISignatureArgument {
  protected isOptional: boolean

  constructor (
    name: string,
    description: string | null = null,
    isOptional: boolean = false,
    isArray: boolean = false,
    defaultValue: SignatureParameterDefaultValue = null
  ) {
    super(name, description, isArray, defaultValue)
    this.isOptional = isOptional
  }

  public getIsOptional (): boolean {
    return this.isOptional
  }

  public makeSignatureString (): string {
    return this.getIsOptional()
      ? `[${this.getName()}${this.getIsArray() ? '..' : ''}]`
      : `<${this.getName()}${this.getIsArray() ? '..' : ''}>`
  }
}
