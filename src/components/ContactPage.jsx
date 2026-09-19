import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import { TextRotate } from './ui/text-rotate';
import './ContactPage.css';
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';
import concertVideo from '../assets/herosection_bg.mp4';
import allbyplayVideo from '../assets/allbyplay_instagram.mp4';
import screenBg from '../assets/screen.png';
import contactBg from '../assets/contact_bg.png';
import mixTabGif from '../assets/mix_tab.gif';

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
  },
  {
    id: 'marketing',
    title: '360° MUSIC MARKETING',
    desc: 'For full-suite marketing campaigns, label services and ecosystem growth.',
    actionText: 'START A MARKETING CONVERSATION',
    modalType: '360° Music Marketing'
  },
  {
    id: 'creative',
    title: 'CREATIVE DIRECTION & BRAND STRATEGY',
    desc: 'For visual identity, music video direction, concepts and release storytelling.',
    actionText: 'START A CREATIVE CONVERSATION',
    modalType: 'Creative Direction & Strategy'
  },
  {
    id: 'speaking',
    title: 'KEYNOTES & INDUSTRY TALKS',
    desc: 'For keynote sessions, music business panels, workshops and podcasts.',
    actionText: 'BOOK A SPEAKING ENGAGEMENT',
    modalType: 'Keynotes & Speaking'
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

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    author: "FOUNDER COLLABORATIONS",
    desc: "For ventures, creative business, strategy and partnerships.",
    link: "#",
    title: "FOUNDER COLLABORATIONS",
  },
  {
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
    author: "ARTIST BOOKINGS",
    desc: "For live performances, music, media and collaborations.",
    link: "#",
    title: "ARTIST BOOKINGS",
  },
  {
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60",
    author: "360° MUSIC MARKETING",
    desc: "For full-suite marketing campaigns, label services and ecosystem growth.",
    link: "#",
    title: "360° MUSIC MARKETING",
  },
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60",
    author: "CREATIVE DIRECTION & BRAND STRATEGY",
    desc: "For visual identity, music video direction, concepts and release storytelling.",
    link: "#",
    title: "CREATIVE DIRECTION & BRAND STRATEGY",
  }
];

function Preview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRotateRef = useRef(null);
  const trackRef = useRef(null);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const itemHeight = e.target.clientHeight;
    if (!itemHeight) return;
    const index = Math.min(
      exampleImages.length - 1,
      Math.max(0, Math.round(scrollTop / itemHeight))
    );

    if (index !== activeIndex) {
      setActiveIndex(index);
      if (textRotateRef.current) {
        textRotateRef.current.jumpTo(index);
      }
    }
  };

  const handleWheel = (e) => {
    if (!trackRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = trackRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    const isAtTop = scrollTop <= 10;

    if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
      window.scrollBy({ top: e.deltaY, behavior: 'auto' });
    }
  };

  return (
    <div className="cp-preview-outer-wrapper" onWheel={handleWheel}>
      <div className="container cp-preview-inner-container">
        
        {/* Fixed Top Section Header */}
        <div className="cp-preview-top-header cp-section-header">
          <span className="cp-subhead-tag">
            <span className="red-text font-space bold-tag-num">01</span> <span className="black-tag-text">/ ENQUIRIES</span>
          </span>
          <h2 className="cp-section-title">CHOOSE YOUR PATH.</h2>
        </div>

        {/* Sticky Text Box */}
        <div className="cp-preview-sticky-bar">
          <div className="cp-preview-text-box">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="cp-preview-motion-content"
              >
                <TextRotate
                  ref={textRotateRef}
                  texts={[exampleImages[activeIndex].author]}
                  mainClassName="cp-preview-text-rotate red-text font-black"
                  splitLevelClassName="overflow-hidden pb-2"
                  staggerFrom={"first"}
                  animatePresenceMode="wait"
                  loop={false}
                  auto={false}
                  staggerDuration={0.012}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 280 }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="cp-preview-subheading"
                >
                  {exampleImages[activeIndex].desc}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Track with 4 Snapping Image Items */}
        <div ref={trackRef} className="cp-preview-scroll-track" onScroll={handleScroll}>
          {exampleImages.map((img, i) => (
            <div key={i} className="cp-preview-item-section">
              <div className="cp-preview-image-box">
                <img src={img.url} alt={img.title} className="cp-preview-img" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
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
          src={concertVideo} 
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
              LET’S <span className="hover-turn-red red-text">BUILD</span> SOMETHING.
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



      {/* TEXT ROTATE SCROLL DEMO SECTION */}
      <Preview />

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
            <span className="scroll-auto-tag font-space">SCROLL AUTOMATIC</span>
          </div>

          <div className="cp-direct-main">
            <h2 className="cp-direct-title-exact hover-turn-red">
              PREFER EMAIL<br />OR A CALL?
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

      {/* SECTION 6: BASED IN INDIA (EXACT MATCH USER DESIGN: 04 / CONTEXT & TARGET RADAR BOX) */}
      <div className="cp-context-section-wrapper">
        <section className="container cp-section cp-context-section">
          <div className="cp-context-split">
            {/* Left Column: Context Text */}
            <div className="cp-context-left">
              <span className="cp-subhead-tag">
                <span className="red-text font-space bold-tag-num">04</span> <span className="black-tag-text">/ CONTEXT</span>
              </span>

              <h2 className="cp-context-title hover-turn-red">
                BASED IN INDIA.<br />
                WORKING ACROSS<br />
                MUSIC AND<br />
                BUSINESS.
              </h2>

              <p className="cp-context-desc">
                For collaborations, projects and enquiries from India and international markets. Headquartered in Mumbai (Andheri West).
              </p>
            </div>

            {/* Right Column: Live Interactive Google Map Box */}
            <div className="cp-context-right">
              <div className="cp-target-radar-box hover-glow-red">
                <iframe
                  title="All By Play Andheri West Mumbai Location"
                  src="https://maps.google.com/maps?q=19.1197046,72.8335048&z=14&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Target Overlay Badge */}
                <a 
                  href="https://share.google/wCu4qvzzuixAKqfj9" 
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
