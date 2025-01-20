import inquirer from 'inquirer'
import chalk from 'chalk'
import { stringConverter } from './handleConversion/stringConverter.js'
import { universalBaseConverter } from './handleConversion/universalBaseConverter.js'
import { typewriterEffect, fadeOutEffect } from './utils/textAnimation.js'

const baseChoices: string[] = Array.from(
  { length: 64 },
  (_, i) => `Base ${i + 1}`
)

/**
 * Main menu for the application.
 *
 * Allows users to choose between two conversion types:
 * - String conversion
 * - Base-to-base conversion
 *
 * Based on the user's choice, it calls the appropriate function to handle the conversion.
 */
const main = (): void => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'conversionType',
        message: 'Welcome! What kind of conversion would you like to do?',
        choices: ['String', 'Base', 'Exit the application'],
      },
    ])
    .then(async (answers: { conversionType: string }) => {
      if (answers.conversionType === 'String') {
        stringConverter(
          inquirer,
          baseChoices,
          main,
          typewriterEffect,
          fadeOutEffect,
          chalk
        )
      } else if (answers.conversionType === 'Base') {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'selectedBase',
              message: 'Choose the base you want to convert to:',
              choices: [...baseChoices, 'Exit the application'],
            },
          ])
          .then(async (answers: { selectedBase: string }) => {
            if (answers.selectedBase !== 'Exit the application') {
              return universalBaseConverter(
                inquirer,
                main,
                typewriterEffect,
                fadeOutEffect,
                chalk
              )
            } else {
              await typewriterEffect('Thanks for using the app. Goodbye!', 50)
              await fadeOutEffect('Closing the application...', 10, 100)
              process.exit(0)
            }
          })
          .catch((error: unknown) => {
            console.error(
              chalk.red(
                'Oops! Something went wrong while selecting a base:',
                error
              )
            )
          })
      } else if (answers.conversionType === 'Exit the application') {
        await typewriterEffect('Thanks for using the app. Goodbye!', 50)
        await fadeOutEffect('Closing the application...', 10, 100)
        process.exit(0)
      }
    })
    .catch((error: unknown) => {
      console.error(chalk.red('Oops! Something unexpected happened:', error))
    })
}

// Start the program
main()
