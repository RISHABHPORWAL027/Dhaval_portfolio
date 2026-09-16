import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MusicPlayer.css';

const defaultTracks = [
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

const MusicPlayer = ({ tracks = defaultTracks }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const iframeRef = useRef(null);
  const currentTrack = tracks[currentIdx] || tracks[0];

  // Synchronize timer with active video playback
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= currentTrack.totalSeconds) {
            if (isRepeat) return 0;
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentIdx, isRepeat]);

  // Listen to postMessages from YouTube IFrame
  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange') {
          // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
          if (data.info === 1) {
            setIsPlaying(true);
          } else if (data.info === 2) {
            setIsPlaying(false);
          } else if (data.info === 0) {
            setIsPlaying(false);
            handleNext();
          }
        }
      } catch (e) {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [currentIdx]);

  const sendIframeCommand = (func, args = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const progressPercent = Math.min(
    (currentSeconds / (currentTrack.totalSeconds || 200)) * 100,
    100
  );

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercent = Math.max(0, Math.min(1, clickX / width));
    const targetSecs = Math.floor(newPercent * currentTrack.totalSeconds);
    setCurrentSeconds(targetSecs);

    sendIframeCommand('seekTo', [targetSecs, true]);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      sendIframeCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendIframeCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    const prevIdx = currentIdx === 0 ? tracks.length - 1 : currentIdx - 1;
    setCurrentIdx(prevIdx);
    setCurrentSeconds(0);
    setIsPlaying(true);
  };

  const handleNext = () => {
    let nextIdx = (currentIdx + 1) % tracks.length;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * tracks.length);
    }
    setCurrentIdx(nextIdx);
    setCurrentSeconds(0);
    setIsPlaying(true);
  };

  const handleSelectTrack = (index) => {
    if (index === currentIdx) {
      handleTogglePlay();
    } else {
      setCurrentIdx(index);
      setCurrentSeconds(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="mp-wrapper">
      <div className="mp-container">
        {/* Top Player Row */}
        <div className="mp-top-row">
          {/* Main Video View Display */}
          <div className="mp-media-view">
            <div className="mp-active-video-frame">
              <iframe
                ref={iframeRef}
                key={`yt-player-${currentTrack.videoId}`}
                className="mp-real-yt-iframe"
                src={`https://www.youtube-nocookie.com/embed/${currentTrack.videoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&playsinline=1&rel=0`}
                title={currentTrack.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Controls & Track Info */}
          <div className="mp-controls-container">
            <div className="mp-header-row">
              <span className="mp-now-playing-badge">
                <span className={`mp-live-pulse ${isPlaying ? 'active' : ''}`}></span>{' '}
                {isPlaying ? 'NOW PLAYING' : 'READY TO PLAY'}
              </span>

              <a
                href={currentTrack.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mp-options-btn"
                title="Watch on YouTube"
              >
                <span className="mp-redirect-label">YOUTUBE</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mp-title-block"
              >
                <h3 className="mp-track-title">{currentTrack.title}</h3>
                <p className="mp-track-subtitle">{currentTrack.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            {/* Outside Seek Bar Driven by Video Timing */}
            <div className="mp-progress-wrapper">
              <div className="mp-progress-bar" onClick={handleSeek} title="Seek Video">
                <div
                  className="mp-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                >
                  <span className="mp-progress-thumb"></span>
                </div>
              </div>
              <div className="mp-time-row">
                <span className="mp-time-text">{formatTime(currentSeconds)}</span>
                <span className="mp-time-text">{currentTrack.duration}</span>
              </div>
            </div>

            {/* Playback Actions directly driving Video */}
            <div className="mp-actions-row">
              <button
                className={`mp-action-btn ${isShuffle ? 'active' : ''}`}
                onClick={() => setIsShuffle(!isShuffle)}
                title="Shuffle"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
              </button>

              <button className="mp-action-btn" onClick={handlePrev} title="Previous Track">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              <button
                className="mp-play-pause-btn"
                onClick={handleTogglePlay}
                title={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button className="mp-action-btn" onClick={handleNext} title="Next Track">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>

              <button
                className={`mp-action-btn ${isRepeat ? 'active' : ''}`}
                onClick={() => setIsRepeat(!isRepeat)}
                title="Repeat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="17 1 21 5 17 9" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mp-divider"></div>

        {/* Bottom 4 Track Cards */}
        <div className="mp-track-grid">
          {tracks.map((track, idx) => {
            const isSelected = idx === currentIdx;
            return (
              <motion.div
                key={track.id}
                className={`mp-track-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectTrack(idx)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mp-card-thumb-wrap">
                  <img src={track.img} alt={track.title} className="mp-card-thumb" />
                  <div className="mp-card-overlay">
                    {isSelected && isPlaying ? (
                      <div className="mp-card-equalizer">
                        <span className="eq-bar bar-1"></span>
                        <span className="eq-bar bar-2"></span>
                        <span className="eq-bar bar-3"></span>
                      </div>
                    ) : (
                      <span className="mp-card-play-icon">▶</span>
                    )}
                  </div>
                  <span className="mp-card-tag">{track.tag}</span>
                </div>
                <div className="mp-card-info">
                  <span className="mp-card-num">{track.num}</span>
                  <h4 className="mp-card-name">{track.title}</h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
