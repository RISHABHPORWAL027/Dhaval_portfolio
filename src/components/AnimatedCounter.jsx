import React, { useEffect, useState, useRef } from 'react';

const AnimatedCounter = ({ end, suffix = '', decimals = 0, duration = 2500 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // using easeOutQuad for smoother animation
            const easeOutProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = easeOutProgress * end;
            setCount(decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => observer.disconnect();
  }, [end, duration, decimals]);
  
  return <span ref={countRef}>{count}{suffix}</span>;
};

export default AnimatedCounter;
