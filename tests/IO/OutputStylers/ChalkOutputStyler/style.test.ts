import { ChalkOutputStyler } from '../../../../src/IO/OutputStylers/ChalkOutputStyler'
import { Instance } from 'chalk'

describe('IO: OutputStylers: ChalkOutputStyler: style()', function () {
  describe('foreground', function () {
    it('should apply foreground style if set', function () {
      const chalk = new Instance()
      const keyword = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'keyword', { get: () => keyword })

      const styler = new ChalkOutputStyler(chalk)

      styler.setForeground('black')

      styler.style('testing')

      this.assert.calledOnce(keyword)
    })

    it('should not apply foreground style if not set', function () {
      const chalk = new Instance()
      const keyword = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'keyword', { get: () => keyword })

      const styler = new ChalkOutputStyler(chalk)

      styler.style('testing')

      this.assert.notCalled(keyword)
    })
  })

  describe('background', function () {
    it('should apply background style if set', function () {
      const chalk = new Instance()
      const keyword = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'bgKeyword', { get: () => keyword })

      const styler = new ChalkOutputStyler(chalk)

      styler.setBackground('black')

      styler.style('testing')

      this.assert.calledOnce(keyword)
    })

    it('should not apply background style if not set', function () {
      const chalk = new Instance()
      const keyword = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'bgKeyword', { get: () => keyword })

      const styler = new ChalkOutputStyler(chalk)

      styler.style('testing')

      this.assert.notCalled(keyword)
    })
  })

  describe('options', function () {
    it('should reset if set', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'reset', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('reset')

      styler.style('testing')

      this.assert.calledOnce(option)
    })

    it('should bold if set', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'bold', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('bold')

      styler.style('testing')

      this.assert.calledOnce(option)
    })

    it('should dim if set', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'dim', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('dim')

      styler.style('testing')

      this.assert.calledOnce(option)
    })

    it('should italicize if set', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'italic', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('italic')

      styler.style('testing')

      this.assert.calledOnce(option)
    })

    it('should underline if set', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'underline', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('underline')

      styler.style('testing')

      this.assert.calledOnce(option)
    })

    it('should inverse if set', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'inverse', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('inverse')

      styler.style('testing')

      this.assert.calledOnce(option)
    })

    it('should hide if set', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'hidden', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('hidden')

      styler.style('testing')

      this.assert.calledOnce(option)
    })

    it('should strikethrough if set', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'strikethrough', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('strikethrough')

      styler.style('testing')

      this.assert.calledOnce(option)
    })

    it('should show if set', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'visible', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('visible')

      styler.style('testing')

      this.assert.calledOnce(option)
    })

    it('should skip options if none apply', function () {
      const chalk = new Instance()
      const option = this.sinon.stub().returnsThis()

      Object.defineProperty(chalk, 'reset', { get: () => option })
      Object.defineProperty(chalk, 'bold', { get: () => option })
      Object.defineProperty(chalk, 'dim', { get: () => option })
      Object.defineProperty(chalk, 'italic', { get: () => option })
      Object.defineProperty(chalk, 'underline', { get: () => option })
      Object.defineProperty(chalk, 'inverse', { get: () => option })
      Object.defineProperty(chalk, 'hidden', { get: () => option })
      Object.defineProperty(chalk, 'strikethrough', { get: () => option })
      Object.defineProperty(chalk, 'visible', { get: () => option })

      const styler = new ChalkOutputStyler(chalk)

      styler.addOption('fake')

      styler.style('testing')

      this.assert.notCalled(option)
    })
  })
})
