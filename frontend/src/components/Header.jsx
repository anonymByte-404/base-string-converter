import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <h1>Base String Converter</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/features">Key Features</Link>
        </li>
        <li>
          <Link to="/how-to-use">How to use</Link>
        </li>
      </ul>
    </header>
  )
}
