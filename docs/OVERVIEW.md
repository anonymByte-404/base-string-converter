# Overview

The Base String Converter is a command-line interface (CLI) tool designed to facilitate conversions between various numeral systems (bases) and readable text. This tool supports conversions in bases ranging from 1 to 64, allowing for flexibility in encoding and decoding operations.

<h2>Features</h2>

<ul>
    <li><strong>Base to String Conversion</strong>: Convert numeric values in a specified base to human-readable text.</li>
    <li><strong>String to Base Conversion</strong>: Convert readable text into a specified base, facilitating encoding processes.</li>
</ul>

<h2>How It Works</h2>

<p align="center">
    <img src="images/preview.png" alt="Flowchart of Base String Converter" width="600"/>
</p>

<h2>Explanation of the Flow:</h2>

<ol>
    <li><strong>Start</strong>: The process begins.</li>
    <li><strong>Choose Conversion Type</strong>: Users select whether they want to convert from <strong>Base to String</strong> or <strong>String to Base</strong>.</li>
    <li><strong>Base to String</strong>:
        <ul>
            <li>Select the base (e.g., Base64) for conversion.</li>
            <li>Input the base number to convert.</li>
            <li>Validate the base input:
                <ul>
                    <li>If valid, convert to Base 10, then convert to readable text.</li>
                    <li>If invalid, display an error message.</li>
                </ul>
            </li>
            <li>Output the readable text.</li>
        </ul>
    </li>
    <li><strong>String to Base</strong>:
        <ul>
            <li>Input the readable text.</li>
            <li>Select the target base for conversion.</li>
            <li>Convert the input text to Base 10, then convert to the target base.</li>
            <li>Output the converted base.</li>
        </ul>
    </li>
</ol>

<h2>Conversion Options</h2>

<p>The Base String Converter supports the following conversion options:</p>

<ul>
    <li><strong>Base to String</strong>: Users can convert numeric values from various bases (1-64) to human-readable text.</li>
    <li><strong>String to Base</strong>: Users can encode readable text into a specified base (1-64), facilitating data encoding and transmission.</li>
</ul>

<h2>Conclusion</h2>

<p>The Base String Converter is a versatile tool that simplifies the process of converting between different bases and human-readable formats. Its user-friendly interface and support for various bases make it an essential tool for encoding and decoding tasks.</p>
