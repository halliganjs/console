import { SignatureParserResult } from '../types/SignatureParserResult'

export interface SignatureParserInterface {
  /**
   * Parse a signature string into an array of command name, arguments, and
   * options.
   *
   * @param  {string}                signature
   * @return {SignatureParserResult}
   */
  parse (signature: string): SignatureParserResult
}
