import { addToHistory } from '../storage/historyManager.js'
import chalk from 'chalk'

const BASE_CHARACTERS: string =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'

const generateBaseChoices: string[] = Array.from(
  { length: 64 },
  (_, i) => `Base ${i + 1}`
)

const initialChoices: string[] = ['String', ...generateBaseChoices]

/**
 * Entry point for the universal base converter.
 *
 * @param {Inquirer} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {() => void} main - The callback function to return to the main menu.
 * @param {(text: string, delay: number) => Promise<void>} typewriterEffect - Function for typewriter effect.
 * @param {(text: string, steps: number, delay: number) => Promise<void>} fadeOutEffect - Function for fade-out effect.
 * @param {number} selectedBase - The base the user selects to convert from.
 */
export const universalBaseConverter = async (
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  selectedBase: number
): Promise<void> => {
  try {
    const startConversion: any = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedBase',
        message: 'Select the base to convert to:',
        choices: [...initialChoices, chalk.red('Exit the application')],
      },
    ]);

    switch (startConversion.selectedBase) {
      case 'String':
        convertToString(
          inquirer,
          startConversion,
          main,
          typewriterEffect,
          fadeOutEffect,
          selectedBase
        )
        break
      case 'Exit the application':
        await typewriterEffect('Thanks for using the app. Goodbye!', 50)
        await fadeOutEffect('Closing the application...', 10, 100)
        break
      default:
        const baseMatch: RegExpMatchArray | null = startConversion.selectedBase.match(/Base (\d+)/)

        if (baseMatch) {
          const newBase: number = parseInt(baseMatch[1], 10)
          convertToBase(
            newBase,
            inquirer,
            startConversion,
            main,
            typewriterEffect,
            fadeOutEffect,
            selectedBase
          )
        } else {
          console.error(chalk.red('Invalid base selection. Please try again.'))
          main()
        }
    }
  } catch (error: unknown) {
    handleError(error, 'Oops! Something went wrong.')
  }
}

/**
 * Converts a number to the specified base.
 *
 * @param {number} num - The number to convert.
 * @param {number} base - The target base (1–64).
 * @returns {string} The number converted to the specified base as a string.
 */
export const numberToBase = (
  num: number,
  base: number
): string => {
  if (base < 1 || base > 64) {
    throw new Error('Base must be between 1 and 64.')
  }

  if (base === 1) return '1'.repeat(num)

  let result: string = ''

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
export const baseToNumber = (
  str: string,
  base: number
): number => {
  if (base === 1) return str.length

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
 * @param {number} selectedBase - The base that the user is converting from.
 */
export const convertToBase = (
  base: number,
  inquirer: any,
  restartConversion: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
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
      const inputData: string = answers.inputData || ''
      const numbers: string[] = inputData.trim().split(' ')

      try {
        const converted: string = numbers
          .map((num) => {
            if (num.trim() === '') {
              console.warn(chalk.yellow('Warning: Empty input detected. Skipping...'))
              return ''
            }
            const parsed: number = parseInt(num, 10)
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
        handleError(error, 'Conversion failed!')
      }

      askNextAction(
        inquirer,
        restartConversion,
        main,
        typewriterEffect,
        fadeOutEffect,
      )
    })
    .catch((error: unknown) => handleError(error, 'Conversion failed!'))
}

/**
 * Handles the conversion of base strings to ASCII or readable text.
 *
 * @param {any} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {() => void} restartConversion - A callback to restart the conversion process.
 * @param {() => void} main - The callback function to return to the main menu.
 * @param {(text: string, delay: number) => Promise<void>} typewriterEffect - Function for typewriter effect.
 * @param {(text: string, steps: number, delay: number) => Promise<void>} fadeOutEffect - Function for fade-out effect.
 * @param {number} selectedBase - The base that the user is converting from.
 */
export const convertToString = (
  inquirer: any,
  restartConversion: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
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
      const inputData: string = answers.inputData || ''
      const values: string[] = inputData.trim().split(' ')

      try {
        const text: string = values
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
        handleError(error, 'Conversion failed!')
      }

      askNextAction(
        inquirer,
        restartConversion,
        main,
        typewriterEffect,
        fadeOutEffect,
      )
    })
    .catch((error: unknown) => handleError(error, 'Conversion failed!'))
}

/**
 * Error handler to log errors with context.
 * 
 * @param {unknown} error - The error that occurred.
 * @param {string} context - The context in which the error occurred.
 */
const handleError = (error: unknown, context: string): void => {
  const errorMessage: string = error instanceof Error ? error.message : String(error)
  console.error(chalk.red(`${context}: ${errorMessage}`))
}

/**
 * Prompts the user for their next action.
 *
 * @param {any} inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param {() => void} restartConversion - A callback to restart the conversion process.
 * @param {() => void} main - The callback function to return to the main menu.
 * @param {(text: string, delay: number) => Promise<void>} typewriterEffect - Function for typewriter effect.
 * @param {(text: string, steps: number, delay: number) => Promise<void>} fadeOutEffect - Function for fade-out effect.
 */
const askNextAction = (
  inquirer: any,
  restartConversion: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
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
    .catch((error: unknown) => handleError(error, 'An error occurred while choosing the next action.'))
}
