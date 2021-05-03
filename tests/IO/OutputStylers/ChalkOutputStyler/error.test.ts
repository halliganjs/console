import { ChalkOutputStyler } from '../../../../src/IO/OutputStylers/ChalkOutputStyler'
import { Instance } from 'chalk'

describe('IO: OutputStylers: ChalkOutputStyler: error()', function () {
  it('should return formatted text from chalk', function () {
    const chalk = new Instance()
    const bgRed = this.sinon.stub().returnsArg(0)
    const white = { bgRed }

    Object.defineProperty(chalk, 'white', { get: () => white })

    const styler = new ChalkOutputStyler(chalk)

    const result = styler.error('testing')

    this.assert.calledOnce(bgRed)
    this.assert.calledWithExactly(bgRed, 'testing')

    this.assert.equal(result, 'testing')
  })
})
