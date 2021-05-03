import { ChalkOutputStyler } from '../../../../src/IO/OutputStylers/ChalkOutputStyler'
import { Instance } from 'chalk'

describe('IO: OutputStylers: ChalkOutputStyler: question()', function () {
  it('should return formatted text from chalk', function () {
    const chalk = new Instance()
    const bgCyan = this.sinon.stub().returnsArg(0)
    const black = { bgCyan }

    Object.defineProperty(chalk, 'black', { get: () => black })

    const styler = new ChalkOutputStyler(chalk)

    const result = styler.question('testing')

    this.assert.calledOnce(bgCyan)
    this.assert.calledWithExactly(bgCyan, 'testing')

    this.assert.equal(result, 'testing')
  })
})
