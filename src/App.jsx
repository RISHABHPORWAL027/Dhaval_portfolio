import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatementSection from './components/StatementSection'
import VenturesSection from './components/VenturesSection'
import ArtistSection from './components/ArtistSection'
import Marquee from './components/Marquee'
import InstagramSection from './components/InstagramSection'
import Footer from './components/Footer'

// Route-level Code Splitting: Lazy-load subpages to keep initial home bundle minimal
import { prefetchRoute } from './lib/prefetch';

const FounderPage = React.lazy(() => import('./components/FounderPage'));
const ArtistPage = React.lazy(() => import('./components/ArtistPage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));


const PageLoader = () => (
  <div style={{
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-bg, #0a0a0a)'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '2px solid rgba(255,255,255,0.1)',
      borderTopColor: 'var(--color-red, #ff2a2a)',
      borderRadius: '50%',
      animation: 'appPageSpin 0.7s linear infinite'
    }} />
    <style>{`@keyframes appPageSpin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

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

  // Idle prefetch: warm cache for other subpages after first load is interactive
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          prefetchRoute('founder');
          prefetchRoute('artist');
          prefetchRoute('contact');
        });
      } else {
        prefetchRoute('founder');
        prefetchRoute('artist');
        prefetchRoute('contact');
      }
    }, 3000);

    return () => clearTimeout(idleTimer);
  }, []);

  const isFounderPage = currentHash === '#founder' || currentHash === '#portfolio';
  const isArtistPage = currentHash === '#artist';
  const isContactPage = currentHash === '#contact';

  return (
    <>
      <Navbar />
      <React.Suspense fallback={<PageLoader />}>
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
      </React.Suspense>
      <Footer hideCta={isArtistPage || isContactPage} />
    </>
  );
}

export default App
