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
const BASE_CHARACTERS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'
/**
 * Generates a list of base options from Base 1 to Base 64.
 *
 * @returns {string[]} An array of base options as strings (e.g., ["Base 1", ..., "Base 64"]).
 */
const generateBaseChoices = () =>
  Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`)
/**
 * Initial list of conversion choices, including the "String" option.
 */
const initialChoices = ['String', ...generateBaseChoices()]
/**
 * Entry point for the universal base converter.
 *
 * @param inquirer - Inquirer.js instance for CLI interaction.
 * @param main - Callback to return to the main menu.
 * @param typewriterEffect - Function for displaying text with a typewriter effect.
 * @param fadeOutEffect - Function for fading out text with an animation effect.
 * @param chalk - Chalk instance for styling console output.
 */
export function universalBaseConverter(
  inquirer,
  main,
  typewriterEffect,
  fadeOutEffect,
  chalk
) {
  let selectedBase = null
  const startConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedBase',
          message: 'Select the base to convert to:',
          choices: initialChoices,
        },
      ])
      .then((answers) => {
        const selectedBaseOption = answers.selectedBase
        if (selectedBaseOption === 'String') {
          // Proceed with converting to/from string, no need for base selection again
          convertToString(
            inquirer,
            startConversion,
            main,
            typewriterEffect,
            fadeOutEffect,
            chalk
          )
        } else {
          const baseMatch = selectedBaseOption.match(/Base (\d+)/)
          if (baseMatch) {
            selectedBase = parseInt(baseMatch[1], 10)
            // Start conversion based on the selected base
            convertToBase(
              selectedBase,
              inquirer,
              startConversion,
              main,
              typewriterEffect,
              fadeOutEffect,
              chalk
            )
          } else {
            console.error(
              chalk.red('Invalid base selection. Please try again.')
            )
            startConversion()
          }
        }
      })
      .catch((error) => {
        console.error(chalk.red('Error selecting a conversion base:', error))
      })
  }
  startConversion()
}
/**
 * Converts a number to the specified base.
 *
 * @param num - The number to convert.
 * @param base - The target base (1–64).
 * @returns The converted number as a string.
 */
function numberToBase(num, base) {
  if (base === 1) {
    // Base 1 (unary): Represent the number as a series of 1's.
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
 * @param str - The string to convert.
 * @param base - The base of the input string (1–64).
 * @returns The converted number.
 */
function baseToNumber(str, base) {
  if (base === 1) {
    // Base 1 (unary): The length of the string represents the number.
    return str.length
  }
  return str
    .split('')
    .reduce((acc, char) => acc * base + BASE_CHARACTERS.indexOf(char), 0)
}
/**
 * Converts numeric data to a specified base.
 *
 * @param base - The base to convert to (1–64).
 * @param inquirer - Inquirer.js instance for CLI interaction.
 * @param restartConversion - Callback to restart the conversion process.
 * @param main - Callback to return to the main menu.
 * @param typewriterEffect - Function for displaying text with a typewriter effect.
 * @param fadeOutEffect - Function for fading out text with an animation effect.
 * @param chalk - Chalk instance for styling console output.
 */
function convertToBase(
  base,
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
 * Converts ASCII or base strings back to readable text.
 */
function convertToString(
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
            const number = baseToNumber(val, 2) // No need to ask for base again
            return String.fromCharCode(number)
          })
          .join('')
        console.log(chalk.green(`Converted to text: "${text}"`))
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
      console.error(chalk.red('Error during conversion to text:', error))
    })
}
/**
 * Prompts the user for their next action.
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
        choices: ['Convert again', 'Go back to Main Menu', 'Exit'],
      },
    ])
    .then((answers) =>
      __awaiter(this, void 0, void 0, function* () {
        switch (answers.nextAction) {
          case 'Convert again':
            restartConversion()
            break
          case 'Go back to Main Menu':
            main()
            break
          case 'Exit':
            yield typewriterEffect('Thanks for using the app. Goodbye!', 50)
            yield fadeOutEffect('Closing the application...', 10, 100)
            process.exit(0)
        }
      })
    )
    .catch((error) => {
      console.error(chalk.red('Error deciding next action:', error))
    })
}
