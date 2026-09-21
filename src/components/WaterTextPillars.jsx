import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './WaterTextPillars.css';

const pillarsData = [
  { id: 'p1', text: 'MEWATI GHARANA', type: 'text' },
  { id: 'd1', text: '•', type: 'dot' },
  { id: 'p2', text: 'HINDUSTANI CLASSICAL', type: 'text' },
  { id: 'd2', text: '•', type: 'dot' },
  { id: 'p3', text: 'CONTEMPORARY GUJARATI POP', type: 'text' }
];

const WaterTextPillars = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [cycle, setCycle] = useState(0);

  // Auto-repeat loop timing:
  // MEWATI GHARANA (1.6s) -> dot (0.35s) -> HINDUSTANI CLASSICAL (1.6s) -> dot (0.35s) -> CONTEMPORARY GUJARATI POP (1.6s)
  // Total fill time = 0.2 + 1.6 + 0.35 + 1.6 + 0.35 + 1.6 = 5.7s
  // Hold fully filled for 1.8s, total cycle = 7.5s before restarting automatically
  useEffect(() => {
    let timer;
    if (isInView) {
      timer = setInterval(() => {
        setCycle((prev) => prev + 1);
      }, 7500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isInView]);

  // Progressive fill animation sequence timings (in seconds)
  const getDelay = (index) => {
    let delay = 0.2;
    for (let i = 0; i < index; i++) {
      delay += pillarsData[i].type === 'dot' ? 0.35 : 1.6;
    }
    return delay;
  };

  const fillVariants = {
    hidden: { width: '0%' },
    visible: (index) => ({
      width: '100%',
      transition: {
        duration: pillarsData[index].type === 'dot' ? 0.35 : 1.6,
        delay: getDelay(index),
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <div className="ap-pillars-water-container" ref={containerRef}>
      <div className="ap-pillars-row" key={cycle}>
        {pillarsData.map((item, index) => {
          if (item.type === 'dot') {
            return (
              <div key={`${item.id}-${cycle}`} className="water-dot-wrap">
                <span className="water-dot-base">•</span>
                <motion.div
                  className="water-dot-overlay"
                  custom={index}
                  variants={fillVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <span className="water-dot-red">•</span>
                </motion.div>
              </div>
            );
          }

          return (
            <div key={`${item.id}-${cycle}`} className="water-pillar-wrap">
              {/* Base text in solid black */}
              <h3 className="water-text-base">{item.text}</h3>

              {/* Water progress fill overlay clipped strictly to text (without edge line) */}
              <motion.div
                className="water-fill-overlay"
                custom={index}
                variants={fillVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {/* Red text with animated liquid water gradient */}
                <h3 className="water-text-red">{item.text}</h3>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WaterTextPillars;
