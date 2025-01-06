/**
 *  Note: This application is currently in development. Additional features and enhancments will be implemented in future realease.
 */

import inquirer from 'inquirer'
import { stringConverter } from './handleConversion/stringConverter.js'
import { binaryConverter } from './handleConversion/binaryConverter.js'

// Generate base choices from Base 2 to Base 64
const baseChoices = Array.from({ length : 63 }, (_, i) => `Base ${i + 2}`)

/**
 * Placeholder function for unsopported base conversion.
 * @param {string} baseName - The name of the base being converted.
 */
const placeholder = (baseName) => {
    console.log(`Conversion for ${baseName} is not yet implemented. Please check back in future updates.`)
}

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
                    if (answers.conversionType === 'String') {
                        return stringConverter(inquirer, baseChoices)
                    } else if (answers.conversionType === 'Base') {
                        return inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'selectedBase',
                                    message: 'Please choose a base for conversion:',
                                    choices: baseChoices
                                }
                            ])
                            .then((baseAnswers) => {
                                const selectedBase = baseAnswers.selectedBase

                                switch (selectedBase) {
                                    case 'Base 2':
                                        return binaryConverter(inquirer) // Handle binary conversion
                                    default:
                                        placeholder(selectedBase) // Placeholder for unsoppored
                                }
                            })
                    }
                })
        }
    })
    .catch((error) => {
        console.error('An error occurred:', error)
    })