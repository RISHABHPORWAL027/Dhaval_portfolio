import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FounderCarousel.css';

const founderImages = [
  {
    src: '/founder/dhaval-1.webp',
    alt: 'Dhaval Kothari - Founder, All By Play',
  },
  {
    src: '/founder/dhaval-2.webp',
    alt: 'Dhaval Kothari - Creative Direction & Strategy',
  },
  {
    src: '/founder/dhaval-3.webp',
    alt: 'Dhaval Kothari - Artist & Entrepreneur',
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction >= 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 260, damping: 28 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction) => ({
    x: direction >= 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 260, damping: 28 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  }),
};

const FounderCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Preload images for instantaneous transitions
  useEffect(() => {
    founderImages.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  const paginate = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let nextIndex = prev + newDirection;
        if (nextIndex >= founderImages.length) {
          nextIndex = 0;
        } else if (nextIndex < 0) {
          nextIndex = founderImages.length - 1;
        }
        return nextIndex;
      });
    },
    []
  );

  const goToSlide = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Auto sliding carousel (every 3.8s, paused on hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 3800);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, paginate]);

  return (
    <div
      className="fp-carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Founder photo gallery carousel"
    >
      {/* Slide Counter Badge */}
      <div className="fp-carousel-badge">
        <span className="badge-active">0{currentIndex + 1}</span>
        <span className="badge-divider">/</span>
        <span className="badge-total">0{founderImages.length}</span>
      </div>

      {/* Slide Track */}
      <div className="fp-carousel-track">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipe = Math.abs(info.offset.x) * info.velocity.x;
              if (swipe < -8000 || info.offset.x < -45) {
                paginate(1);
              } else if (swipe > 8000 || info.offset.x > 45) {
                paginate(-1);
              }
            }}
            className="fp-carousel-slide"
          >
            <img
              src={founderImages[currentIndex].src}
              alt={founderImages[currentIndex].alt}
              className="fp-carousel-img"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle overlay gradient */}
      <div className="fp-carousel-overlay" />

      {/* Prev / Next navigation buttons */}
      <button
        type="button"
        className="fp-carousel-arrow fp-carousel-prev"
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        className="fp-carousel-arrow fp-carousel-next"
        onClick={() => paginate(1)}
        aria-label="Next slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Bottom Controls / Pill indicators */}
      <div className="fp-carousel-controls">
        {founderImages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`fp-carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FounderCarousel;
