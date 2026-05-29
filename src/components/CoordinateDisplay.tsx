'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GlassCard from './GlassCard';

interface CoordinateDisplayProps {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
}

function AnimatedDigit({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span
        style={{
          fontSize: '0.6rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.35)',
          fontFamily: 'var(--font-geist-sans), sans-serif',
        }}
      >
        {label}
      </span>
      <div style={{ overflow: 'hidden', height: '2rem' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              display: 'block',
              fontSize: '1.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-geist-mono), monospace',
              color: '#fff',
              lineHeight: '2rem',
            }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CoordinateDisplay({
  latitude,
  longitude,
  accuracy,
}: CoordinateDisplayProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatCoord = (val: number | null, type: 'lat' | 'lng') => {
    if (val === null) return '——.————';
    const abs = Math.abs(val);
    const suffix =
      type === 'lat' ? (val >= 0 ? 'N' : 'S') : val >= 0 ? 'E' : 'W';
    return `${abs.toFixed(4)}°${suffix}`;
  };

  const handleCopy = useCallback(async () => {
    if (latitude === null || longitude === null) return;
    try {
      await navigator.clipboard.writeText(`${latitude}, ${longitude}`);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  }, [latitude, longitude]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <GlassCard glowColor="blue">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0A84FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
          <span
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-geist-sans), sans-serif',
            }}
          >
            Coordinates
          </span>
        </div>

        {/* Copy button */}
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.9 }}
          style={{
            background: copied
              ? 'rgba(48,209,88,0.15)'
              : 'rgba(255,255,255,0.05)',
            border: '1px solid',
            borderColor: copied
              ? 'rgba(48,209,88,0.3)'
              : 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '4px 10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: copied ? '#30D158' : 'rgba(255,255,255,0.4)',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            transition: 'all 0.2s ease',
          }}
        >
          {copied ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
          {copied ? 'Copied' : 'Copy'}
        </motion.button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <AnimatedDigit
          value={formatCoord(latitude, 'lat')}
          label="Latitude"
        />
        <AnimatedDigit
          value={formatCoord(longitude, 'lng')}
          label="Longitude"
        />
      </div>

      {/* Accuracy indicator */}
      {accuracy !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background:
                accuracy <= 10
                  ? '#30D158'
                  : accuracy <= 30
                  ? '#FFD60A'
                  : '#FF453A',
              boxShadow:
                accuracy <= 10
                  ? '0 0 6px rgba(48,209,88,0.6)'
                  : accuracy <= 30
                  ? '0 0 6px rgba(255,214,10,0.6)'
                  : '0 0 6px rgba(255,69,58,0.6)',
            }}
          />
          <span
            style={{
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.35)',
              fontFamily: 'var(--font-geist-mono), monospace',
            }}
          >
            ±{accuracy.toFixed(0)}m accuracy
          </span>
        </motion.div>
      )}
    </GlassCard>
  );
}
