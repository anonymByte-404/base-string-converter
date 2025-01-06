/**
 * Handles string-to-base stringInput.
 * Prompts the user to select the base for conversion.
 * @param {object} inquirer - The library used to interactively prompt the user for input.
 * @param {Array} baseChoices - The list of base options to choose from.
 */
export function stringConverter(inquirer, baseChoices) {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectedBase',
                message: 'Please select the base you would like to convert to:',
                choices: baseChoices
            }
        ])
        .then((answers) => {
            const match = answers.selectedBase.match(/Base (\d+)/)

            if (match) {
                const base = parseInt(match[1], 10)
                return stringToBase(inquirer, `Base ${base}`, base)
            } else {
                console.log('Conversion function for this base is currently not supported.')
            }
        })
        .catch((error) => {
            console.error('An error occured during the stringInput process:', error)
        })
}

/**
 * Converts a string into a specified numeral system (e.g., binary, ternary, hexadecimal).
 * @param {object} inquirer - The library used to interactively prompt the user for input.
 * @param {string} name - The name of the numeral system (e.g., "Binary").
 * @param {number} base - The base of the numeral system to convert to (e.g., 2 for binary).
 */
function stringToBase(inquirer, name, base) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'stringInput',
                message: `Enter the string you would like to convert to ${name}:`
            }
        ])
        .then((answers) => {
            const inputString = answers.stringInput.trim()

            // Dynamically calculates the width for padding based on the base
            const maxWidth = Math.ceil(Math.log2(256) / Math.log2(base)) // Max width for ASCII values

            // Converts each character to its representation in the target numeral system
            const result = Array.from(inputString)
                .map(char => char.charCodeAt(0).toString(base).padStart(maxWidth, '0')) // Convert and pad
                .join(' ') // Join with spaces for readability
            console.log(`Converted ${name}: ${result}`)
        })
        .catch((error) => {
            console.error(`An error occured during string-to-${name} conversion:`, error)
        })
}