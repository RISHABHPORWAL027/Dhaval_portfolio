import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';

const Footer = ({ hideCta = false }) => {
  return (
    <footer className={`footer-section ${hideCta ? 'no-cta' : ''}`}>
      {!hideCta && (
        <>
          <div className="hero-bg-snake" style={{ zIndex: 0, top: '40%' }}>
            <svg width="100%" height="400" viewBox="0 0 2000 400" preserveAspectRatio="none">
              <motion.path
                d="M0,200 C200,400 300,0 500,200 C700,400 800,0 1000,200 C1200,400 1300,0 1500,200 C1700,400 1800,0 2000,200"
                fill="none"
                stroke="var(--color-red)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
              <motion.path
                d="M0,100 C300,400 400,0 700,150 C900,400 1100,0 1400,200 C1600,400 1800,0 2000,100"
                fill="none"
                stroke="var(--color-red)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.15 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
                viewport={{ once: true }}
              />
            </svg>
          </div>
          <div className="container footer-container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="footer-cta">
              <h2>
                <TypewriterText text="WHAT SHOULD WE" /><br />
                <TypewriterText text="BUILD OR MAKE NEXT?" />
              </h2>
              <p>
                To collaborate on joint ventures, music media or<br />
                creative inquiries
              </p>
              <div className="contact-link">
                <MagneticButton text="START A CONVERSATION" href="#contact" lightTheme={true} />
              </div>
            </div>
          </div>
        </>
      )}
      
      <div className="container footer-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-bottom" style={hideCta ? { borderTop: 'none', paddingTop: 0 } : {}}>
          <div className="footer-logo">
            <a href="#" className="footer-brand-link">
              <img 
                src="/logo_dark.webp" 
                alt="Dhaval Kothari Logo" 
                className="footer-logo-img" 
              />
              <span className="footer-logo-text">DHAVAL KOTHARI</span>
            </a>
            <span className="copyright">© 2026 All rights reserved</span>
            <div className="footer-social-icons">
              <a 
                href="https://www.linkedin.com/in/dhaval-kothari-07ab73ba/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="footer-social-link"
                title="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M5.07 18.5h2.79v-8.37H5.07v8.37z" />
                </svg>
              </a>
              <a 
                href="https://x.com/kotharidhaval24" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="X (Twitter)" 
                className="footer-social-link"
                title="X"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/dhavalkothariofficial/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="footer-social-link"
                title="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="https://open.spotify.com/artist/2Nu84CgIbMyb8wgAg3xLEt" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Spotify" 
                className="footer-social-link"
                title="Spotify"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.793-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.496 9.722 1.122.294.18.386.562.207.857zm1.226-2.724c-.226.367-.706.482-1.072.257-2.69-1.654-6.79-2.133-9.97-1.168-.413.126-.848-.109-.973-.522-.126-.413.11-.848.522-.973 3.632-1.102 8.147-.568 11.237 1.332.366.226.481.706.256 1.073zm.116-2.835C14.7 8.87 8.9 8.68 5.53 9.7c-.5.15-1.03-.13-1.18-.63-.15-.5.13-1.03.63-1.18 3.88-1.18 10.27-.96 14.07 1.3 0.45.27.6.86.33 1.31-.27.46-.86.6-1.31.33z" />
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/c/DhavalKothari" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube" 
                className="footer-social-link"
                title="YouTube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-credits">
            Design and Developed by{' '}
            <a 
              href="https://www.linkedin.com/in/radhika-khade2004/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              RK
            </a>{' '}
            &{' '}
            <a 
              href="https://www.devyugsolutions.com/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Devyug Solutions
            </a>
          </div>

          <ul className="footer-links">
            <li><a href="#founder">FOUNDER</a></li>
            <li><a href="#artist">ARTIST</a></li>
            <li><a href="#contact">CONTACT</a></li>
            <li>
              <a 
                href="https://www.youtube.com/c/DhavalKothari" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LISTEN <span className="red-dot small"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
