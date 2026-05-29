'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import GlassCard from './GlassCard';

interface CompassHeadingProps {
  heading: number | null;
}

export default function CompassHeading({ heading }: CompassHeadingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animatedHeading = useRef(0);
  const rafRef = useRef<number>(0);

  const isActive = heading !== null;
  const targetHeading = heading ?? 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 180;
    canvas.width = size * 2;
    canvas.height = size * 2;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(2, 2);

    const center = size / 2;
    const radius = center - 16;

    function draw() {
      if (!ctx) return;

      // Smooth interpolation
      const diff = targetHeading - animatedHeading.current;
      let delta = ((diff + 540) % 360) - 180;
      animatedHeading.current += delta * 0.08;

      ctx.clearRect(0, 0, size, size);

      // Outer ring
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Tick marks
      for (let i = 0; i < 72; i++) {
        const angle = (i * 5 * Math.PI) / 180 - Math.PI / 2;
        const isMajor = i % 9 === 0;
        const isMinor = i % 3 === 0;
        const innerR = isMajor ? radius - 12 : isMinor ? radius - 8 : radius - 5;

        ctx.beginPath();
        ctx.moveTo(
          center + Math.cos(angle) * innerR,
          center + Math.sin(angle) * innerR
        );
        ctx.lineTo(
          center + Math.cos(angle) * radius,
          center + Math.sin(angle) * radius
        );
        ctx.strokeStyle = isMajor
          ? 'rgba(255,255,255,0.5)'
          : 'rgba(255,255,255,0.15)';
        ctx.lineWidth = isMajor ? 1.5 : 0.5;
        ctx.stroke();
      }

      // Cardinal labels
      const cardinals = [
        { label: 'N', angle: -90, color: '#FF453A' },
        { label: 'E', angle: 0, color: 'rgba(255,255,255,0.5)' },
        { label: 'S', angle: 90, color: 'rgba(255,255,255,0.5)' },
        { label: 'W', angle: 180, color: 'rgba(255,255,255,0.5)' },
      ];

      cardinals.forEach(({ label, angle, color }) => {
        const rad = (angle * Math.PI) / 180;
        const labelR = radius - 22;
        ctx.font = '600 11px var(--font-geist-sans), sans-serif';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          label,
          center + Math.cos(rad) * labelR,
          center + Math.sin(rad) * labelR
        );
      });

      // Needle
      const needleAngle = (animatedHeading.current * Math.PI) / 180 - Math.PI / 2;
      const needleLength = radius - 30;

      // North pointer (red)
      ctx.beginPath();
      ctx.moveTo(
        center + Math.cos(needleAngle) * needleLength,
        center + Math.sin(needleAngle) * needleLength
      );
      ctx.lineTo(
        center + Math.cos(needleAngle + 0.15) * 8,
        center + Math.sin(needleAngle + 0.15) * 8
      );
      ctx.lineTo(
        center + Math.cos(needleAngle - 0.15) * 8,
        center + Math.sin(needleAngle - 0.15) * 8
      );
      ctx.closePath();
      ctx.fillStyle = isActive ? '#FF453A' : 'rgba(255,69,58,0.3)';
      ctx.fill();

      // South pointer (white)
      const southAngle = needleAngle + Math.PI;
      ctx.beginPath();
      ctx.moveTo(
        center + Math.cos(southAngle) * (needleLength * 0.6),
        center + Math.sin(southAngle) * (needleLength * 0.6)
      );
      ctx.lineTo(
        center + Math.cos(southAngle + 0.15) * 8,
        center + Math.sin(southAngle + 0.15) * 8
      );
      ctx.lineTo(
        center + Math.cos(southAngle - 0.15) * 8,
        center + Math.sin(southAngle - 0.15) * 8
      );
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fill();

      // Center dot
      ctx.beginPath();
      ctx.arc(center, center, 4, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#0A84FF' : 'rgba(10,132,255,0.3)';
      ctx.fill();

      if (isActive) {
        ctx.beginPath();
        ctx.arc(center, center, 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(10,132,255,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetHeading, isActive]);

  return (
    <GlassCard glowColor={isActive ? 'green' : 'none'}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            alignSelf: 'flex-start',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isActive ? '#30D158' : 'rgba(255,255,255,0.3)'}
            strokeWidth="2"
          >
            <polygon points="12 2 19 21 12 17 5 21" />
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
            Heading
          </span>
        </div>

        <canvas
          ref={canvasRef}
          style={{
            width: '180px',
            height: '180px',
          }}
        />

        <motion.div
          animate={{
            opacity: isActive ? 1 : 0.3,
          }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            fontFamily: 'var(--font-geist-mono), monospace',
            color: '#fff',
          }}
        >
          {isActive ? `${Math.round(heading!)}°` : '—°'}
        </motion.div>
      </div>
    </GlassCard>
  );
}
