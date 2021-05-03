import { Styler } from '../../../utilities/Styler'

describe('IO: OutputStylers: OutputStyler: setBackground()', function () {
  it('should set the background property', function () {
    const styler = new Styler()
    this.assert.deepEqual(styler.getBackground(), null)
    styler.setBackground('testing')
    this.assert.deepEqual(styler.getBackground(), 'testing')
  })
})
