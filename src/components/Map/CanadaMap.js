// src/components/Map/CanadaMap.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

// Mock data functions - replace with actual implementations
const getMPByFedNum = (fedNum) => ({
  name: 'John Doe',
  party: 'Liberal',
  email: 'john.doe@example.com',
  phone: '555-123-4567',
  constituency_office: '123 Parliament St, Ottawa, ON'
});

const fetchAirQuality = async (location) => ({
  success: true,
  data: {
    index: 2,
    condition: 'Moderate',
    location: location,
    lastUpdated: new Date().toLocaleString(),
    station: 'Central Monitoring'
  }
});

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component for loading state
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  }}>
    <div>Loading map data...</div>
  </div>
);

// Helper component for error state
const ErrorMessage = ({ error }) => (
  <div style={{
    padding: '20px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '8px',
    margin: '20px 0',
    textAlign: 'center'
  }}>
    <p>Error loading map data: {error.message || 'Unknown error'}</p>
  </div>
);

// Main CanadaMap component
const CanadaMap = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  
  // Map center (roughly center of Canada)
  const mapCenter = [56.1304, -106.3468];
  const mapZoom = 4;

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div style={{ height: '600px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        className="canada-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      
      {selectedDistrict && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000,
          maxWidth: '300px'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>{selectedDistrict.name}</h3>
          <p>More details will be shown here when a district is selected.</p>
        </div>
      )}
    </div>
  );
};

CanadaMap.propTypes = {
  // Add any required props here
};

export default CanadaMap;
