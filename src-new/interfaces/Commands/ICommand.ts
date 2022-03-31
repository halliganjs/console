import { IApplication } from '../IApplication'
import { IInput } from '../IO/IInput'
import { SignatureArgumentArray } from '../../types/SignatureArgumentArray'
import { SignatureOptionArray } from '../../types/SignatureOptionArray'

export interface ICommand {
  getArguments (): SignatureArgumentArray
  getName (): string
  getOptions (): SignatureOptionArray
  handle (inpit: IInput, application: IApplication): Promise<boolean | number> | boolean | number
}
