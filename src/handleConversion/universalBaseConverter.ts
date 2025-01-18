/**
 * Universal Base Converter Module
 *
 * This module provides functionality to convert numbers between various bases (e.g., binary, hexadecimal, decimal),
 * and supports conversion to different numeral systems and formats, including Base64 and custom bases.
 * It does not support conversion from plain text.
 */

const BASE_CHARACTERS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'

/**
 * Generates a list of base options from Base 1 to Base 64.
 *
 * @returns {string[]} An array of base options as strings (e.g., ["Base 1", ..., "Base 64"]).
 */
const generateBaseChoices = (): string[] =>
  Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`)

/**
 * Initial list of conversion choices, including the "String" option.
 */
const initialChoices: string[] = ['String', ...generateBaseChoices()]

/**
 * Entry point for the universal base converter.
 *
 * @param inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param main - The callback function to return to the main menu.
 * @param typewriterEffect - A function to display text using a typewriter effect.
 * @param fadeOutEffect - A function to fade out text with a customizable animation effect.
 * @param chalk - An instance of Chalk.js for styling console output.
 */
export function universalBaseConverter(
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any
): void {
  let selectedBase: number | null = null

  /**
   * Begins the conversion process by prompting the user to select a base.
   */
  const startConversion = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedBase',
          message: 'Select the base to convert to:',
          choices: initialChoices,
        },
      ])
      .then((answers: { selectedBase: string }) => {
        const selectedBaseOption = answers.selectedBase

        if (selectedBaseOption === 'String') {
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
      .catch((error: unknown) => {
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
 * @returns {string} The number converted to the specified base as a string.
 */
function numberToBase(num: number, base: number): string {
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
 * @param str - The string representation of the number in the specified base.
 * @param base - The base of the input string (1–64).
 * @returns {number} The number represented by the string in the specified base.
 */
function baseToNumber(str: string, base: number): number {
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
 * @param base - The target base for the conversion (1–64).
 * @param inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param restartConversion - A callback to restart the conversion process.
 * @param main - The callback function to return to the main menu.
 * @param typewriterEffect - A function to display text using a typewriter effect.
 * @param fadeOutEffect - A function to fade out text with a customizable animation effect.
 * @param chalk - An instance of Chalk.js for styling console output.
 */
function convertToBase(
  base: number,
  inquirer: any,
  restartConversion: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any
): void {
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
              throw new Error(
                `Invalid number: "${num}". Please provide valid numbers.`
              )
            }
            return numberToBase(parsed, base)
          })
          .join(' ')

        console.log(chalk.green(`Converted to Base ${base}: ${converted}`))
      } catch (error: unknown) {
        console.error(chalk.red((error as Error).message))
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
    .catch((error: unknown) => {
      console.error(
        chalk.red(`Error during conversion to Base ${base}:`, error)
      )
    })
}

/**
 * Handles the conversion of base strings to ASCII or readable text.
 *
 * @param inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param restartConversion - A callback to restart the conversion process.
 * @param main - The callback function to return to the main menu.
 * @param typewriterEffect - A function to display text using a typewriter effect.
 * @param fadeOutEffect - A function to fade out text with a customizable animation effect.
 * @param chalk - An instance of Chalk.js for styling console output.
 */
function convertToString(
  inquirer: any,
  restartConversion: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any
): void {
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

        console.log(chalk.green(`Converted to text: "${text}"`))
      } catch (error: unknown) {
        console.error(chalk.red((error as Error).message))
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
    .catch((error: unknown) => {
      console.error(chalk.red('Error during conversion to text:', error))
    })
}

/**
 * Prompts the user for their next action.
 *
 * @param inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param restartConversion - A callback to restart the conversion process.
 * @param main - The callback function to return to the main menu.
 * @param typewriterEffect - A function to display text using a typewriter effect.
 * @param fadeOutEffect - A function to fade out text with a customizable animation effect.
 * @param chalk - An instance of Chalk.js for styling console output.
 */
function askNextAction(
  inquirer: any,
  restartConversion: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any
): void {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'nextAction',
        message: 'What would you like to do next?',
        choices: ['Convert again', 'Go back to Main Menu', 'Exit'],
      },
    ])
    .then(async (answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert again':
          restartConversion()
          break
        case 'Go back to Main Menu':
          main()
          break
        case 'Exit':
          await typewriterEffect('Thanks for using the app. Goodbye!', 50)
          await fadeOutEffect('Closing the application...', 10, 100)
          process.exit(0)
      }
    })
    .catch((error: unknown) => {
      console.error(chalk.red('Error deciding next action:', error))
    })
}
