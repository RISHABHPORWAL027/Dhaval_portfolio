import React, { useState, useEffect } from 'react';
import './Navbar.css';

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
          className={activeHash === '' || activeHash === '#' || activeHash === '#home' || activeHash === '#about' ? 'active' : ''}
        >
          DHAVAL KOTHARI
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
          <a href="#founder" className={activeHash === '#founder' || activeHash === '#portfolio' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Founder</a>
        </li>
        <li style={{ transitionDelay: isMenuOpen ? '0.1s' : '0s' }}>
          <a href="#artist" className={activeHash === '#artist' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Artist</a>
        </li>
        <li style={{ transitionDelay: isMenuOpen ? '0.15s' : '0s' }}>
          <a href="#contact" className={activeHash === '#contact' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Contact</a>
        </li>
        <li style={{ transitionDelay: isMenuOpen ? '0.2s' : '0s' }}>
          <a 
            href="https://open.spotify.com/artist/2Nu84CgIbMyb8wgAg3xLEt" 
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
