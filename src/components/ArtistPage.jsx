import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ArtistPage.css';
import TypewriterText from './TypewriterText';
import AnimatedCounter from './AnimatedCounter';
import MagneticButton from './MagneticButton';
import MusicPlayer from './MusicPlayer';
import WaterTextPillars from './WaterTextPillars';
import heroBgVideo from '../assets/herosection_bg.mp4';
import instagramVideo from '../assets/instagram.mp4';
import bgTabGif from '../assets/bg_tab.gif';

const tracks = [
  {
    id: 1,
    num: '01',
    title: 'KAHO POONAM NA',
    subtitle: 'Dhaval Kothari • Folk Remix',
    duration: '3:45',
    totalSeconds: 225,
    tag: 'FOLK REMIX',
    videoId: 'Fx326Ws1MK4',
    link: 'https://youtu.be/Fx326Ws1MK4?si=h83NurOgvYuNtVZq',
    img: 'https://img.youtube.com/vi/Fx326Ws1MK4/hqdefault.jpg',
  },
  {
    id: 2,
    num: '02',
    title: 'RANGLO',
    subtitle: 'Dhaval Kothari • Live Track',
    duration: '4:12',
    totalSeconds: 252,
    tag: 'LIVE TRACK',
    videoId: 'HjwjcW3oqIY',
    link: 'https://youtu.be/HjwjcW3oqIY?si=MczMmE5rRx3NoO-x',
    img: 'https://img.youtube.com/vi/HjwjcW3oqIY/hqdefault.jpg',
  },
  {
    id: 3,
    num: '03',
    title: 'KON HALAVE LIMBDI',
    subtitle: 'Dhaval Kothari • Gujarati Pop',
    duration: '3:18',
    totalSeconds: 198,
    tag: 'GUJ POP',
    videoId: 'GNVsGuHB0cg',
    link: 'https://youtu.be/GNVsGuHB0cg?si=LoUWOLm2sUlGo20m',
    img: 'https://img.youtube.com/vi/GNVsGuHB0cg/hqdefault.jpg',
  },
  {
    id: 4,
    num: '04',
    title: 'MADHANIYA',
    subtitle: 'Dhaval Kothari • Live Record',
    duration: '5:02',
    totalSeconds: 302,
    tag: 'LIVE RECORD',
    videoId: 'eYOB98OZdKw',
    link: 'https://youtu.be/eYOB98OZdKw?si=OLqJ7JoNCCYm0fLE',
    img: 'https://img.youtube.com/vi/eYOB98OZdKw/hqdefault.jpg',
  },
];

const ArtistPage = () => {
  return (
    <div className="artist-page">
      {/* 1. Hero Section */}
      <div className="ap-hero-wrapper">
        {/* Background Video */}
        <video
          className="ap-hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={heroBgVideo} type="video/mp4" />
        </video>
        <div className="ap-hero-video-overlay"></div>

        <section className="container ap-section ap-hero">
          <div className="ap-hero-left">
            <h1 className="ap-hero-title">
              <TypewriterText text={"DHAVAL\nKOTHARI"} />
            </h1>
            <div className="ap-badge-wrapper">
              <span className="ap-badge">GUJARATI POP</span>
            </div>
            <p className="ap-hero-desc">
              Rooted in Gujarati folk and devotional music. Contemporary pop sound.
            </p>
          </div>

          <div className="ap-hero-right">
            <div className="ap-hero-spotify-box">
              <span className="ap-red-label">
                <span className="ap-red-dot"></span> YOUTUBE
              </span>
              <p className="ap-spotify-subtitle">FOLKTALES SERIES & GUJARATI POP</p>
              <div className="ap-spotify-btn-wrap">
                <MagneticButton 
                  text="Watch on YouTube" 
                  href="https://www.youtube.com/watch?v=nsS1EQqn8bY&list=RDnsS1EQqn8bY&start_radio=1" 
                  lightTheme={true} 
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Roots Section */}
      <div className="ap-roots-wrapper">
        {/* Animated Full-Width Snake Line Background */}
        <div className="ap-roots-bg-snake">
          <svg width="100%" height="350" viewBox="0 0 2000 350" preserveAspectRatio="none">
            <motion.path
              d="M0,175 C300,40 500,310 800,175 C1100,40 1300,310 1600,175 C1800,80 1900,270 2000,175"
              fill="none"
              stroke="var(--color-red)"
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </svg>
        </div>

        <section className="container ap-section ap-roots">
          <div className="ap-label-tag">
            <span className="red-text">01</span> / ROOTS
          </div>
          <div className="ap-roots-grid">
            <div className="ap-roots-left">
              <h2 className="ap-section-heading">
                <TypewriterText text={"ROOTED IN TRADITION.\nMADE FOR NOW."} />
              </h2>
            </div>
            <div className="ap-roots-right">
              <p>
                Dhaval Kothari is a contemporary Indian vocalist and composer blending traditional folk and devotional music from Gujarat and Rajasthan with modern pop production.
              </p>
              <p>
                Drawing from classical training in <span className="red-text ap-bold">Mewati Gharana</span>, every track is a dialogue between timeless devotional poetry and the sonic energy of contemporary pop.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Stats Section */}
      <section className="ap-stats-section">
        <div className="container ap-stats-container">
          <div className="ap-stat-card">
            <h3 className="ap-stat-value">
              <AnimatedCounter end={35.9} decimals={1} suffix="M" />
            </h3>
            <p className="ap-stat-caption">COMBINED STREAMS ACROSS PLATFORMS</p>
          </div>
          <div className="ap-stat-card">
            <h3 className="ap-stat-value">
              <AnimatedCounter end={1.89} decimals={2} suffix="M" />
            </h3>
            <p className="ap-stat-caption">MONTHLY LISTENERS ON SPOTIFY</p>
          </div>
          <div className="ap-stat-card">
            <h3 className="ap-stat-value">
              <AnimatedCounter end={160} suffix="K+" />
            </h3>
            <p className="ap-stat-caption">YOUTUBE & SOCIAL COMMUNITY</p>
          </div>
        </div>
      </section>

      {/* 4. Sub-banner */}
      <section className="ap-subbanner">
        <div className="container ap-subbanner-container">
          <div className="ap-subbanner-media">
            <img src={bgTabGif} alt="Creating and Sharing Music Since 2014" className="ap-subbanner-gif" />
          </div>
          <h2 className="ap-subbanner-text">
            <TypewriterText text="CREATING AND SHARING MUSIC SINCE 2014." loop={true} />
          </h2>
        </div>
      </section>

      {/* 5. Discography / Tracklist */}
      <section className="ap-section ap-discography">
        <div className="container">
          <div className="ap-label-tag white-text">
            <span className="red-text">02</span> / DISCOGRAPHY
          </div>
          <h2 className="ap-section-heading white-text">
            <TypewriterText text={"SONGS FROM A LIVING\nTRADITION."} />
          </h2>
          <p className="ap-discography-desc">
            A curated selection of Dhaval Kothari's signature Gujarati pop releases and live folk recordings. Click on any track below to stream real audio directly in the vinyl turntable or watch full music videos.
          </p>

          <MusicPlayer tracks={tracks} />
        </div>
      </section>

      {/* 6. Live Set Section */}
      <section className="container ap-section ap-live">
        <div className="ap-label-tag">
          <span className="red-text">03</span> / LIVE
        </div>
        <div className="ap-live-header">
          <div className="ap-live-title-col">
            <h2 className="ap-section-heading">
              <TypewriterText text={"FOLKTALES SERIES\nLIVE SET"} />
            </h2>
          </div>
          <div className="ap-live-desc-col">
            <p>
              Recorded live with a full acoustic and electric band. A 30-minute set capturing the raw energy and devotional atmosphere of Gujarati folk music reimagined for contemporary stages.
            </p>
          </div>
        </div>

        <div className="ap-video-container">
          <iframe
            className="ap-live-set-iframe"
            src="https://www.youtube-nocookie.com/embed/nsS1EQqn8bY?rel=0&modestbranding=1&playsinline=1"
            title="Folktales Series — Live Set (Dhaval Kothari)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      {/* 7. Live Set Big Banner */}
      <section className="ap-live-banner">
        <div className="container ap-live-banner-content">
          <h2 className="ap-live-banner-red">
            <TypewriterText text="30-MINUTE LIVE SET" />
          </h2>
          <h2 className="ap-live-banner-white">
            <TypewriterText text="SEVEN SONGS" />
          </h2>
          <div className="ap-banner-btn-wrap">
            <a 
              href="https://www.youtube.com/watch?v=nsS1EQqn8bY&list=RDnsS1EQqn8bY&start_radio=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ap-solid-btn"
            >
              <span className="play-icon-sm">▶</span> WATCH SET
            </a>
          </div>
        </div>
      </section>

      {/* 8. Identity & Tradition */}
      <section className="ap-identity-wrapper">
        <div className="container ap-section ap-identity">
          <div className="ap-label-tag">
            <span className="red-text">04</span> / IDENTITY
          </div>
          <div className="ap-identity-grid">
            <div className="ap-identity-left">
              <h2 className="ap-section-heading">
                <TypewriterText text={"MEWATI GHARANA.\nCONTEMPORARY SOUND."} />
              </h2>
            </div>
            <div className="ap-identity-right">
              <p>
                Trained in Hindustani Classical under the Mewati Gharana, Dhaval's vocal technique balances precision and emotional depth. That grounding gives his Gujarati pop releases a rare authenticity — traditional phrasing delivered with contemporary production.
              </p>
            </div>
          </div>

          <WaterTextPillars />
        </div>
      </section>

      {/* 9. Contact / Booking Section */}
      <section className="ap-contact-section">
        <div className="hero-bg-snake" style={{ zIndex: 0, top: '45%' }}>
          <svg width="100%" height="400" viewBox="0 0 2000 400" preserveAspectRatio="none">
            <motion.path
              d="M0,200 C200,400 300,0 500,200 C700,400 800,0 1000,200 C1200,400 1300,0 1500,200 C1700,400 1800,0 2000,200"
              fill="none"
              stroke="var(--color-red)"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M0,100 C300,400 400,0 700,150 C900,400 1100,0 1400,200 C1600,400 1800,0 2000,100"
              fill="none"
              stroke="var(--color-red)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.15 }}
              transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
              viewport={{ once: true }}
            />
          </svg>
        </div>
        <div className="container ap-contact-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ap-label-tag white-text">
            <span className="red-text">05</span> / CONTACT
          </div>
          <h2 className="ap-contact-title white-text">
            <TypewriterText text={"FOR BOOKINGS, MUSIC AND\nCOLLABORATIONS."} />
          </h2>
          <p className="ap-contact-subtitle">
            REACH OUT FOR LIVE SHOWS, COMPOSITION WORK AND BRAND PROJECTS.
          </p>
          <div className="ap-contact-btn">
            <MagneticButton text="Get in Touch" href="mailto:contact@dhavalkothari.com" lightTheme={true} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistPage;
