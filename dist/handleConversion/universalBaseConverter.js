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
const BASE_CHARACTERS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'
const generateBaseChoices = () =>
  Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`)
const initialChoices = ['String', ...generateBaseChoices()]
/**
 * Entry point for the universal base converter.
 *
 * @param {any} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {function} main - The callback function to return to the main menu.
 * @param {function} typewriterEffect - A function to display text using a typewriter effect.
 * @param {function} fadeOutEffect - A function to fade out text with a customizable animation effect.
 * @param {any} chalk - An instance of Chalk.js for styling console output.
 * @param {number} selectedBase - The base that the user selects to convert from.
 */
export function universalBaseConverter(
  inquirer,
  main,
  typewriterEffect,
  fadeOutEffect,
  chalk,
  selectedBase
) {
  const startConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedBase',
          message: 'Select the base to convert to:',
          choices: [...initialChoices, 'Exit the application'],
        },
      ])
      .then((answers) =>
        __awaiter(this, void 0, void 0, function* () {
          const selectedBaseOption = answers.selectedBase
          if (selectedBaseOption === 'String') {
            convertToString(
              inquirer,
              startConversion,
              main,
              typewriterEffect,
              fadeOutEffect,
              chalk,
              selectedBase
            )
          } else if (answers.selectedBase === 'Exit the application') {
            yield typewriterEffect('Thanks for using the app. Goodbye!', 50)
            yield fadeOutEffect('Closing the application...', 10, 100)
          } else {
            const baseMatch = selectedBaseOption.match(/Base (\d+)/)
            if (baseMatch) {
              const newBase = parseInt(baseMatch[1], 10)
              convertToBase(
                newBase,
                inquirer,
                startConversion,
                main,
                typewriterEffect,
                fadeOutEffect,
                chalk,
                selectedBase
              )
            } else {
              console.error(
                chalk.red('Invalid base selection. Please try again.')
              )
              startConversion()
            }
          }
        })
      )
      .catch((error) => {
        console.error(chalk.red('Error selecting a conversion base:', error))
      })
  }
  startConversion()
}
/**
 * Converts a number to the specified base.
 *
 * @param {number} num - The number to convert.
 * @param {number} base - The target base (1–64).
 * @returns {string} The number converted to the specified base as a string.
 */
function numberToBase(num, base) {
  if (base === 1) {
    return '1'.repeat(num)
  }
  let result = ''
  while (num > 0) {
    result = BASE_CHARACTERS[num % base] + result
    num = Math.floor(num / base)
  }
  return result || '0'
}
/**
 * Converts a string representation in a given base to a number.
 *
 * @param {string} str - The string representation of the number in the specified base.
 * @param {number} base - The base of the input string (1–64).
 * @returns {number} The number represented by the string in the specified base.
 */
function baseToNumber(str, base) {
  if (base === 1) {
    return str.length
  }
  return str
    .split('')
    .reduce((acc, char) => acc * base + BASE_CHARACTERS.indexOf(char), 0)
}
/**
 * Handles the conversion of numbers to a specified base.
 *
 * @param {number} base - The target base for the conversion (1–64).
 * @param {any} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {function} restartConversion - A callback to restart the conversion process.
 * @param {function} main - The callback function to return to the main menu.
 * @param {function} typewriterEffect - A function to display text using a typewriter effect.
 * @param {function} fadeOutEffect - A function to fade out text with a customizable animation effect.
 * @param {any} chalk - An instance of Chalk.js for styling console output.
 * @param {number} selectedBase - The base that the user is converting from.
 */
function convertToBase(
  base,
  inquirer,
  restartConversion,
  main,
  typewriterEffect,
  fadeOutEffect,
  chalk,
  selectedBase
) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'inputData',
        message: `Enter numbers (space-separated) to convert to Base ${base}:`,
      },
    ])
    .then((answers) => {
      const numbers = answers.inputData.trim().split(' ')
      try {
        const converted = numbers
          .map((num) => {
            const parsed = parseInt(num, 10)
            if (isNaN(parsed)) {
              throw new Error(
                `Invalid number: "${num}". Please provide valid numbers.`
              )
            }
            return numberToBase(parsed, base)
          })
          .join(' ')
        console.log(chalk.green(`Converted to Base ${base}: ${converted}`))
        addToHistory({
          input: numbers.join(' '),
          output: converted,
          type: `Base ${selectedBase} to Base ${base}`,
        })
      } catch (error) {
        console.error(chalk.red(error.message))
      }
      askNextAction(
        inquirer,
        restartConversion,
        main,
        typewriterEffect,
        fadeOutEffect,
        chalk
      )
    })
    .catch((error) => {
      console.error(
        chalk.red(`Error during conversion to Base ${base}:`, error)
      )
    })
}
/**
 * Handles the conversion of base strings to ASCII or readable text.
 *
 * @param {any} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {function} restartConversion - A callback to restart the conversion process.
 * @param {function} main - The callback function to return to the main menu.
 * @param {function} typewriterEffect - A function to display text using a typewriter effect.
 * @param {function} fadeOutEffect - A function to fade out text with a customizable animation effect.
 * @param {any} chalk - An instance of Chalk.js for styling console output.
 * @param {number} selectedBase - The base that the user is converting from.
 */
function convertToString(
  inquirer,
  restartConversion,
  main,
  typewriterEffect,
  fadeOutEffect,
  chalk,
  selectedBase
) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'inputData',
        message:
          'Enter base-encoded values (space-separated) to convert back to text:',
      },
    ])
    .then((answers) => {
      const values = answers.inputData.trim().split(' ')
      try {
        const text = values
          .map((val) => {
            const number = baseToNumber(val, 2)
            return String.fromCharCode(number)
          })
          .join('')
        console.log(chalk.green(`Converted to text: "${text}"`))
        addToHistory({
          input: values.join(' '),
          output: text,
          type: `Base ${selectedBase} to String`,
        })
      } catch (error) {
        console.error(chalk.red('Error during conversion to text:', error))
      }
      askNextAction(
        inquirer,
        restartConversion,
        main,
        typewriterEffect,
        fadeOutEffect,
        chalk
      )
    })
    .catch((error) => {
      console.error(chalk.red('Error during conversion to text:', error))
    })
}
/**
 * Prompts the user for their next action.
 *
 * @param {any} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {function} restartConversion - A callback to restart the conversion process.
 * @param {function} main - The callback function to return to the main menu.
 * @param {function} typewriterEffect - A function to display text using a typewriter effect.
 * @param {function} fadeOutEffect - A function to fade out text with a customizable animation effect.
 * @param {any} chalk - An instance of Chalk.js for styling console output.
 */
function askNextAction(
  inquirer,
  restartConversion,
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
          'Convert again',
          'Return to Main Menu',
          'Exit the application',
        ],
      },
    ])
    .then((answers) =>
      __awaiter(this, void 0, void 0, function* () {
        switch (answers.nextAction) {
          case 'Convert again':
            restartConversion()
            break
          case 'Return to Main Menu':
            console.log(chalk.green('Returning to the main menu...'))
            main()
            break
          case 'Exit the application':
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
