import { SignatureParameter } from '../../../src/SignatureParameters/SignatureParameter'

class TestClass extends SignatureParameter {
  makeSignatureString (): string {
    return 'hello'
  }
}

describe('SignatureParser: SignatureParameters: SignatureParameter: getName()', function () {
  it('should return the name', function () {
    const signatureParameter = new TestClass('name-val')

    this.assert.equal(signatureParameter.getName(), 'name-val')
  })
})
