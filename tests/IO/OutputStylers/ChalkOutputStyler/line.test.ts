import { ChalkOutputStyler } from '../../../../src/IO/OutputStylers/ChalkOutputStyler'
import { Instance } from 'chalk'

describe('IO: OutputStylers: ChalkOutputStyler: line()', function () {
  it('should return formatted text from chalk', function () {
    const chalk = new Instance()
    const reset = this.sinon.stub().returnsArg(0)

    Object.defineProperty(chalk, 'reset', { get: () => reset })

    const styler = new ChalkOutputStyler(chalk)

    const result = styler.line('testing')

    this.assert.calledOnce(reset)
    this.assert.calledWithExactly(reset, 'testing')

    this.assert.equal(result, 'testing')
  })
})
