import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InstagramSection.css';
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';
import instagramVideo from '../assets/instagram.mp4';

const highlightCardsData = [
  {
    num: '01',
    title: 'BEHIND THE SCENES',
    desc: 'Raw studio composition sessions & vocal tracking'
  },
  {
    num: '02',
    title: 'UNPLUGGED REELS',
    desc: 'Acoustic Gujarati folk variations & live snippet covers'
  },
  {
    num: '03',
    title: 'COMMUNITY VIBES',
    desc: 'Fan creations, live Garba energy & tour updates'
  }
];

const InstagramSection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false); // Default sound enabled
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Auto rotate highlight cards every 4 seconds (smooth & slow)
  useEffect(() => {
    const cardTimer = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % highlightCardsData.length);
    }, 4000);
    return () => clearInterval(cardTimer);
  }, []);

  // IntersectionObserver for Video Autoplay & Mute policy fallback
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
              // Browser policy fallback: if unmuted autoplay is blocked, play muted automatically
              console.log("Unmuted autoplay restricted by browser policy, falling back to muted autoplay:", err);
              video.muted = true;
              setIsMuted(true);
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
  }, []);

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
    <section className="ap-instagram-wrapper" id="instagram">
      <div className="ap-instagram-bg-glow"></div>
      <div className="container ap-section ap-instagram-container">
        <div className="ap-label-tag white-text">
          <span className="red-text">INSTAGRAM</span> / COMMUNITY
        </div>

        <div className="ap-insta-grid">
          {/* Left Creative Narrative & Single Card Carousel */}
          <div className="ap-insta-left">
            <h2 className="ap-section-heading white-text">
              <TypewriterText text={"BEHIND THE CURTAIN.\nDAILY FOLK & LIFE."} />
            </h2>
            <p className="ap-insta-desc">
              Step inside Dhaval Kothari's personal creative world on Instagram. From unreleased acoustic snippets and backstage concert energy to impromptu folk jams and tour life.
            </p>

            {/* Single Card Showcase (One at a time, borderless & backgroundless) */}
            <div className="ap-single-card-container">
              <AnimatePresence mode="wait">
                {highlightCardsData
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
                {highlightCardsData.map((_, idx) => (
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
                text="Follow @dhavalkothariofficial"
                href="https://www.instagram.com/dhavalkothariofficial/?hl=en"
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
                    <source src={instagramVideo} type="video/mp4" />
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

export default InstagramSection;
