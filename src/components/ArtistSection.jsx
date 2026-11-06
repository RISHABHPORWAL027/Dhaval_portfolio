import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './ArtistSection.css';
import dhavalMusicImg from '../assets/dhaval_music.webp';
import MagneticButton from './MagneticButton';

const artistImages = [
  {
    src: dhavalMusicImg,
    alt: 'Gujarati Pop Artist Dhaval Kothari - Live Folktale Series',
    position: 'center 20%',
  },
  {
    src: '/founder/dhaval-7.jpg',
    alt: 'Gujarati Pop Artist Dhaval Kothari - Spotlight',
    position: 'center 25%',
  },
  {
    src: '/founder/dhaval-new.png',
    alt: 'Gujarati Pop Artist Dhaval Kothari - Contemporary Pop',
    position: 'center 35%',
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const ArtistSection = () => {
  const headingRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Preload images for instantaneous transitions
  useEffect(() => {
    artistImages.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  const paginate = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let nextIndex = prev + newDirection;
        if (nextIndex >= artistImages.length) {
          nextIndex = 0;
        } else if (nextIndex < 0) {
          nextIndex = artistImages.length - 1;
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

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  // Auto sliding carousel (every 3.6s, paused on hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 3600);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, paginate]);

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
          <div 
            className="artist-carousel-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="artist-image-container">
              <a href="#artist" className="artist-slide-link" aria-label="View artist gallery and profile">
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
                    dragElastic={0.8}
                    onDragEnd={handleDragEnd}
                    className="artist-slide"
                  >
                    <img 
                      src={artistImages[currentIndex].src} 
                      alt={artistImages[currentIndex].alt} 
                      className="artist-image"
                      style={{ objectPosition: artistImages[currentIndex].position }}
                      loading="lazy"
                      decoding="async"
                      width="454"
                      height="454"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="red-overlay"></div>
              </a>

              {/* Slide Counter Badge */}
              <div className="artist-carousel-badge">
                <span className="badge-active">0{currentIndex + 1}</span>
                <span className="badge-divider">/</span>
                <span className="badge-total">0{artistImages.length}</span>
              </div>

              {/* Navigation Arrows */}
              <button 
                type="button"
                className="artist-carousel-arrow prev"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  paginate(-1);
                }}
                aria-label="Previous slide"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button 
                type="button"
                className="artist-carousel-arrow next"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  paginate(1);
                }}
                aria-label="Next slide"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Pagination Dots */}
              <div className="artist-carousel-dots">
                {artistImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`artist-dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      goToSlide(idx);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
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
