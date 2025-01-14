/**
 * Quaternary Conversion Module
 *
 * This module helps users convert quaternary data into different formats,
 * like text (strings) or numeral systems (Base 5 to Base 64).
 * It uses a simple menu to guide users through the conversion process.
 */

const choices: string[] = [
  'String',
  ...Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`).filter(
    (base: string) => base !== 'Base 4'
  ),
]

/**
 * Start the quaternary conversion process.
 *
 * Displays a menu where users can choose to convert quaternary data into text
 * or a numeral system. Handles user input and guides them through the steps.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for text typing animation.
 * @param fadeOutEffect - Function for text fade-out animation.
 */
export function quaternaryConverter(
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const startQuaternaryConversion = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message: 'What format do you want to convert the quaternary data to?',
          choices: choices,
        },
      ])
      .then((answers: { selectedConversionBase: string }) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            quaternaryToString(
              inquirer,
              startQuaternaryConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              quaternaryToBase(
                inquirer,
                `Base ${base}`,
                base,
                startQuaternaryConversion,
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
                startQuaternaryConversion,
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

  startQuaternaryConversion()
}

/**
 * Convert quaternary data into text.
 *
 * Asks the user to provide quaternary data, validates it, and converts it
 * into readable text (ASCII characters).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the quaternary conversion process.
 * @param main - Function to return to the main menu.
 */
function quaternaryToString(
  inquirer: any,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptQuaternaryInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'quaternaryInput',
          message: 'Enter the quaternary data (separate groups with spaces):',
        },
      ])
      .then((answers: { quaternaryInput: string }) => {
        const quaternaryArray = answers.quaternaryInput.trim().split(' ')

        // Check if all inputs are valid quaternary numbers (0-3).
        if (!quaternaryArray.every((quad) => /^[0-3]+$/.test(quad))) {
          console.log(
            'Invalid input. Please enter quaternary numbers (only 0-3).'
          )
          return promptQuaternaryInput()
        }

        // Convert quaternary numbers to text.
        const result = quaternaryArray
          .map((quad) => String.fromCharCode(parseInt(quad, 4)))
          .join('')

        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error('Error during conversion to text:', error)
      })
  }

  promptQuaternaryInput()
}

/**
 * Convert quaternary data into a different numeral system.
 *
 * Asks the user to provide quaternary data, validates it, and converts it into
 * the specified numeral system (e.g., Base 5, Base 16, etc.).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param name - The name of the numeral system (e.g., "Base 5").
 * @param base - The numeral system's base (e.g., 5 for Base 5).
 * @param callback - Function to restart the quaternary conversion process.
 * @param main - Function to return to the main menu.
 */
function quaternaryToBase(
  inquirer: any,
  name: string,
  base: number,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptQuaternaryInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'quaternaryInput',
          message: `Enter the quaternary data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers: { quaternaryInput: string }) => {
        const quaternaryArray = answers.quaternaryInput.trim().split(' ')

        // Check if all inputs are valid quaternary numbers (0-3).
        if (!quaternaryArray.every((quad) => /^[0-3]+$/.test(quad))) {
          console.log(
            'Invalid input. Please enter quaternary numbers (only 0-3).'
          )
          return promptQuaternaryInput()
        }

        // Convert quaternary numbers to the specified base.
        const result = quaternaryArray
          .map((quad) => parseInt(quad, 4).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }

  promptQuaternaryInput()
}

/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * Provides options to convert again, go back to the main menu, or quit the app.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the quaternary conversion process.
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
          'Convert quaternary data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then(async (answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert quaternary data again.':
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
