'use client';

import { motion } from 'motion/react';

interface MetricsBarProps {
  altitude: number | null;
  speed: number | null;
  accuracy: number | null;
}

function MetricPill({
  icon,
  label,
  value,
  unit,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.06)',
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ color, flexShrink: 0 }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span
          style={{
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-geist-sans), sans-serif',
          }}
        >
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: 'var(--font-geist-mono), monospace',
              color: '#fff',
            }}
          >
            {value}
          </span>
          <span
            style={{
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-geist-sans), sans-serif',
            }}
          >
            {unit}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MetricsBar({
  altitude,
  speed,
  accuracy,
}: MetricsBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        width: '100%',
      }}
    >
      <MetricPill
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L12 22M8 6l4-4 4 4" />
          </svg>
        }
        label="Altitude"
        value={altitude !== null ? altitude.toFixed(0) : '—'}
        unit="m"
        color="#0A84FF"
      />
      <MetricPill
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        }
        label="Speed"
        value={speed !== null ? (speed * 3.6).toFixed(1) : '—'}
        unit="km/h"
        color="#30D158"
      />
      <MetricPill
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2a10 10 0 0110 10" />
            <path d="M12 2a10 10 0 00-10 10" />
          </svg>
        }
        label="Accuracy"
        value={accuracy !== null ? `±${accuracy.toFixed(0)}` : '—'}
        unit="m"
        color="#FFD60A"
      />
    </div>
  );
}
