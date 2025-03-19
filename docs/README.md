<h1>Overview</h1>

<p>The <strong>Base String Converter</strong> is a command-line interface (CLI) tool designed to convert between numeral systems (bases) and readable text. It supports conversions between bases ranging from <strong>1 to 64</strong>, allowing for flexible encoding and decoding operations.</p>

<h2>Features</h2>

<ul>
    <li><strong>Base to String Conversion</strong>: Converts numeric values in a specified base to human-readable text.</li>
    <li><strong>String to Base Conversion</strong>: Converts readable text into a specified base for encoding purposes.</li>
    <li><strong>Intelligent Conversion Handling</strong>: Automatically determines whether direct conversion is possible or if conversion to <strong>Base 10</strong> is required as an intermediary step.</li>
    <li><strong>Error Handling</strong>: Ensures input validity before performing any conversion to prevent incorrect results.</li>
</ul>

<h2>How It Works</h2>

<p align="center">
    <img src="images/preview.png" alt="Flowchart of Base String Converter" width="100%"/>
</p>

<h3>Explanation of the Flow:</h3>

<ol>
    <li><strong>Start</strong>: The process begins.</li>
    <li><strong>Choose Conversion Type</strong>: Users decide between <strong>Base to String</strong> or <strong>String to Base</strong> conversion.</li>
</ol>

<h3>String to Base Conversion</h3>
<ul>
    <li>User inputs readable text.</li>
    <li>Selects the target base for conversion.</li>
    <li>If the selected base is <strong>10</strong>, the text is directly converted.</li>
    <li>If another base is chosen, the tool checks whether direct conversion is possible:
        <ul>
            <li>If <strong>Yes</strong>, it converts the text directly.</li>
            <li>If <strong>No</strong>, it first converts the text to <strong>Base 10</strong>, then to the selected base.</li>
        </ul>
    </li>
    <li>Displays the converted output.</li>
</ul>

<h3>Base to String Conversion</h3>
<ul>
    <li>User selects the base of the numeric input.</li>
    <li>Inputs the number for conversion.</li>
    <li>Validates input correctness:
        <ul>
            <li>If invalid, an error is displayed.</li>
            <li>If valid, the tool checks if direct conversion is possible:
                <ul>
                    <li>If <strong>Yes</strong>, it converts the base directly into text.</li>
                    <li>If <strong>No</strong>, it first converts the input to <strong>Base 10</strong>, then decodes it into readable text.</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>Displays the readable text output.</li>
</ul>

<h2>Supported Conversion Modes</h2>

<p>The Base String Converter supports:</p>

<ul>
    <li><strong>Base to String</strong>: Converts numbers from bases <strong>1-64</strong> into human-readable text.</li>
    <li><strong>String to Base</strong>: Encodes text into a specified base (<strong>1-64</strong>) for efficient data storage or transmission.</li>
</ul>

<p>This CLI tool provides a <strong>streamlined</strong> and <strong>error-resistant</strong> approach to handling base conversions, ensuring that data is processed accurately and efficiently. 🚀</p>

<hr />

<p>This version enhances clarity and aligns more closely with your updated flowchart logic. Let me know if you'd like further refinements! 😊</p>
