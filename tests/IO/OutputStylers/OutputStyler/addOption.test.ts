import { Styler } from '../../../utilities/Styler'

describe('IO: OutputStylers: OutputStyler: addOption()', function () {
  it('should add the option', function () {
    const styler = new Styler()
    this.assert.deepEqual(styler.getOptions(), [])
    styler.addOption('testing')
    this.assert.deepEqual(styler.getOptions(), ['testing'])
  })
})
