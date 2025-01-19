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
const baseChoices = Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`)
/**
 * Main menu for the application.
 *
 * Allows users to choose between two conversion types:
 * - String conversion
 * - Base-to-base conversion
 *
 * Based on the user's choice, it calls the appropriate function to handle the conversion.
 */
const main = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'conversionType',
        message: 'Welcome! What kind of conversion would you like to do?',
        choices: ['String', 'Base'],
      },
    ])
    .then((answers) => {
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
              choices: [...baseChoices, 'Exit'],
            },
          ])
          .then((answers) =>
            __awaiter(void 0, void 0, void 0, function* () {
              if (answers.selectedBase !== 'Exit') {
                return universalBaseConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect,
                  chalk
                )
              } else {
                yield typewriterEffect('Thanks for using the app. Goodbye!', 50)
                yield fadeOutEffect('Closing the application...', 10, 100)
                process.exit(0)
              }
            })
          )
          .catch((error) => {
            console.error(
              chalk.red(
                'Oops! Something went wrong while selecting a base:',
                error
              )
            )
          })
      }
    })
    .catch((error) => {
      console.error(chalk.red('Oops! Something unexpected happened:', error))
    })
}
// Start the program
main()
