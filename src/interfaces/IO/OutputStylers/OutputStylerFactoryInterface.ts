import { OutputStylerInterface } from './OutputStylerInterface'

export interface OutputStylerFactoryInterface {
  /**
   * Create a new instance of OutputStylerInterface.
   *
   * @return {OutputStylerInterface}
   */
  makeOutputStyler (): OutputStylerInterface
}
