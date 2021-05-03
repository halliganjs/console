import { OutputStylerInterface } from '../../interfaces/IO/OutputStylers/OutputStylerInterface'
import { OutputStylerFactoryInterface } from '../../interfaces/IO/OutputStylers/OutputStylerFactoryInterface'

export abstract class OutputStylerFactory implements OutputStylerFactoryInterface {
  /**
   * Create a new instance of OutputStylerInterface.
   *
   * @return {OutputStylerInterface}
   */
  public abstract makeOutputStyler (): OutputStylerInterface
}
