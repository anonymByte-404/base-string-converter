import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import chalk from 'chalk'

const historyFilePath = path.join(
  process.cwd(),
  'src/storage/conversionHistory.json'
)

/**
 * Ensures the history file exists. If not, it creates an empty file.
 *
 * @returns {void} This function does not return any value.
 */
const ensureHistoryFileExists = (): void => {
  if (!fs.existsSync(historyFilePath)) {
    fs.writeFileSync(historyFilePath, JSON.stringify([]))
  }
}

/**
 * Loads the conversion history from the history file.
 *
 * @returns {any[]} An array representing the conversion history.
 */
export const loadHistory = (): any[] => {
  ensureHistoryFileExists()
  const data = fs.readFileSync(historyFilePath, 'utf-8')
  return JSON.parse(data)
}

/**
 * Saves the provided conversion history to the history file.
 *
 * @param {any[]} history - The conversion history to save.
 * @returns {void} This function does not return any value.
 */
export const saveHistory = (history: any[]): void => {
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2))
}

/**
 * Adds an entry to the conversion history.
 *
 * @param {Object} entry - The entry to add to the history.
 * @param {string} entry.input - The input string for the conversion.
 * @param {string} entry.output - The converted string.
 * @param {string} entry.type - The type of conversion (e.g., "Base 2 to Base 3").
 * @returns {void} This function does not return any value.
 */
export const addToHistory = (entry: {
  input: string
  output: string
  type: string
}): void => {
  const history = loadHistory()
  history.push({ ...entry, date: new Date().toISOString() })
  saveHistory(history)
}

/**
 * Clears the conversion history by resetting the history file to an empty array.
 *
 * @returns {void} This function does not return any value.
 */
export const clearHistory = (): void => {
  saveHistory([])
}

/**
 * Searches the conversion history based on the conversion type.
 *
 * @returns {Promise<void>} This function does not return any value.
 */
export const searchHistory = async (): Promise<void> => {
  try {
    const { query } = await inquirer.prompt([
      {
        type: 'input',
        name: 'query',
        message:
          'Enter the conversion type to search for (e.g., "Base 2", "Base 4 to Base 10"):',
        validate: (input: string) =>
          input.trim() !== '' ? true : 'Please enter a valid search query.',
      },
    ])

    /**
     * The conversion history loaded from the history file.
     * @type {any[]}
     */
    const history = loadHistory()

    /**
     * The results of the search, filtered by the query provided.
     * @type {any[]}
     */
    const results = history.filter((entry) =>
      entry.type.toLowerCase().includes(query.toLowerCase())
    )

    if (results.length === 0) {
      console.log(
        chalk.yellow('No matching results found for the conversion type.')
      )
    } else {
      console.log(chalk.green('Search Results:'))
      results.forEach((entry, index) => {
        console.log(
          chalk.blueBright(
            `${index + 1}. [${entry.date}] (${entry.type})\n   - Input: "${entry.input}"\n   - Output: "${entry.output}"\n`
          )
        )
      })
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(chalk.red('Oops! Something went wrong:', error.message))
    } else {
      console.error(chalk.red('Oops! Something went wrong:', error))
    }
  }
}
