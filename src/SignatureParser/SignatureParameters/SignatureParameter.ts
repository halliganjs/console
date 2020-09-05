import { SignatureParameterDefaultValue } from '../../types/SignatureParameterDefaultValue'
import { SignatureParameterInterface } from '../../interfaces/SignatureParser/SignatureParameters/SignatureParameterInterface'

export abstract class SignatureParameter implements SignatureParameterInterface {
  /**
   * @type {SignatureParameterDefaultValue}
   */
  protected _defaultValue: SignatureParameterDefaultValue

  /**
   * @type {string|null}
   */
  protected _description: string|null

  /**
   * @type {boolean}
   */
  protected _isArray: boolean

  /**
   * @type {string}
   */
  protected _name: string

  /**
   * Create a new instance of SignatureParameter.
   *
   * @param {string}                         name
   * @param {string|null}                    description
   * @param {boolean}                        isArray
   * @param {SignatureParameterDefaultValue} defaultValue
   */
  constructor (
    name: string,
    description: string|null = null,
    isArray: boolean = false,
    defaultValue: SignatureParameterDefaultValue = null
  ) {
    this._name = name
    this._description = description || null
    this._isArray = isArray
    this._defaultValue = defaultValue || null
  }

  /**
   * Generate a string representation of the parameter for use in generating a
   * signature template for usage and help output.
   *
   * @return {string}
   */
  public abstract makeSignatureString (): string

  /**
   * Retrieve the parameter's default value.
   *
   * @return {SignatureParameterDefaultValue}
   */
  public getDefaultValue (): SignatureParameterDefaultValue {
    return this._defaultValue
  }

  /**
   * Retrieve the parameter's description.
   *
   * @return {string}
   */
  public getDescription (): string|null {
    return this._description
  }

  /**
   * Retrieve the parameter's name.
   *
   * @return {string}
   */
  public getName (): string {
    return this._name
  }

  /**
   * Determine if the parameter accepts an array or not.
   *
   * @return {boolean}
   */
  public isArray (): boolean {
    return this._isArray
  }
}
