import { SignatureParameter } from '../../../src/SignatureParameters/SignatureParameter'

class TestClass extends SignatureParameter {
  constructor (isArray: boolean) {
    super('test', null, isArray)
  }

  makeSignatureString (): string {
    return 'hello'
  }
}

describe('SignatureParameters/SignatureParameter::isArray()', function () {
  it('should return true if the parameter is an array', function () {
    const signatureParameter = new TestClass(true)

    this.assert.isTrue(signatureParameter.isArray())
  })

  it('should return false if the parameter is not an array', function () {
    const signatureParameter = new TestClass(false)

    this.assert.isFalse(signatureParameter.isArray())
  })
})
