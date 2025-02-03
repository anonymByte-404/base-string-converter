import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Features from './components/Features'
import HowToUse from './components/HowToUse'

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Home />
        <Features />
        <HowToUse />
      </main>
      <Footer />
    </Router>
  )
}
