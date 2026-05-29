'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  accuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number | null;
  error: string | null;
  status: 'idle' | 'acquiring' | 'active' | 'denied' | 'unavailable';
}

const initialState: GeolocationState = {
  latitude: null,
  longitude: null,
  altitude: null,
  accuracy: null,
  heading: null,
  speed: null,
  timestamp: null,
  error: null,
  status: 'idle',
};

function mapGeolocationError(error: GeolocationPositionError): { message: string; status: 'denied' | 'unavailable' } {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return {
        message: 'Location access denied. Please enable location permissions in your device settings.',
        status: 'denied',
      };
    case error.POSITION_UNAVAILABLE:
      return {
        message: 'Unable to determine your location. Ensure GPS is enabled and you have a clear view of the sky.',
        status: 'unavailable',
      };
    case error.TIMEOUT:
      return {
        message: 'Location request timed out. Moving to an open area may help.',
        status: 'unavailable',
      };
    default:
      return {
        message: 'An unknown error occurred while accessing your location.',
        status: 'unavailable',
      };
  }
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>(initialState);
  const watchIdRef = useRef<number | null>(null);

  const startWatching = useCallback(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by this browser or WebView.',
        status: 'unavailable',
      }));
      return;
    }

    // Check for secure context (required for geolocation in modern browsers)
    if (typeof window !== 'undefined' && !window.isSecureContext) {
      setState((prev) => ({
        ...prev,
        error: 'Geolocation requires a secure context (HTTPS). Please access this app via HTTPS.',
        status: 'unavailable',
      }));
      return;
    }

    setState((prev) => ({ ...prev, status: 'acquiring', error: null }));

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp,
          error: null,
          status: 'active',
        });
      },
      (error) => {
        const mapped = mapGeolocationError(error);
        setState((prev) => ({
          ...prev,
          error: mapped.message,
          status: mapped.status,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, []);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const retry = useCallback(() => {
    stopWatching();
    setState(initialState);
    startWatching();
  }, [stopWatching, startWatching]);

  useEffect(() => {
    startWatching();
    return () => stopWatching();
  }, [startWatching, stopWatching]);

  return { ...state, retry };
}
