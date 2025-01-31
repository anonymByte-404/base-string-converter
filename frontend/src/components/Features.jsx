import { useState } from 'react'
import FeatureCard from './FeatureCard'

export default function Features() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(1)

  const handleMouseOver = (index) => {
    setActiveFeatureIndex(index)
  }

  return (
    <section id="key-features">
      <h2>Key Features</h2>
      <p>
        <i>
          The base string converter allows easy conversion between "Text to
          Base", "Base to Base", and "Base to Text". Convert text to any base,
          switch between bases, or turn base values back into text, all in
          real-time. With support for custom base conversions and the ability to
          save and edit results, this tool is both flexible and efficient.
          Available as both a web tool and command-line interface, it ensures
          accessibility across platforms.
        </i>
      </p>
      <div className="feature-container">
        <FeatureCard
          title="Text to Base"
          description="Convert plain text into any specified base, such as binary, hexadecimal, or octal, making it easy to work with different encoding formats. This feature is especially useful for developers working with low-level data, encryption, or encoding schemes. Whether you're dealing with raw data or need to represent text in various bases, this tool handles it effortlessly."
          isActive={activeFeatureIndex === 0}
          onMouseOver={() => handleMouseOver(0)}
        />
        <FeatureCard
          title="Base to Base"
          description="Effortlessly switch between different number bases (e.g., binary, decimal, hexadecimal), offering flexibility for diverse mathematical and programming needs. This feature is great for scenarios where you need to convert between bases for calculations, debugging, or formatting data. It ensures that you can work with any base system you require, without the hassle of manual conversions."
          isActive={activeFeatureIndex === 1}
          onMouseOver={() => handleMouseOver(1)}
        />
        <FeatureCard
          title="Base to Text"
          description="Transform base values back into readable text, converting encoded data into its original or human-readable form. Whether you're decoding hexadecimal data, converting binary back to a string, or interpreting other encoded formats, this feature makes it simple. It's perfect for working with encoded messages, file formats, or any situation where base values need to be converted back into text."
          isActive={activeFeatureIndex === 2}
          onMouseOver={() => handleMouseOver(2)}
        />
      </div>
    </section>
  )
}
