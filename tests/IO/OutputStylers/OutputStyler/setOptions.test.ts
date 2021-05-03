import { Styler } from '../../../utilities/Styler'

describe('IO: OutputStylers: OutputStyler: setOptions()', function () {
  it('should set the options property', function () {
    const styler = new Styler()
    this.assert.deepEqual(styler.getOptions(), [])

    styler.setOptions(['testing'])
    this.assert.deepEqual(styler.getOptions(), ['testing'])

    styler.setOptions(['testing2'])
    this.assert.deepEqual(styler.getOptions(), ['testing2'])
  })
})
