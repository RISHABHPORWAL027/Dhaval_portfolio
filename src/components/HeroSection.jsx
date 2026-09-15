import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
import founderImage from '../assets/founder_image.png'; // Swapped image
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
