import { SignatureParameterInterface } from './SignatureParameterInterface'

export interface SignatureArgumentInterface extends SignatureParameterInterface {
  /**
   * Determine whether the argument is optional or not.
   *
   * @return {boolean}
   */
  isOptional (): boolean
}
