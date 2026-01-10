'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function WeatherMap() {
  const [mounted, setMounted] = useState(false);
  const { site, lguName, fullLocation, getHallName } = useSiteConfig();
  
  const coords: [number, number] = [site.coordinates.lat, site.coordinates.lng];
  const hallName = getHallName();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="section weather-map-section">
      <div className="container">
        <div className="home-stats-v2-header">
          <h2>Weather and Map of {lguName}</h2>
        </div>
        <div className="weather-map-grid">
          <div className="weather-column">
            <div id="weather-container" aria-live="polite">
              {/* Weather widget - implement with actual API */}
              <div className="weather-card">
                <div className="weather-main">
                  <i className="bi bi-cloud-sun weather-icon" />
                  <span className="weather-temp">28°C</span>
                </div>
                <div className="weather-details">
                  <p className="weather-desc">Partly Cloudy</p>
                  <p className="weather-location">{fullLocation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="map-column">
            <div className="map-card">
              <div id="map-container" role="application" aria-label={`Interactive map of ${fullLocation}`}>
                {mounted && (
                  <MapContainer
                    center={coords}
                    zoom={13}
                    style={{ height: '300px', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coords}>
                      <Popup>{hallName}</Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>
              <p className="map-attribution">
                <i className="bi bi-geo-alt" aria-hidden="true" /> {hallName}, {fullLocation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
