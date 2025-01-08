/**
 * String Conversion Module
 *
 * This module helps convert strings into various numeral systems
 * (e.g., binary, hexadecimal). It guides users through an interactive
 * menu to select their desired conversion format and processes the input accordingly.
 */

/**
 * Starts the string conversion process by providing a list of numeral systems.
 *
 * @param inquirer - The library used for interactive CLI prompts.
 * @param baseChoices - List of numeral systems (e.g., "Base 2", "Base 16").
 * @param main - Callback to return to the main menu.
 */
export function stringConverter(
  inquirer: any,
  baseChoices: string[],
  main: () => void
): void {
  const startStringConversion = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedBase',
          message: 'Select the base to convert your string to:',
          choices: baseChoices,
        },
      ])
      .then((answers: { selectedBase: string }) => {
        const match = answers.selectedBase.match(/Base (\d+)/)

        if (match) {
          const base = parseInt(match[1], 10)
          stringToBase(
            inquirer,
            `Base ${base}`,
            base,
            startStringConversion,
            main
          )
        } else {
          console.log('Unsupported base. Please try another option.')
          askNextAction(inquirer, startStringConversion, main)
        }
      })
      .catch((error: unknown) => {
        console.error('Error during base selection:', error)
      })
  }

  startStringConversion()
}

/**
 * Converts a string to a specified numeral system.
 *
 * Each character in the string is converted to its ASCII value, then
 * represented in the target numeral system with appropriate padding.
 *
 * @param inquirer - The library used for interactive CLI prompts.
 * @param name - Name of the numeral system (e.g., "Base 16").
 * @param base - The target numeral system (e.g., 16 for Base 16).
 * @param callback - Function to restart the string conversion process.
 * @param main - Callback to return to the main menu.
 */
function stringToBase(
  inquirer: any,
  name: string,
  base: number,
  callback: () => void,
  main: () => void
): void {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'stringInput',
        message: `Enter the string to convert to ${name}:`,
      },
    ])
    .then((answers: { stringInput: string }) => {
      const inputString = answers.stringInput.trim()

      // Determine the maximum width for padding based on the base
      const maxWidth = Math.ceil(Math.log2(256) / Math.log2(base))

      // Convert each character to its ASCII representation in the target base
      const result = Array.from(inputString)
        .map((char) =>
          char.charCodeAt(0).toString(base).padStart(maxWidth, '0')
        )
        .join(' ')

      console.log(`Converted to ${name}: ${result}`)
      askNextAction(inquirer, callback, main)
    })
    .catch((error: unknown) => {
      console.error(`Error during conversion to ${name}:`, error)
    })
}

/**
 * Handles the user's next steps after completing a conversion.
 *
 * Provides options to convert another string, return to the main menu, or exit.
 *
 * @param inquirer - The library used for interactive CLI prompts.
 * @param callback - Function to restart the string conversion process.
 * @param main - Callback to return to the main menu.
 */
function askNextAction(
  inquirer: any,
  callback: () => void,
  main: () => void
): void {
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
    .then((answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert another string.':
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
    .catch((error: unknown) => {
      console.error('Error while deciding the next step:', error)
    })
}
