import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ArtistSection.css';
import dhavalMusicImg from '../assets/dhaval_music.webp';
import MagneticButton from './MagneticButton';

const ArtistSection = () => {
  const headingRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 85%", "end 35%"]
  });

  const color1 = useTransform(scrollYProgress, [0, 0.25], ["rgba(245, 245, 243, 0.40)", "#F5F5F3"]);
  const color2 = useTransform(scrollYProgress, [0.25, 0.5], ["rgba(245, 245, 243, 0.40)", "#F5F5F3"]);
  const color3 = useTransform(scrollYProgress, [0.5, 0.75], ["rgba(245, 245, 243, 0.40)", "#F5F5F3"]);
  const color4 = useTransform(scrollYProgress, [0.75, 1], ["rgba(245, 245, 243, 0.40)", "#F5F5F3"]);

  return (
    <motion.section 
      className="artist-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="section-label top-label">
          <span className="text-red">02</span> / <span className="text-white">MAKE</span>
        </div>
        
        <div className="artist-container">
          <a href="#artist" className="artist-image-container">
            <img 
              src={dhavalMusicImg} 
              alt="Gujarati Pop Artist Dhaval Kothari" 
              className="artist-image"
              loading="lazy"
              decoding="async"
              width="454"
              height="792"
            />
            <div className="red-overlay"></div>
          </a>
          
          <div className="artist-content">
            <h2 className="artist-reveal-heading" ref={headingRef}>
              <motion.div style={{ color: color1 }}>GUJARATI</motion.div>
              <motion.div style={{ color: color2 }}>POP,</motion.div>
              <motion.div style={{ color: color3 }}>MADE</motion.div>
              <motion.div style={{ color: color4 }}>PERSONAL.</motion.div>
            </h2>
            
            <div className="artist-details">
              <span className="red-subtitle">LATEST RELEASE</span>
              <h3>LIVE FOLKTALE SERIES</h3>
              <p>
                Taking Gujarati Indie Pop to the global stage,<br />
                connecting diaspora across India, USA, UK and Canada.
              </p>
              
              <div className="artist-actions">
                <a 
                  href="https://www.youtube.com/watch?v=nsS1EQqn8bY&list=RDnsS1EQqn8bY&start_radio=1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="listen-btn"
                >
                  LISTEN TO THE LATEST RELEASE ON YOUTUBE
                </a>
                <MagneticButton 
                  href="https://open.spotify.com/artist/2Nu84CgIbMyb8wgAg3xLEt" 
                  text="Explore Music on Spotify" 
                  lightTheme={true} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ArtistSection;
