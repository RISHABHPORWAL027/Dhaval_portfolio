import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
import founderImage from '../assets/founder_image.png'; // Swapped image
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';

const HeroSection = () => {
  return (
    <div className="hero-wrapper">
      {/* Background Floating Snake Lines - Full Width */}
      <div className="hero-bg-snake">
        <svg width="100%" height="400" viewBox="0 0 2000 400" preserveAspectRatio="none">
          {/* Line 1 */}
          <motion.path
            d="M0,200 C200,400 300,0 500,200 C700,400 800,0 1000,200 C1200,400 1300,0 1500,200 C1700,400 1800,0 2000,200"
            fill="none"
            stroke="var(--color-red)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.15 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          {/* Line 2 (Offset and slightly different curve) */}
          <motion.path
            d="M0,100 C300,400 400,0 700,150 C900,400 1100,0 1400,200 C1600,400 1800,0 2000,100"
            fill="none"
            stroke="var(--color-red)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>

      <motion.section 
        className="hero-section container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
      <div className="hero-content">
        <h1 className="hero-heading">
          <TypewriterText text="BUILDING" /><br />
          <TypewriterText text="AND MAKING" /><span className="red-dot-blink">.</span>
        </h1>
        <p className="hero-label">FOUNDER / ARTIST / GUJARATI POP</p>
        <p className="hero-description">
          Dhaval Kothari is a founder and Gujarati pop artist working across culture, business and music.
        </p>
        <MagneticButton href="#projects" text="Explore Our Projects" />
      </div>
      <div className="hero-image-container">
        <div className="hero-image-inner">
          <img 
            src={founderImage} 
            alt="Dhaval Kothari" 
            className="hero-image" 
          />
        </div>
      </div>
    </motion.section>
    </div>
  );
};

export default HeroSection;
