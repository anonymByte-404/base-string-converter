<h1 align="center">cli-base-string-converter</h1>

<p align="center"><i>A powerful command-line tool for converting data between various base encodings, such as Base64, Base32, Base58, and more. Quickly encode, decode, or convert data between different base formats directly from your terminal.</i></p>

> [!Note]
> This tool is still in active development and may not yet be feature-complete or stable. Please expect ongoing changes and updates.

---

<h2 align="center">Features</h2>

<ul>
    <li>🔄 <strong>Seamless Conversion:</strong> Convert between numeral systems and base encodings (e.g., Base64 to Base32, Base58 to Base64).</li>
    <li>🔤 <strong>String Encoding:</strong> Effortlessly transform strings into base encodings (e.g., text to Base64).</li>
    <li>🧩 <strong>Decoding Made Easy:</strong> Decode base encodings back into readable text (e.g., Base64 to plain text).</li>
    <li>⚡ <strong>Intuitive Interface:</strong> Simple and user-friendly command-line prompts for quick and hassle-free usage.</li>
    <li>🚀 <strong>High Performance:</strong> Lightweight, fast, and optimized for efficiency.</li>
    <li>🔒 <strong>Versatile Utility:</strong> Perfect for data transformations, encoding workflows, and cryptographic tasks.</li>
</ul>

---

<h2 align="center">Installation</h2>

<p align="left">To install this package, follow these steps:</p>

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cli-base-string-converter.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cli-base-string-converter
   ```

3. Install dependencies using npm:

   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   node dist/index.js
   ```

<h2 align="center">Usage</h2>

1. Select a string for conversion
   <br><img src="assets/images/image1.png" alt="image1">

2. Choose the target base
   <br><img src="assets/images/image2.png" alt="image2">

3. Input the string to be converted
   <br><img src="assets/images/image3.png" alt="image3">

4. View the conversion output and proceed with further actions
   <br><img src="assets/images/image4.png" alt="image4">

<h2 align="center">Code Example</h2>

<p align="center">Below is a simplified example of how you can use this tool programmatically in a Node.js application:</p>

```typescript
const main = (): void => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'conversionType',
        message: 'Select the type of conversion you want to perform:',
        choices: ['String Conversion', 'Base Conversion'],
      },
    ])
    .then(({ conversionType }) => {
      if (conversionType === 'String Conversion') {
        stringConverter(inquirer, baseChoices, main)
      } else {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'selectedBase',
              message: 'Choose the target base for conversion:',
              choices: baseChoices,
            },
          ])
          .then(({ selectedBase }) => {
            switch (selectedBase) {
              case 'Base 2':
                binaryConverter(inquirer, main)
                break
              // More base can be added here...
              default:
                console.log(
                  `Conversions for ${selectedBase} are currently not supported.`
                )
            }
          })
          .catch((error) =>
            console.error('An error occurred during base selection:', error)
          )
      }
    })
    .catch((error) =>
      console.error('An error occurred during the initial prompt:', error)
    )
}

main()
```

> [!NOTE]
> This is a sample snippet designed to illustrate the tool's programmatic usage. It is not the complete implementation but gives an idea of how the CLI tool operates with prompts and modular functions.

<h2 align="center">Contribution</h2>

<p align="left">Contributions are welcome! Here's how you can help:</p>

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit:

   ```bash
   git commit -m "Add your commit message here"
   ```

4. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request on the main repository.

<h2 align="center">LICENSE</h3>
<p align="center">This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for more details.</p>
