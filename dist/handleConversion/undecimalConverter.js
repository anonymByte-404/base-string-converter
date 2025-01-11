/**
 * Undecimal Conversion Module
 *
 * This module helps users convert undecimal data into different formats,
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
  ...Array.from({ length: 54 }, (_, i) => `Base ${i + 12}`), // Adjusted for Base 12+
]
/**
 * Start the undecimal conversion process.
 *
 * Displays a menu where users can choose to convert undecimal data into text
 * or a numeral system. Handles user input and guides them through the steps.
 */
export function undecimalConverter(
  inquirer,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const startUndecimalConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message: 'What format do you want to convert the undecimal data to?',
          choices: choices,
        },
      ])
      .then((answers) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            undecimalToString(
              inquirer,
              startUndecimalConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              undecimalToBase(
                inquirer,
                `Base ${base}`,
                base,
                startUndecimalConversion,
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
                startUndecimalConversion,
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
  startUndecimalConversion()
}
/**
 * Convert undecimal data into text.
 *
 * Asks the user to provide undecimal data, validates it, and converts it
 * into readable text (ASCII characters).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the undecimal conversion process.
 * @param main - Function to return to the main menu.
 */
function undecimalToString(
  inquirer,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptUndecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'undecimalInput',
          message: 'Enter the undecimal data (separate groups with spaces):',
        },
      ])
      .then((answers) => {
        const undecimalArray = answers.undecimalInput.trim().split(' ')
        // Validate if all inputs are valid undecimal numbers (0-10).
        if (!undecimalArray.every((num) => /^[0-9A]+$/.test(num))) {
          console.log('Invalid input. Please enter undecimal numbers (0-10).')
          return promptUndecimalInput()
        }
        // Convert undecimal numbers to text.
        const result = undecimalArray
          .map((num) => String.fromCharCode(parseInt(num, 11)))
          .join('')
        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error('Error during conversion to text:', error)
      })
  }
  promptUndecimalInput()
}
/**
 * Convert undecimal data into a different numeral system.
 *
 * Asks the user to provide undecimal data, validates it, and converts it into
 * the specified numeral system (e.g., Base 12, Base 16, etc.).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param name - The name of the numeral system (e.g., "Base 12").
 * @param base - The numeral system's base (e.g., 12 for Base 12).
 * @param callback - Function to restart the undecimal conversion process.
 * @param main - Function to return to the main menu.
 */
function undecimalToBase(
  inquirer,
  name,
  base,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptUndecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'undecimalInput',
          message: `Enter the undecimal data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers) => {
        const undecimalArray = answers.undecimalInput.trim().split(' ')
        // Validate if all inputs are valid undecimal numbers (0-10).
        if (!undecimalArray.every((num) => /^[0-9A]+$/.test(num))) {
          console.log('Invalid input. Please enter undecimal numbers (0-10).')
          return promptUndecimalInput()
        }
        // Convert undecimal numbers to the specified base.
        const result = undecimalArray
          .map((num) => parseInt(num, 11).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }
  promptUndecimalInput()
}
/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * Provides options to convert again, go back to the main menu, or quit the app.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the undecimal conversion process.
 * @param main - Function to return to the main menu.
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
          'Convert undecimal data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then((answers) =>
      __awaiter(this, void 0, void 0, function* () {
        switch (answers.nextAction) {
          case 'Convert undecimal data again.':
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
