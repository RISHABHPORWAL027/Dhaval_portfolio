import React from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, className }) => {
  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.08 * i },
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

  // Split by newline if present to preserve deliberate line breaks
  const lines = (text || '').split('\n');

  return (
    <motion.span
      style={{ display: 'inline', wordBreak: 'keep-all', overflowWrap: 'normal' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        return (
          <React.Fragment key={lineIndex}>
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  wordBreak: 'keep-all',
                }}
              >
                {Array.from(word).map((letter, letterIndex) => {
                  const isQuote =
                    letter === '“' ||
                    letter === '”' ||
                    letter === '"' ||
                    letter === '‘' ||
                    letter === '’';

                  return (
                    <motion.span
                      variants={child}
                      key={letterIndex}
                      style={{
                        display: 'inline-block',
                        color: isQuote ? 'var(--color-red)' : undefined,
                      }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
                {wordIndex < words.length - 1 && (
                  <span style={{ display: 'inline-block' }}>&nbsp;</span>
                )}
              </span>
            ))}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </motion.span>
  );
};

export default TypewriterText;
