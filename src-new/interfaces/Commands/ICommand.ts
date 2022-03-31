import { IApplication } from '../IApplication'
import { IInput } from '../IO/IInput'
import { SignatureArgumentArray } from '../../types/SignatureArgumentArray'

export interface ICommand {
  getArguments (): SignatureArgumentArray
  getName (): string
  handle (inpit: IInput, application: IApplication): Promise<boolean | number> | boolean | number
}
