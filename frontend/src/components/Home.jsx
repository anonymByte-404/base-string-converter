import React from 'react'

export default function Home() {
  const scrollToNextSection = () => {
    document.getElementById("key-features")?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <section id="home" className="welcome-screen">
      <h2>
        Seamless Base Conversion for Developers & Learners
      </h2>
      <p>
        Convert numbers between binary, octal, decimal, and hexadecimal effortlessly. Whether you're coding or studying number systems, our<br />
        tool ensures fast and accurate conversions in real time.
      </p>
      <button className="ws-btn">Convert Now!</button>
      <div className="scroll-down" onClick={scrollToNextSection}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_iconCarrier">
            <path
              d="M12 4V20M12 20L8 16M12 20L16 16"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </div>
    </section>
  )
}
