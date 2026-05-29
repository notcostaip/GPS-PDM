'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  latitude: number | null;
  longitude: number | null;
  searchQuery: string;
}

// Fix for default Leaflet icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Blue Dot for user location
const UserIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="width: 16px; height: 16px; background-color: #2563eb; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 15px rgba(37, 99, 235, 0.6);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Custom Red Dot for places
const PlaceIcon = L.divIcon({
  className: 'custom-place-marker',
  html: `<div style="width: 24px; height: 24px; background-color: #ef4444; border-radius: 50% 50% 50% 0; border: 2px solid #fff; transform: rotate(-45deg); box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Helper component to recenter map when coordinates change
function RecenterAutomatically({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

export default function LeafletMap({ latitude, longitude, searchQuery }: LeafletMapProps) {
  const [mockPlaces, setMockPlaces] = useState<any[]>([]);

  // Generate fake places around the user when searchQuery changes
  useEffect(() => {
    if (!latitude || !longitude || !searchQuery) {
      setMockPlaces([]);
      return;
    }

    // Generate 5-8 random places around the user's coordinates
    const numPlaces = Math.floor(Math.random() * 4) + 5;
    const places = [];
    
    // Capitalize query for titles
    const titleBase = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);

    for (let i = 0; i < numPlaces; i++) {
      // Random offset roughly within 1km
      const latOffset = (Math.random() - 0.5) * 0.015;
      const lngOffset = (Math.random() - 0.5) * 0.015;
      
      places.push({
        id: i,
        lat: latitude + latOffset,
        lng: longitude + lngOffset,
        name: `${titleBase} ${i + 1}`,
        desc: `Excelente local na região. Aprox. ${(Math.random() * 2).toFixed(1)} km.`
      });
    }
    
    setMockPlaces(places);
  }, [searchQuery, latitude, longitude]);

  if (latitude === null || longitude === null) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212' }}>
        <p style={{ color: '#a1a1aa' }}>Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden' }}>
      <MapContainer 
        center={[latitude, longitude]} 
        zoom={15} 
        style={{ width: '100%', height: '100%', background: '#0a0a0a' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <RecenterAutomatically lat={latitude} lng={longitude} />

        {/* User Location */}
        <Marker position={[latitude, longitude]} icon={UserIcon}>
          <Popup>
            <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', color: '#000' }}>
              <strong>Sua Localização</strong>
            </div>
          </Popup>
        </Marker>

        {/* Search Results (Mocked) */}
        {mockPlaces.map(place => (
          <Marker key={place.id} position={[place.lat, place.lng]} icon={PlaceIcon}>
            <Popup>
              <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', color: '#000' }}>
                <strong style={{ fontSize: '1rem', color: '#111' }}>{place.name}</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#555' }}>{place.desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
