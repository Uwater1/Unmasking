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
const LoadingSpinner = () => {
  return (
    <div>Loading...</div>
  );
};

// Helper component for error state
const ErrorMessage = ({ error }) => (
  <div style={{
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
    color: '#721c24',
    padding: '20px',
    margin: '20px 0',
    textAlign: 'center'
  }}>
    <p>Error loading map data: {error}</p>
    <p>Please try again later or contact support if the problem persists.</p>
  </div>
);

// Helper component for the party legend
const PartyLegend = () => (
  <div style={{
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    zIndex: 1000
  }}>
    <h4 style={{ margin: '0 0 10px 0' }}>Political Parties</h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[
        { color: '#d71920', name: 'Liberal' },
        { color: '#1a4480', name: 'Conservative' },
        { color: '#f37021', name: 'NDP' },
        { color: '#3d9b35', name: 'Green' },
        { color: '#33b2cc', name: 'Bloc Québécois' }
      ].map(party => (
        <div key={party.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '16px',
            height: '16px',
            backgroundColor: party.color,
            borderRadius: '3px',
            border: '1px solid rgba(0,0,0,0.1)'
          }} />
          <span style={{ fontSize: '14px' }}>{party.name}</span>
        </div>
      ))}
    </div>
  </div>
);

// Helper component for the info panel
const DistrictInfoPanel = ({ district }) => {
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!district) return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchAirQuality(district.name);
        setAirQuality(result.data);
      } catch (error) {
        console.error('Error fetching air quality:', error);
        setAirQuality({
          index: 0,
          condition: 'Unknown',
          location: district.name,
          lastUpdated: new Date().toLocaleString(),
          station: 'Error fetching data'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [district]);

  if (!district) return null;

  return (
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
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{district.name}</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
          Member of Parliament
        </h4>
        {district.mp ? (
          <div>
            <p style={{ margin: '3px 0', fontWeight: 'bold' }}>{district.mp.name}</p>
            <p style={{ margin: '3px 0', color: '#666' }}>{district.mp.party}</p>
            {district.mp.email && (
              <p style={{ margin: '3px 0', fontSize: '13px' }}>
                <a href={`mailto:${district.mp.email}`} style={{ color: '#0066cc' }}>
                  {district.mp.email}
                </a>
              </p>
            )}
          </div>
        ) : (
          <p style={{ margin: '5px 0', color: '#666' }}>No MP information available</p>
        )}
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
          Air Quality {loading && '(Loading...)'}
        </h4>
        {airQuality ? (
          <div>
            <p style={{ margin: '3px 0' }}>
              <span style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: getAirQualityColor(airQuality.index),
                borderRadius: '50%',
                marginRight: '5px'
              }} />
              {airQuality.condition}
            </p>
            <p style={{ margin: '3px 0', fontSize: '12px', color: '#777' }}>
              Last updated: {airQuality.lastUpdated}
            </p>
          </div>
        ) : (
          <p style={{ margin: '5px 0', color: '#666' }}>No air quality data available</p>
        )}
      </div>
    </div>
  );
};

// Helper function to get color based on air quality index
const getAirQualityColor = (index) => {
  const colors = [
    '#00e400', // Good (0-50)
    '#ffff00', // Moderate (51-100)
    '#ff7e00', // Unhealthy for Sensitive Groups (101-150)
    '#ff0000', // Unhealthy (151-200)
    '#8f3f97', // Very Unhealthy (201-300)
    '#7e0023'  // Hazardous (301-500)
  ];
  
  return colors[Math.min(Math.floor(index / 50), colors.length - 1)];
};

// Prop types validation
DistrictInfoPanel.propTypes = {
  district: PropTypes.shape({
    name: PropTypes.string,
    mp: PropTypes.shape({
      name: PropTypes.string,
      party: PropTypes.string,
      email: PropTypes.string
    })
  })
};

// Main CanadaMap component
const CanadaMap = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const mapCenter = [56.1304, -106.3468]; // Rough center of Canada
  const mapZoom = 4;

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle district click
  const handleDistrictClick = (e) => {
    const layer = e.target;
    const properties = layer.feature?.properties || {};
    const mp = getMPByFedNum(properties.FEDNUM);
    
    setSelectedDistrict({
      name: properties.ENNAME || properties.FEDNAME || 'Unknown District',
      properties,
      mp
    });
  };

  // Style function for districts
  const getDistrictStyle = (feature) => {
    const mp = getMPByFedNum(feature.properties.FEDNUM);
    let color = '#3388ff'; // Default blue
    
    if (mp) {
      switch (mp.party?.toLowerCase()) {
        case 'liberal': color = '#d71920'; break;
        case 'conservative': color = '#1a4480'; break;
        case 'bloc québécois': color = '#33b2cc'; break;
        case 'new democratic party':
        case 'ndp': color = '#f37021'; break;
        case 'green party':
        case 'green': color = '#3d9b35'; break;
        default: color = '#808080';
      }
    }
    
    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: '#ffffff',
      fillOpacity: 0.6
    };
  };

  // Handle feature events
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: handleDistrictClick,
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(getDistrictStyle(feature));
      }
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div style={{
      position: 'relative',
      height: '600px',
      width: '100%',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
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
      
      <PartyLegend />
      <DistrictInfoPanel district={selectedDistrict} />
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '10px 20px',
        borderRadius: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: 1000,
        textAlign: 'center',
        fontSize: '14px'
      }}>
        <p style={{ margin: 0 }}>Click on any electoral district to view details</p>
      </div>
    </div>
  );
};

export default CanadaMap;
