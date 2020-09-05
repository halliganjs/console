import { SignatureArgument } from '../../../src/SignatureParameters/SignatureArgument'

describe('SignatureParser: SignatureParameters: SignatureArgument: makeSignatureString()', function () {
  describe('when argument is optional', function () {
    it('should wrap the command in brackets', function () {
      const signatureArgument = new SignatureArgument('test', null, true)
      this.assert.equal(signatureArgument.makeSignatureString(), '[test]')
    })

    it('should include elipses when argument is array', function () {
      const signatureArgument = new SignatureArgument('test', null, true, true)
      this.assert.equal(signatureArgument.makeSignatureString(), '[test..]')
    })
  })

  describe('when argument is required', function () {
    it('should wrap the command in angle brackets', function () {
      const signatureArgument = new SignatureArgument('test')
      this.assert.equal(signatureArgument.makeSignatureString(), '<test>')
    })

    it('should include elipses when argument is array', function () {
      const signatureArgument = new SignatureArgument('test', null, false, true)
      this.assert.equal(signatureArgument.makeSignatureString(), '<test..>')
    })
  })
})
