import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, className, loop = false, speed = 120, delay = 2000, stagger = 0.08, highlightWords = [] }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Continuous looping typewriter effect when loop=true
  useEffect(() => {
    if (!loop) return;

    let timer;
    const fullText = text || '';

    if (!isDeleting && displayedText.length < fullText.length) {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
      }, speed);
    } else if (!isDeleting && displayedText.length === fullText.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
      }, speed / 2);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loop, text, speed, delay]);

  if (loop) {
    return (
      <span className={className} style={{ display: 'inline', wordBreak: 'keep-all', overflowWrap: 'normal', whiteSpace: 'pre-line' }}>
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'inline-block', marginLeft: '2px', color: 'var(--color-red)', fontWeight: 800 }}
        >
          |
        </motion.span>
      </span>
    );
  }

  // Standard Framer Motion staggered typewriter animation
  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: 0.08 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      transition: { duration: 0.01 },
    },
    hidden: {
      opacity: 0,
    },
  };

  const lines = (text || '').split('\n');
  let globalCharIndex = 0;

  return (
    <motion.span
      style={{ display: 'inline', wordBreak: 'keep-all', overflowWrap: 'normal' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        return (
          <React.Fragment key={lineIndex}>
            {words.map((word, wordIndex) => {
              const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
              const isHighlighted = highlightWords && highlightWords.includes(cleanWord);

              return (
                <span
                  key={wordIndex}
                  className={isHighlighted ? 'hover-turn-red red-text' : undefined}
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    wordBreak: 'keep-all',
                    color: isHighlighted ? 'var(--color-red)' : undefined,
                  }}
                >
                  {Array.from(word).map((letter, letterIndex) => {
                    const currentIndex = globalCharIndex++;
                    const isApostrophe = letter === "'" || letter === '’' || letter === '‘';
                    const isContraction = isApostrophe && letterIndex > 0 && letterIndex < word.length - 1;
                    const isQuote =
                      !isContraction &&
                      (letter === '“' ||
                       letter === '”' ||
                       letter === '"' ||
                       letter === '‘' ||
                       letter === '’');

                    return (
                      <motion.span
                        key={letterIndex}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: currentIndex * stagger, duration: 0.01 }}
                        style={{
                          display: 'inline-block',
                          color: isQuote || isHighlighted ? 'var(--color-red)' : undefined,
                        }}
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                  {wordIndex < words.length - 1 && (() => {
                    const spaceIndex = globalCharIndex++;
                    return (
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: spaceIndex * stagger, duration: 0.01 }}
                        style={{ display: 'inline-block' }}
                      >
                        &nbsp;
                      </motion.span>
                    );
                  })()}
                </span>
              );
            })}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </motion.span>
  );
};

export default TypewriterText;
