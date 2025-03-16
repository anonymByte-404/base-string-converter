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
 * Reads data from the history file and returns it.
 *
 * @returns {any[]} The conversion history as an array.
 */
const readHistoryFile = (): any[] => {
  ensureHistoryFileExists()
  const data = fs.readFileSync(historyFilePath, 'utf-8')
  return JSON.parse(data)
}

/**
 * Writes the provided conversion history to the history file.
 *
 * @param {any[]} history - The conversion history to save.
 * @returns {void} This function does not return any value.
 */
const writeHistoryFile = (history: any[]): void => {
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2))
}

/**
 * Loads the conversion history from the history file.
 *
 * @returns {any[]} An array representing the conversion history.
 */
export const loadHistory = (): any[] => readHistoryFile()

/**
 * Saves the provided conversion history to the history file.
 *
 * @param {any[]} history - The conversion history to save.
 * @returns {void} This function does not return any value.
 */
export const saveHistory = (history: any[]): void => writeHistoryFile(history)

/**
 * Adds an entry to the conversion history.
 *
 * @param {Object} entry - The entry to add to the history.
 * @param {string} entry.input - The input string for the conversion.
 * @param {string} entry.output - The converted string.
 * @param {string} entry.type - The type of conversion (e.g., "Base 2 to Base 3").
 * @returns {void} This function does not return any value.
 */
export const addToHistory = (entry: { input: string; output: string; type: string }): void => {
  const history = loadHistory()
  const newEntry = { ...entry, date: new Date().toISOString() }
  history.push(newEntry)
  saveHistory(history)
}

/**
 * Clears the conversion history by resetting the history file to an empty array.
 *
 * @returns {void} This function does not return any value.
 */
export const clearHistory = (): void => saveHistory([])

/**
 * Searches the conversion history based on the conversion type.
 *
 * @returns {Promise<void>} This function does not return any value.
 */
export const searchHistory = async (): Promise<void> => {
  try {
    const { query } = await promptSearchQuery()

    const history = loadHistory()
    const results = searchInHistory(query, history)

    displaySearchResults(results)
  } catch (error: unknown) {
    handleError(error, 'Error occurred while searching the history', chalk)
  }
}

/**
 * Prompts the user to enter a search query for the conversion type.
 *
 * @returns {Promise<{ query: string }>} The user's query.
 */
const promptSearchQuery = async (): Promise<{ query: string }> => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'query',
      message: 'Enter the conversion type to search for (e.g., "Base 2", "Base 4 to Base 10"):',
      validate: (input: string) => (input.trim() !== '' ? true : 'Please enter a valid search query.'),
    },
  ])
}

/**
 * Searches for entries in the conversion history based on the provided query.
 *
 * @param {string} query - The search query entered by the user.
 * @param {any[]} history - The conversion history to search in.
 * @returns {any[]} The filtered results.
 */
const searchInHistory = (query: string, history: any[]): any[] => {
  return history.filter(entry => entry.type.toLowerCase().includes(query.toLowerCase()))
}

/**
 * Displays the search results in the console.
 *
 * @param {any[]} results - The results of the search.
 * @returns {void} This function does not return any value.
 */
const displaySearchResults = (results: any[]): void => {
  if (results.length === 0) {
    console.log(chalk.yellow('No matching results found for the conversion type.'))
  } else {
    console.log(chalk.green('Search Results:'))
    results.forEach((entry, index) => {
      console.log(chalk.blueBright(`${index + 1}. [${entry.date}] (${entry.type})\n   - Input: "${entry.input}"\n   - Output: "${entry.output}"\n`))
    })
  }
}

/**
 * Handles error logging.
 *
 * @param {unknown} error - The error to handle.
 * @param {string} description - A description of the error context.
 * @param {Chalk} chalk - Chalk.js instance for styling console output.
 * @returns {void} This function does not return any value.
 */
const handleError = (error: unknown, description: string, chalk: any): void => {
  console.error(chalk.red(`${description}:`))
  if (error instanceof Error) {
    console.error(chalk.red(`Error: ${error.message}`))
  } else {
    console.error(chalk.red(`An unknown error occurred: ${String(error)}`))
  }
}
