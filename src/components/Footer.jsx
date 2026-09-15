import React from 'react';
import './Footer.css';
import TypewriterText from './TypewriterText';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-cta">
          <h2>
            <TypewriterText text="WHAT SHOULD WE" /><br />
            <TypewriterText text="BUILD OR MAKE NEXT?" />
          </h2>
          <p>
            To collaborate on joint ventures, music media or<br />
            creative inquiries
          </p>
          <a href="#contact" className="contact-link">
            <span className="red-dot"></span> START A CONVERSATION →
          </a>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-logo">
            <a href="#">DHAVAL KOTHARI</a>
            <span className="copyright">© {new Date().getFullYear()} All rights reserved</span>
          </div>
          <ul className="footer-links">
            <li><a href="#founder">FOUNDER</a></li>
            <li><a href="#artist">ARTIST</a></li>
            <li><a href="#contact">CONTACT</a></li>
            <li><a href="#listen">LISTEN <span className="red-dot small"></span></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
