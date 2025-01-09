/**
 * Application Entry Point
 *
 * This program helps users convert data between different formats,
 * such as binary, ternary, and plain text. It uses Inquirer.js to
 * create a user-friendly, interactive interface for these conversions.
 * Future updates will add more features and options.
 */

import inquirer from 'inquirer'
import { stringConverter } from './handleConversion/stringConverter.js'
import { binaryConverter } from './handleConversion/binaryConverter.js'
import { ternaryConverter } from './handleConversion/ternaryConverter.js'
import { quaternaryConverter } from './handleConversion/quaternaryConverter.js'
import { quinaryConverter } from './handleConversion/quinaryConversion.js'
import { senaryConverter } from './handleConversion/senaryConverter.js'
import { typewriterEffect, fadeOutEffect } from './utils/textAnimation.js'

/*
 * List of available base options for conversions.
 * Includes bases from 2 (binary) to 64.
 */
const baseChoices: string[] = Array.from(
  { length: 63 },
  (_, i) => `Base ${i + 2}`
)

/**
 * Placeholder for unsupported conversions.
 * Displays a friendly message letting users know the selected conversion
 * is not available yet.
 *
 * @param baseName - The base selected by the user.
 */
const placeholder = (baseName: string): void => {
  console.log(
    `Sorry, conversions for ${baseName} aren't supported yet. Check back soon for updates!`
  )
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
const main = (): void => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'conversionType',
        message: 'Welcome! What kind of conversion would you like to do?',
        choices: ['String', 'Base'],
      },
    ])
    .then((answers: { conversionType: string }) => {
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
          .then((answers: { selectedBase: string }) => {
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
              default:
                // Inform the user about unsupported bases
                placeholder(selectedBase)
            }
          })
          .catch((error: unknown) => {
            console.error(
              'Oops! Something went wrong while selecting a base:',
              error
            )
          })
      }
    })
    .catch((error: unknown) => {
      console.error('Oops! Something unexpected happened:', error)
    })
}

// Start the program
main()
