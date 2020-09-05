import { SignatureOption } from '../../../src/SignatureParameters/SignatureOption'

describe('SignatureParser: SignatureParameters: SignatureOption: getDefaultValue()', function () {
  it('should return false if the option is boolean', function () {
    const signatureOption = new SignatureOption('test')

    this.assert.isFalse(signatureOption.getDefaultValue())
  })

  it('should return the option\'s default value if the option is not boolean', function () {
    const signatureOption = new SignatureOption('test', [], null, false, false, 'default-val')

    this.assert.equal(signatureOption.getDefaultValue(), 'default-val')
  })
})
