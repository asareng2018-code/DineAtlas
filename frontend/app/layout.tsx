import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'DineAtlas',
  description: 'DineAtlas helps people discover restaurants, local offers, and daily prayer times worldwide with a public, no-login experience.',
  manifest: '/manifest.webmanifest',
  themeColor: '#020617',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          strategy="lazyOnload"
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
          async
          defer
        />
        {children}
      </body>
    </html>
  );
}
