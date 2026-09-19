import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatementSection from './components/StatementSection'
import VenturesSection from './components/VenturesSection'
import ArtistSection from './components/ArtistSection'
import Marquee from './components/Marquee'
import InstagramSection from './components/InstagramSection'
import Footer from './components/Footer'
import FounderPage from './components/FounderPage'
import ArtistPage from './components/ArtistPage'

import ContactPage from './components/ContactPage'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '';
      setCurrentHash(hash);
      
      if (hash === '#founder' || hash === '#portfolio' || hash === '#artist' || hash === '#contact' || hash === '' || hash === '#home' || hash === '#about') {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isFounderPage = currentHash === '#founder' || currentHash === '#portfolio';
  const isArtistPage = currentHash === '#artist';
  const isContactPage = currentHash === '#contact';

  return (
    <>
      <Navbar />
      {isFounderPage ? (
        <FounderPage />
      ) : isArtistPage ? (
        <ArtistPage />
      ) : isContactPage ? (
        <ContactPage />
      ) : (
        <>
          <HeroSection />
          <StatementSection />
          <VenturesSection />
          <ArtistSection />
          <Marquee />
          <InstagramSection />
        </>
      )}
      <Footer hideCta={isArtistPage || isContactPage} />
    </>
  );
}

export default App
