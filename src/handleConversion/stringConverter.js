/**
 * Handles string to base stringInput.
 * Prompts the user to select the base for stringInput.
 * @param {*} inquirer - The tool used to prompt the user for input.
 * @param {*} baseChoices - The list of base options to choose from.
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
            switch (answers.selectedBase) {
                case 'Base 2':
                    return stringToBinary(inquirer)
                default:
                    console.log('Conversion function for this base is not available.')
            }
        })
        .catch((error) => {
            console.error('An error occured during the stringInput process:', error)
        })
}

/**
 * Prompts the user to input a string and converts it to binary.
 * @param {*} inquirer - The tool used to prompt the user for input.
 */
function stringToBinary(inquirer) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'stringInput',
                message: 'Enter the string you would like to convert to binary:'
            }
        ])
        .then((answers) => {
            const inputString = answers.stringInput.trim()

            // Converts each character in the string to its binary equivalent
            const newArray = Array.from(inputString)
                .map(char => char.charCodeAt(0).toString(2).padStart(8, '0')) // Convert to 8-bit binary

            const result = newArray.join(' ') // Join the binary array into a single string with spaces
            console.log(`Converted Binary: ${result}`)
        })
        .catch((error) => {
            console.error('An error occured during string to binary conversion:', error)
        })
}