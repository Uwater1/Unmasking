// src/components/Map/CanadaMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { getAqhiForRegion, getAqhiColor, AQHI_CATEGORIES, fetchAqhiData } from '../../data/aqhiAPI';

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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
      width: '100%',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px'
    }}>
      <div>Loading AQHI data...</div>
    </div>
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
    <p>Error loading AQHI data: {error}</p>
    <p>Please try again later or contact support if the problem persists.</p>
  </div>
);

// Helper component for the AQHI legend
const AqhiLegend = () => (
  <div style={{
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    maxWidth: '280px',
    maxHeight: '500px',
    overflowY: 'auto'
  }}>
    <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold' }}>Air Quality Health Index</h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {[
        { range: '1', risk: 'Low Risk', color: '#00ff00' },
        { range: '2', risk: 'Low Risk', color: '#40ff40' },
        { range: '3', risk: 'Low Risk', color: '#80ff80' },
        { range: '4', risk: 'Moderate Risk', color: '#ffff00' },
        { range: '5', risk: 'Moderate Risk', color: '#ffdd00' },
        { range: '6', risk: 'Moderate Risk', color: '#ffbb00' },
        { range: '7', risk: 'High Risk', color: '#ff7e00' },
        { range: '8', risk: 'High Risk', color: '#ff5500' },
        { range: '9', risk: 'High Risk', color: '#ff3300' },
        { range: '10', risk: 'Very High Risk', color: '#ff0000' },
        { range: '10+', risk: 'Very High Risk', color: '#8f3f97' }
      ].map(category => (
        <div key={category.range} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '16px',
            height: '14px',
            backgroundColor: category.color,
            borderRadius: '2px',
            border: '1px solid rgba(0,0,0,0.2)'
          }} />
          <span style={{ fontSize: '13px', fontWeight: '500', minWidth: '25px' }}>{category.range}</span>
          <span style={{ fontSize: '11px', color: '#666' }}>{category.risk}</span>
        </div>
      ))}
    </div>
    <div style={{ 
      marginTop: '10px', 
      padding: '8px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '4px',
      fontSize: '11px',
      color: '#666'
    }}>
      Colors show nearest AQHI monitoring station data
    </div>
  </div>
);

// Helper component for the info panel
const RegionInfoPanel = ({ region }) => {
  const [aqhiData, setAqhiData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!region) return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        // Calculate center of the region for AQHI lookup
        const bounds = L.geoJSON(region.feature).getBounds();
        const center = bounds.getCenter();
        
        const result = await getAqhiForRegion(center.lat, center.lng);
        
        if (result.success) {
          setAqhiData(result.data);
        } else {
          setAqhiData({
            aqhi: null,
            risk: 'No Data',
            station: 'No nearby station',
            distance: null,
            lastUpdated: 'N/A'
          });
        }
      } catch (error) {
        console.error('Error fetching AQHI data:', error);
        setAqhiData({
          aqhi: null,
          risk: 'Error',
          station: 'Failed to fetch data',
          distance: null,
          lastUpdated: 'N/A'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region]);

  if (!region) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
      zIndex: 1000,
      maxWidth: '350px',
      border: '1px solid #e0e0e0'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>{region.name}</h3>
      
      <div>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666', fontWeight: '600' }}>
          Air Quality Health Index {loading && '(Loading...)'}
        </h4>
        {aqhiData ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                backgroundColor: aqhiData.aqhi ? getAqhiColor(aqhiData.aqhi) : '#cccccc',
                borderRadius: '50%',
                marginRight: '10px',
                border: '2px solid #fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
              <div>
                <span style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#333' 
                }}>
                  {aqhiData.aqhi || 'N/A'}
                </span>
                <span style={{ 
                  marginLeft: '10px', 
                  fontSize: '14px', 
                  color: '#666',
                  fontWeight: '500'
                }}>
                  {aqhiData.risk}
                </span>
              </div>
            </div>
            
            <div style={{ fontSize: '12px', color: '#777', lineHeight: '1.4' }}>
              <p style={{ margin: '4px 0' }}>
                <strong>Station:</strong> {aqhiData.station}
              </p>
              {aqhiData.distance && (
                <p style={{ margin: '4px 0' }}>
                  <strong>Distance:</strong> ~{aqhiData.distance} km
                </p>
              )}
              <p style={{ margin: '4px 0' }}>
                <strong>Updated:</strong> {aqhiData.lastUpdated}
              </p>
            </div>

            {aqhiData.aqhi && AQHI_CATEGORIES[Math.min(10, Math.round(aqhiData.aqhi))] && (
              <div style={{ 
                marginTop: '12px', 
                padding: '10px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  color: '#555',
                  fontStyle: 'italic'
                }}>
                  {AQHI_CATEGORIES[Math.min(10, Math.round(aqhiData.aqhi))].description}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p style={{ margin: '5px 0', color: '#666' }}>No air quality data available</p>
        )}
      </div>
    </div>
  );
};

// Main CanadaMap component
const CanadaMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [aqhiData, setAqhiData] = useState({});
  const mapCenter = [56.1304, -106.3468]; // Rough center of Canada
  const mapZoom = 4;

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch('/data/canada-electoral-districts.geojson');
        if (!response.ok) {
          throw new Error('Failed to fetch electoral data');
        }
        const data = await response.json();
        setGeoData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoData();
  }, []);

  // Fetch AQHI data on component mount
  useEffect(() => {
    const loadAqhiData = async () => {
      try {
        const result = await fetchAqhiData();
        if (result.success) {
          setAqhiData(result.data);
        }
      } catch (error) {
        console.error('Error loading AQHI data:', error);
      }
    };

    loadAqhiData();
    // Refresh AQHI data every 30 minutes
    const interval = setInterval(loadAqhiData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle region click
  const handleRegionClick = (e) => {
    const layer = e.target;
    const properties = layer.feature?.properties || {};
    
    setSelectedRegion({
      name: properties.ENNAME || properties.FEDNAME || 'Unknown Region',
      properties,
      feature: layer.feature
    });
  };

  // Style function for regions based on AQHI data
  const getRegionStyle = (feature) => {
    // Calculate center of the feature to find nearest AQHI station
    const bounds = L.geoJSON(feature).getBounds();
    const center = bounds.getCenter();
    
    // Find nearest AQHI station
    let nearestAqhi = null;
    let minDistance = Infinity;
    
    Object.values(aqhiData).forEach(station => {
      if (station.coordinates && station.aqhi !== null) {
        const stationLat = station.coordinates[1];
        const stationLng = station.coordinates[0];
        const distance = Math.sqrt(
          Math.pow(center.lat - stationLat, 2) + 
          Math.pow(center.lng - stationLng, 2)
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          nearestAqhi = station.aqhi;
        }
      }
    });
    
    const color = nearestAqhi ? getAqhiColor(nearestAqhi) : '#cccccc';
    
    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: '#ffffff',
      fillOpacity: 0.7
    };
  };

  // Handle feature events
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: handleRegionClick,
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          opacity: 1,
          fillOpacity: 0.9
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(getRegionStyle(feature));
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
        {geoData && (
          <GeoJSON 
            data={geoData}
            style={getRegionStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
      
      <AqhiLegend />
      <RegionInfoPanel region={selectedRegion} />
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '12px 24px',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
        textAlign: 'center',
        fontSize: '14px',
        border: '1px solid #e0e0e0'
      }}>
        <p style={{ margin: 0, fontWeight: '500' }}>Click any region to view AQHI details</p>
      </div>
    </div>
  );
};

// Prop types validation
RegionInfoPanel.propTypes = {
  region: PropTypes.shape({
    name: PropTypes.string,
    properties: PropTypes.object,
    feature: PropTypes.object
  })
};

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired
};

export default CanadaMap;
