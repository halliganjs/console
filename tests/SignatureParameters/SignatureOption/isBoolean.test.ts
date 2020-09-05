import { SignatureOption } from '../../../src/SignatureParameters/SignatureOption'

describe('SignatureParameters/SignatureOption::isBoolean()', function () {
  it('should return true if the option is boolean', function () {
    const signatureOption = new SignatureOption('test')

    this.assert.isTrue(signatureOption.isBoolean())
  })

  it('should return false if the option is not boolean', function () {
    const signatureOption = new SignatureOption('test', [], null, false)

    this.assert.isFalse(signatureOption.isBoolean())
  })
})
