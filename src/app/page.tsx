'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import Dashboard from '@/components/Dashboard';
import SimpleSplash from '@/components/SimpleSplash';
import { useGeolocation } from '@/hooks/useGeolocation';

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const geo = useGeolocation();

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <main
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        overflow: 'hidden',
        background: '#050a12',
      }}
    >
      <AnimatePresence>
        {!splashDone && <SimpleSplash onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {splashDone && (
          <Dashboard
            latitude={geo.latitude}
            longitude={geo.longitude}
            altitude={geo.altitude}
            accuracy={geo.accuracy}
            heading={geo.heading}
            speed={geo.speed}
            timestamp={geo.timestamp}
            status={geo.status}
            error={geo.error}
            retry={geo.retry}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
