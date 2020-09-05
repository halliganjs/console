import { SignatureParserResult } from '../types/SignatureParserResult'

export interface SignatureParserInterface {
  parse (signature: string): SignatureParserResult
}
