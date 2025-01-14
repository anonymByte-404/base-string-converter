/**
 * Hexadecimal Conversion Module
 *
 * This module helps users convert hexadecimal data into different formats,
 * like text (strings) or other numeral systems.
 * It uses a simple menu to guide users through the conversion process.
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
const choices = [
  'String',
  ...Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`).filter(
    (base) => base !== 'Base 16'
  ),
]
/**
 * Start the hexadecimal conversion process.
 *
 * Displays a menu where users can choose to convert hexadecimal data into text
 * or a numeral system. Handles user input and guides them through the steps.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
 */
export function hexadecimalConverter(
  inquirer,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const startHexadecimalConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message:
            'What format do you want to convert the hexadecimal data to?',
          choices: choices,
        },
      ])
      .then((answers) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            hexadecimalToString(
              inquirer,
              startHexadecimalConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              hexadecimalToBase(
                inquirer,
                `Base ${base}`,
                base,
                startHexadecimalConversion,
                main,
                typewriterEffect,
                fadeOutEffect
              )
            } else {
              console.log(
                `Sorry, conversions for this format are not available yet.`
              )
              askNextAction(
                inquirer,
                startHexadecimalConversion,
                main,
                typewriterEffect,
                fadeOutEffect
              )
            }
          }
        }
      })
      .catch((error) => {
        console.error(
          'Something went wrong while selecting a conversion option:',
          error
        )
      })
  }
  startHexadecimalConversion()
}
/**
 * Convert hexadecimal data into text.
 *
 * Asks the user to provide hexadecimal data, validates it, and converts it
 * into readable text (ASCII characters).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the hexadecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
 */
function hexadecimalToString(
  inquirer,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptHexadecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'hexadecimalInput',
          message: 'Enter the hexadecimal data (separate groups with spaces):',
        },
      ])
      .then((answers) => {
        const hexadecimalArray = answers.hexadecimalInput.trim().split(' ')
        // Validate if all inputs are valid hexadecimal numbers (0-9 and A-F for 10-15).
        if (!hexadecimalArray.every((num) => /^[0-9A-F]+$/i.test(num))) {
          console.log(
            'Invalid input. Please enter hexadecimal numbers (0-9 and A-F).'
          )
          return promptHexadecimalInput()
        }
        // Convert hexadecimal numbers to text.
        const result = hexadecimalArray
          .map((num) => String.fromCharCode(parseInt(num, 16)))
          .join('')
        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error('Error during conversion to text:', error)
      })
  }
  promptHexadecimalInput()
}
/**
 * Convert hexadecimal data into a different numeral system.
 *
 * Asks the user to provide hexadecimal data, validates it, and converts it into
 * the specified numeral system (e.g., Base 2, Base 8, Base 10, etc.).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param name - A string describing the base format (e.g., "Base 16").
 * @param base - The numeric base to convert the hexadecimal data into.
 * @param callback - Function to restart the hexadecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
 */
function hexadecimalToBase(
  inquirer,
  name,
  base,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptHexadecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'hexadecimalInput',
          message: `Enter the hexadecimal data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers) => {
        const hexadecimalArray = answers.hexadecimalInput.trim().split(' ')
        // Validate if all inputs are valid hexadecimal numbers (0-9 and A-F for 10-15).
        if (!hexadecimalArray.every((num) => /^[0-9A-F]+$/i.test(num))) {
          console.log(
            'Invalid input. Please enter hexadecimal numbers (0-9 and A-F).'
          )
          return promptHexadecimalInput()
        }
        // Convert hexadecimal numbers to the specified base.
        const result = hexadecimalArray
          .map((num) => parseInt(num, 16).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }
  promptHexadecimalInput()
}
/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * Provides options to convert again, go back to the main menu, or quit the app.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the hexadecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
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
          'Convert hexadecimal data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then((answers) =>
      __awaiter(this, void 0, void 0, function* () {
        switch (answers.nextAction) {
          case 'Convert hexadecimal data again.':
            callback()
            break
          case 'Go back to the Main Menu.':
            console.log('Returning to the Main Menu...')
            main()
            break
          case 'Exit the application.':
            yield typewriterEffect('Thanks for using the app. Goodbye!', 50)
            yield fadeOutEffect('Closing the application...', 10, 100)
            process.exit(0) // Exit the app
        }
      })
    )
    .catch((error) => {
      console.error('Error while deciding the next action:', error)
    })
}
