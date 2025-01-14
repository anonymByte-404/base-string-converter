/**
 * Tetradecimal Conversion Module
 *
 * This module helps users convert tetradecimal data into different formats,
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
    (base) => base !== 'Base 14'
  ),
]
/**
 * Start the tetradecimal conversion process.
 *
 * Displays a menu where users can choose to convert tetradecimal data into text
 * or a numeral system. Handles user input and guides them through the steps.
 *
 * @param inquirer - Library for interactive menus and prompts.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for typewriter animation.
 * @param fadeOutEffect - Function for fade-out animation.
 */
export function tetradecimalConverter(
  inquirer,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const startTetradecimalConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message:
            'What format do you want to convert the tetradecimal data to?',
          choices: choices,
        },
      ])
      .then((answers) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            tetradecimalToString(
              inquirer,
              startTetradecimalConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              tetradecimalToBase(
                inquirer,
                `Base ${base}`,
                base,
                startTetradecimalConversion,
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
                startTetradecimalConversion,
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
  startTetradecimalConversion()
}
/**
 * Convert tetradecimal data into text.
 *
 * Asks the user to provide tetradecimal data, validates it, and converts it
 * into readable text (ASCII characters).
 *
 * @param inquirer - Library for interactive menus and prompts.
 * @param callback - Function to restart the tetradecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for typewriter animation.
 * @param fadeOutEffect - Function for fade-out animation.
 */
function tetradecimalToString(
  inquirer,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptTetradecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'tetradecimalInput',
          message: 'Enter the tetradecimal data (separate groups with spaces):',
        },
      ])
      .then((answers) => {
        const tetradecimalArray = answers.tetradecimalInput.trim().split(' ')
        if (!tetradecimalArray.every((num) => /^[0-9A-D]+$/.test(num))) {
          console.log(
            'Invalid input. Please enter tetradecimal numbers (0-9 and A-D).'
          )
          return promptTetradecimalInput()
        }
        const result = tetradecimalArray
          .map((num) => String.fromCharCode(parseInt(num, 14)))
          .join('')
        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error('Error during conversion to text:', error)
      })
  }
  promptTetradecimalInput()
}
/**
 * Convert tetradecimal data into a different numeral system.
 *
 * @param inquirer - Library for interactive menus and prompts.
 * @param name - The name of the target numeral system (e.g., "Base 15").
 * @param base - The base of the target numeral system.
 * @param callback - Function to restart the tetradecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for typewriter animation.
 * @param fadeOutEffect - Function for fade-out animation.
 */
function tetradecimalToBase(
  inquirer,
  name,
  base,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptTetradecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'tetradecimalInput',
          message: `Enter the tetradecimal data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers) => {
        const tetradecimalArray = answers.tetradecimalInput.trim().split(' ')
        if (!tetradecimalArray.every((num) => /^[0-9A-D]+$/.test(num))) {
          console.log(
            'Invalid input. Please enter tetradecimal numbers (0-9 and A-D).'
          )
          return promptTetradecimalInput()
        }
        const result = tetradecimalArray
          .map((num) => parseInt(num, 14).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }
  promptTetradecimalInput()
}
/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * @param inquirer - Library for interactive menus and prompts.
 * @param callback - Function to restart the current conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for typewriter animation.
 * @param fadeOutEffect - Function for fade-out animation.
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
          'Convert tetradecimal data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then((answers) =>
      __awaiter(this, void 0, void 0, function* () {
        switch (answers.nextAction) {
          case 'Convert tetradecimal data again.':
            callback()
            break
          case 'Go back to the Main Menu.':
            console.log('Returning to the Main Menu...')
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
      console.error('Error while deciding the next action:', error)
    })
}
