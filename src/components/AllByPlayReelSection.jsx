import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AllByPlayReelSection.css';
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';
import allbyplayVideo from '../assets/allbyplay_instagram.mp4';

const abpHighlightCards = [
  {
    num: '01',
    title: '360° ARTIST DEVELOPMENT',
    desc: 'Tailored roadmaps, marketing strategy, and long-term ecosystem growth for independent creators.'
  },
  {
    num: '02',
    title: 'STUDIO & MEDIA PRODUCTION',
    desc: 'In-house music production, video direction, acoustic sessions, and brand collaborations.'
  },
  {
    num: '03',
    title: 'TEAM & COMMUNITY',
    desc: 'From an ambitious idea in 2021 to a thriving team of 45+ music media innovators today.'
  }
];

const AllByPlayReelSection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false); // Default sound enabled
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Auto rotate cards every 4 seconds
  useEffect(() => {
    const cardTimer = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % abpHighlightCards.length);
    }, 4000);
    return () => clearInterval(cardTimer);
  }, []);

  // IntersectionObserver for video autoplay & unmuted policy fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = isMuted;
            video.play().catch((err) => {
              console.log("Unmuted autoplay restricted by browser policy, playing muted until user gesture:", err);
              video.muted = true;
              video.play().catch((e) => console.log("Muted autoplay error:", e));
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, [isMuted]);

  // Global user interaction listener to immediately unmute video on first click/tap if sound is ON
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (videoRef.current && !isMuted) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, [isMuted]);

  const toggleMute = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch((err) => {
          console.log("Unmute video play error:", err);
        });
      }
    }
  };

  return (
    <section className="abp-reel-wrapper" id="abp-reel">
      <div className="abp-reel-bg-glow"></div>
      <div className="container ap-section abp-reel-container">
        <div className="ap-label-tag white-text">
          <span className="red-text">ALL BY PLAY</span> / REEL
        </div>

        <div className="ap-insta-grid">
          {/* Left Narrative & Single Card Carousel */}
          <div className="ap-insta-left">
            <h2 className="ap-section-heading white-text">
              <TypewriterText text={"BUILDING ALL BY PLAY.\nTHE MUSIC MEDIA ENTERPRISE."} />
            </h2>
            <p className="ap-insta-desc">
              Take a glimpse inside All By Play — the 360° music consultancy and media ecosystem founded by Dhaval Kothari in 2021, empowering independent artists and creative ventures.
            </p>

            {/* Single Card Showcase (One at a time, borderless & backgroundless) */}
            <div className="ap-single-card-container">
              <AnimatePresence mode="wait">
                {abpHighlightCards
                  .filter((_, idx) => idx === activeCardIndex)
                  .map((card) => (
                    <motion.div
                      key={card.num}
                      className="ap-single-card-item"
                      initial={{ opacity: 0, x: -30, y: 10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 30, y: -10 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className="ap-single-card-header">
                        <span className="ap-single-num">{card.num}</span>
                        <span className="ap-single-slash">/</span>
                        <span className="ap-single-total">03</span>
                      </div>
                      <h3 className="ap-single-title">{card.title}</h3>
                      <p className="ap-single-desc">{card.desc}</p>
                    </motion.div>
                  ))}
              </AnimatePresence>

              {/* Navigation Pills / Indicators */}
              <div className="ap-single-pills">
                {abpHighlightCards.map((_, idx) => (
                  <button
                    key={idx}
                    className={`ap-single-pill ${activeCardIndex === idx ? 'active-pill' : ''}`}
                    onClick={() => setActiveCardIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <span className="ap-pill-progress"></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="ap-insta-cta">
              <MagneticButton
                text="Follow @allbyplay"
                href="https://www.instagram.com/allbyplay/?hl=en"
                lightTheme={true}
              />
            </div>
          </div>

          {/* Right Side: Clean Smartphone Frame with Smooth Hover & Click Size Expansion */}
          <div className="ap-insta-right">
            <div 
              className="ap-phone-container"
              onClick={toggleMute}
              title="Click phone to toggle sound & zoom"
            >
              {/* Floating Outside Sound Control Badge */}
              <button 
                className={`ap-outside-sound-toggle ${!isMuted ? 'active-sound' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute(e);
                }}
                aria-label="Toggle Sound"
              >
                <span className="ap-sound-icon">{isMuted ? '🔇' : '🔊'}</span>
                <span className="ap-sound-label">{isMuted ? 'MUTED' : 'SOUND ON'}</span>
              </button>

              {/* Smartphone Frame */}
              <div className="ap-phone-body">
                {/* Dynamic Island Notch */}
                <div className="ap-phone-notch">
                  <span className="ap-camera-lens"></span>
                  <span className="ap-sensor-dot"></span>
                </div>

                {/* Speaker Earphone */}
                <div className="ap-phone-speaker"></div>

                {/* Clean Screen Display with Video Only */}
                <div className="ap-phone-screen">
                  <video
                    ref={videoRef}
                    className="ap-phone-video"
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                  >
                    <source src={allbyplayVideo} type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Glow and Shadow */}
              <div className="ap-phone-glow"></div>
              <div className="ap-phone-shadow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllByPlayReelSection;
