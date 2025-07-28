import React from 'react';
import CanadaMap from './components/Map/CanadaMap';
import './styles/map.css';

function MapApp() {
  return (
    <div className="MapApp">
      <header className="app-header">
        <div className="header-content">
          <h1>Unmasking Lung Cancer</h1>
          <p>Interactive Map - Find Your MP and Local Air Quality Information</p>
        </div>
      </header>
      
      <main className="app-main">
        <section className="map-section">
          <div className="section-intro">
            <h2>Explore Your Electoral District</h2>
            <p>Click on any electoral district to see information about your MP and local air quality data.</p>
          </div>
          <div className="map-container">
            <CanadaMap />
          </div>
        </section>
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Unmasking Lung Cancer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MapApp;
