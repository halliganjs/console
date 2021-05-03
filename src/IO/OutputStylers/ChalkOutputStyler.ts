import { Chalk, Instance } from 'chalk'
import { OutputStyler } from './OutputStyler'

export class ChalkOutputStyler extends OutputStyler {
  /**
   * @member {Chalk} chalk
   */
  protected chalk: Chalk

  /**
   * Create a new instance of ChalkOutputStyler.
   *
   * @param {Chalk} chalk
   */
  constructor (chalk?: Chalk) {
    super()
    this.chalk = chalk || new Instance()
  }

  /**
   * Return the provided text styled as a comment.
   *
   * @param  {string} text
   * @return {string}
   */
  public comment (text: string): string {
    return this.chalk.yellow(text)
  }

  /**
   * Return the provided text styled as an error.
   *
   * @param  {string} text
   * @return {string}
   */
  public error (text: string): string {
    return this.chalk.white.bgRed(text)
  }

  /**
   * Return the provided text styled as info.
   *
   * @param  {string} text
   * @return {string}
   */
  public info (text: string): string {
    return this.chalk.green(text)
  }

  /**
   * Return the provided text unstyled.
   *
   * @param  {string} text
   * @return {string}
   */
  public line (text: string): string {
    return this.chalk.reset(text)
  }

  /**
   * Return the provided text styled as a question.
   *
   * @param  {string} text
   * @return {string}
   */
  public question (text: string): string {
    return this.chalk.black.bgCyan(text)
  }

  /**
   * Return the provided text with the style set on the styler.
   *
   * @param  {string} text
   * @return {string}
   */
  public style (text: string): string {
    let chalk = this.chalk

    chalk = this.styleForeground(chalk)

    chalk = this.styleBackground(chalk)

    chalk = this.styleOptions(chalk)

    return chalk(text)
  }

  /**
   * Update a chalk instance with the appropriate background style.
   *
   * @param  {Chalk} chalk
   * @return {Chalk}
   */
  protected styleBackground (chalk: Chalk): Chalk {
    const bgMap: Record<string, string> = {
      black: 'black',
      red: 'red',
      green: 'green',
      yellow: 'yellow',
      blue: 'blue',
      magenta: 'magenta',
      cyan: 'cyan',
      white: 'white',
      blackBright: 'blackBright',
      gray: 'gray',
      grey: 'grey',
      redBright: 'redBright',
      greenBright: 'greenBright',
      yellowBright: 'yellowBright',
      blueBright: 'blueBright',
      magentaBright: 'magentaBright',
      cyanBright: 'cyanBright',
      whiteBright: 'whiteBright'
    }

    if (this.background !== null && bgMap[this.background]) {
      return chalk.bgKeyword(bgMap[this.background])
    }

    return chalk
  }

  /**
   * Update a chalk instance with the appropriate foreground style.
   *
   * @param  {Chalk} chalk
   * @return {Chalk}
   */
  protected styleForeground (chalk: Chalk): Chalk {
    const fgMap: Record<string, string> = {
      black: 'black',
      red: 'red',
      green: 'green',
      yellow: 'yellow',
      blue: 'blue',
      magenta: 'magenta',
      cyan: 'cyan',
      white: 'white',
      blackBright: 'blackBright',
      gray: 'gray',
      grey: 'grey',
      redBright: 'redBright',
      greenBright: 'greenBright',
      yellowBright: 'yellowBright',
      blueBright: 'blueBright',
      magentaBright: 'magentaBright',
      cyanBright: 'cyanBright',
      whiteBright: 'whiteBright'
    }

    if (this.foreground !== null && fgMap[this.foreground]) {
      return chalk.keyword(fgMap[this.foreground])
    }

    return chalk
  }

  /**
   * Update a chalk instance with the appropriate option style(s).
   *
   * @param  {Chalk} chalk
   * @return {Chalk}
   */
  protected styleOptions (chalk: Chalk): Chalk {
    return this.options.reduce((chalkObj, option) => {
      switch (option) {
        case 'reset':
          return chalkObj.reset
        case 'bold':
          return chalkObj.bold
        case 'dim':
          return chalkObj.dim
        case 'italic':
          return chalkObj.italic
        case 'underline':
          return chalkObj.underline
        case 'inverse':
          return chalkObj.inverse
        case 'hidden':
          return chalkObj.hidden
        case 'strikethrough':
          return chalkObj.strikethrough
        case 'visible':
          return chalkObj.visible
      }

      return chalkObj
    }, chalk)
  }
}
