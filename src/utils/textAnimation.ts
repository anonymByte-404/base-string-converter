import chalk from 'chalk'

/**
 * Simulates typing text one character at a time.
 * 
 * @param text - The text to animate.
 * @param delay - Delay in milliseconds between each character. Default is 50ms.
 * @returns A promise that resolves after the animation is complete.
 * @throws Will throw an error if `text` is not a string or `delay` is not a positive number.
 */
export const typewriterEffect = async (
  text: string,
  delay: number = 50
): Promise<void> => {
  // Validate inputs
  if (typeof text !== 'string') {
    throw new Error('The "text" parameter must be a string.')
  }
  if (typeof delay !== 'number' || delay <= 0) {
    throw new Error('The "delay" parameter must be a positive number.')
  }

  const coloredText = chalk.hex('#FFA500')(text)

  // Write each character with the specified delay
  for (const char of coloredText) {
    process.stdout.write(char)
    await delayFor(delay)
  }

  console.log()
}

/**
 * Fades out the text by reducing opacity step by step (simulated in the console).
 * 
 * @param text - The text to animate.
 * @param steps - Number of fade-out steps. Default is 10.
 * @param delay - Delay in milliseconds between each fade-out step. Default is 100ms.
 * @returns A promise that resolves after the fade-out effect is complete.
 * @throws Will throw an error if `text` is not a string, `steps` is not a positive number, or `delay` is not a positive number.
 */
export const fadeOutEffect = async (
  text: string,
  steps: number = 10,
  delay: number = 100
): Promise<void> => {
  // Validate inputs
  if (typeof text !== 'string') {
    throw new Error('The "text" parameter must be a string.')
  }
  if (typeof steps !== 'number' || steps <= 0) {
    throw new Error('The "steps" parameter must be a positive number.')
  }
  if (typeof delay !== 'number' || delay <= 0) {
    throw new Error('The "delay" parameter must be a positive number.')
  }

  const coloredText = chalk.hex('#FFA500')(text)

  // Fade-out effect by adding spaces in each step
  for (let i = 0; i < steps; i++) {
    process.stdout.write(`\r${coloredText}${' '.repeat(i)}`)
    await delayFor(delay)
  }

  process.stdout.write('\r')
  console.log()
}

/**
 * Helper function to delay the execution for the specified time.
 *
 * @param delay - Delay in milliseconds.
 * @returns A promise that resolves after the specified delay.
 */
const delayFor = (delay: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, delay))
