import { addToHistory } from '../storage/historyManager.ts'
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
 * @param inquirer - The inquirer instance for prompting user input.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display typewriter-style output.
 * @param fadeOutEffect - Function to show a fade-out effect.
 * @param selectedBase - The base the user is converting from.
 */
export const universalBaseConverter = async (
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  selectedBase: number
): Promise<void> => {
  const startConversion: { selectedBase: string } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedBase',
      message: 'Select the base to convert to:',
      choices: [...initialChoices, chalk.red('Exit the application')],
    },
  ])

  const userChoice: string = startConversion.selectedBase

  try {
    const baseMatch: RegExpMatchArray | null = userChoice.match(/Base (\d+)/)
    switch (userChoice) {
      case 'String':
        await convertToString(
          inquirer,
          main,
          typewriterEffect,
          fadeOutEffect,
          selectedBase
        )
        return
      case 'Exit the application':
        await typewriterEffect('Thanks for using the base-string-converter. Goodbye!', 50)
        await fadeOutEffect('Closing the application...', 10, 100)
        return
      default:
        if (baseMatch) {
          const newBase: number = parseInt(baseMatch[1], 10)

          await convertToBase(
            newBase,
            inquirer,
            main,
            typewriterEffect,
            fadeOutEffect,
            selectedBase
          )

          return
        }
    }
  } catch (error: unknown) {
    handleError(error, 'Oops! Something went wrong.')
  }
}

/**
 * Converts a number to the specified base.
 *
 * @param num - The number to convert.
 * @param base - The base to convert to (1–64).
 * @returns The string representation of the number in the given base.
 */
export const numberToBase = (num: number, base: number): string => {
  if (base < 1 || base > 64) {
    throw new Error('Base must be between 1 and 64.')
  }

  if (num === 0) return '0'
  if (base === 1) return '1'.repeat(num)

  let result = ''
  while (num > 0) {
    result = BASE_CHARACTERS[num % base] + result
    num = Math.floor(num / base)
  }

  return result
}

/**
 * Converts a string representation in a given base to a number.
 *
 * @param str - The base string to convert.
 * @param base - The base to interpret the string in.
 * @returns The numerical value.
 */
export const baseToNumber = (str: string, base: number): number => {
  if (base === 1) return str.length

  return str.split('').reduce((acc: number, char: string) => {
    const index: number = BASE_CHARACTERS.indexOf(char)
    if (index === -1 || index >= base) {
      throw new Error(`Invalid character "${char}" for base ${base}`)
    }
    return acc * base + index
  }, 0)
}

/**
 * Converts a number from a specified base to another base.
 *
 * @param base - The target base for the conversion (1–64).
 * @param inquirer - The Inquirer.js instance for handling CLI interactions.
 * @param main - The callback function to return to the main menu.
 * @param typewriterEffect - Function for typewriter effect.
 * @param fadeOutEffect - Function for fade-out effect.
 * @param selectedBase - The base that the user is converting from.
 */
export const convertToBase = async (
  base: number,
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  selectedBase: number
): Promise<void> => {
  const answer: { inputData: string } = await inquirer.prompt([
    {
      type: 'input',
      name: 'inputData',
      message: `Enter numbers (space-separated) to convert to Base ${base}:`
    }
  ])

  const userChoice: string[] = answer.inputData.trim().split(' ')

  try {
    const output: string = userChoice
      .map((val: string) => {
        if (val.trim() === '') {
          console.warn(chalk.yellow('Warning: Empty input detected. Skipping...'))
          return ''
        }

        const parsed: number = baseToNumber(val, selectedBase)
        return numberToBase(parsed, base)
      })
      .filter(Boolean) // Filter out empty strings from the result
      .join(' ')

    console.log(`${chalk.green(`Converted to Base ${base}`)}: ${output}`)

    addToHistory({ input: userChoice.join(' '), output: output, type: `Base ${selectedBase} to Base ${base}` })

    await askNextAction(inquirer, main, typewriterEffect, fadeOutEffect)
  } catch (error: unknown) {
    handleError(error, 'Conversion failed.')
  }
}

/**
 * Handles the conversion of base strings to ASCII text.
 *
 * @param inquirer - The Inquirer.js instance.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for typewriter effect.
 * @param fadeOutEffect - Function for fade-out effect.
 * @param selectedBase - The base the string values are in.
 */
export const convertToString = async (
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  selectedBase: number
): Promise<void> => {
  const answer: { inputData: string } = await inquirer.prompt([
    {
      type: 'input',
      name: 'inputData',
      message: 'Enter the base-encoded values (space-separated) to convert back to text:'
    }
  ])

  const userChoice: string = answer.inputData.trim()

  if (!userChoice) {
    console.error(chalk.red('Error: No input provided.'))
    return main()
  }

  try {
    const output: string = userChoice.split(' ').map((val: any) => {
      const number: number = baseToNumber(val, selectedBase)
      return String.fromCharCode(number)
    }).join('')

    console.log(`${chalk.green('Converted to text')}: "${output}"`)

    addToHistory({ input: userChoice, output, type: `Base ${selectedBase} to String` })

    await askNextAction(inquirer, main, typewriterEffect, fadeOutEffect)
  } catch (error: unknown) {
    handleError(error, 'Conversion failed.')
  }
}

/**
 * Error handler to log errors with context.
 *
 * @param error - The error object.
 * @param context - The context in which the error occurred.
 */
const handleError = (error: unknown, context: string): void => {
  const errorMessage: string = error instanceof Error ? error.message : String(error)
  console.error(chalk.red(`${context}: ${errorMessage}`))
}

/**
 * Prompts the user for their next action.
 *
 * @param inquirer - The Inquirer.js instance.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for typewriter effect.
 * @param fadeOutEffect - Function for fade-out effect.
 */
const askNextAction = async (
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
): Promise<void> => {
  const answer: { nextAction: string } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nextAction',
      message: 'What would you like to do next?',
      choices: [
        'Convert Again.',
        'Return to Main Menu.',
        'Exit the Application'
      ]
    }
  ])

  try {
    switch (answer.nextAction) {
      case 'Convert Again.':
        main()
        break
      case 'Return to Main Menu.':
        console.log(chalk.yellow('Returning to the main menu...'))
        main()
        break
      case 'Exit the Application':
        await typewriterEffect('Thanks for using the base-string-converter. Goodbye!', 50)
        await fadeOutEffect('Closing the application...', 10, 100)
        process.exit(0)
    }
  } catch (error: unknown) {
    handleError(error, 'An error occurred while choosing the next action.')
  }
}
