import React from 'react';
import TestComponent from './components/TestComponent';
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
            <TestComponent />
          </div>
        </section>
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <div className="contact-section">
            <h3>Contact Us</h3>
            <p>210 6111 36 ST SE, Calgary, Alberta, T2C 3W</p>
            <p>Email: <a href="mailto:Unmaskinglungcancercalgary@gmail.com">Unmaskinglungcancercalgary@gmail.com</a></p>
            <p>Phone: 403 801 5000</p>
          </div>
          <div className="social-media">
            <a href="https://www.facebook.com/UnmaskingC/" target="_blank" rel="noopener noreferrer">
              <img src="/facebook.png" alt="Facebook" />
            </a>
            <a href="https://www.linkedin.com/company/unmasking-the-reality-of-lung-cancer/" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" />
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Unmasking Lung Cancer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MapApp;
