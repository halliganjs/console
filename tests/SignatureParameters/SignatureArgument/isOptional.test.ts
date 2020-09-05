import { SignatureArgument } from '../../../src/SignatureParameters/SignatureArgument'

describe('SignatureParser: SignatureParameters: SignatureArgument: isOptional()', function () {
  it('should return false if not set', function () {
    const signatureArgument = new SignatureArgument('test')

    this.assert.isFalse(signatureArgument.isOptional())
  })

  it('should return false if not optional', function () {
    const signatureArgument = new SignatureArgument('test', 'testing', false)

    this.assert.isFalse(signatureArgument.isOptional())
  })

  it('should return true if optional', function () {
    const signatureArgument = new SignatureArgument('test', 'testing', true)

    this.assert.isTrue(signatureArgument.isOptional())
  })
})
