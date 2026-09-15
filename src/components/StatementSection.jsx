import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './StatementSection.css';
import TypewriterText from './TypewriterText';

const StatementSection = () => {
  const buildMakeRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: buildMakeRef,
    offset: ["start 85%", "end 35%"]
  });

  const buildColor = useTransform(scrollYProgress, [0, 0.5], ["rgba(245, 245, 243, 0.40)", "#F5F5F3"]);
  const makeColor = useTransform(scrollYProgress, [0.5, 1], ["rgba(245, 245, 243, 0.40)", "#F5F5F3"]);

  return (
    <motion.section 
      className="statement-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container statement-container">
        <div className="statement-content">
          <h2>
            <TypewriterText text="ONE PERSON." /><br />
            <TypewriterText text="TWO PRACTICES." /><br />
            <span className="highlight-red"><TypewriterText text="ONE CREATIVE DIRECTION." /></span>
          </h2>
          <p>
            As a founder, Dhaval builds ideas, ventures and collaborations. As an artist, he creates Gujarati pop rooted in identity, emotion and contemporary culture.
          </p>
        </div>
        <div className="statement-features" ref={buildMakeRef}>
          <div className="feature-item">
            <motion.h3 style={{ color: buildColor }}>BUILD</motion.h3>
          </div>
          <div className="feature-item">
            <motion.h3 style={{ color: makeColor }}>MAKE</motion.h3>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StatementSection;
