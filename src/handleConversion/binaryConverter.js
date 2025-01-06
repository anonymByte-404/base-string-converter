const choices = ['String', ...Array.from({ length: 62 }, (_, i) => `Base ${i + 3}`)]

/**
 * Provides a menu for the user to select a conversion type for binary data.
 * Supports conversion to text (string) and various numeral systems.
 * @param {object} inquirer - The library used to interactively prompt the user for input.
 */
export function binaryConverter(inquirer) {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectedConversionBase',
                message: 'Please select the base you would like to convert to:',
                choices: choices
            }
        ])
        .then((answers) => {
            switch (answers.selectedConversionBase) {
                case 'String':
                    return binaryToString(inquirer)
                default: {
                    const match = answers.selectedConversionBase.match(/Base (\d+)/)

                    if (match) {
                        const base = parseInt(match[1], 10)
                        return binaryToBase(inquirer, `Base ${base}`, base)
                    }
                }
                    console.log('Conversion for this base is currently not supported.')
            }
        })
        .catch((error) => {
            console.error('An error occured while processing the conversion selection:', error)
        })
}

/**
 * Converts binary data to text (string).
 * @param {object} inquirer - The library used to interactively prompt the user for input.
 */
function binaryToString(inquirer) {
    const promptBase = () => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'binaryInput',
                    message: 'Enter the binary data (seperate groups with spaces) to convert to a string: '
                }
            ])
            .then((answers) => {
                const binaryArray = answers.binaryInput.trim().split(' ')

                // Validate input to ensure it contains only binary numbers (0s and 1s)
                if (!binaryArray.every(bin => /^[01]+$/.test(bin))) {
                    console.log('Invalid input. Please provide binary numbers containing only 0s and 1s.')
                    return promptBase() // Re-prompt the user for valid input
                }

                // Convert binary data to text
                const result = binaryArray
                    .map(bin => String.fromCharCode(parseInt(bin, 2))) // Convert binary to ASCII characters
                    .join('')
                console.log(`Converted String: "${result}"`)
            })
            .catch((error) => {
                console.error('An error occured during the binary-to-string conversion:', error)
            })
    }

    promptBase()
}

/**
 * Converts binary data into a specific numeral system (e.g., ternary, quinary, etc).
 * @param {object} inquirer - The library used to interactively prompt the user for input.
 * @param {string} name - The name of the numeral system (e.g., "Ternary").
 * @param {number} base - The base of the numeral system to convert to (e.g., 3 for ternary).
 */
function binaryToBase(inquirer, name, base) {
    const promptBase = () => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'binaryInput',
                    message: `Enter the binary data (seperate groups with spaces) to convert to a ${name}:`
                }
            ])
            .then((answers) => {
                const binaryArray = answers.binaryInput.trim().split(' ')

                // Validate input to ensure it contains only binary numbers (0s and 1s).
                if (!binaryArray.every(bin => /^[01]+$/.test(bin))) {
                    console.log('Invalid input. Please provide binary numbers containing only 0s and 1s.')
                    return promptBase() // Re-prompt the user for valid input.
                }

                // Convert binary data to the specified numeral system.
                const result = binaryArray
                    .map(bin => parseInt(bin, 2).toString(base)) // Convert binary to decimal, then to the target base.
                    .join(' ')
                console.log(`Converted ${name}: ${result}`)
            })
            .catch((error) => {
                console.error(`An error occured during binary-to-${name} conversion:`, error)
            })
    }

    promptBase()
}