import { SignatureParameterDefaultValue } from '../../types/SignatureParameterDefaultValue'

export interface SignatureParameterInterface {
  /**
   * Generate a string representation of the parameter for use in generating a
   * signature template for usage and help output.
   *
   * @return {string}
   */
  makeSignatureString (): string

  /**
   * Retrieve the parameter's default value.
   *
   * @return {SignatureParameterDefaultValue}
   */
  getDefaultValue (): SignatureParameterDefaultValue

  /**
   * Retrieve the parameter's description.
   *
   * @return {string}
   */
  getDescription (): string|null

  /**
   * Retrieve the parameter's name.
   *
   * @return {string}
   */
  getName (): string

  /**
   * Determine if the parameter accepts an array or not.
   *
   * @return {boolean}
   */
  isArray (): boolean
}
