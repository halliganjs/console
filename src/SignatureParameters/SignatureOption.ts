import { SignatureOptionInterface } from '../interfaces/SignatureParameters/SignatureOptionInterface'
import { SignatureParameter } from './SignatureParameter'
import { SignatureParameterDefaultValue } from '../types/SignatureParameterDefaultValue'

export class SignatureOption extends SignatureParameter implements SignatureOptionInterface {
  /**
   * @type {Array<string>}
   */
  protected _aliases: Array<string>

  /**
   * @type {boolean}
   */
  protected _isBoolean: boolean

  /**
   * Create an instance of SignatureOption.
   *
   * @param {string}                         name
   * @param {Array<string>}                  aliases
   * @param {string|null}                    description
   * @param {boolean}                        isBoolean
   * @param {boolean}                        isArray
   * @param {SignatureParameterDefaultValue} defaultValue
   */
  constructor (
    name: string,
    aliases: Array<string> = [],
    description: string|null = null,
    isBoolean: boolean = true,
    isArray: boolean = false,
    defaultValue: SignatureParameterDefaultValue = null
  ) {
    super(name, description, isArray, defaultValue)
    this._aliases = aliases
    this._isBoolean = isBoolean
  }

  /**
   * Retrieve the option's aliases.
   *
   * @return {Array<string>}
   */
  public getAliases (): Array<string> {
    return this._aliases
  }

  /**
   * Retrieve the option's default value.
   *
   * @return {SignatureParameterDefaultValue}
   */
  public getDefaultValue (): SignatureParameterDefaultValue {
    return this.isBoolean() ? false : this._defaultValue
  }

  /**
   * Determine whether the option is boolean or not.
   *
   * @return {boolean}
   */
  public isBoolean (): boolean {
    return this._isBoolean
  }

  /**
   * Generate a string representation of the parameter for use in generating a
   * signature template for usage and help output.
   *
   * @return {string}
   */
  public makeSignatureString (): string {
    return `--${this.getName()}`
  }
}
