import { SignatureOption } from '../../../../src/SignatureParser/SignatureParameters/SignatureOption'

describe('SignatureParser: SignatureParameters: SignatureOption: makeSignatureString()', function () {
  it('should return the option name preceded by dashes', function () {
    const signatureOption = new SignatureOption('test')

    this.assert.equal(signatureOption.makeSignatureString(), '--test')
  })
})
