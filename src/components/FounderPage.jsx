import React from 'react';
import { motion } from 'framer-motion';
import './FounderPage.css';
import abpLogo from '../assets/ABP_logo.png';
import AnimatedCounter from './AnimatedCounter';
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';

const FounderPage = () => {
  return (
    <div className="founder-page">
      {/* Section 1 */}
      <div className="fp-hero-wrapper">
        {/* Background Floating Snake Lines - Full Width */}
        <div className="hero-bg-snake">
          <svg width="100%" height="400" viewBox="0 0 2000 400" preserveAspectRatio="none">
            {/* Line 1 */}
            <motion.path
              d="M0,200 C200,400 300,0 500,200 C700,400 800,0 1000,200 C1200,400 1300,0 1500,200 C1700,400 1800,0 2000,200"
              fill="none"
              stroke="var(--color-red)"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.15 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            {/* Line 2 */}
            <motion.path
              d="M0,100 C300,400 400,0 700,150 C900,400 1100,0 1400,200 C1600,400 1800,0 2000,100"
              fill="none"
              stroke="var(--color-red)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.1 }}
              transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
              viewport={{ once: true }}
            />
          </svg>
        </div>
        
        <section className="container fp-section fp-hero">
          <div className="fp-hero-left" style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="fp-hero-title">
            <TypewriterText text={"THERE IS NO SECRET\nSAUCE TO MAKING AN\nARTIST OR A SONG A HIT."} />
          </h1>
          <div className="fp-hero-subtitle-wrapper">
            <span className="fp-badge">ABOUT FOUNDER</span>
            <div className="fp-hero-subtitle">
              <p style={{marginBottom: '20px'}}>Dhaval Kothari on building All By Play in 2021</p>
              <MagneticButton text="Read the full story" href="#" />
            </div>
          </div>
        </div>
        <div className="fp-hero-right" style={{ position: 'relative', zIndex: 1 }}>
          <img src={abpLogo} alt="All By Play Logo" className="fp-logo-img" />
        </div>
      </section>
      </div>

      {/* Section 2 */}
      <section className="container fp-section fp-goals">
        <div className="fp-goals-left">
          <h2>
            <TypewriterText text="EVERY ARTIST HAS A" /><br/>
            <span className="red-text"><TypewriterText text="DIFFERENT GOAL," /></span><br/>
            <TypewriterText text="A DIFFERENT PATHWAY AND" /><br/>
            <span className="red-text"><TypewriterText text="A DIFFERENT ROADMAP" /></span><TypewriterText text="." />
          </h2>
        </div>
        <div className="fp-goals-right">
          <p>
            Dhaval Kothari, Founder of All By Play, opened up about how he sees the artist journey and what it takes to build a strategy that respects the artist's uniqueness while positioning them for long-term success in the music industry.
          </p>
        </div>
      </section>

      {/* Section 3: Origin */}
      <section className="container fp-section fp-origin">
        <div className="fp-origin-header">
          <span className="fp-origin-badge"><span className="red-text">01</span> / ORIGIN</span>
          <h2 className="fp-section-title"><TypewriterText text="FROM INDORE TO SPOTIFY." /></h2>
        </div>
        
        <div className="fp-origin-content">
          <div className="fp-origin-text">
            <p>Dhaval grew up in Indore, learning Indian classical music and being influenced by his mother and grandmother, with roots in the folk music of Gujarat and Rajasthan. He participated in youth and folk festivals and performed Indian classical music. At one point, he won first prize among 700 schools.</p>
            <p>That experience taught him something very early: you can grow immensely when you have the opportunity to practice, learn and immerse yourself in music. But having the right guru, mentor or team around you can make that journey much easier.</p>
            <p>That belief led him to start Dhaval Music Foundation when he was 16 or 17. They organised workshops and small showcases where people could learn from the right teachers, meet the right people and build their networks.</p>
          </div>
          
          <div className="fp-origin-quotes">
            <div className="fp-origin-quotes-row">
              <div className="fp-origin-quote-box">
                <div className="fp-quote-line"></div>
                <h3>
                  <TypewriterText text={"“HAVING THE RIGHT\nGURU, MENTOR OR\nTEAM AROUND YOU\nCAN MAKE THAT\nJOURNEY MUCH\nEASIER.”"} />
                </h3>
              </div>
              <div className="fp-origin-placeholder"></div>
            </div>
            
            <div className="fp-origin-quotes-row">
              <div className="fp-origin-placeholder"></div>
              <div className="fp-origin-quote-box">
                <div className="fp-quote-line"></div>
                <h3>
                  <TypewriterText text={"“YOU CAN GROW\nIMMENSELY WHEN\nYOU HAVE THE\nOPPORTUNITY TO\nPRACTICE, LEARN\nAND IMMERSE\nYOURSELF IN MUSIC.”"} />
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Turning Point */}
      <section className="fp-section fp-black-bg">
        <div className="container fp-turning-point">
          <div className="fp-tp-content">
            <div className="fp-origin-badge">
              <span className="red-text">02</span> <span className="white-text">/ TURNING POINT</span>
            </div>
            <h2 className="fp-section-title white-text">
              <TypewriterText text={"SPOTIFY, CONSULTING AND\nTHE IDEA FOR ALL BY PLAY."} />
            </h2>
            <div className="fp-black-grid">
              <div className="fp-black-col">
                <div className="fp-col-header">
                  <span className="red-dot"></span>
                  <div className="fp-dark-line"></div>
                </div>
                <p>When Dhaval was working at Spotify during COVID, he saw an influx of music and independent artists entering the ecosystem. He also saw how many of them lacked the right guidance.</p>
              </div>
              <div className="fp-black-col">
                <div className="fp-col-header">
                  <span className="red-dot"></span>
                  <div className="fp-dark-line"></div>
                </div>
                <p>As an artist himself, he connected deeply with a lot of these artists. He worked with them, guided them and, in many cases, consulted with them for free.</p>
              </div>
              <div className="fp-black-col">
                <div className="fp-col-header">
                  <span className="red-dot"></span>
                  <div className="fp-dark-line"></div>
                </div>
                <p>At the same time, he was helping his dad with his business at NRK Ironsteel. Eventually, he started thinking about how he could bring his experience in music, sales and business together to build something that could genuinely support artists.</p>
              </div>
            </div>
          </div>
          <div className="fp-tp-image">
            <div className="fp-tall-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Section 5: Belief */}
      <section className="container fp-section fp-approach">
        <div className="fp-origin-badge" style={{ marginBottom: '40px' }}>
          <span className="red-text">03</span> <span className="black-text">/ BELIEF</span>
        </div>
        <h2 className="fp-approach-title">
          <TypewriterText text="NO ONE-SIZE-FITS-ALL." /><br/>
          <span className="red-text"><TypewriterText text="ONLY 360°." /></span>
        </h2>
        <p className="fp-approach-subtitle">
          When Dhaval left Spotify in 2021, he started consulting. That eventually became All By Play. Over the last five years, All By Play has been built around one belief: there is no secret sauce to making an artist or a song a hit.
        </p>
        <h3 className="fp-approach-quote">
          <TypewriterText text="“OUR JOB IS TO LISTEN, UNDERSTAND THE MUSIC AND THE AMBITION, BUILD A PLAN AROUND IT AND HELP THE ARTIST GROW OVER THE LONG TERM.”" />
        </h3>
        <p className="fp-approach-desc">
          That has meant constantly experimenting. Testing what works and what doesn't. Working with creators, influencers, animators and illustrators. Using data to understand audiences. Building active listenership rather than simply chasing numbers.
        </p>
        
        <div className="fp-approach-labels">
          <div className="fp-label fp-label-left">
            <span className="fp-red-line-inline"></span>
            <h2><TypewriterText text="A 360° APPROACH." /></h2>
          </div>
          <div className="fp-label fp-label-right">
            <h2><TypewriterText text={"NEVER A ONE-SIZE\nFITS-ALL APPROACH."} /></h2>
          </div>
        </div>
        <div className="fp-huge-placeholder"></div>

        <motion.div 
          className="fp-stats-card"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="fp-badge fp-badge-outline-red">GROWTH</div>
          <div className="fp-stats-header">
            <h2 className="white-text fp-stats-title"><TypewriterText text={"FROM AN IDEA IN 2021 TO A\nTEAM OF 45 TODAY."} /></h2>
            <img src={abpLogo} alt="All By Play Logo" className="fp-stats-logo" />
          </div>
          <p className="fp-stats-desc">At All By Play, we put a lot of emphasis on team growth and education. Our team is passionate about music and deeply cares about the artists we work with.</p>
          <div className="fp-stats-grid">
            <div className="fp-stat-item">
              <span className="fp-stat-num"><AnimatedCounter end={45} suffix="+" /></span>
              <span className="fp-stat-text">All By Play team members</span>
            </div>
            <div className="fp-stat-item">
              <span className="fp-stat-num"><AnimatedCounter end={300} suffix="+" /></span>
              <span className="fp-stat-text">Consulting hours logged with independent artists</span>
            </div>
            <div className="fp-stat-item">
              <span className="fp-stat-num"><AnimatedCounter end={10} suffix="+" /></span>
              <span className="fp-stat-text">Artists exclusively managed by All By Play</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FounderPage;
