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
import { stringConverter } from './handleConversion/stringConverter.js'
import { binaryConverter } from './handleConversion/binaryConverter.js'
import { ternaryConverter } from './handleConversion/ternaryConverter.js'
import { quaternaryConverter } from './handleConversion/quaternaryConverter.js'
import { quinaryConverter } from './handleConversion/quinaryConversion.js'
import { senaryConverter } from './handleConversion/senaryConverter.js'
import { septenaryConverter } from './handleConversion/septenaryConverter.js'
import { octalConverter } from './handleConversion/octalConverter.js'
import { nonaryConverter } from './handleConversion/nonaryConverter.js'
import { typewriterEffect, fadeOutEffect } from './utils/textAnimation.js'
import { decimalConverter } from './handleConversion/decimalConverter.js'
import { undecimalConverter } from './handleConversion/undecimalConverter.js'
import { duodecimalConverter } from './handleConversion/duodecimalConverter.js'
import { tridecimalConverter } from './handleConversion/tridecimalConverter.js'
import { tetradecimalConverter } from './handleConversion/tetradecimalConverter.js'
import { pentadecimalConverter } from './handleConversion/pentadecimalConverter.js'
/*
 * List of available base options for conversions.
 * Includes bases from 2 (binary) to 64.
 */
const baseChoices = Array.from({ length: 63 }, (_, i) => `Base ${i + 2}`)
/**
 * Placeholder for unsupported conversions.
 * Displays a friendly message letting users know the selected conversion
 * is not available yet.
 *
 * @param baseName - The base selected by the user.
 */
const placeholder = (baseName) => {
  console.log(
    `Sorry, conversions for ${baseName} aren't supported yet. Check back soon for updates!`
  )
  // Ask the user if they want to try again or quit
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'tryAgain',
        message: 'Would you like to try another conversion?',
        choices: ['Yes', 'No'],
      },
    ])
    .then((answers) =>
      __awaiter(void 0, void 0, void 0, function* () {
        if (answers.tryAgain === 'Yes') {
          // Restart the main function to select a new conversion
          main()
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
      console.error('Error while asking the user for the next action:', error)
    })
}
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
        // Handle string-based conversions
        stringConverter(
          inquirer,
          baseChoices,
          main,
          typewriterEffect,
          fadeOutEffect
        )
      } else if (answers.conversionType === 'Base') {
        // Show base conversion options
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'selectedBase',
              message: 'Choose the base you want to convert to:',
              choices: baseChoices,
            },
          ])
          .then((answers) => {
            const { selectedBase } = answers
            switch (selectedBase) {
              case 'Base 2':
                // Handle binary conversions
                binaryConverter(inquirer, main, typewriterEffect, fadeOutEffect)
                break
              case 'Base 3':
                // Handle ternary conversions
                ternaryConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              case 'Base 4':
                // Handle quaternary conversions
                quaternaryConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              // Handle quinary conversions
              case 'Base 5':
                quinaryConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              // Handle senary conversions
              case 'Base 6':
                senaryConverter(inquirer, main, typewriterEffect, fadeOutEffect)
                break
              // Handle septenary conversions
              case 'Base 7':
                septenaryConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              // Handle octal conversions
              case 'Base 8':
                octalConverter(inquirer, main, typewriterEffect, fadeOutEffect)
                break
              // Handle nonary conversions
              case 'Base 9':
                nonaryConverter(inquirer, main, typewriterEffect, fadeOutEffect)
                break
              case 'Base 10':
                decimalConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              case 'Base 11':
                undecimalConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              case 'Base 12':
                duodecimalConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              case 'Base 13':
                tridecimalConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              case 'Base 14':
                tetradecimalConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              case 'Base 15':
                pentadecimalConverter(
                  inquirer,
                  main,
                  typewriterEffect,
                  fadeOutEffect
                )
                break
              default:
                // Inform the user about unsupported bases
                placeholder(selectedBase)
            }
          })
          .catch((error) => {
            console.error(
              'Oops! Something went wrong while selecting a base:',
              error
            )
          })
      }
    })
    .catch((error) => {
      console.error('Oops! Something unexpected happened:', error)
    })
}
// Start the program
main()
