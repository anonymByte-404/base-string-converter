/**
 *  Note: This application is currently in development. Additional features and enhancments will be implemented in future realease.
 */

import inquirer from 'inquirer'
import { stringConverter } from './handleConversion/stringConverter.js'
import { binaryConverter } from './handleConversion/binaryConverter.js'

// Generate base choices from Base 2 to Base 64
const baseChoices = Array.from({ length : 63 }, (_, i) => `Base ${i + 2}`)

inquirer
    .prompt([
        {
            type: 'list',
            name: 'conversionType',
            message: 'Please select the type of conversion:',
            choices: ['String', 'Base']
        }
    ])
    .then((answers) => {
        if (answers.conversionType === 'String') {
            return stringConverter(inquirer, baseChoices) // Handle string-based conversion
        } else if (answers.conversionType === 'Base') {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'selectedBase',
                        message: 'Please choose a base for conversion:',
                        choices: baseChoices
                    }
                ])
                .then((answers) => {
                    switch (answers.selectedBase) {
                        case 'Base 2':
                            return binaryConverter(inquirer) // Handle binary Conversion
                        case 'Base 3':
                            return ternaryConverter() // Placeholder for base 3 conversion
                        case 'Base 4':
                            return quaternaryConverter() // Placeholder for base 4 conversion
                        case 'Base 5':
                            return quinaryConverter() // Placeholder for base 5 conversion
                        case 'Base 6':
                            return senaryConverter() // Placeholder for base 6 conversion
                        case 'Base 7':
                            return septenaryConverter() // Placeholder for base 7 conversion
                        case 'Base 8':
                            return octalConverter() // Placeholder for base 8 conversion
                        case 'Base 9':
                            return nonaryConverter() // Placeholder for base 9 conversion
                        case 'Base 10':
                            return decimalConverter() // Placeholder for base 10 conversion
                        case 'Base 11':
                            return undecimalConverter() // Placeholder for base 11 conversion
                        case 'Base 12':
                            return duodecimalConverter() // Placeholder for base 12 conversion
                        case 'Base 13':
                            return tridecimalConverter() // Placeholder for base 13 conversion
                        case 'Base 14':
                            return tetradecimalConverter() // Placeholder for base 14 conversion
                        case 'Base 15':
                            return pentadecimalConverter() // Placeholder for base 15 conversion
                        case 'Base 16':
                            return hexadecimalConverter() // Placeholder for base 16 conversion
                        case 'Base 17':
                            return heptadecimalConverter() // Placeholder for base 17 conversion
                        case 'Base 18':
                            return octaldecimalConverter() // Placeholder for base 18 conversion
                        case 'Base 19':
                            return novenaryConverter() // Placeholder for base 19 conversion
                        case 'Base 20':
                            return vigesimalConverter() // Placeholder for base 20 conversion
                        default:
                            console.log('No conversion function available for this base.')
                    }
                })
        }
    })
    .catch((error) => {
        console.error('An error occurred:', error)
    })