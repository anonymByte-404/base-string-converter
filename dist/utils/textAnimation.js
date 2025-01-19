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
import chalk from 'chalk'
/**
 * Simulates typing text one character at a time.
 *
 * @param text - The text to animate.
 * @param delay - Delay in milliseconds between each character.
 * @returns A promise that resolves after the animation is complete.
 */
export function typewriterEffect(text_1) {
  return __awaiter(this, arguments, void 0, function* (text, delay = 50) {
    const coloredText = chalk.hex('#FFA500')(text)
    for (const char of coloredText) {
      process.stdout.write(char)
      yield new Promise((resolve) => setTimeout(resolve, delay))
    }
    console.log()
  })
}
/**
 * Fades out the text by reducing opacity step by step (simulated in the console).
 *
 * @param text - The text to animate.
 * @param steps - Number of fade-out steps.
 * @param delay - Delay in milliseconds between steps.
 * @returns A promise that resolves after the fade-out effect is complete.
 */
export function fadeOutEffect(text_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function* (text, steps = 10, delay = 100) {
      const coloredText = chalk.hex('#FFA500')(text)
      for (let i = 0; i < steps; i++) {
        process.stdout.write(`\r${coloredText}${' '.repeat(i)}`)
        yield new Promise((resolve) => setTimeout(resolve, delay))
      }
      process.stdout.write('\r')
      console.log()
    }
  )
}
