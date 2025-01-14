/**
 * Tridecimal Conversion Module
 *
 * This module helps users convert tridecimal data into different formats,
 * like text (strings) or other numeral systems.
 * It uses a simple menu to guide users through the conversion process.
 */

const choices: string[] = [
  'String',
  ...Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`).filter(
    (base: string) => base !== 'Base 13'
  ),
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
  inquirer: any,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const startTridecimalConversion = (): void => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedConversionBase',
          message: 'What format do you want to convert the tridecimal data to?',
          choices: choices,
        },
      ])
      .then((answers: { selectedConversionBase: string }) => {
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
      .catch((error: unknown) => {
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
  inquirer: any,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptTridecimalInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'tridecimalInput',
          message: 'Enter the tridecimal data (separate groups with spaces):',
        },
      ])
      .then((answers: { tridecimalInput: string }) => {
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
      .catch((error: unknown) => {
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
  inquirer: any,
  name: string,
  base: number,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>
): void {
  const promptTridecimalInput = (): void => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'tridecimalInput',
          message: `Enter the tridecimal data (separate groups with spaces) to convert to ${name}:`,
        },
      ])
      .then((answers: { tridecimalInput: string }) => {
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
      .catch((error: unknown) => {
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
          'Convert tridecimal data again.',
          'Go back to the Main Menu.',
          'Exit the application.',
        ],
      },
    ])
    .then(async (answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert tridecimal data again.':
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
