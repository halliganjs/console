import { ISignatureParameter } from '../interfaces/SignatureParameters/ISignatureParameter'
import { SignatureParameterDefaultValue } from '../types/SignatureParameterDefaultValue'

export abstract class SignatureParameter implements ISignatureParameter {
  protected defaultValue: SignatureParameterDefaultValue

  protected description: string | null

  protected isArray: boolean

  protected name: string

  constructor (
    name: string,
    description: string |null,
    isArray: boolean,
    defaultValue: SignatureParameterDefaultValue
  ) {
    this.name = name
    this.description = description
    this.isArray = isArray
    this.defaultValue = defaultValue
  }

  public abstract makeSignatureString (): string

  public getDefaultValue (): SignatureParameterDefaultValue {
    return this.defaultValue
  }

  public getDescription (): string | null {
    return this.description
  }

  public getIsArray (): boolean {
    return this.isArray
  }

  public getName (): string {
    return this.name
  }
}
