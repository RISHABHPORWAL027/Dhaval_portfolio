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
