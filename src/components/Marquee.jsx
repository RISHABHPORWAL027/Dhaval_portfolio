import React from 'react';
import './Marquee.css';

const Marquee = () => {
  const text = "— ARTIST — BUILDER — STORYTELLER — FOUNDER ";
  
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <span>{text}{text}</span>
        <span>{text}{text}</span>
      </div>
    </div>
  );
};

export default Marquee;
