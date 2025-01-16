/**
 * Application Entry Point
 *
 * This program helps users convert data between different formats,
 * such as binary, ternary, and plain text. It uses Inquirer.js to
 * create a user-friendly, interactive interface for these conversions.
 * Future updates will add more features and options.
 */
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
/*
 * List of available base options for conversions.
 * Includes bases from 2 (binary) to 64.
 */
const baseChoices = Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`)
/**
 * Main menu for the application.
 *
 * Lets users choose between two conversion types:
 * - String conversions
 * - Base-to-base conversions
 *
 * Based on the choice, it calls the appropriate function to handle the conversion.
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
                // Typing animation. You can adjust the delay (default: 50ms) for faster/slower typing.
                yield typewriterEffect('Thanks for using the app. Goodbye!', 50)
                // Fade-out animation. You can adjust the fade steps (default: 10) and delay (default: 100ms) for different effects.
                yield fadeOutEffect('Closing the application...', 10, 100)
                process.exit(0) // Exit the app
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
