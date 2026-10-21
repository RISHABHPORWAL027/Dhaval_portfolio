import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './MagneticButton.css';

const MagneticButton = ({ text, href, lightTheme = false, target, rel, download, icon = 'arrow', onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

  return (
    <motion.a
      href={href}
      download={download}
      onClick={onClick}
      target={target || (isExternal ? '_blank' : undefined)}
      rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`magnetic-btn ${lightTheme ? 'light' : ''}`}
    >
      <div className="magnetic-circle">
        {icon === 'download' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="magnetic-arrow">
            <path d="M12 4v11m0 0l-4.5-4.5m4.5 4.5l4.5-4.5M4 19h16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="magnetic-arrow">
            <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="magnetic-text">{text}</span>
    </motion.a>
  );
};

export default MagneticButton;
