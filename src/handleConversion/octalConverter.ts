/**
 * Octal Conversion Module
 *
 * This module helps users convert octal data into different formats,
 * like text (strings) or numeral systems (Base 8 to Base 64).
 * It uses a simple menu to guide users through the conversion process.
 */

const choices = [
  'String',
  ...Array.from({ length: 57 }, (_, i) => `Base ${i + 8}`), // Adjusted for Base 8
]

/**
 * Start the octal conversion process.
 *
 * Displays a menu where users can choose to convert octal data into text
 * or a numeral system. Handles user input and guides them through the steps.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for text typing animation.
 * @param fadeOutEffect - Function for text fade-out animation.
 */
export function octalConverter(
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const startOctalConversion = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message: 'What format do you want to convert the octal data to?',
          choices: choices,
        },
      ])
      .then((answers: { selectedConversionBase: string }) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            octalToString(
              inquirer,
              startOctalConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              octalToBase(
                inquirer,
                `Base ${base}`,
                base,
                startOctalConversion,
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
                startOctalConversion,
                main,
                typewriterEffect,
                fadeOutEffect
              )
            }
          }
        }
      })
      .catch((error: unknown) => {
        console.error(
          'Something went wrong while selecting a conversion option:',
          error
        )
      })
  }

  startOctalConversion()
}

/**
 * Convert octal data into text.
 *
 * Asks the user to provide octal data, validates it, and converts it
 * into readable text (ASCII characters).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the octal conversion process.
 * @param main - Function to return to the main menu.
 */
function octalToString(
  inquirer: any,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptOctalInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'octalInput',
          message: 'Enter the octal data (separate groups with spaces):',
        },
      ])
      .then((answers: { octalInput: string }) => {
        const octalArray = answers.octalInput.trim().split(' ')

        // Check if all inputs are valid octal numbers (0-7).
        if (!octalArray.every((oct) => /^[0-7]+$/.test(oct))) {
          console.log('Invalid input. Please enter octal numbers (only 0-7).')
          return promptOctalInput()
        }

        // Convert octal numbers to text.
        const result = octalArray
          .map((oct) => String.fromCharCode(parseInt(oct, 8)))
          .join('')
        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error('Error during conversion to text:', error)
      })
  }

  promptOctalInput()
}

/**
 * Convert octal data into a different numeral system.
 *
 * Asks the user to provide octal data, validates it, and converts it into
 * the specified numeral system (e.g., Base 8, Base 16, etc.).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param name - The name of the numeral system (e.g., "Base 8").
 * @param base - The numeral system's base (e.g., 8 for Base 8).
 * @param callback - Function to restart the octal conversion process.
 * @param main - Function to return to the main menu.
 */
function octalToBase(
  inquirer: any,
  name: string,
  base: number,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptOctalInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'octalInput',
          message: `Enter the octal data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers: { octalInput: string }) => {
        const octalArray = answers.octalInput.trim().split(' ')

        // Check if all inputs are valid octal numbers (0-7).
        if (!octalArray.every((oct) => /^[0-7]+$/.test(oct))) {
          console.log('Invalid input. Please enter octal numbers (only 0-7).')
          return promptOctalInput()
        }

        // Convert octal numbers to the specified base.
        const result = octalArray
          .map((oct) => parseInt(oct, 8).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }

  promptOctalInput()
}

/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * Provides options to convert again, go back to the main menu, or quit the app.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the octal conversion process.
 * @param main - Function to return to the main menu.
 */
function askNextAction(
  inquirer: any,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'nextAction',
        message: 'What would you like to do next?',
        choices: [
          'Convert octal data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then(async (answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert octal data again.':
          callback()
          break
        case 'Go back to the Main Menu.':
          console.log('Returning to the Main Menu...')
          main()
          break
        case 'Exit the application.':
          // Typing animation. You can adjust the delay (default: 50ms) for faster/slower typing.
          await typewriterEffect('Thanks for using the app. Goodbye!', 50)
          // Fade-out animation. You can adjust the fade steps (default: 10) and delay (default: 100ms) for different effects.
          await fadeOutEffect('Closing the application...', 10, 100)
          process.exit(0) // Exit the app
      }
    })
    .catch((error: unknown) => {
      console.error('Error while deciding the next action:', error)
    })
}
