/**
 * Tridecimal Conversion Module
 *
 * This module helps users convert tridecimal data into different formats,
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
  ...Array.from({ length: 52 }, (_, i) => `Base ${i + 14}`), // Adjusted for Base 14+
]
/**
 * Start the tridecimal conversion process.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
 */
export function tridecimalConverter(
  inquirer,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const startTridecimalConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message: 'What format do you want to convert the tridecimal data to?',
          choices: choices,
        },
      ])
      .then((answers) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            tridecimalToString(
              inquirer,
              startTridecimalConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              tridecimalToBase(
                inquirer,
                `Base ${base}`,
                base,
                startTridecimalConversion,
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
                startTridecimalConversion,
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
  startTridecimalConversion()
}
/**
 * Convert tridecimal data into text.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the tridecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
 */
function tridecimalToString(
  inquirer,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptTridecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'tridecimalInput',
          message: 'Enter the tridecimal data (separate groups with spaces):',
        },
      ])
      .then((answers) => {
        const tridecimalArray = answers.tridecimalInput.trim().split(' ')
        // Validate if all inputs are valid tridecimal numbers (0-9 and A-C for 10-12).
        if (!tridecimalArray.every((num) => /^[0-9A-C]+$/.test(num))) {
          console.log(
            'Invalid input. Please enter tridecimal numbers (0-9 and A-C).'
          )
          return promptTridecimalInput()
        }
        // Convert tridecimal numbers to text.
        const result = tridecimalArray
          .map((num) => String.fromCharCode(parseInt(num, 13)))
          .join('')
        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error('Error during conversion to text:', error)
      })
  }
  promptTridecimalInput()
}
/**
 * Convert tridecimal data into a different numeral system.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param name - The name of the numeral system for conversion.
 * @param base - The base of the target numeral system.
 * @param callback - Function to restart the tridecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
 */
function tridecimalToBase(
  inquirer,
  name,
  base,
  callback,
  main,
  typewriterEffect,
  fadeOutEffect
) {
  const promptTridecimalInput = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'tridecimalInput',
          message: `Enter the tridecimal data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers) => {
        const tridecimalArray = answers.tridecimalInput.trim().split(' ')
        // Validate if all inputs are valid tridecimal numbers (0-9 and A-C for 10-12).
        if (!tridecimalArray.every((num) => /^[0-9A-C]+$/.test(num))) {
          console.log(
            'Invalid input. Please enter tridecimal numbers (0-9 and A-C).'
          )
          return promptTridecimalInput()
        }
        // Convert tridecimal numbers to the specified base.
        const result = tridecimalArray
          .map((num) => parseInt(num, 13).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }
  promptTridecimalInput()
}
/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the tridecimal conversion process.
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
          'Convert tridecimal data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then((answers) =>
      __awaiter(this, void 0, void 0, function* () {
        switch (answers.nextAction) {
          case 'Convert tridecimal data again.':
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
