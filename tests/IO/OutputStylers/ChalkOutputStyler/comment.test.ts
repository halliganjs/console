import { ChalkOutputStyler } from '../../../../src/IO/OutputStylers/ChalkOutputStyler'
import { Instance } from 'chalk'

describe('IO: OutputStylers: ChalkOutputStyler: comment()', function () {
  it('should return formatted text from chalk', function () {
    const chalk = new Instance()
    const yellow = this.sinon.stub().returnsArg(0)

    Object.defineProperty(chalk, 'yellow', { get: () => yellow })

    const styler = new ChalkOutputStyler(chalk)

    const result = styler.comment('testing')

    this.assert.calledOnce(yellow)
    this.assert.calledWithExactly(yellow, 'testing')

    this.assert.equal(result, 'testing')
  })
})
