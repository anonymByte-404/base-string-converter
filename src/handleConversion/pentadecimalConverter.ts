/**
 * Pentadecimal Conversion Module
 *
 * This module helps users convert pentadecimal data into different formats,
 * like text (strings) or other numeral systems.
 * It uses a simple menu to guide users through the conversion process.
 */

const choices: string[] = [
  'String',
  ...Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`).filter(
    (base: string) => base !== 'Base 15'
  ),
]

/**
 * Start the pentadecimal conversion process.
 *
 * Displays a menu where users can choose to convert pentadecimal data into text
 * or a numeral system. Handles user input and guides them through the steps.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
 */
export function pentadecimalConverter(
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const startPentadecimalConversion = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message:
            'What format do you want to convert the pentadecimal data to?',
          choices: choices,
        },
      ])
      .then((answers: { selectedConversionBase: string }) => {
        switch (answers.selectedConversionBase) {
          case 'String':
            pentadecimalToString(
              inquirer,
              startPentadecimalConversion,
              main,
              typewriterEffect,
              fadeOutEffect
            )
            break
          default: {
            const match = answers.selectedConversionBase.match(/Base (\d+)/)
            if (match) {
              const base = parseInt(match[1], 10)
              pentadecimalToBase(
                inquirer,
                `Base ${base}`,
                base,
                startPentadecimalConversion,
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
                startPentadecimalConversion,
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

  startPentadecimalConversion()
}

/**
 * Convert pentadecimal data into text.
 *
 * Asks the user to provide pentadecimal data, validates it, and converts it
 * into readable text (ASCII characters).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the pentadecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
 */
function pentadecimalToString(
  inquirer: any,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptPentadecimalInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'pentadecimalInput',
          message: 'Enter the pentadecimal data (separate groups with spaces):',
        },
      ])
      .then((answers: { pentadecimalInput: string }) => {
        const pentadecimalArray = answers.pentadecimalInput.trim().split(' ')

        // Validate if all inputs are valid pentadecimal numbers (0-9 and A-E for 10-14).
        if (!pentadecimalArray.every((num) => /^[0-9A-E]+$/.test(num))) {
          console.log(
            'Invalid input. Please enter pentadecimal numbers (0-9 and A-E).'
          )
          return promptPentadecimalInput()
        }

        // Convert pentadecimal numbers to text.
        const result = pentadecimalArray
          .map((num) => String.fromCharCode(parseInt(num, 15)))
          .join('')
        console.log(`Here is your text: "${result}"`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error('Error during conversion to text:', error)
      })
  }

  promptPentadecimalInput()
}

/**
 * Convert pentadecimal data into a different numeral system.
 *
 * Asks the user to provide pentadecimal data, validates it, and converts it into
 * the specified numeral system (e.g., Base 16, Base 17, etc.).
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param name - A string describing the base format (e.g., "Base 16").
 * @param base - The numeric base to convert the pentadecimal data into.
 * @param callback - Function to restart the pentadecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
 */
function pentadecimalToBase(
  inquirer: any,
  name: string,
  base: number,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptPentadecimalInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'pentadecimalInput',
          message: `Enter the pentadecimal data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers: { pentadecimalInput: string }) => {
        const pentadecimalArray = answers.pentadecimalInput.trim().split(' ')

        // Validate if all inputs are valid pentadecimal numbers (0-9 and A-E for 10-14).
        if (!pentadecimalArray.every((num) => /^[0-9A-E]+$/.test(num))) {
          console.log(
            'Invalid input. Please enter pentadecimal numbers (0-9 and A-E).'
          )
          return promptPentadecimalInput()
        }

        // Convert pentadecimal numbers to the specified base.
        const result = pentadecimalArray
          .map((num) => parseInt(num, 15).toString(base))
          .join(' ')
        console.log(`Here is your converted data in ${name}: ${result}`)
        askNextAction(inquirer, callback, main, typewriterEffect, fadeOutEffect)
      })
      .catch((error: unknown) => {
        console.error(`Error during conversion to ${name}:`, error)
      })
  }

  promptPentadecimalInput()
}

/**
 * Ask the user what they want to do next after completing a conversion.
 *
 * Provides options to convert again, go back to the main menu, or quit the app.
 *
 * @param inquirer - The library for interactive menus and prompts.
 * @param callback - Function to restart the pentadecimal conversion process.
 * @param main - Function to return to the main menu.
 * @param typewriterEffect - Function to display text with a typewriter effect.
 * @param fadeOutEffect - Function to fade out text with animation.
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
          'Convert pentadecimal data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then(async (answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert pentadecimal data again.':
          callback()
          break
        case 'Go back to the Main Menu.':
          console.log('Returning to the Main Menu...')
          main()
          break
        case 'Exit the application.':
          await typewriterEffect('Thanks for using the app. Goodbye!', 50)
          await fadeOutEffect('Closing the application...', 10, 100)
          process.exit(0) // Exit the app
      }
    })
    .catch((error: unknown) => {
      console.error('Error while deciding the next action:', error)
    })
}
