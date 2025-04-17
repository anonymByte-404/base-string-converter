import inquirer from 'inquirer'
import chalk from 'chalk'
import { stringConverter } from './handleConversion/stringConverter.ts'
import { universalBaseConverter } from './handleConversion/universalBaseConverter.ts'
import { typewriterEffect, fadeOutEffect } from './utils/textAnimation.ts'
import { loadHistory, clearHistory, searchHistory } from './storage/historyManager.ts'
import { openWebInterface } from './openWebInterface.ts'

const baseChoices = Array.from(
  { length: 64 },
  (_, i) => `Base ${i + 1}`
)

/**
 * Main menu for the application
 * @returns {Promise<void>} A promise that resolves when the user makes a selection
 */
export const main = async (): Promise<void> => {
  try {
    const { conversionType }: {
      conversionType: string
    } = await inquirer.prompt([
      {
        type: 'list',
        name: 'conversionType',
        message: 'Welcome! What kind of conversion would you like to do?',
        choices: ['String', 'Base', 'View History', 'Open on Web', chalk.red('Exit the Application')]
      }
    ])

    switch (conversionType) {
      case 'String':
        await handleStringConversion()
        break
      case 'Base':
        await handleBaseConversion()
        break
      case 'View History':
        await handleHistory()
        break
      case 'Open on Web':
        await openWebInterface()
        break
      case 'Exit the Application':
        await typewriterEffect('Thanks for using the base-string-converter. Goodbye!', 50)
        await fadeOutEffect('Closing the application...', 10, 100)
        setTimeout(() => process.exit(0), 500)
        break
      default:
        throw new Error('Invalid choice selected')
    }
  } catch (error: unknown) {
    handleError(error, 'Oops! Something unexpected happened in the main menu')
  }
}

/**
 * Handles base conversion selection
 * @returns {Promise<void>} A promise that resolves after the user selects a base
 */
const handleBaseConversion = async (): Promise<void> => {
  try {
    const { selectedBase }: {
      selectedBase: string
    } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedBase',
        message: 'Choose the base you want to convert to:',
        choices: [...baseChoices, chalk.red('Exit the application')]
      }
    ])

    if (selectedBase === 'Exit the application') {
      await typewriterEffect('Thanks for using the base-string-converter. Goodbye!', 50)
      await fadeOutEffect('Closing the application...', 10, 100)
      setTimeout(() => process.exit(0), 500)
    }

    const baseMatch: any = selectedBase.match(/Base (\d+)/)

    if (baseMatch) {
      const base: number = parseInt(baseMatch[1], 10)
      await universalBaseConverter(inquirer, main, typewriterEffect, fadeOutEffect, base)
    } else {
      console.error(chalk.red('Invalid base selection. Please try again.'))
    }
  } catch (error) {
    handleError(error, 'Error selecting a base')
  }
}

/**
 * Handles the conversion history menu
 * @returns {Promise<void>} A promise that resolves after viewing, clearing, or searching history
 */
const handleHistory = async (): Promise<void> => {
  try {
    const history: any[] = loadHistory() ?? []

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

    const { action }: {
      action: string
    } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Return to Main Menu', 'Clear History', 'Search History']
      }
    ])

    switch (action) {
      case 'Clear History':
        clearHistory()
        console.log(chalk.red('History cleared successfully!'))
        await typewriterEffect('Returning to main menu...', 50)
        await main()
        break
      case 'Search History':
        await searchHistory()
        await main()
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
 * Handles and logs errors with context
 * @param {unknown} error - The error that occurred
 * @param {string} context - Context information for the error
 */
const handleError = (
  error: any,
  context: any
) => {
  console.error(chalk.red(`${context}: ${error instanceof Error ? error.stack || error.message : JSON.stringify(error)}`))
}

/**
 * Handles string conversion selection
 * @returns {Promise<void>} A promise that resolves after the user selects string conversion options
 */
const handleStringConversion = async (): Promise<void> => {
  try {
    await stringConverter(inquirer, baseChoices, main, typewriterEffect, fadeOutEffect)
  } catch (error: unknown) {
    handleError(error, 'Error during string conversion')
  }
}

main()