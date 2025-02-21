<h1 align="center">base-string-converter</h1>

<p align="center">
  <img src="https://img.shields.io/badge/License-AGPL--3.0-green.svg" alt="AGPL-3.0 License">
  <img src="https://img.shields.io/badge/CLI--Tool-2.14.4-yellow.svg" alt="CLI Tool Version">
  <img src="https://img.shields.io/badge/Web--Tool-1.1.1-yellow.svg" alt="Web Tool Version">
  <img src="https://img.shields.io/badge/express--types-5.0.0-yellowgreen.svg" alt="Express TypeScript Definitions">
  <img src="https://img.shields.io/badge/typescript--eslint--plugin-8.19.1-yellowgreen.svg" alt="TypeScript ESLint Plugin">
  <img src="https://img.shields.io/badge/typescript--eslint--parser-8.19.1-yellowgreen.svg" alt="TypeScript ESLint Parser">
  <img src="https://img.shields.io/badge/ESLint-9.17.0-yellowgreen.svg" alt="ESLint Version">
  <img src="https://img.shields.io/badge/eslint--config--prettier-9.1.0-yellowgreen.svg" alt="ESLint Config Prettier">
  <img src="https://img.shields.io/badge/eslint--plugin--prettier-5.2.1-yellowgreen.svg" alt="ESLint Plugin Prettier">
  <img src="https://img.shields.io/badge/Prettier-3.4.2-yellowgreen.svg" alt="Prettier Version">
  <img src="https://img.shields.io/badge/ts--node-10.9.2-yellowgreen.svg" alt="TS-Node Version">
  <img src="https://img.shields.io/badge/TypeScript-5.7.2-yellowgreen.svg" alt="TypeScript Version">
  <img src="https://img.shields.io/badge/cra--template-1.2.0-blue.svg" alt="CRA Template Version">
  <img src="https://img.shields.io/badge/React-19.0.0-blue.svg" alt="React Version">
  <img src="https://img.shields.io/badge/React--DOM-19.0.0-blue.svg" alt="React DOM Version">
  <img src="https://img.shields.io/badge/React--Router--DOM-7.1.4-blue.svg" alt="React Router DOM Version">
  <img src="https://img.shields.io/badge/React--Scripts-5.0.1-blue.svg" alt="React Scripts Version">
  <img src="https://img.shields.io/badge/Web--Vitals-4.2.4-blue.svg" alt="Web Vitals Version">
</p>

<p align="center"><i>A versatile tool for converting data between various base encodings, including Base64, Base32, Base58, and more. Available as a command-line tool and a web application, it empowers users to quickly encode, decode, or convert data seamlessly.</i></p>

> [!Note]
> The main functionality of this tool is now stable and fully operational. However, it is still in active development, and additional features and updates may be added in the future. Please expect occasional changes as development continues.

<h2>Table of Contents</h2>
<ul>
  <li><a href="#features">Features</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#code-example">Code Example</a></li>
  <li><a href="#contribution">Contribution</a></li>
  <li><a href="#license">License</a></li>
</ul>

---

<h2 align="center" id="features">Features</h2>

<ul>
    <li>🔄 <strong>Seamless Conversion:</strong> Convert between numeral systems and base encodings (e.g., Base64 to Base32, Base58 to Base64).</li>
    <li>🔤 <strong>String Encoding:</strong> Effortlessly transform strings into base encodings (e.g., text to Base64).</li>
    <li>🧩 <strong>Decoding Made Easy:</strong> Decode base encodings back into readable text (e.g., Base64 to plain text).</li>
    <li>⚡ <strong>Intuitive Interface:</strong> Simple and user-friendly command-line prompts for quick and hassle-free usage.</li>
    <li>🚀 <strong>High Performance:</strong> Lightweight, fast, and optimized for efficiency.</li>
    <li>🔒 <strong>Versatile Utility:</strong> Perfect for data transformations, encoding workflows, and cryptographic tasks.</li>
    <li>💾 <strong>Persistent History:</strong> The conversion history is saved in a JSON file, allowing you to revisit past conversions at any time.</li>
</ul>

---

<h2 align="center" id="installation">Installation</h2>

<p align="left">To install this package, follow these steps:</p>

1. <b>Clone the repository:</b>
   <br />First, clone the repository to your local machine to create a copy of it:

   ```bash
   git clone https://github.com/anonymByte-404/base-string-converter.git
   ```

2. <b>Navigate to the project directory:</b>
   <br />After cloning, move into the project directory where all the files are located:

   ```bash
   cd base-string-converter
   ```

3. <b>Install dependencies using `npm`:</b>
   <br />Install the required dependencies for the project by running:

   ```bash
   npm install
   ```

   This will install all the necessary libraries and packages specified in the `package.json` file.

4. <b>Run the application:</b>
   <br />Once the dependencies are installed, start the application using the following command:
   ```bash
   npm start
   ```
   This will launch the application, and you should be able to use it as intended.

<h2 align="center" id="usage">Usage</h2>

1. <strong>Select the type of conversion:</strong>
   <br>Choose the type of conversion you want to perform (e.g., String, Base).
   <br><img src="assets/images/image1.png" alt="image1">

2. <strong>Choose the target base:</strong>
   <br>Select the target numeral system for your conversion (e.g., Base64, Base32, etc.).
   <br><img src="assets/images/image2.png" alt="image2">

3. <strong>Input the string to convert:</strong>
   <br>Provide the string or data you wish to convert into the selected base or encoding.
   <br><img src="assets/images/image3.png" alt="image3">

4. <strong>View the conversion output:</strong>
   <br>Check the conversion result and decide whether to proceed with further actions, such as repeating the conversion or returning to the main menu.
   <br><img src="assets/images/image4.png" alt="image4">

<h2 align="center" id="code-example">Code Example</h2>

<p align="center">Below is an illustrative example of how you could use this tool programmatically in a Node.js application:</p>

```typescript
import inquirer from 'inquirer'
import chalk from 'chalk'

// Type for the answers in prompts
interface Answers {
  conversionType: string
  selectedBase?: string
}

// Base choices for conversion
const baseChoices: string[] = Array.from({ length: 64 }, (_, i) => `Base ${i + 1}`)

/**
 * Handles errors by logging the error message to the console.
 * 
 * @param {unknown} error - The error to handle.
 * @param {string} context - The context in which the error occurred.
 */
const handleError = (error: unknown, context: string): void => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  console.error(chalk.red(`${context}: ${errorMessage}`))
}

/**
 * Logs and displays a success message when a conversion type is selected.
 * 
 * @param {string} conversionType - The conversion type selected by the user.
 */
const logConversionSelection = (conversionType: string): void => {
  console.log(chalk.green(`Selected Conversion: ${conversionType}`))
}

/**
 * Main prompt logic to allow the user to choose the type of conversion.
 * 
 * @returns {Promise<void>} - A promise that resolves when the conversion type is selected and handled.
 */
const mainPrompt = async (): Promise<void> => {
  try {
    const answers = await inquirer.prompt<Answers>([
      {
        type: 'list',
        name: 'conversionType',
        message: 'Select the type of conversion you want to perform:',
        choices: ['String Conversion', 'Base Conversion'],
      },
    ])

    logConversionSelection(answers.conversionType)

    if (answers.conversionType === 'String Conversion') {
      // Placeholder function for string conversion logic
      return stringConverter()
    }

    return await baseConversionPrompt()
  } catch (error: unknown) {
    handleError(error, 'An error occurred during the initial prompt')
  }
}

/**
 * Prompts the user to choose the target base for conversion.
 * 
 * @returns {Promise<void>} - A promise that resolves when the base conversion is selected.
 */
const baseConversionPrompt = async (): Promise<void> => {
  try {
    const { selectedBase } = await inquirer.prompt<Answers>([
      {
        type: 'list',
        name: 'selectedBase',
        message: 'Choose the target base for conversion:',
        choices: baseChoices,
      },
    ])

    console.log(chalk.yellow(`Selected Base: ${selectedBase}`))

    if (selectedBase === 'Base 2') {
      // Placeholder function for binary conversion logic
      return binaryConverter()
    }

    console.log(chalk.red(`Conversions for ${selectedBase} are currently not supported.`))
  } catch (error: unknown) {
    handleError(error, 'An error occurred during base selection')
  }
}

/**
 * Handles the logic for string conversion (this is a placeholder for your conversion logic).
 * 
 * @returns {Promise<void>} - A promise that resolves when the string conversion is done.
 */
const stringConverter = async (): Promise<void> => {
  console.log(chalk.brightBlue('String Conversion Selected'))
  // Placeholder: Your string conversion logic goes here
  console.log(chalk.brightCyan('Implement string conversion logic here'))
}

/**
 * Handles the logic for binary conversion (this is a placeholder for your conversion logic).
 * 
 * @returns {Promise<void>} - A promise that resolves when the binary conversion is done.
 */
const binaryConverter = async (): Promise<void> => {
  console.log(chalk.brightBlue('Binary Conversion Selected'))
  // Placeholder: Your binary conversion logic goes here
  console.log(chalk.brightCyan('Implement binary conversion logic here'))
}

/**
 * Starts the application by prompting the user for the type of conversion.
 */
mainPrompt()
```

> [!NOTE]
> This is not the actual code, but an illustration designed to demonstrate how the CLI tool operates. It serves as an example to show the general behavior and flow of the tool, rather than the complete or exact implementation.

<h2 align="center" id="contribution">Contribution</h2>

<p align="left">Contributions are welcome! Here's how you can help:</p>

1. <b>Fork the repository.</b>
   <br />Go to the repository page on GitHub and click the `"Fork"` button to create your own copy.

2. <b>Clone your Fork</b>
   <br />After forking the repository, `clone` it to your local machine:

   ```bash
   git clone https://github.com/anonymByte-404/base-string-converter.git
   ```

3. <b>Create a new branch for your feature or bug fix:</b>
   <br />Create a new `branch` so you can work on your changes without affecting the main branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. <b>Make your changes and commit:</b>
   <br />After making your changes, `commit` them with a meaningful message:

   ```bash
   git commit -m "Add your commit message here"
   ```

5. <b>Push to your fork:</b>
   <br />Push to your `fork`:

   ```bash
   git push origin feature/your-feature-name
   ```

6. <b>Open a pull request on the main repository.</b>
   <br />Go to the original repository on GitHub (<a href='https://github.com/anonymByte-404/base-string-converter'>https://github.com/anonymByte-404/base-string-converter</a>) and open a `pull request` with your changes.

<h2 align="center" id="license">LICENSE</h3>
<p align="center">This project is licensed under the AGPL-3.0 License. See the <a href="LICENSE">LICENSE</a> file for more details.</p>
