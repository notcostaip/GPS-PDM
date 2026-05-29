import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'PDMGPS — Precision Navigation System',
  description:
    'Ultra-premium GPS tracking and navigation system with real-time geolocation, 3D Earth visualization, and glassmorphism dashboard.',
  openGraph: {
    title: 'PDMGPS — Precision Navigation System',
    description:
      'Real-time GPS tracking with cinematic 3D Earth visualization.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#050A12',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
