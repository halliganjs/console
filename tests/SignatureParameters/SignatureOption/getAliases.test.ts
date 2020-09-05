import { SignatureOption } from '../../../src/SignatureParameters/SignatureOption'

describe('SignatureParameters/SignatureOption::getAliases()', function () {
  it('should return the option\'s aliases', function () {
    const aliases = ['a', 'b']
    const signatureOption = new SignatureOption('test', aliases)

    this.assert.equal(signatureOption.getAliases(), aliases)
  })
})
