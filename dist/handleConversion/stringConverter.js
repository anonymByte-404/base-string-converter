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
import { addToHistory } from '../storage/historyManager.js'
/**
 * Converts a number to its string representation in the specified base.
 *
 * @param {number} number - The input number to convert (must be non-negative).
 * @param {number} base - The base to convert the number to (1 to 64).
 * @returns {string} The string representation of the number in the specified base.
 * @throws {RangeError} If the base is not in the range [1, 64].
 */
function toCustomBase(number, base) {
  if (base === 1) {
    return '1'.repeat(number) // Unary representation
  }
  const digits =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'
  if (base > digits.length) {
    throw new RangeError(
      `Base ${base} exceeds maximum supported base (${digits.length}).`
    )
  }
  let result = ''
  let current = number
  while (current > 0) {
    result = digits[current % base] + result
    current = Math.floor(current / base)
  }
  return result || '0'
}
/**
 * Initiates the string conversion process, allowing users to select numeral systems.
 *
 * @param {any} inquirer - Interactive CLI prompt library.
 * @param {string[]} baseChoices - Array of available numeral systems as strings (e.g., "Base 2", "Base 16").
 * @param {function} main - Callback function to return to the main menu.
 * @param {function} typewriterEffect - Function for a typing effect (simulates text display with delays).
 * @param {function} fadeOutEffect - Function for a fade-out animation effect on text.
 * @param {any} chalk - Chalk instance passed from main.ts.
 */
export function stringConverter(
  inquirer,
  baseChoices,
  main,
  typewriterEffect,
  fadeOutEffect,
  chalk
) {
  const startStringConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedBase',
          message: 'Select the base to convert your string to:',
          choices: [...baseChoices, 'Exit the application'],
        },
      ])
      .then((answers) =>
        __awaiter(this, void 0, void 0, function* () {
          const match = answers.selectedBase.match(/Base (\d+)/)
          if (match) {
            const base = parseInt(match[1], 10)
            stringToBase(
              inquirer,
              `Base ${base}`,
              base,
              startStringConversion,
              main,
              typewriterEffect,
              fadeOutEffect,
              chalk
            )
          } else if (answers.selectedBase === 'Exit the application') {
            yield typewriterEffect('Thanks for using the app. Goodbye!', 50)
            yield fadeOutEffect('Closing the application...', 10, 100)
          } else {
            console.log(
              chalk.red('Unsupported base. Please try another option.')
            )
            askNextAction(
              inquirer,
              startStringConversion,
              main,
              typewriterEffect,
              fadeOutEffect,
              chalk
            )
          }
        })
      )
      .catch((error) => {
        console.error(chalk.red('Error during base selection:', error.message))
      })
  }
  startStringConversion()
}
/**
 * Converts each character of a string to its ASCII value and represents it
 * in the specified numeral system with appropriate padding.
 *
 * @param {any} inquirer - Interactive CLI prompt library.
 * @param {string} name - The name of the numeral system (e.g., "Base 16").
 * @param {number} base - The target numeral system (1 to 64).
 * @param {function} callback - Function to restart the string conversion process.
 * @param {function} main - Callback to return to the main menu.
 * @param {function} typewriterEffect - Function for a typing effect.
 * @param {function} fadeOutEffect - Function for a fade-out animation effect.
 * @param {any} chalk - Chalk instance passed from main.ts.
 */
function stringToBase(
  inquirer,
  name,
  base,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect,
  chalk
) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'stringInput',
        message: `Enter the string to convert to ${name}:`,
      },
    ])
    .then((answers) => {
      const inputString = answers.stringInput.trim()
      const maxWidth =
        base > 1 ? Math.ceil(Math.log2(256) / Math.log2(base)) : 0
      const result = Array.from(inputString)
        .map((char) => {
          const charCode = char.charCodeAt(0)
          return toCustomBase(charCode, base).padStart(maxWidth, '0')
        })
        .join(' ')
      console.log(`Converted to ${name}: ${result}`)
      // Save the conversion to history
      addToHistory({
        input: inputString,
        output: result,
        type: `String to Base ${base}`, // Conversion type
      })
      askNextAction(
        inquirer,
        callback,
        main,
        typewriterEffect,
        fadeOutEffect,
        chalk
      )
    })
    .catch((error) => {
      console.error(
        chalk.red(`Error during conversion to ${name}:`, error.message)
      )
    })
}
/**
 * Prompts the user for the next action after a successful conversion.
 *
 * @param {any} inquirer - Interactive CLI prompt library.
 * @param {function} callback - Function to restart the string conversion process.
 * @param {function} main - Callback to return to the main menu.
 * @param {function} typewriterEffect - Function for a typing effect.
 * @param {function} fadeOutEffect - Function for a fade-out animation effect.
 * @param {any} chalk - Chalk instance passed from main.ts.
 */
function askNextAction(
  inquirer,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect,
  chalk
) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'nextAction',
        message: 'What would you like to do next?',
        choices: [
          'Convert another string.',
          'Return to Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then((answers) =>
      __awaiter(this, void 0, void 0, function* () {
        switch (answers.nextAction) {
          case 'Convert another string.':
            callback()
            break
          case 'Return to Main Menu.':
            console.log(chalk.green('Returning to the main menu...'))
            main()
            break
          case 'Exit the application.':
            yield typewriterEffect('Thanks for using the app. Goodbye!', 50)
            yield fadeOutEffect('Closing the application...', 10, 100)
            process.exit(0)
        }
      })
    )
    .catch((error) => {
      console.error(
        chalk.red('Error while deciding the next step:', error.message)
      )
    })
}
