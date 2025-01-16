var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
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
export function typewriterEffect(text_1) {
  return __awaiter(this, arguments, void 0, function* (text, delay = 50) {
    const coloredText = chalk.hex('#FFA500')(text) // Yellow-orange color (hex #FFA500)
    for (const char of coloredText) {
      process.stdout.write(char) // Writes the character without a newline
      yield new Promise((resolve) => setTimeout(resolve, delay)) // Wait before printing the next character
    }
    console.log() // Add a newline after the text
  })
}
/**
 * Fades out the text by reducing opacity step by step (simulated in the console).
 *
 * @param text - The text to animate.
 * @param steps - Number of fade-out steps.
 * @param delay - Delay in milliseconds between steps.
 * @param chalk - The chalk instance for coloring the text.
 */
export function fadeOutEffect(text_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function* (text, steps = 10, delay = 100) {
      const coloredText = chalk.hex('#FFA500')(text) // Yellow-orange color (hex #FFA500)
      for (let i = 0; i < steps; i++) {
        const fadeText = `\r${coloredText}` // Start with colored text
        process.stdout.write(fadeText + ' '.repeat(i)) // Add more spaces to simulate fading
        yield new Promise((resolve) => setTimeout(resolve, delay)) // Delay between each step
      }
      process.stdout.write('\r') // Clear the line
      console.log() // Add a new line after the fade-out effect
    }
  )
}
