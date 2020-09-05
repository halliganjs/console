import { SignatureParameter } from '../../../src/SignatureParameters/SignatureParameter'

class TestClass extends SignatureParameter {
  constructor (defaultValue: string) {
    super('test', null, false, defaultValue)
  }

  makeSignatureString (): string {
    return 'hello'
  }
}

describe('SignatureParameters/SignatureParameter::getDefaultValue()', function () {
  it('should return the default value', function () {
    const signatureParameter = new TestClass('default-val')

    this.assert.equal(signatureParameter.getDefaultValue(), 'default-val')
  })
})
