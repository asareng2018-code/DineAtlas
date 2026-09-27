'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwibmFtZSI6ImRlbW8ifQ==';

const restaurants = [
  { id: 1, name: 'Saffron Bites', coordinates: [103.8198, 1.3521] },
  { id: 2, name: 'Harbor Grill', coordinates: [103.8519, 1.2903] },
  { id: 3, name: 'Garden Table', coordinates: [103.742, 1.3344] },
];

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [locationStatus, setLocationStatus] = useState('Use my location');

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [103.8198, 1.3521],
      zoom: 10,
    });

    restaurants.forEach((restaurant) => {
      const marker = new mapboxgl.Marker({ color: '#10b981' })
        .setLngLat(restaurant.coordinates as [number, number])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(restaurant.name))
        .addTo(map.current!);

      marker.getElement().title = restaurant.name;
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation || !map.current) {
      setLocationStatus('Location unavailable');
      return;
    }

    setLocationStatus('Finding your location...');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        map.current?.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 12,
          essential: true,
        });
        setLocationStatus('Location ready');
      },
      () => {
        setLocationStatus('Permission denied');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-emerald-400">DineAtlas</p>
            <h1 className="text-3xl font-bold">Restaurant map</h1>
            <p className="mt-2 text-slate-300">Explore nearby dining spots and halal-friendly locations in Singapore and beyond.</p>
          </div>
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            {locationStatus}
          </button>
        </div>
        <div ref={mapContainer} className="h-[500px] w-full overflow-hidden rounded-2xl border border-slate-700" />
      </div>
    </main>
  );
}
