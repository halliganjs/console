import { Styler } from '../../../utilities/Styler'

describe('IO: OutputStylers: OutputStyler: setForeground()', function () {
  it('should set the foreground property', function () {
    const styler = new Styler()
    this.assert.deepEqual(styler.getForeground(), null)
    styler.setForeground('testing')
    this.assert.deepEqual(styler.getForeground(), 'testing')
  })
})
