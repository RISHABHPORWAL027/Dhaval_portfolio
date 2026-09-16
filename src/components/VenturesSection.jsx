import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './VenturesSection.css';
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';

const VenturesSection = () => {
  const listRef = useRef(null);

  const { scrollYProgress: listScroll } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 40%"]
  });

  const color1 = useTransform(listScroll, [0, 0.2, 0.4], ["#050505", "#E60000", "#050505"]);
  const color2 = useTransform(listScroll, [0.3, 0.5, 0.7], ["#050505", "#E60000", "#050505"]);
  const color3 = useTransform(listScroll, [0.6, 0.8, 1], ["#050505", "#E60000", "#050505"]);

  return (
    <section className="ventures-section" id="ventures">
      <div className="container ventures-container">
        <div className="ventures-content">
          <div className="section-label">
            <span className="text-red">01</span> / <span className="text-black">BUILD</span>
          </div>
          <h2>
            <TypewriterText text="IDEAS" /><br />
            <TypewriterText text="BECOME" /><br />
            <TypewriterText text="REAL WHEN" /><br />
            <TypewriterText text="SOMEONE IS" /><br />
            <TypewriterText text="WILLING TO" /><br />
            <TypewriterText text="BUILD THEM." />
          </h2>
          <p>
            From conceptualizing new ventures to<br />
            fostering cultural movements. A track record<br />
            of turning ambitious ideas into sustainable<br />
            realities.
          </p>
          <MagneticButton href="#founder" text="View founder profile" />
        </div>
        <div className="ventures-list-container" ref={listRef}>
          <ul className="ventures-list">
            <motion.li style={{ color: color1 }} whileHover={{ color: "#E60000" }}>
              <span className="list-num">01</span> <span className="list-text">VENTURES</span>
            </motion.li>
            <motion.li style={{ color: color2 }} whileHover={{ color: "#E60000" }}>
              <span className="list-num">02</span> <span className="list-text">CULTURE</span>
            </motion.li>
            <motion.li style={{ color: color3 }} whileHover={{ color: "#E60000" }}>
              <span className="list-num">03</span> <span className="list-text">COLLABORATION</span>
            </motion.li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VenturesSection;
