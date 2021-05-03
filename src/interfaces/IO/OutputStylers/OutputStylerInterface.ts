export interface OutputStylerInterface {
  /**
   * Adds an option to the styler's list of options.
   *
   * @param  {string} option
   * @return {this}
   */
  addOption (option: string): this

  /**
   * Return the provided text styled as a comment.
   *
   * @param  {string} text
   * @return {string}
   */
  comment (text: string): string

  /**
   * Return the provided text styled as an error.
   *
   * @param  {string} text
   * @return {string}
   */
  error (text: string): string

  /**
   * Return the provided text styled as info.
   *
   * @param  {string} text
   * @return {string}
   */
  info (text: string): string

  /**
   * Return the provided text unstyled.
   *
   * @param  {string} text
   * @return {string}
   */
  line (text: string): string

  /**
   * Return the provided text styled as a question.
   *
   * @param  {string} text
   * @return {string}
   */
  question (text: string): string

  /**
   * Set the color of the background.
   *
   * @param  {string|null} background
   * @return {this}
   */
  setBackground (background: string|null): this

  /**
   * Set the color of the foreground.
   * @param  {string|null} foreground
   * @return {this}
   */
  setForeground (foreground: string|null): this

  /**
   * Set the list of the styler's options.
   *
   * @param  {Array<string>} options
   * @return {this}
   */
  setOptions (options: Array<string>): this

  /**
   * Return the provided text with the style set on the styler.
   *
   * @param  {string} text
   * @return {string}
   */
  style (text: string): string
}
