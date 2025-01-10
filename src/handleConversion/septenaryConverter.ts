/**
 * Septenary Conversion Module
 *
 * This module helps users convert septenary data into different formats,
 * like text (strings) or numeral systems (Base 7 to Base 64).
 * It uses a simple menu to guide users through the conversion process.
 */

const choices = [
  'String',
  ...Array.from({ length: 58 }, (_, i) => `Base ${i + 7}`), // Adjusted for Base 7
]

/**
 * Start the septenary conversion process.
 *
 * Displays a menu where users can choose to convert septenary data into text
 * or a numeral system. Handles user input and guides them through the steps.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function for text typing animation.
 * @param fadeOutEffect - Function for text fade-out animation.
 */
export function septenaryConverter(
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const startSeptenaryConversion = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message: 'What format do you want to convert the septenary data to?',
          choices: choices,
        },
      ])
      .then((answers: { selectedConversionBase: string }) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            septenaryToString(
              inquirer,
              startSeptenaryConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              septenaryToBase(
                inquirer,
                `Base ${base}`,
                base,
                startSeptenaryConversion,
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
                startSeptenaryConversion,
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

  startSeptenaryConversion()
}

/**
 * Convert septenary data into text.
 *
 * Asks the user to provide septenary data, validates it, and converts it
 * into readable text (ASCII characters).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the septenary conversion process.
 * @param main - Function to return to the main menu.
 */
function septenaryToString(
  inquirer: any,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptSeptenaryInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'septenaryInput',
          message: 'Enter the septenary data (separate groups with spaces):',
        },
      ])
      .then((answers: { septenaryInput: string }) => {
        const septenaryArray = answers.septenaryInput.trim().split(' ')

        // Check if all inputs are valid septenary numbers (0-6).
        if (!septenaryArray.every((sen) => /^[0-6]+$/.test(sen))) {
          console.log(
            'Invalid input. Please enter septenary numbers (only 0-6).'
          )
          return promptSeptenaryInput()
        }

        // Convert septenary numbers to text.
        const result = septenaryArray
          .map((sen) => String.fromCharCode(parseInt(sen, 7)))
          .join('')
        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error('Error during conversion to text:', error)
      })
  }

  promptSeptenaryInput()
}

/**
 * Convert septenary data into a different numeral system.
 *
 * Asks the user to provide septenary data, validates it, and converts it into
 * the specified numeral system (e.g., Base 7, Base 16, etc.).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param name - The name of the numeral system (e.g., "Base 7").
 * @param base - The numeral system's base (e.g., 7 for Base 7).
 * @param callback - Function to restart the septenary conversion process.
 * @param main - Function to return to the main menu.
 */
function septenaryToBase(
  inquirer: any,
  name: string,
  base: number,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptSeptenaryInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'septenaryInput',
          message: `Enter the septenary data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers: { septenaryInput: string }) => {
        const septenaryArray = answers.septenaryInput.trim().split(' ')

        // Check if all inputs are valid septenary numbers (0-6).
        if (!septenaryArray.every((sen) => /^[0-6]+$/.test(sen))) {
          console.log(
            'Invalid input. Please enter septenary numbers (only 0-6).'
          )
          return promptSeptenaryInput()
        }

        // Convert septenary numbers to the specified base.
        const result = septenaryArray
          .map((sen) => parseInt(sen, 7).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }

  promptSeptenaryInput()
}

/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * Provides options to convert again, go back to the main menu, or quit the app.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the septenary conversion process.
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
          'Convert septenary data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then(async (answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert septenary data again.':
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
