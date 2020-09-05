import { SignatureArgumentInterface } from '../interfaces/SignatureParameters/SignatureArgumentInterface'
import { SignatureParameter } from './SignatureParameter'
import { SignatureParameterDefaultValue } from '../types/SignatureParameterDefaultValue'

export class SignatureArgument extends SignatureParameter implements SignatureArgumentInterface {
  /**
   * @type {boolean}
   */
  protected _isOptional: boolean

  /**
   * Create a new instance of SignatureArgument.
   *
   * @param {string}                         name
   * @param {string|null}                    description
   * @param {boolean}                        isOptional
   * @param {boolean}                        isArray
   * @param {SignatureParameterDefaultValue} defaultValue
   */
  constructor (
    name: string,
    description: string|null = null,
    isOptional: boolean = false,
    isArray: boolean = false,
    defaultValue: SignatureParameterDefaultValue = null
  ) {
    super(name, description, isArray, defaultValue)
    this._isOptional = isOptional
  }

  /**
   * Determine whether the argument is optional or not.
   *
   * @return {boolean}
   */
  public isOptional (): boolean {
    return this._isOptional
  }

  /**
   * Generate a string representation of the parameter for use in generating a
   * signature template for usage and help output.
   *
   * @return {string}
   */
  public makeSignatureString (): string {
    return this.isOptional()
      ? `[${this.getName()}${this.isArray() ? '..' : ''}]`
      : `<${this.getName()}${this.isArray() ? '..' : ''}>`
  }
}
