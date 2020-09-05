import { SignatureParameterDefaultValue } from '../../../types/SignatureParameterDefaultValue'
import { SignatureParameterInterface } from './SignatureParameterInterface'

export interface SignatureOptionInterface extends SignatureParameterInterface {
  /**
   * Retrieve the option's aliases.
   *
   * @return {Array<string>}
   */
  getAliases (): Array<string>

  /**
   * Retrieve the option's default value.
   *
   * @return {SignatureParameterDefaultValue}
   */
  getDefaultValue (): SignatureParameterDefaultValue

  /**
   * Determine whether the option is boolean or not.
   *
   * @return {boolean}
   */
  isBoolean (): boolean
}
