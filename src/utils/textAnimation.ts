import chalk from 'chalk'

/**
 * Simulates typing text one character at a time.
 *
 * @param text - The text to animate.
 * @param delay - Delay in milliseconds between each character.
 * @returns A promise that resolves after the animation is complete.
 */
export async function typewriterEffect(
  text: string,
  delay: number = 50
): Promise<void> {
  const coloredText = chalk.hex('#FFA500')(text)

  for (const char of coloredText) {
    process.stdout.write(char)
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  console.log()
}

/**
 * Fades out the text by reducing opacity step by step (simulated in the console).
 *
 * @param text - The text to animate.
 * @param steps - Number of fade-out steps.
 * @param delay - Delay in milliseconds between steps.
 * @returns A promise that resolves after the fade-out effect is complete.
 */
export async function fadeOutEffect(
  text: string,
  steps: number = 10,
  delay: number = 100
): Promise<void> {
  const coloredText = chalk.hex('#FFA500')(text)

  for (let i = 0; i < steps; i++) {
    process.stdout.write(`\r${coloredText}${' '.repeat(i)}`)
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  process.stdout.write('\r')
  console.log()
}
