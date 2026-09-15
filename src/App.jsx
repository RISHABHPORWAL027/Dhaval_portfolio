import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatementSection from './components/StatementSection'
import VenturesSection from './components/VenturesSection'
import ArtistSection from './components/ArtistSection'
import Marquee from './components/Marquee'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatementSection />
      <VenturesSection />
      <ArtistSection />
      <Marquee />
      <Footer />
    </>
  )
}

export default App
