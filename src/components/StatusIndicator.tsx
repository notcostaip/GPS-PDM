'use client';

import { motion } from 'motion/react';

interface StatusIndicatorProps {
  status: 'idle' | 'acquiring' | 'active' | 'denied' | 'unavailable';
  error: string | null;
  onRetry: () => void;
}

const statusConfig = {
  idle: {
    color: 'rgba(255,255,255,0.3)',
    label: 'Aguardando',
    bars: 0,
    pulseColor: 'rgba(255,255,255,0.1)',
  },
  acquiring: {
    color: '#FFD60A',
    label: 'Buscando Sinal…',
    bars: 2,
    pulseColor: 'rgba(255,214,10,0.3)',
  },
  active: {
    color: '#30D158',
    label: 'Sinal Ativo',
    bars: 4,
    pulseColor: 'rgba(48,209,88,0.3)',
  },
  denied: {
    color: '#FF453A',
    label: 'Acesso Negado',
    bars: 0,
    pulseColor: 'rgba(255,69,58,0.3)',
  },
  unavailable: {
    color: '#FF9F0A',
    label: 'Indisponível',
    bars: 1,
    pulseColor: 'rgba(255,159,10,0.3)',
  },
};

export default function StatusIndicator({
  status,
  error,
  onRetry,
}: StatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Pulsing dot */}
      <div style={{ position: 'relative', width: '10px', height: '10px' }}>
        {status === 'active' && (
          <motion.div
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: config.pulseColor,
            }}
          />
        )}
        <div
          style={{
            position: 'relative',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: config.color,
            boxShadow: `0 0 8px ${config.pulseColor}`,
          }}
        />
      </div>

      {/* Signal bars */}
      <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '16px' }}>
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            animate={{
              opacity: bar <= config.bars ? 1 : 0.15,
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: '3px',
              height: `${4 + bar * 3}px`,
              borderRadius: '1px',
              background: bar <= config.bars ? config.color : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          color: config.color,
          fontFamily: 'var(--font-geist-sans), sans-serif',
          letterSpacing: '0.05em',
          flex: 1,
        }}
      >
        {config.label}
      </span>

      {/* Retry button (on error states) */}
      {(status === 'denied' || status === 'unavailable') && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(10,132,255,0.15)',
            border: '1px solid rgba(10,132,255,0.3)',
            borderRadius: '8px',
            padding: '4px 12px',
            cursor: 'pointer',
            color: '#0A84FF',
            fontSize: '0.65rem',
            fontWeight: 600,
            fontFamily: 'var(--font-geist-sans), sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
          </svg>
          Reload Signal
        </motion.button>
      )}

      {/* Error tooltip */}
      {error && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '8px 12px',
            background: 'rgba(255,69,58,0.15)',
            border: '1px solid rgba(255,69,58,0.3)',
            borderRadius: '8px',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '260px',
            textAlign: 'center',
            fontFamily: 'var(--font-geist-sans), sans-serif',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
