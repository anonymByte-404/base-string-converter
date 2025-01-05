const choices = ['String', ...Array.from({ length: 62 }, (_, i) => `Base ${i + 3}`)]

/**
 * Handles binary to string binaryInput.
 * Presents a prompt to the user to select the binaryInput base.
 * @param {*} inquirer - The tool used to prompt the user for input.
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
                default:
                    console.log('Conversion functin for this base is not avilable.')
            }
        })
        .catch((error) => {
            console.error('An error occured during the binaryInput process:', error)
        })
}

/**
 * Prompts the user to input binary data and converts it to a string.
 * @param {*} inquirer - The tool used to prompt the user for input.
 */
function binaryToString(inquirer) {
    const promptForBinary = () => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'binaryInput',
                    message: 'Enter the binary data (seperate groups with spaces) to convert to a string: '
                }
            ])
            .then((answers) => {
                const trimmedInput = answers.binaryInput.trim()
                const binaryArray = trimmedInput.split(' ')

                // Validate binary input (only 0s and 1s)
                const isValidBinary = binaryArray.every(bin => /^[01]+$/.test(bin))

                if (!isValidBinary) {
                    console.log('Invalid input. Please enter a valid binary string (only 0s and 1s).')
                    return promptForBinary() // Re-prompt for valid input
                }

                // Convert binary to string
                const result = binaryArray
                    .map(bin => String.fromCharCode(parseInt(bin, 2))) // Convert each binary chunk to characters
                    .join('')
                console.log(`Converted String: "${result}"`)
            })
            .catch((error) => {
                console.error('An error occured during the binary to string conversion:', error)
            })
    }

    promptForBinary()
}