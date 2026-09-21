import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import { TextRotate } from './ui/text-rotate';
import './ContactPage.css';
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';
import contactusBgVideo from '../assets/contactus_bg.mp4';
import allbyplayVideo from '../assets/allbyplay_instagram.mp4';
import screenBg from '../assets/screen.png';
import contactBg from '../assets/contact_bg.png';
import mixTabGif from '../assets/mix_tab.gif';
import mumbaiMapImg from '../assets/mumbai_map_graphic.jpg';

const questOptions = [
  { id: 'founder', title: 'FOUNDER VENTURES', icon: '💼', desc: 'Strategy, creative business & partnerships' },
  { id: 'artist', title: 'ARTIST BOOKINGS', icon: '🎤', desc: 'Live shows, music releases & media support' },
  { id: 'marketing', title: '360° MARKETING', icon: '⚡', desc: 'Full-suite campaign & ecosystem growth' }
];

const pathOptions = [
  {
    id: 'founder',
    title: 'FOUNDER COLLABORATIONS',
    desc: 'For ventures, creative business, strategy and partnerships.',
    actionText: 'START A FOUNDER CONVERSATION',
    modalType: 'Founder Collaborations'
  },
  {
    id: 'artist',
    title: 'ARTIST BOOKINGS',
    desc: 'For live performances, music, media and collaborations.',
    actionText: 'START AN ARTIST CONVERSATION',
    modalType: 'Artist Bookings'
  }
];

const budgetTiers = [
  { label: 'EMERGING', xp: '85% Synergy', detail: 'Single release & launch strategy' },
  { label: 'BREAKTHROUGH', xp: '94% Synergy', detail: 'EP / Album & 360° campaign' },
  { label: 'HEADLINE / ENTERPRISE', xp: '99% Synergy', detail: 'Long-term partnership & label development' }
];

const strategyPhrases = [
  { first: 'ARTIST', second: 'STRATEGY' },
  { first: 'MUSIC', second: 'MARKETING' },
  { first: 'CAMPAIGN', second: 'STRATEGY' },
  { first: 'CREATIVE', second: 'DIRECTION' }
];

function EnquiriesSection({ openContactModal }) {
  const [activeHoverIndex, setActiveHoverIndex] = useState(0);

  return (
    <section className="cp-enquiries-section-wrapper">
      <div className="container cp-enquiries-inner-container">
        {/* Section Header */}
        <div className="cp-section-header cp-enquiries-header">
          <span className="cp-subhead-tag">
            <span className="red-text font-space bold-tag-num">01</span>{' '}
            <span className="black-tag-text">/ ENQUIRIES</span>
          </span>
          <h2 className="cp-section-title">CHOOSE YOUR PATH.</h2>
        </div>

        {/* 2-Column Split Layout */}
        <div className="cp-enquiries-grid">
          {/* Left Column: List of Path Options */}
          <div className="cp-enquiries-list">
            {pathOptions.map((path, idx) => (
              <div 
                key={path.id} 
                className={`cp-enquiry-item ${activeHoverIndex === idx ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveHoverIndex(idx)}
                onClick={() => openContactModal(path.modalType)}
              >
                <div className="cp-enquiry-body">
                  <h3 className="cp-enquiry-title">{path.title}</h3>
                  <p className="cp-enquiry-desc">{path.desc}</p>
                </div>
                
                <div className="cp-enquiry-divider"></div>
                
                <div className="cp-enquiry-action-row">
                  <span className="cp-enquiry-action-text">{path.actionText}</span>
                  <span className="cp-enquiry-arrow">→</span>
                </div>

                <div className="cp-enquiry-divider"></div>
              </div>
            ))}
          </div>

          {/* Right Column: Image Placeholder */}
          <div className="cp-enquiries-image-col">
            <div className="cp-enquiries-image-placeholder">
              {/* Rounded light grey box placeholder for image */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ContactPage = () => {

  // Strategy Banner horizontal autoscroll index
  const [activeStrategyIndex, setActiveStrategyIndex] = useState(0);

  // Gamification state
  const [selectedQuest, setSelectedQuest] = useState('founder');
  const [selectedBudget, setSelectedBudget] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Founder Collaboration');
  const [toastMessage, setToastMessage] = useState('');
  
  // Live IST Clock state for Mumbai / Andheri radar map
  const [istTime, setIstTime] = useState('');

  // Auto-scroll strategy phrases every 2.8 seconds
  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setActiveStrategyIndex((prev) => (prev + 1) % strategyPhrases.length);
    }, 2800);
    return () => clearInterval(phraseInterval);
  }, []);

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Founder Collaboration',
    message: ''
  });

  const videoRef = useRef(null);

  // Scroll automatic color change for Section 5 contact list
  const contactListRef = useRef(null);
  const { scrollYProgress: contactScroll } = useScroll({
    target: contactListRef,
    offset: ["start 75%", "end 35%"]
  });

  const directColor1 = useTransform(contactScroll, [0, 0.25, 0.45], ["#000000", "#ff0000", "#000000"]);
  const directColor2 = useTransform(contactScroll, [0.3, 0.55, 0.75], ["#000000", "#ff0000", "#000000"]);
  const directColor3 = useTransform(contactScroll, [0.6, 0.85, 1.0], ["#000000", "#ff0000", "#000000"]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`Copied ${label} to clipboard!`);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const openContactModal = (type) => {
    setModalType(type);
    setFormData(prev => ({ ...prev, projectType: type }));
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setToastMessage("🚀 Inquiry sent successfully! Dhaval's team will connect shortly.");
      setTimeout(() => setToastMessage(''), 4000);
    }, 1800);
  };

  return (
    <div className="contact-page">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            className="contact-toast"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <span className="toast-dot red-dot"></span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO HEADER WITH FULL BACKGROUND VIDEO */}
      <div className="cp-hero-wrapper">
        {/* Full Background Video */}
        <video 
          ref={videoRef}
          src={contactusBgVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="cp-hero-full-bg-video"
        />

        {/* Dark Gradient Overlay */}
        <div className="cp-hero-bg-overlay"></div>

        <section className="container cp-section cp-hero">
          <div className="cp-hero-content-full">
            <h1 className="cp-hero-title">
              <TypewriterText text="LET’S BUILD SOMETHING." highlightWords={["BUILD"]} stagger={0.09} />
            </h1>
            
            <p className="cp-hero-subtitle">
              For ventures, creative business, strategy and partnerships across the global music and media ecosystem.
            </p>
            
            <div className="cp-hero-cta">
              <button className="cp-action-btn hover-red-btn" onClick={() => openContactModal('General Inquiry')}>
                START A CONVERSATION <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </section>
      </div>



      {/* SECTION 1: CHOOSE YOUR PATH (01 / ENQUIRIES) */}
      <EnquiriesSection openContactModal={openContactModal} />

      {/* SECTION 3: WORK WITH ALL BY PLAY */}
      <div className="cp-abp-section-wrapper">
        <div className="container" style={{ marginBottom: '24px' }}>
          <div className="cp-section-header abp-header" style={{ marginBottom: 0 }}>
            <span className="cp-subhead-tag">
              <span className="red-text font-space bold-tag-num">02</span> <span className="black-tag-text">/ ALL BY PLAY</span>
            </span>
          </div>
        </div>

        <section 
          className="cp-abp-fullwidth-card hover-glow-red"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.70), rgba(10, 10, 10, 0.85)), url(${mixTabGif})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%'
          }}
        >
          <div className="container cp-abp-fullwidth-content">
            <h2 className="cp-abp-card-title">
              WORK WITH <span className="red-text">ALL BY PLAY.</span>
            </h2>
            <p className="cp-abp-card-desc">
              All By Play is a 360-degree music marketing company, founded by Dhaval Kothari. If you are an artist, label, or brand looking for strategy, marketing, or long term support, you can book an appointment to discuss your projects.
            </p>
            <div className="cp-abp-card-action">
              <button className="cp-outline-btn hover-red-btn" onClick={() => openContactModal('All By Play Appointment')}>
                BOOK AN APPOINTMENT <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 4: PREFER EMAIL OR A CALL? (03 / DIRECT) */}
      <div className="cp-direct-section-wrapper">
        {/* Background Floating Snake Lines */}
        <div className="cp-direct-bg-snake">
          <svg width="100%" height="400" viewBox="0 0 2000 400" preserveAspectRatio="none">
            <motion.path
              d="M0,200 C200,400 300,0 500,200 C700,400 800,0 1000,200 C1200,400 1300,0 1500,200 C1700,400 1800,0 2000,200"
              fill="none"
              stroke="#ff0000"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M0,100 C300,400 400,0 700,150 C900,400 1100,0 1400,200 C1600,400 1800,0 2000,100"
              fill="none"
              stroke="#ff0000"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.18 }}
              transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
              viewport={{ once: true }}
            />
          </svg>
        </div>

        <section className="container cp-section cp-direct-section">
          <div className="cp-direct-top-bar">
            <span className="cp-subhead-tag">
              <span className="red-text font-space bold-tag-num">03</span> <span className="black-tag-text">/ DIRECT</span>
            </span>
          </div>

          <div className="cp-direct-main">
            <h2 className="cp-direct-title-exact hover-turn-red">
              <TypewriterText text={"PREFER EMAIL\nOR A CALL?"} stagger={0.09} />
            </h2>

            <div className="cp-red-accent-box">
              <div className="red-vertical-line"></div>
              <div className="accent-text-group">
                <span className="accent-title font-space">ALL BY PLAY</span>
                <span className="accent-subtitle">360-degree music marketing</span>
              </div>
            </div>

            <div className="cp-contact-rows-list" ref={contactListRef}>
              <div className="cp-contact-row-divider"></div>
              <div 
                className="cp-direct-contact-item hover-turn-red-item"
                onClick={() => copyToClipboard('ALLBYPLAYGMAIL.COM', 'Email (AllByPlayGmail)')}
              >
                <motion.span 
                  className="cp-direct-item-text"
                  style={{ color: directColor1 }}
                  whileHover={{ color: "#ff0000" }}
                >
                  ALLBYPLAYGMAIL.COM
                </motion.span>
              </div>

              <div className="cp-contact-row-divider"></div>
              <div 
                className="cp-direct-contact-item hover-turn-red-item"
                onClick={() => copyToClipboard('LIVE@ALLBYPLAY.COM', 'Email (Live)')}
              >
                <motion.span 
                  className="cp-direct-item-text"
                  style={{ color: directColor2 }}
                  whileHover={{ color: "#ff0000" }}
                >
                  LIVE@ALLBYPLAY.COM
                </motion.span>
              </div>

              <div className="cp-contact-row-divider"></div>
              <a 
                href="tel:+918626062879" 
                className="cp-direct-contact-item hover-turn-red-item"
                onClick={() => setToastMessage('Calling +91 86260 62879...')}
              >
                <motion.span 
                  className="cp-direct-item-text"
                  style={{ color: directColor3 }}
                  whileHover={{ color: "#ff0000" }}
                >
                  +91 86260 62879
                </motion.span>
              </a>
              <div className="cp-contact-row-divider"></div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 5: ARTIST STRATEGY / MUSIC MARKETING HORIZONTAL ANIMATED BANNER */}
      <section className="cp-banner-section-exact" style={{ backgroundImage: `url(${contactBg})` }}>
        <div className="cp-banner-overlay-exact">
          <div className="container cp-banner-content-exact">
            {/* Main Horizontal Slide Animated Headline */}
            <div className="cp-banner-slider-box">
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={activeStrategyIndex}
                  className="cp-banner-title-exact"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {strategyPhrases[activeStrategyIndex].first}{' '}
                  <span className="red-text">{strategyPhrases[activeStrategyIndex].second}</span>
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BASED IN INDIA (EXACT MATCH USER DESIGN: 04 / CONTEXT & ANIMATED GOOGLE MAP PIN) */}
      <div className="cp-context-section-wrapper">
        <section className="container cp-section cp-context-section">
          <div className="cp-context-split">
            {/* Left Column: Context Text */}
            <div className="cp-context-left">
              <span className="cp-subhead-tag">
                <span className="red-text font-space bold-tag-num">04</span> <span className="black-tag-text">/ CONTEXT</span>
              </span>

              <h2 className="cp-context-title hover-turn-red">
                <TypewriterText text={"BASED IN INDIA.\nWORKING ACROSS\nMUSIC AND\nBUSINESS."} stagger={0.09} />
              </h2>

              <p className="cp-context-desc">
                For collaborations, projects and enquiries from India and international markets. Headquartered in Mumbai (Andheri West).
              </p>

              <div className="cp-context-actions">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=19.1197046,72.8335048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-location-link-btn font-space"
                >
                  <span className="btn-dot-live"></span>
                  EXPLORE MUMBAI HQ ON GOOGLE MAPS ↗
                </a>
              </div>
            </div>

            {/* Right Column: Live Interactive Google Map Box with Animated Location Pin */}
            <div className="cp-context-right">
              <div className="cp-target-radar-box hover-glow-red">
                {/* Custom Graphic Map Aligned with Design Aesthetic */}
                <img
                  src={mumbaiMapImg}
                  alt="Mumbai Andheri West Graphic Location Map"
                  className="cp-custom-map-image"
                />

                {/* Radar Grid & Crosshair Lines Overlay */}
                <div className="cp-map-grid-overlay">
                  <div className="cp-grid-line-h"></div>
                  <div className="cp-grid-line-v"></div>
                  <div className="cp-corner-bracket top-left"></div>
                  <div className="cp-corner-bracket top-right"></div>
                  <div className="cp-corner-bracket bottom-left"></div>
                  <div className="cp-corner-bracket bottom-right"></div>
                </div>

                {/* Center Animated Location Pin attached to Mumbai coordinates */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=19.1197046,72.8335048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-animated-map-pin-wrapper"
                  title="Click to view Mumbai location on Google Maps"
                >
                  {/* Tooltip Card above pin */}
                  <div className="cp-pin-tooltip">
                    <div className="cp-tooltip-header font-space">
                      <span className="cp-live-pulse-dot"></span>
                      MUMBAI HQ
                    </div>
                    <div className="cp-tooltip-sub font-space">Click to open map ↗</div>
                  </div>

                  {/* Pulsing Sonar Waves at Ground Level */}
                  <div className="cp-pin-sonar-waves">
                    <div className="cp-sonar-ring ring-1"></div>
                    <div className="cp-sonar-ring ring-2"></div>
                    <div className="cp-sonar-ring ring-3"></div>
                    <div className="cp-ground-shadow"></div>
                  </div>

                  {/* Beacon Light Vertical Beam */}
                  <div className="cp-beacon-beam"></div>

                  {/* Floating Pin Icon */}
                  <div className="cp-pin-icon-container">
                    <svg 
                      className="cp-svg-pin" 
                      viewBox="0 0 40 52" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#pin-shadow)">
                        {/* Outer Pin Body */}
                        <path 
                          d="M20 2C10.6112 2 3 9.61116 3 19C3 29.5 17.5 48 20 50C22.5 48 37 29.5 37 19C37 9.61116 29.3888 2 20 2Z" 
                          fill="#ff0000" 
                          stroke="#ffffff" 
                          strokeWidth="2"
                        />
                        {/* Inner Circle / Core */}
                        <circle cx="20" cy="19" r="7" fill="#ffffff" />
                        <circle cx="20" cy="19" r="4" fill="#0a0a0a" />
                      </g>
                      <defs>
                        <filter id="pin-shadow" x="0" y="0" width="40" height="56" filterUnits="userSpaceOnUse">
                          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#ff0000" floodOpacity="0.4" />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </a>

                {/* Target Info Overlay Badge at Bottom */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=19.1197046,72.8335048" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cp-target-info-overlay"
                >
                  <span className="info-badge-red font-space">📍 MUMBAI / ANDHERI HQ ↗</span>
                  <span className="info-badge-coords font-space">19.1197° N | 72.8464° E</span>
                  <span className="info-badge-time font-space red-text">{istTime || 'IST LIVE'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* INTERACTIVE CONTACT MODAL / DRAWER */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="cp-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="cp-modal-content"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="cp-modal-close" onClick={() => setIsModalOpen(false)}>✕</button>

              {formSubmitted ? (
                <div className="cp-modal-success">
                  <span className="success-icon">⚡</span>
                  <h3>CONVERSATION LAUNCHED!</h3>
                  <p>Thank you for getting in touch. Dhaval Kothari & team will review your project and get back within 24 hours.</p>
                </div>
              ) : (
                <form className="cp-modal-form" onSubmit={handleFormSubmit}>
                  <div className="modal-header">
                    <span className="red-text font-space">/ START CONVERSATION</span>
                    <h2>{modalType}</h2>
                    <p>Fill out the details below to initiate direct inquiry.</p>
                  </div>

                  <div className="form-group">
                    <label>YOUR NAME *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>EMAIL ADDRESS *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>PHONE NUMBER</label>
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>PROJECT / INQUIRY SCOPE *</label>
                    <textarea 
                      rows="4" 
                      required
                      placeholder="Tell us about your venture, live booking, or collaboration strategy..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button type="submit" className="cp-modal-submit hover-red-btn">
                    SUBMIT INQUIRY →
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
