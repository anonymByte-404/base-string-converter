// textAnimation.ts
import chalk from 'chalk'

/**
 * Simulates typing text one character at a time.
 *
 * @param text - The text to animate.
 * @param delay - Delay in milliseconds between each character.
 * @param chalk - The chalk instance for coloring the text.
 * @returns A promise that resolves after the animation is complete.
 */
export async function typewriterEffect(
  text: string,
  delay: number = 50
): Promise<void> {
  const coloredText = chalk.hex('#FFA500')(text) // Yellow-orange color (hex #FFA500)

  for (const char of coloredText) {
    process.stdout.write(char) // Writes the character without a newline
    await new Promise((resolve) => setTimeout(resolve, delay)) // Wait before printing the next character
  }
  console.log() // Add a newline after the text
}

/**
 * Fades out the text by reducing opacity step by step (simulated in the console).
 *
 * @param text - The text to animate.
 * @param steps - Number of fade-out steps.
 * @param delay - Delay in milliseconds between steps.
 * @param chalk - The chalk instance for coloring the text.
 */
export async function fadeOutEffect(
  text: string,
  steps: number = 10,
  delay: number = 100
): Promise<void> {
  const coloredText = chalk.hex('#FFA500')(text) // Yellow-orange color (hex #FFA500)

  for (let i = 0; i < steps; i++) {
    const fadeText = `\r${coloredText}` // Start with colored text
    process.stdout.write(fadeText + ' '.repeat(i)) // Add more spaces to simulate fading
    await new Promise((resolve) => setTimeout(resolve, delay)) // Delay between each step
  }

  process.stdout.write('\r') // Clear the line
  console.log() // Add a new line after the fade-out effect
}
