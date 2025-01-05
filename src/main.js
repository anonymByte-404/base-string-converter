/**
 *  Note: This application is still in development. Further enhancements will be added.
 */

import inquirer from 'inquirer'

const baseChoices = Array.from({ length: 63 }, (_, i) => `Base ${i + 2}`)

inquirer
    .prompt([
        {
            type: 'list',
            name: 'stringOrBase',
            message: 'Select your conversion type below:',
            choices: ['String', 'Base']
        }
    ])
    .then((answers) => {
        if (answers.stringOrBase === 'String') {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'stringBase',
                        message: 'Choose a base for string conversion:',
                        choices: baseChoices
                    }
                ])
        } else if (answers.stringOrBase === 'Base') {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'baseChoice',
                        message: 'Choose a base or string conversion:',
                        choices: ['String', ...baseChoices]
                    }
                ])
        }
    })
    .catch((error) => {
        console.log('Error', error)
    })