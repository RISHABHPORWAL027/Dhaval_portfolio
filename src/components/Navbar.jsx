import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { prefetchRoute } from '../lib/prefetch';

const Navbar = () => {
  const [activeHash, setActiveHash] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Set initial hash
    setActiveHash(window.location.hash || '');

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
      setIsMenuOpen(false); // Close menu on navigation
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar container">
      <div className="navbar-logo">
        <a 
          href="#" 
          aria-label="Dhaval Kothari"
          className={activeHash === '' || activeHash === '#' || activeHash === '#home' || activeHash === '#about' ? 'active' : ''}
        >
          <img 
            src="/logo_dark.webp" 
            alt="Dhaval Kothari Logo" 
            className="navbar-logo-img" 
          />
          <span className="navbar-logo-text">DHAVAL KOTHARI</span>
        </a>
      </div>
      
      <button 
        className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className="kebab-icon">{isMenuOpen ? '✕' : '⋮'}</span>
      </button>

      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li style={{ transitionDelay: isMenuOpen ? '0.02s' : '0s' }}>
          <a href="#" className={activeHash === '' || activeHash === '#' || activeHash === '#home' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Home</a>
        </li>
        <li style={{ transitionDelay: isMenuOpen ? '0.05s' : '0s' }}>
          <a 
            href="#founder" 
            className={activeHash === '#founder' || activeHash === '#portfolio' ? 'active' : ''} 
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={() => prefetchRoute('founder')}
            onTouchStart={() => prefetchRoute('founder')}
          >
            Founder
          </a>
        </li>
        <li style={{ transitionDelay: isMenuOpen ? '0.1s' : '0s' }}>
          <a 
            href="#artist" 
            className={activeHash === '#artist' ? 'active' : ''} 
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={() => prefetchRoute('artist')}
            onTouchStart={() => prefetchRoute('artist')}
          >
            Artist
          </a>
        </li>
        <li style={{ transitionDelay: isMenuOpen ? '0.15s' : '0s' }}>
          <a 
            href="#contact" 
            className={activeHash === '#contact' ? 'active' : ''} 
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={() => prefetchRoute('contact')}
            onTouchStart={() => prefetchRoute('contact')}
          >
            Contact
          </a>
        </li>
        <li style={{ transitionDelay: isMenuOpen ? '0.2s' : '0s' }}>
          <a 
            href="https://www.youtube.com/c/DhavalKothari" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="navbar-listen-btn" 
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="play-icon">▶</span> Listen
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
