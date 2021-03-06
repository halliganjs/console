import { SignatureParameter } from '../../../src/SignatureParameters/SignatureParameter'

class TestClass extends SignatureParameter {
  constructor (description: string) {
    super('test', description)
  }

  makeSignatureString (): string {
    return 'hello'
  }
}

describe('SignatureParameters/SignatureParameter::getDescription()', function () {
  it('should return the description', function () {
    const signatureParameter = new TestClass('description-val')

    this.assert.equal(signatureParameter.getDescription(), 'description-val')
  })
})
