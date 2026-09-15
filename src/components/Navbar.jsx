import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeHash, setActiveHash] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Set initial hash
    setActiveHash(window.location.hash || '#about');

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
      setIsMenuOpen(false); // Close menu on navigation
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <nav className="navbar container">
      <div className="navbar-logo">
        <a href="#">DHAVAL KOTHARI</a>
      </div>
      
      <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✕' : '⋮'}
      </button>

      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li><a href="#about" className={activeHash === '#about' ? 'active' : ''}>About</a></li>
        <li><a href="#founder" className={activeHash === '#founder' ? 'active' : ''}>Founder</a></li>
        <li><a href="#artist" className={activeHash === '#artist' ? 'active' : ''}>Artist</a></li>
        <li><a href="#contact" className={activeHash === '#contact' ? 'active' : ''}>Contact</a></li>
        <li>
          <a href="#listen" className="navbar-listen-btn">
            <span className="play-icon">▶</span> Listen
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
