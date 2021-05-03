import { OutputStylerInterface } from '../../interfaces/IO/OutputStylers/OutputStylerInterface'

export abstract class OutputStyler implements OutputStylerInterface {
  /**
   * @member {string|null} background
   */
  protected background: string|null = null

  /**
   * @member {string|null} foreground
   */
  protected foreground: string|null = null

  /**
   * @member {Array<string>} options
   */
  protected options: Array<string> = []

  /**
   * Return the provided text styled as a comment.
   *
   * @param  {string} text
   * @return {string}
   */
  public abstract comment (text: string): string

  /**
   * Return the provided text styled as an error.
   *
   * @param  {string} text
   * @return {string}
   */
  public abstract error (text: string): string

  /**
   * Return the provided text styled as info.
   *
   * @param  {string} text
   * @return {string}
   */
  public abstract info (text: string): string

  /**
   * Return the provided text unstyled.
   *
   * @param  {string} text
   * @return {string}
   */
  public abstract line (text: string): string

  /**
   * Return the provided text styled as a question.
   *
   * @param  {string} text
   * @return {string}
   */
  public abstract question (text: string): string

  /**
   * Return the provided text with the style set on the styler.
   *
   * @param  {string} text
   * @return {string}
   */
  public abstract style (text: string): string

  /**
   * Adds an option to the styler's list of options.
   *
   * @param  {string} option
   * @return {this}
   */
  public addOption (option: string): this {
    this.options.push(option)
    return this
  }

  /**
   * Set the color of the background.
   *
   * @param  {string|null} background
   * @return {this}
   */
  public setBackground (background: string|null): this {
    this.background = background
    return this
  }

  /**
   * Set the color of the foreground.
   * @param  {string|null} foreground
   * @return {this}
   */
  public setForeground (foreground: string|null): this {
    this.foreground = foreground
    return this
  }

  /**
   * Set the list of the styler's options.
   *
   * @param  {Array<string>} options
   * @return {this}
   */
  public setOptions (options: Array<string>): this {
    this.options = options
    return this
  }
}
