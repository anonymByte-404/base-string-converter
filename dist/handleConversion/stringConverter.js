/**
 * String Conversion Module
 *
 * This module provides functionality to convert strings into various numeral systems,
 * such as binary, hexadecimal, and custom bases up to Base 64.
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
/**
 * Converts a number to its string representation in the specified base.
 *
 * - Supports bases from 1 to 64.
 * - Handles unary (Base 1) as a special case, where the result is a repeated "1".
 *
 * @param number - The input number to convert (must be non-negative).
 * @param base - The base to convert the number to (1 to 64).
 * @returns The string representation of the number in the specified base.
 * @throws RangeError If the base is not in the range [1, 64].
 */
function toCustomBase(number, base) {
  if (base === 1) {
    return '1'.repeat(number) // Unary representation
  }
  const digits =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'
  if (base > digits.length) {
    throw new RangeError(
      `Base ${base} exceeds maximum supported base (${digits.length}).`
    )
  }
  let result = ''
  let current = number
  while (current > 0) {
    result = digits[current % base] + result
    current = Math.floor(current / base)
  }
  return result || '0' // Ensure "0" is returned for input 0
}
/**
 * Initiates the string conversion process, allowing users to select numeral systems.
 *
 * @param inquirer - Interactive CLI prompt library.
 * @param baseChoices - Array of available numeral systems as strings (e.g., "Base 2", "Base 16").
 * @param main - Callback function to return to the main menu.
 * @param typewriterEffect - Function for a typing effect (simulates text display with delays).
 * @param fadeOutEffect - Function for a fade-out animation effect on text.
 */
export function stringConverter(
  inquirer,
  baseChoices,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const startStringConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedBase',
          message: 'Select the base to convert your string to:',
          choices: baseChoices,
        },
      ])
      .then((answers) => {
        const match = answers.selectedBase.match(/Base (\d+)/)
        if (match) {
          const base = parseInt(match[1], 10)
          stringToBase(
            inquirer,
            `Base ${base}`,
            base,
            startStringConversion,
            main,
            typewriterEffect,
            fadeOutEffect
          )
        } else {
          console.log('Unsupported base. Please try another option.')
          askNextAction(
            inquirer,
            startStringConversion,
            main,
            typewriterEffect,
            fadeOutEffect
          )
        }
      })
      .catch((error) => {
        console.error('Error during base selection:', error.message)
      })
  }
  startStringConversion()
}
/**
 * Converts each character of a string to its ASCII value and represents it
 * in the specified numeral system with appropriate padding.
 *
 * - Handles Base 1 (unary) as a special case.
 *
 * @param inquirer - Interactive CLI prompt library.
 * @param name - The name of the numeral system (e.g., "Base 16").
 * @param base - The target numeral system (1 to 64).
 * @param callback - Function to restart the string conversion process.
 * @param main - Callback to return to the main menu.
 * @param typewriterEffect - Function for a typing effect.
 * @param fadeOutEffect - Function for a fade-out animation effect.
 */
function stringToBase(
  inquirer,
  name,
  base,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'stringInput',
        message: `Enter the string to convert to ${name}:`,
      },
    ])
    .then((answers) => {
      const inputString = answers.stringInput.trim()
      // Maximum width for zero-padding, calculated based on the target base.
      const maxWidth =
        base > 1 ? Math.ceil(Math.log2(256) / Math.log2(base)) : 0
      const result = Array.from(inputString)
        .map((char) => {
          const charCode = char.charCodeAt(0)
          return toCustomBase(charCode, base).padStart(maxWidth, '0')
        })
        .join(' ')
      console.log(`Converted to ${name}: ${result}`)
      askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
    })
    .catch((error) => {
      console.error(`Error during conversion to ${name}:`, error.message)
    })
}
/**
 * Prompts the user for the next action after a successful conversion.
 *
 * @param inquirer - Interactive CLI prompt library.
 * @param callback - Function to restart the string conversion process.
 * @param main - Callback to return to the main menu.
 * @param typewriterEffect - Function for a typing effect.
 * @param fadeOutEffect - Function for a fade-out animation effect.
 */
function askNextAction(
  inquirer,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'nextAction',
        message: 'What would you like to do next?',
        choices: [
          'Convert another string.',
          'Return to Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then((answers) =>
      __awaiter(this, void 0, void 0, function* () {
        switch (answers.nextAction) {
          case 'Convert another string.':
            callback()
            break
          case 'Return to Main Menu.':
            console.log('Returning to the main menu...')
            main()
            break
          case 'Exit the application.':
            yield typewriterEffect('Thanks for using the app. Goodbye!', 50)
            yield fadeOutEffect('Closing the application...', 10, 100)
            process.exit(0)
        }
      })
    )
    .catch((error) => {
      console.error('Error while deciding the next step:', error.message)
    })
}
