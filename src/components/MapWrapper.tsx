'use client';

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212' }}>
      <p style={{ color: '#a1a1aa', fontFamily: 'var(--font-geist-sans), sans-serif' }}>Carregando mapa interativo...</p>
    </div>
  ),
});

interface MapWrapperProps {
  latitude: number | null;
  longitude: number | null;
  searchQuery: string;
}

export default function MapWrapper(props: MapWrapperProps) {
  return <LeafletMap {...props} />;
}
