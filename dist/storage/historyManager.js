import fs from 'fs'
import path from 'path'
const historyFilePath = path.join(
  process.cwd(),
  'src/storage/conversionHistory.json'
)
/**
 * Ensures the history file exists. If not, it creates an empty file.
 *
 * @returns {void}
 */
const ensureHistoryFileExists = () => {
  if (!fs.existsSync(historyFilePath)) {
    fs.writeFileSync(historyFilePath, JSON.stringify([]))
  }
}
/**
 * Loads the conversion history from the history file.
 *
 * @returns {any[]} An array representing the conversion history.
 */
export const loadHistory = () => {
  ensureHistoryFileExists()
  const data = fs.readFileSync(historyFilePath, 'utf-8')
  return JSON.parse(data)
}
/**
 * Saves the provided conversion history to the history file.
 *
 * @param {any[]} history - The conversion history to save.
 * @returns {void}
 */
export const saveHistory = (history) => {
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2))
}
/**
 * Adds an entry to the conversion history.
 *
 * @param {Object} entry - The entry to add to the history.
 * @param {string} entry.input - The input string for the conversion.
 * @param {string} entry.output - The converted string.
 * @param {string} entry.type - The type of conversion (e.g., "String to Base 2").
 * @returns {void}
 */
export const addToHistory = (entry) => {
  const history = loadHistory()
  history.push(
    Object.assign(Object.assign({}, entry), { date: new Date().toISOString() })
  )
  saveHistory(history)
}
/**
 * Clears the conversion history by resetting the history file to an empty array.
 *
 * @returns {void}
 */
export const clearHistory = () => {
  saveHistory([])
}
/**
 * Deletes a specific entry from the conversion history by its index.
 *
 * @param {number} index - The index of the entry to delete.
 * @returns {void}
 */
export const deleteHistoryEntry = (index) => {
  const history = loadHistory()
  if (index >= 0 && index < history.length) {
    history.splice(index, 1) // Remove the entry at the given index
    saveHistory(history)
    console.log(`History entry at index ${index} has been deleted.`)
  } else {
    console.log('Invalid index. No entry deleted.')
  }
}
