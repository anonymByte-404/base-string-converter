/**
 * Nonary Conversion Module
 *
 * This module helps users convert nonary data into different formats,
 * like text (strings) or numeral systems (Base 9 to Base 64).
 * It uses a simple menu to guide users through the conversion process.
 */

const choices = [
  'String',
  ...Array.from({ length: 56 }, (_, i) => `Base ${i + 9}`), // Adjusted for Base 9
]

/**
 * Start the nonary conversion process.
 *
 * Displays a menu where users can choose to convert nonary data into text
 * or a numeral system. Handles user input and guides them through the steps.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for text typing animation.
 * @param fadeOutEffect - Function for text fade-out animation.
 */
export function nonaryConverter(
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const startNonaryConversion = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message: 'What format do you want to convert the nonary data to?',
          choices: choices,
        },
      ])
      .then((answers: { selectedConversionBase: string }) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            nonaryToString(
              inquirer,
              startNonaryConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              nonaryToBase(
                inquirer,
                `Base ${base}`,
                base,
                startNonaryConversion,
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
                startNonaryConversion,
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

  startNonaryConversion()
}

/**
 * Convert nonary data into text.
 *
 * Asks the user to provide nonary data, validates it, and converts it
 * into readable text (ASCII characters).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the nonary conversion process.
 * @param main - Function to return to the main menu.
 */
function nonaryToString(
  inquirer: any,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptNonaryInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'nonaryInput',
          message: 'Enter the nonary data (separate groups with spaces):',
        },
      ])
      .then((answers: { nonaryInput: string }) => {
        const nonaryArray = answers.nonaryInput.trim().split(' ')

        // Check if all inputs are valid nonary numbers (0-8).
        if (!nonaryArray.every((non) => /^[0-8]+$/.test(non))) {
          console.log('Invalid input. Please enter nonary numbers (only 0-8).')
          return promptNonaryInput()
        }

        // Convert nonary numbers to text.
        const result = nonaryArray
          .map((non) => String.fromCharCode(parseInt(non, 9)))
          .join('')
        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error('Error during conversion to text:', error)
      })
  }

  promptNonaryInput()
}

/**
 * Convert nonary data into a different numeral system.
 *
 * Asks the user to provide nonary data, validates it, and converts it into
 * the specified numeral system (e.g., Base 9, Base 16, etc.).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param name - The name of the numeral system (e.g., "Base 9").
 * @param base - The numeral system's base (e.g., 9 for Base 9).
 * @param callback - Function to restart the nonary conversion process.
 * @param main - Function to return to the main menu.
 */
function nonaryToBase(
  inquirer: any,
  name: string,
  base: number,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptNonaryInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'nonaryInput',
          message: `Enter the nonary data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers: { nonaryInput: string }) => {
        const nonaryArray = answers.nonaryInput.trim().split(' ')

        // Check if all inputs are valid nonary numbers (0-8).
        if (!nonaryArray.every((non) => /^[0-8]+$/.test(non))) {
          console.log('Invalid input. Please enter nonary numbers (only 0-8).')
          return promptNonaryInput()
        }

        // Convert nonary numbers to the specified base.
        const result = nonaryArray
          .map((non) => parseInt(non, 9).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }

  promptNonaryInput()
}

/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * Provides options to convert again, go back to the main menu, or quit the app.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the nonary conversion process.
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
          'Convert nonary data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then(async (answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert nonary data again.':
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
