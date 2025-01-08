/**
 * Ternary Conversion Module
 *
 * This module allows users to convert ternary data into various numeral systems
 * or plain text. Includes an intuitive interface for conversion options.
 */
const choices = [
  'String',
  'Base 2',
  ...Array.from({ length: 61 }, (_, i) => `Base ${i + 4}`),
]
/**
 * Starts the ternary conversion process.
 *
 * @param inquirer - Library for interactive CLI prompts.
 * @param main - Callback function to return to the main menu.
 */
export function ternaryConverter(inquirer, main) {
  const startTernaryConversion = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message: 'Select the target base for conversion:',
          choices,
        },
      ])
      .then((answers) => {
        const { selectedConversionBase } = answers
        if (selectedConversionBase === 'String') {
          return ternaryToString(inquirer, startTernaryConversion, main)
        }
        const match = selectedConversionBase.match(/Base (\d+)/)
        if (match) {
          const base = parseInt(match[1], 10)
          return ternaryToBase(
            inquirer,
            `Base ${base}`,
            base,
            startTernaryConversion,
            main
          )
        }
        console.log('Unsupported base. Please select another option.')
        askNextAction(inquirer, startTernaryConversion, main)
      })
      .catch((error) => {
        console.error('Error during base selection:', error)
      })
  }
  startTernaryConversion()
}
/**
 * Validates and converts ternary data to a string.
 *
 * @param inquirer - Library for interactive CLI prompts.
 * @param callback - Function to restart the ternary conversion process.
 * @param main - Callback function to return to the main menu.
 */
function ternaryToString(inquirer, callback, main) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'ternaryInput',
        message:
          'Enter ternary data (space-separated groups of 0, 1, 2) to convert to text:',
        validate: validateTernaryInput,
      },
    ])
    .then((answers) => {
      const ternaryArray = answers.ternaryInput.trim().split(' ')
      const result = ternaryArray
        .map((ter) => String.fromCharCode(parseInt(ter, 3)))
        .join('')
      console.log(`Converted String: "${result}"`)
      askNextAction(inquirer, callback, main)
    })
    .catch((error) => {
      console.error('Error during ternary-to-string conversion:', error)
    })
}
/**
 * Converts ternary data to a specified numeral system.
 *
 * @param inquirer - Library for interactive CLI prompts.
 * @param name - Name of the target numeral system.
 * @param base - Base of the numeral system.
 * @param callback - Function to restart the ternary conversion process.
 * @param main - Callback function to return to the main menu.
 */
function ternaryToBase(inquirer, name, base, callback, main) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'ternaryInput',
        message: `Enter ternary data (space-separated groups of 0, 1, 2) to convert to ${name}:`,
        validate: validateTernaryInput,
      },
    ])
    .then((answers) => {
      const ternaryArray = answers.ternaryInput.trim().split(' ')
      const result = ternaryArray
        .map((ter) => parseInt(ter, 3).toString(base))
        .join(' ')
      console.log(`Converted to ${name}: ${result}`)
      askNextAction(inquirer, callback, main)
    })
    .catch((error) => {
      console.error(`Error during ternary-to-${name} conversion:`, error)
    })
}
/**
 * Validates ternary input.
 *
 * @param input - User-provided ternary data.
 * @returns True if valid, or an error message if invalid.
 */
function validateTernaryInput(input) {
  const ternaryArray = input.trim().split(' ')
  const isValid = ternaryArray.every((ter) => /^[0-2]+$/.test(ter))
  return isValid
    ? true
    : 'Invalid input. Ensure each group contains only 0s, 1s, or 2s, separated by spaces.'
}
/**
 * Handles the user's next action after a conversion.
 *
 * @param inquirer - Library for interactive CLI prompts.
 * @param callback - Function to restart the ternary conversion process.
 * @param main - Callback function to return to the main menu.
 */
function askNextAction(inquirer, callback, main) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'nextAction',
        message: 'What would you like to do next?',
        choices: [
          'Convert another ternary data.',
          'Return to Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.nextAction) {
        case 'Convert another ternary data.':
          callback()
          break
        case 'Return to Main Menu.':
          console.log('Returning to the main menu...')
          main()
          break
        case 'Exit the application.':
          console.log('Thank you for using the application. Goodbye!')
          process.exit(0)
      }
    })
    .catch((error) => {
      console.error('Error while handling next action:', error)
    })
}
