// src/App.js
import React from 'react';
import CanadaMap from './components/Map/CanadaMap';
import './styles/map.css';

function App() {
  return (
    <div className="App">
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
            <p>
              Click on any electoral district to view your Member of Parliament's contact 
              information and current air quality data. Use this tool to advocate for 
              lung cancer awareness and environmental health in your community.
            </p>
          </div>
          
          <CanadaMap />
        </section>
        
        <section className="advocacy-info">
          <div className="info-grid">
            <div className="info-card">
              <h3>Contact Your MP</h3>
              <p>
                Your Member of Parliament represents your voice in federal decisions. 
                Use their contact information to advocate for lung cancer research 
                funding and environmental health policies.
              </p>
            </div>
            
            <div className="info-card">
              <h3>Air Quality Matters</h3>
              <p>
                Poor air quality is linked to increased lung cancer risk. Monitor 
                your local Air Quality Health Index (AQHI) and advocate for cleaner 
                air policies in your area.
              </p>
            </div>
            
            <div className="info-card">
              <h3>Take Action</h3>
              <p>
                Every voice matters in the fight against lung cancer. Use this map 
                to connect with your representatives and make your community's 
                health a priority.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2024 Unmasking Lung Cancer. Empowering communities through information and advocacy.</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#resources">Resources</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
