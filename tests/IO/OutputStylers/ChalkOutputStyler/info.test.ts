import { ChalkOutputStyler } from '../../../../src/IO/OutputStylers/ChalkOutputStyler'
import { Instance } from 'chalk'

describe('IO: OutputStylers: ChalkOutputStyler: info()', function () {
  it('should return formatted text from chalk', function () {
    const chalk = new Instance()
    const green = this.sinon.stub().returnsArg(0)

    Object.defineProperty(chalk, 'green', { get: () => green })

    const styler = new ChalkOutputStyler(chalk)

    const result = styler.info('testing')

    this.assert.calledOnce(green)
    this.assert.calledWithExactly(green, 'testing')

    this.assert.equal(result, 'testing')
  })
})
