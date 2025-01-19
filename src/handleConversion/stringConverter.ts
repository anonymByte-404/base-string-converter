/**
 * Converts a number to its string representation in the specified base.
 *
 * @param number - The input number to convert (must be non-negative).
 * @param base - The base to convert the number to (1 to 64).
 * @returns {string} The string representation of the number in the specified base.
 * @throws {RangeError} If the base is not in the range [1, 64].
 */
function toCustomBase(number: number, base: number): string {
  if (base === 1) {
    return '1'.repeat(number) // Unary representation
  }

  const digits =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'
  if (base > digits.length) {
    throw new RangeError(
      `Base ${base} exceeds maximum supported base (${digits.length}).`
    )
  }

  let result = ''
  let current = number

  while (current > 0) {
    result = digits[current % base] + result
    current = Math.floor(current / base)
  }

  return result || '0'
}

/**
 * Initiates the string conversion process, allowing users to select numeral systems.
 *
 * @param inquirer - Interactive CLI prompt library.
 * @param baseChoices - Array of available numeral systems as strings (e.g., "Base 2", "Base 16").
 * @param main - Callback function to return to the main menu.
 * @param typewriterEffect - Function for a typing effect (simulates text display with delays).
 * @param fadeOutEffect - Function for a fade-out animation effect on text.
 * @param chalk - Chalk instance passed from main.ts.
 */
export function stringConverter(
  inquirer: any,
  baseChoices: string[],
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any
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
            main,
            typewriterEffect,
            fadeOutEffect,
            chalk
          )
        } else {
          console.log(chalk.red('Unsupported base. Please try another option.'))
          askNextAction(
            inquirer,
            startStringConversion,
            main,
            typewriterEffect,
            fadeOutEffect,
            chalk
          )
        }
      })
      .catch((error: unknown) => {
        console.error(
          chalk.red('Error during base selection:', (error as Error).message)
        )
      })
  }

  startStringConversion()
}

/**
 * Converts each character of a string to its ASCII value and represents it
 * in the specified numeral system with appropriate padding.
 *
 * @param inquirer - Interactive CLI prompt library.
 * @param name - The name of the numeral system (e.g., "Base 16").
 * @param base - The target numeral system (1 to 64).
 * @param callback - Function to restart the string conversion process.
 * @param main - Callback to return to the main menu.
 * @param typewriterEffect - Function for a typing effect.
 * @param fadeOutEffect - Function for a fade-out animation effect.
 * @param chalk - Chalk instance passed from main.ts.
 */
function stringToBase(
  inquirer: any,
  name: string,
  base: number,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any
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

      const maxWidth =
        base > 1 ? Math.ceil(Math.log2(256) / Math.log2(base)) : 0

      const result = Array.from(inputString)
        .map((char) => {
          const charCode = char.charCodeAt(0)
          return toCustomBase(charCode, base).padStart(maxWidth, '0')
        })
        .join(' ')

      console.log(`Converted to ${name}: ${result}`)
      askNextAction(
        inquirer,
        callback,
        main,
        typewriterEffect,
        fadeOutEffect,
        chalk
      )
    })
    .catch((error: unknown) => {
      console.error(
        chalk.red(
          `Error during conversion to ${name}:`,
          (error as Error).message
        )
      )
    })
}

/**
 * Prompts the user for the next action after a successful conversion.
 *
 * @param inquirer - Interactive CLI prompt library.
 * @param callback - Function to restart the string conversion process.
 * @param main - Callback to return to the main menu.
 * @param typewriterEffect - Function for a typing effect.
 * @param fadeOutEffect - Function for a fade-out animation effect.
 * @param chalk - Chalk instance passed from main.ts.
 */
function askNextAction(
  inquirer: any,
  callback: () => void,
  main: () => void,
  typewriterEffect: (text: string, delay: number) => Promise<void>,
  fadeOutEffect: (text: string, steps: number, delay: number) => Promise<void>,
  chalk: any
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
    .then(async (answers: { nextAction: string }) => {
      switch (answers.nextAction) {
        case 'Convert another string.':
          callback()
          break
        case 'Return to Main Menu.':
          console.log(chalk.green('Returning to the main menu...'))
          main()
          break
        case 'Exit the application.':
          await typewriterEffect('Thanks for using the app. Goodbye!', 50)
          await fadeOutEffect('Closing the application...', 10, 100)
          process.exit(0)
      }
    })
    .catch((error: unknown) => {
      console.error(
        chalk.red(
          'Error while deciding the next step:',
          (error as Error).message
        )
      )
    })
}
