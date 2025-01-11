/**
 * Duodecimal Conversion Module
 *
 * This module helps users convert duodecimal data into different formats,
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
  ...Array.from({ length: 53 }, (_, i) => `Base ${i + 13}`), // Adjusted for Base 13+
]
/**
 * Start the duodecimal conversion process.
 *
 * Displays a menu where users can choose to convert duodecimal data into text
 * or a numeral system. Handles user input and guides them through the steps.
 */
export function duodecimalConverter(
  inquirer,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const startDuodecimalConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message: 'What format do you want to convert the duodecimal data to?',
          choices: choices,
        },
      ])
      .then((answers) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            duodecimalToString(
              inquirer,
              startDuodecimalConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              duodecimalToBase(
                inquirer,
                `Base ${base}`,
                base,
                startDuodecimalConversion,
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
                startDuodecimalConversion,
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
  startDuodecimalConversion()
}
/**
 * Convert duodecimal data into text.
 *
 * Asks the user to provide duodecimal data, validates it, and converts it
 * into readable text (ASCII characters).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the duodecimal conversion process.
 * @param main - Function to return to the main menu.
 */
function duodecimalToString(
  inquirer,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptDuodecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'duodecimalInput',
          message: 'Enter the duodecimal data (separate groups with spaces):',
        },
      ])
      .then((answers) => {
        const duodecimalArray = answers.duodecimalInput.trim().split(' ')
        // Validate if all inputs are valid duodecimal numbers (0-9 and A-B for 10-11).
        if (!duodecimalArray.every((num) => /^[0-9A-B]+$/.test(num))) {
          console.log(
            'Invalid input. Please enter duodecimal numbers (0-9 and A-B).'
          )
          return promptDuodecimalInput()
        }
        // Convert duodecimal numbers to text.
        const result = duodecimalArray
          .map((num) => String.fromCharCode(parseInt(num, 12)))
          .join('')
        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error('Error during conversion to text:', error)
      })
  }
  promptDuodecimalInput()
}
/**
 * Convert duodecimal data into a different numeral system.
 *
 * Asks the user to provide duodecimal data, validates it, and converts it into
 * the specified numeral system (e.g., Base 13, Base 16, etc.).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param name - The name of the numeral system (e.g., "Base 13").
 * @param base - The numeral system's base (e.g., 13 for Base 13).
 * @param callback - Function to restart the duodecimal conversion process.
 * @param main - Function to return to the main menu.
 */
function duodecimalToBase(
  inquirer,
  name,
  base,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptDuodecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'duodecimalInput',
          message: `Enter the duodecimal data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers) => {
        const duodecimalArray = answers.duodecimalInput.trim().split(' ')
        // Validate if all inputs are valid duodecimal numbers (0-9 and A-B for 10-11).
        if (!duodecimalArray.every((num) => /^[0-9A-B]+$/.test(num))) {
          console.log(
            'Invalid input. Please enter duodecimal numbers (0-9 and A-B).'
          )
          return promptDuodecimalInput()
        }
        // Convert duodecimal numbers to the specified base.
        const result = duodecimalArray
          .map((num) => parseInt(num, 12).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }
  promptDuodecimalInput()
}
/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * Provides options to convert again, go back to the main menu, or quit the app.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the duodecimal conversion process.
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
          'Convert duodecimal data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then((answers) =>
      __awaiter(this, void 0, void 0, function* () {
        switch (answers.nextAction) {
          case 'Convert duodecimal data again.':
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
