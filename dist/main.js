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
import inquirer from 'inquirer'
import chalk from 'chalk'
import { stringConverter } from './handleConversion/stringConverter.js'
import { universalBaseConverter } from './handleConversion/universalBaseConverter.js'
import { typewriterEffect, fadeOutEffect } from './utils/textAnimation.js'
import { loadHistory, clearHistory, searchHistory } from './storage/historyManager.js'
const baseChoices = Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`)
/**
 * Displays a link to the web interface.
 *
 * @returns {Promise<void>} A promise that resolves after displaying the web interface link.
 */
const openWebInterface = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      console.log(chalk.blueBright('Opening the web interface...'))
      // This is a sample link to the web application. The actual web interface is still under development.
      const webLink = 'http://localhost:3000'
      console.log(
        chalk.green(
          `Visit the following link to access the web interface: ${webLink}`
        )
      )
      console.log(
        chalk.yellow('Tip: Copy and paste the link into your browser.')
      )
      console.log()
      yield typewriterEffect('Returning to main menu...', 50)
      yield main()
    } catch (error) {
      console.error(chalk.red('Error opening the web interface:', error))
    }
  })
/**
 * Handles the history menu, allowing the user to view, clear, or search the conversion history.
 *
 * @returns {Promise<void>} A promise that resolves when the history has been viewed, cleared, or searched.
 */
const handleHistory = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const history = loadHistory()
      if (history.length === 0) {
        console.log(chalk.yellow('No conversion history available.'))
        yield typewriterEffect('Returning to main menu...', 50)
        yield main()
        return
      }
      console.log(chalk.green('Conversion History:'))
      history.forEach((entry, index) => {
        console.log(
          chalk.blueBright(
            `${index + 1}. [${entry.date}] (${entry.type})\n   - Input: "${entry.input}"\n   - Output: "${entry.output}"\n`
          )
        )
      })
      const { action } = yield inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: ['Return to Main Menu', 'Clear History', 'Search History'],
        },
      ])
      if (action === 'Clear History') {
        clearHistory()
        console.log(chalk.red('History cleared successfully!'))
        yield typewriterEffect('Returning to main menu...', 50)
        yield main()
      } else if (action === 'Search History') {
        yield searchHistory()
        yield handleHistory() // Return to history menu after searching
      } else {
        yield typewriterEffect('Returning to main menu...', 50)
        yield main()
      }
    } catch (error) {
      console.error(
        chalk.red('Oops! Something went wrong in the history menu:', error)
      )
    }
  })
/**
 * Helper function to handle the base conversion selection.
 *
 * @returns {Promise<void>} A promise that resolves after the user selects a base.
 */
const handleBaseConversion = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { selectedBase } = yield inquirer.prompt([
        {
          type: 'list',
          name: 'selectedBase',
          message: 'Choose the base you want to convert to:',
          choices: [...baseChoices, 'Exit the application'],
        },
      ])
      if (selectedBase === 'Exit the application') {
        yield exitApp()
      } else {
        const baseMatch = selectedBase.match(/Base (\d+)/)
        if (baseMatch) {
          const selectedBase = parseInt(baseMatch[1], 10)
          return universalBaseConverter(
            inquirer,
            main,
            typewriterEffect,
            fadeOutEffect,
            chalk,
            selectedBase
          )
        } else {
          console.error(chalk.red('Invalid base selection. Please try again.'))
        }
      }
    } catch (error) {
      console.error(chalk.red('Error selecting a base:', error))
    }
  })
/**
 * Function to handle the app exit process.
 *
 * @returns {Promise<void>} A promise that resolves after displaying the exit message.
 */
const exitApp = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield typewriterEffect('Thanks for using the app. Goodbye!', 50)
      yield fadeOutEffect('Closing the application...', 10, 100)
      process.exit(0)
    } catch (error) {
      console.error(chalk.red('Error during app exit:', error))
    }
  })
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
const main = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const answers = yield inquirer.prompt([
        {
          type: 'list',
          name: 'conversionType',
          message: 'Welcome! What kind of conversion would you like to do?',
          choices: [
            'String',
            'Base',
            'View History',
            'Open on Web',
            'Exit the application',
          ],
        },
      ])
      if (answers.conversionType === 'String') {
        return stringConverter(
          inquirer,
          baseChoices,
          main,
          typewriterEffect,
          fadeOutEffect,
          chalk
        )
      } else if (answers.conversionType === 'Base') {
        yield handleBaseConversion()
      } else if (answers.conversionType === 'View History') {
        yield handleHistory()
      } else if (answers.conversionType === 'Open on Web') {
        yield openWebInterface()
      } else {
        yield exitApp()
      }
    } catch (error) {
      console.error(
        chalk.red(
          'Oops! Something unexpected happened in the main menu:',
          error
        )
      )
    }
  })
// Start the program
main()
