import inquirer from 'inquirer'
import chalk from 'chalk'
import { stringConverter } from './handleConversion/stringConverter.js'
import { universalBaseConverter } from './handleConversion/universalBaseConverter.js'
import { typewriterEffect, fadeOutEffect } from './utils/textAnimation.js'
import { loadHistory, clearHistory, searchHistory } from './storage/historyManager.js'
import { openWebInterface } from './openWebInterface.js'

const baseChoices: string[] = Array.from(
  { length: 64 },
  (_, i) => `Base ${i + 1}`
)

/**
 * Enum representing the available conversion type options.
 */
enum ConversionType {
  STRING = 'String',
  BASE = 'Base',
  VIEW_HISTORY = 'View History',
  OPEN_ON_WEB = 'Open on Web',
  EXIT_APPLICATION = 'Exit the application'
}

/**
 * Interface representing the user's selected conversion type option.
 */
interface UserConversionChoice {
  conversionType: ConversionType
}

/**
 * Main menu for the application.
 *
 * Prompts the user to select an action:
 * - Perform a string conversion
 * - Perform a base-to-base conversion
 * - View the history of conversions
 * - Open the web interface
 * - Exit the application
 *
 * @returns {Promise<void>} A promise that resolves when the user action is completed.
 */
export const main = async (): Promise<void> => {
  try {
    const answers: UserConversionChoice = await inquirer.prompt([{
      type: 'list',
      name: 'conversionType',
      message: 'Welcome! What kind of conversion would you like to do?',
      choices: [
        ConversionType.STRING,
        ConversionType.BASE,
        ConversionType.VIEW_HISTORY,
        ConversionType.OPEN_ON_WEB,
        chalk.red(ConversionType.EXIT_APPLICATION),
      ],
    }])

    switch (answers.conversionType) {
      case ConversionType.STRING:
        await handleStringConversion()
        break
      case ConversionType.BASE:
        await handleBaseConversion()
        break
      case ConversionType.VIEW_HISTORY:
        await handleHistory()
        break
      case ConversionType.OPEN_ON_WEB:
        await openWebInterface()
        break
      case ConversionType.EXIT_APPLICATION:
        await exitApp()
        break
      default:
        throw new Error('Invalid choice selected')
    }
  } catch (error: unknown) {
    handleError(error, 'Oops! Something unexpected happened in the main menu')
  }
}

/**
 * Helper function to handle the base conversion selection.
 *
 * @returns {Promise<void>} A promise that resolves after the user selects a base.
 */
const handleBaseConversion = async (): Promise<void> => {
  try {
    const { selectedBase } = await inquirer.prompt([{
      type: 'list',
      name: 'selectedBase',
      message: 'Choose the base you want to convert to:',
      choices: [...baseChoices, 'Exit the application'],
    }])

    if (selectedBase === 'Exit the application') {
      await exitApp()
    } else {
      const baseMatch = selectedBase.match(/Base (\d+)/)
      if (baseMatch) {
        const base = parseInt(baseMatch[1], 10)
        universalBaseConverter(inquirer, main, typewriterEffect, fadeOutEffect, chalk, base)
      } else {
        console.error(chalk.red('Invalid base selection. Please try again.'))
      }
    }
  } catch (error: unknown) {
    handleError(error, 'Error selecting a base')
  }
}

/**
 * Handles the history menu, allowing the user to view, clear, or search the conversion history.
 *
 * @returns {Promise<void>} A promise that resolves when the history has been viewed, cleared, or searched.
 */
const handleHistory = async (): Promise<void> => {
  try {
    const history: any[] = loadHistory()

    if (history.length === 0) {
      console.log(chalk.yellow('No conversion history available.'))
      await typewriterEffect('Returning to main menu...', 50)
      await main()
      return
    }

    console.log(chalk.green('Conversion History:'))
    history.forEach((entry, index) => {
      console.log(
        chalk.blueBright(
          `${index + 1}. [${entry.date}] (${entry.type})\n
          - Input: "${entry.input}"\n
          - Output: "${entry.output}"\n`
        )
      )
    })

    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Return to Main Menu', 'Clear History', 'Search History'],
    }])

    switch (action) {
      case 'Clear History':
        clearHistory()
        console.log(chalk.red('History cleared successfully!'))
        await typewriterEffect('Returning to main menu...', 50)
        await main()
        break
      case 'Search History':
        await searchHistory()
        await handleHistory() // Return to history menu after searching
        break
      default:
        await typewriterEffect('Returning to main menu...', 50)
        await main()
        break
    }
  } catch (error: unknown) {
    handleError(error, 'Error in history menu')
  }
}

/**
 * Function to handle the app exit process.
 *
 * @returns {Promise<void>} A promise that resolves after displaying the exit message.
 */
const exitApp = async (): Promise<void> => {
  try {
    await typewriterEffect('Thanks for using the app. Goodbye!', 50)
    await fadeOutEffect('Closing the application...', 10, 100)
    process.exit(0)
  } catch (error: unknown) {
    handleError(error, 'Error during app exit')
  }
}

/**
 * Error handler to log errors with context.
 * 
 * @param {unknown} error - The error that occurred.
 * @param {string} context - The context in which the error occurred.
 */
const handleError = (error: unknown, context: string): void => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  console.error(chalk.red(`${context}: ${errorMessage}`))
}

/**
 * Helper function to handle the string conversion selection.
 *
 * @returns {Promise<void>} A promise that resolves after the user selects the string conversion option.
 */
const handleStringConversion = async (): Promise<void> => {
  try {
    stringConverter(inquirer, baseChoices, main, typewriterEffect, fadeOutEffect, chalk)
  } catch (error: unknown) {
    handleError(error, 'Error during string conversion')
  }
}

// Start the program
main()
