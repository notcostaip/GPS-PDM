'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SimpleSplashProps {
  onComplete: () => void;
}

export default function SimpleSplash({ onComplete }: SimpleSplashProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hold the splash screen for 2 seconds, then trigger fade out
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    // Call onComplete slightly after to allow exit animation to finish
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="simple-splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050a12', // Matches the main app dark background
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {/* Logo Square */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0px rgba(37, 99, 235, 0)',
                  '0 0 40px rgba(37, 99, 235, 0.5)',
                  '0 0 20px rgba(37, 99, 235, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 22l10-4 10 4L12 2z" />
              </svg>
            </motion.div>

            {/* Brand Text */}
            <div style={{ textAlign: 'center', fontFamily: 'var(--font-geist-sans), sans-serif' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '0.05em' }}>
                GPS
              </h1>
              <p style={{ fontSize: '1rem', color: '#a1a1aa', margin: '8px 0 0 0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Navegação de Precisão
              </p>
            </div>
            
            {/* Loading Indicator */}
            <motion.div 
              style={{ marginTop: '24px', display: 'flex', gap: '6px' }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#2563eb',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
