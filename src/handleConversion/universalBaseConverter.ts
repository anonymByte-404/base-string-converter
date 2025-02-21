import { addToHistory } from '../storage/historyManager.js'

const BASE_CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'

const generateBaseChoices = (): string[] =>
  Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`)

const initialChoices: string[] = ['String', ...generateBaseChoices()]

/**
 * Entry point for the universal base converter.
 *
 * @param {Inquirer} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {() => void} main - The callback function to return to the main menu.
 * @param {(text: string, delay: number) => Promise<void>} typewriterEffect - Function for typewriter effect.
 * @param {(text: string, steps: number, delay: number) => Promise<void>} fadeOutEffect - Function for fade-out effect.
 * @param {Chalk} chalk - Chalk.js instance for styling console output.
 * @param {number} selectedBase - The base the user selects to convert from.
 */
export const universalBaseConverter = (
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any,
  selectedBase: number
): void => {
  const startConversion = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedBase',
          message: 'Select the base to convert to:',
          choices: [...initialChoices, 'Exit the application'],
        },
      ])
      .then(async (answers: { selectedBase: string }) => {
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
        } else if (selectedBaseOption === 'Exit the application') {
          await typewriterEffect('Thanks for using the app. Goodbye!', 50)
          await fadeOutEffect('Closing the application...', 10, 100)
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
            console.error(chalk.red('Invalid base selection. Please try again.'))
            startConversion()
          }
        }
      })
      .catch((error: unknown) => handleError(error, chalk))
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
const numberToBase = (
  num: number,
  base: number
): string => {
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
const baseToNumber = (
  str: string,
  base: number
): number => {
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
 * @param {() => void} restartConversion - A callback to restart the conversion process.
 * @param {() => void} main - The callback function to return to the main menu.
 * @param {(text: string, delay: number) => Promise<void>} typewriterEffect - Function for typewriter effect.
 * @param {(text: string, steps: number, delay: number) => Promise<void>} fadeOutEffect - Function for fade-out effect.
 * @param {Chalk} chalk - Chalk.js instance for styling console output.
 * @param {number} selectedBase - The base that the user is converting from.
 */
const convertToBase = (
  base: number,
  inquirer: any,
  restartConversion: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any,
  selectedBase: number
): void => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'inputData',
        message: `Enter numbers (space-separated) to convert to Base ${base}:`,
      },
    ])
    .then((answers: { inputData: string }) => {
      const numbers = answers.inputData.trim().split(' ')

      try {
        const converted = numbers
          .map((num) => {
            const parsed = parseInt(num, 10)
            if (isNaN(parsed)) {
              throw new Error(`Invalid number: "${num}". Please provide valid numbers.`)
            }
            return numberToBase(parsed, base)
          })
          .join(' ')

        console.log(`${chalk.green(`Converted to Base ${base}:`)} ${converted}`)

        addToHistory({
          input: numbers.join(' '),
          output: converted,
          type: `Base ${selectedBase} to Base ${base}`,
        })
      } catch (error: unknown) {
        handleError(error, chalk)
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
    .catch((error: unknown) => handleError(error, chalk))
}

/**
 * Handles the conversion of base strings to ASCII or readable text.
 *
 * @param {any} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {() => void} restartConversion - A callback to restart the conversion process.
 * @param {() => void} main - The callback function to return to the main menu.
 * @param {(text: string, delay: number) => Promise<void>} typewriterEffect - Function for typewriter effect.
 * @param {(text: string, steps: number, delay: number) => Promise<void>} fadeOutEffect - Function for fade-out effect.
 * @param {Chalk} chalk - Chalk.js instance for styling console output.
 * @param {number} selectedBase - The base that the user is converting from.
 */
const convertToString = (
  inquirer: any,
  restartConversion: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any,
  selectedBase: number
): void => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'inputData',
        message:
          'Enter base-encoded values (space-separated) to convert back to text:',
      },
    ])
    .then((answers: { inputData: string }) => {
      const values = answers.inputData.trim().split(' ')

      try {
        const text = values
          .map((val) => {
            const number = baseToNumber(val, 2)
            return String.fromCharCode(number)
          })
          .join('')

        console.log(`${chalk.green(`Converted to text:`)} "${text}"`)

        addToHistory({
          input: values.join(' '),
          output: text,
          type: `Base ${selectedBase} to String`,
        })
      } catch (error: unknown) {
        handleError(error, chalk)
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
    .catch((error: unknown) => handleError(error, chalk))
}

/**
 * Handles error logging.
 *
 * @param {unknown} error - The error to handle.
 * @param {Chalk} chalk - Chalk.js instance for styling console output.
 */
const handleError = (error: unknown, chalk: any): void => {
  if (error instanceof Error) {
    console.error(chalk.red(`Error: ${error.message}`))
  } else {
    console.error(chalk.red(`An unknown error occurred: ${String(error)}`))
  }
}

/**
 * Prompts the user for their next action.
 *
 * @param {any} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {() => void} restartConversion - A callback to restart the conversion process.
 * @param {() => void} main - The callback function to return to the main menu.
 * @param {(text: string, delay: number) => Promise<void>} typewriterEffect - Function for typewriter effect.
 * @param {(text: string, steps: number, delay: number) => Promise<void>} fadeOutEffect - Function for fade-out effect.
 * @param {Chalk} chalk - Chalk.js instance for styling console output.
 */
const askNextAction = (
  inquirer: any,
  restartConversion: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any
): void => {
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
    .then(async (answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert again':
          restartConversion()
          break
        case 'Return to Main Menu':
          console.log(chalk.green('Returning to the main menu...'))
          main()
          break
        case 'Exit the application':
          await typewriterEffect('Thanks for using the app. Goodbye!', 50)
          await fadeOutEffect('Closing the application...', 10, 100)
          process.exit(0)
      }
    })
    .catch((error: unknown) => handleError(error, chalk))
}
