<h1 id="base">What is a Base?</h2>

<ul>
    <li><p>The base determines the number of unique digits available in a <a href="https://en.wikipedia.org/wiki/Numeral_system" style="text-decoration: underline;">numeral system</a>.</p></li>
    <li><p>For example:</p>
        <ul>
            <li><p><b>Base 10 (Decimal)</b>: Uses 10 digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9).</p></li>
            <li><p><b>Base 2 (Binary)</b>: Uses 2 digits (0, 1).</p>
            <li><p><b>Base 16 (Hexadecimal)</b>: Uses 16 digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D ,E, F).</p></li>
        </ul>
    </li>
</ul>

<h2>How Does it Work?</h2>

<ol>
    <li>
        <p><b>Position Notation</b>:</p>
        <ul>
            <li><p>In a base system, the value of each digit depends on its position (place value).</p></li>
            <li><p>Each position represents a power of the base.</li>
            <li>
                <p>For example, in <b>Base 10</b>, the number <b>245</b> is calculated as:</p>
                <p style="padding-left: 2em;">2 &times; 10<sup>2</sup> + 4 &times; 10<sup>1</sup> + 5 &times; 10<sup>0</sup> = 200 + 40 + 5 = 245</p>
            </li>
        </ul>
    </li>
    <li>
        <p><b>Digits Used</b>:</p>
        <ul>
            <li><p>The digits in a base system range from <b>0</b> to <b>Base - 1</b>.</p>
            <li><p>For example:</p>
                <ul>
                    <li><p>In <b>Base 5</b>, the digits are 0, 1, 2, 3, 4.</p></li>
                    <li><p>In <b>Base 12</b>, the digits are 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B.</p></li>
                </ul>
            </li>
        </ul>
    </li>
    <li>
        <p><b>Conversion Between Bases</b>:</p>
        <ul>
            <li><p>Numbers can be converted from one base to another using mathematical methods.</p>
            <li>
                <p>For example, to convert <b>1010</b> (Binary, Base 2) to <b>Decimal (Base 10)</b>:</p>
                <p style="padding-left: 2em;">1 &times; 2<sup>3</sup> + 0 &times; 2<sup>2</sup> + 1 &times; 2<sup>1</sup> + 0 &times; 2<sup>0</sup> = 8 + 0 + 2 + 0 = 10</p>
        </ul>
    </li>
</ol>

<hr />

<h2>Common Base and Their Uses</h2>

<table style="border-collapse: collapse; width: 100%; background-color: #1e1e1e;">
    <tr>
        <th style="border: 1px solid black; padding: 8px; background-color: #333; color: white;">Base</th>
        <th style="border: 1px solid black; padding: 8px; background-color: #333; color: white;">Name</th>
        <th style="border: 1px solid black; padding: 8px; background-color: #333; color: white;">Digit Used</th>
        <th style="border: 1px solid black; padding: 8px; background-color: #333; color: white;">Common Use</th>
    </tr>
    <tr>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">2</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Binary</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">0, 1</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Computers, digital system</td>
    </tr>
    <tr>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">8</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Octal</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">0, 1, 2, 3, 4, 5, 6, 7</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Legacy computing systems</td>
    </tr>
    <tr>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">10</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Decimal</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Everyday counting, mathematics</td>
    </tr>
    <tr>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">12</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Duodecimal</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Timekeeping (12-hour, clock), measurements</td>
    </tr>
    <tr>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">16</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Hexadecimal</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F</td>
        <td style="border: 1px solid black; padding: 8px; background-color: #2a2a2a; color: white;">Programming, memory addressing</td>
    </tr>
</table>

<hr />

<h2>Why Are Bases Important?</h2>

<ol>
    <li>
        <p><b>Computing</b>:</p>
        <ul>
            <li><p>Computers use <b>Base 2 (Binary)</b> because it aligns with their on/off (0/1) circuitry.</p>
            <li><p><b>Base 16 (Hexadecimal)</b> is used as a shorthand for binary, making it easier for humans to read and write.</p>
        </ul>
    </li>
    <li>
        <p><b>Mathematics</b>:</p>
        <ul>
            <li><p>Different bases are used in number theory, cryptography, and advanced calculations.</p>
        </ul>
    </li>
    <li>
        <p><b>Real-World Applications</b>:</p>
        <ul>
            <li><p><b>Base 12 (Duodecimal)</b> is used in timekeeping (12-hour clock) and measurements (dozens, inches in a foot).</p>
            <li><P><b>Base 60 (Sexagesimal)</b> is used in time (seconds, minutes) and angles (degrees).</p>
        </ul>
    </li>
</ol>

<h2>Formula for Base Representation</h2>

<p>A number in a given base <i>b</i> can be expressed as:</p>

<p style="padding-left: 2em;">d<sub>n</sub> &times; b<sup>n</sup> + d<sub>n-1</sub> &times; b<sup>n-1</sup> + ⋯ + d<sub>0</sub> &times; b<sup>0</sup></sup>

<p>where:</p>

<ul>
    <li><p>d = digits in number,</p></li>
    <li><p>b = base,</p></li>
    <li><p>n = position of digit (starting from 0 on the right).</p></li>
</ul>

<h3>Example: Base 5</h3>

<ul>
    <li><p>Digits: 0, 1, 2, 3, 4</p></li>
    <li>
        <p>The number <b>123</b> in base 5 is calculated as:</p>
        <p style="padding-left: 2em;">1 &times; 5<sup>2</sup> + 2 &times; 5<sup>1</sup> + 3 &times; 5<sup>0</sup> = 25 + 10 + 8 = 38 (Decimal)</p>
    </li>
</ul>
