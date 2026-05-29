'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { GeolocationState } from '../hooks/useGeolocation';
import StatusIndicator from './StatusIndicator';
import MapWrapper from './MapWrapper';

interface DashboardProps extends GeolocationState {
  retry: () => void;
}

const PLACES_CATEGORIES = [
  { id: '', label: 'Meu Local' },
  { id: 'postos de gasolina', label: 'Postos' },
  { id: 'restaurantes', label: 'Restaurantes' },
  { id: 'hospitais', label: 'Hospitais' },
  { id: 'farmacias', label: 'Farmácias' },
  { id: 'mercados', label: 'Mercados' },
];

export default function Dashboard({
  latitude,
  longitude,
  accuracy,
  status,
  error,
  retry,
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px', // Reduced padding to fill more of the screen
        gap: '20px',
        fontFamily: 'var(--font-geist-sans), sans-serif',
      }}
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '8px',
            background: '#2563eb', // Prominent blue from the reference image
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 22l10-4 10 4L12 2z" />
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>GPS</h1>
            <p style={{ fontSize: '0.75rem', color: '#a1a1aa', margin: 0 }}>Navegação de Precisão</p>
          </div>
        </div>
        <StatusIndicator status={status} error={error} onRetry={retry} />
      </motion.div>

      {/* Main Content Area */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#121212', // Dark card background like the reference image
          borderRadius: '16px',
          border: '1px solid #27272a',
          padding: '16px',
          gap: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        
        {/* Actions / Categories Bar */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {PLACES_CATEGORIES.map((cat) => {
            const isActive = searchQuery === cat.id;
            return (
              <button
                key={cat.label}
                onClick={() => setSearchQuery(cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: isActive ? '#2563eb' : '#18181b', // Blue when active, dark grey when inactive
                  border: `1px solid ${isActive ? '#2563eb' : '#27272a'}`,
                  color: isActive ? '#ffffff' : '#a1a1aa',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {cat.label}
                {isActive && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Map Area */}
        <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', border: '1px solid #27272a', position: 'relative' }}>
          <MapWrapper latitude={latitude} longitude={longitude} searchQuery={searchQuery} />
        </div>

        {/* Footer: Coordinates Only */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          background: '#18181b',
          borderRadius: '8px',
          border: '1px solid #27272a',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '0.75rem', color: '#a1a1aa', fontWeight: 500 }}>Suas Coordenadas</span>
            <span style={{ fontSize: '0.875rem', color: '#fff', fontFamily: 'var(--font-geist-mono), monospace' }}>
              {latitude !== null && longitude !== null 
                ? `${Math.abs(latitude).toFixed(5)}°${latitude >= 0 ? 'N' : 'S'}, ${Math.abs(longitude).toFixed(5)}°${longitude >= 0 ? 'E' : 'W'}` 
                : 'Buscando...'}
            </span>
          </div>
          
          {accuracy !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Precisão: ±{accuracy.toFixed(0)}m</span>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accuracy <= 20 ? '#22c55e' : '#eab308' }} />
            </div>
          )}
        </div>

        {/* Credits */}
        <div style={{ textAlign: 'center', marginTop: '-4px', opacity: 0.7 }}>
          <span style={{ fontSize: '0.65rem', color: '#52525b', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Created by Costa
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
