'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'green' | 'none';
  noPadding?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  glowColor = 'none',
  noPadding = false,
}: GlassCardProps) {
  const glowShadow =
    glowColor === 'blue'
      ? '0 0 20px rgba(10,132,255,0.15), inset 0 0 20px rgba(10,132,255,0.05)'
      : glowColor === 'green'
      ? '0 0 20px rgba(48,209,88,0.15), inset 0 0 20px rgba(48,209,88,0.05)'
      : 'none';

  const borderGradient =
    glowColor === 'blue'
      ? 'linear-gradient(135deg, rgba(10,132,255,0.3), rgba(10,132,255,0.05))'
      : glowColor === 'green'
      ? 'linear-gradient(135deg, rgba(48,209,88,0.3), rgba(48,209,88,0.05))'
      : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))';

  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        position: 'relative',
        borderRadius: '16px',
        padding: noPadding ? 0 : '20px',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: glowShadow,
        overflow: 'hidden',
      }}
    >
      {/* Border gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          padding: '1px',
          background: borderGradient,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        }}
      />
      {children}
    </motion.div>
  );
}
