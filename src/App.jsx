import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatementSection from './components/StatementSection'
import VenturesSection from './components/VenturesSection'
import ArtistSection from './components/ArtistSection'
import Marquee from './components/Marquee'
import Footer from './components/Footer'
import FounderPage from './components/FounderPage'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#about');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#about';
      setCurrentHash(hash);
      
      if (hash === '#founder' || hash === '#about' || hash === '') {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Navbar />
      {currentHash === '#founder' ? (
        <FounderPage />
      ) : (
        <>
          <HeroSection />
          <StatementSection />
          <VenturesSection />
          <ArtistSection />
          <Marquee />
        </>
      )}
      <Footer />
    </>
  )
}

export default App
