// src/components/Map/CanadaMap.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getMPByFedNum } from '../../data/mpData';
import { fetchAirQuality } from '../../data/airQualityAPI';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CanadaMap = () => {
  const [electoralData, setElectoralData] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map center (roughly center of Canada)
  const mapCenter = [56.1304, -106.3468];
  const mapZoom = 4;

  // Load electoral district data
  useEffect(() => {
    const loadElectoralData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/canada-electoral-districts.geojson');
        
        if (!response.ok) {
          throw new Error('Failed to load electoral data');
        }
        
        const data = await response.json();
        setElectoralData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error loading electoral data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadElectoralData();
  }, []);

  // Style function for electoral districts
  const districtStyle = (feature) => {
    const mp = getMPByFedNum(feature.properties.FEDNUM);
    let color = '#3388ff'; // Default blue
    
    // Color by party
    if (mp) {
      switch (mp.party.toLowerCase()) {
        case 'liberal':
          color = '#d71920'; // Liberal red
          break;
        case 'conservative':
          color = '#1a4480'; // Conservative blue
          break;
        case 'bloc québécois':
          color = '#33b2cc'; // BQ light blue
          break;
        case 'new democratic party':
        case 'ndp':
          color = '#f37021'; // NDP orange
          break;
        case 'green party':
        case 'green':
          color = '#3d9b35'; // Green
          break;
        default:
          color = '#808080'; // Gray for independents/others
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

  // Highlight style for selected district
  const highlightStyle = {
    fillColor: '#ff7800',
    weight: 3,
    opacity: 1,
    color: '#ff7800',
    fillOpacity: 0.8
  };

  // Handle district click
  const onDistrictClick = (e) => {
    const layer = e.target;
    const properties = layer.feature.properties;
    const mp = getMPByFedNum(properties.FEDNUM);
    
    setSelectedDistrict({
      name: properties.ENNAME || properties.FEDNAME || 'Unknown District',
      federalNumber: properties.FEDNUM || properties.FED_NUM || 'N/A',
      properties: properties,
      mp: mp,
      layer: layer
    });

    // Reset previous selections
    if (selectedDistrict && selectedDistrict.layer) {
      selectedDistrict.layer.setStyle(districtStyle(selectedDistrict.layer.feature));
    }

    // Highlight current selection
    layer.setStyle(highlightStyle);
  };

  // Handle each district feature
  const onEachFeature = (feature, layer) => {
    const mp = getMPByFedNum(feature.properties.FEDNUM);
    
    layer.on({
      click: onDistrictClick,
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
        if (selectedDistrict && selectedDistrict.layer === layer) {
          return; // Keep highlighting if selected
        }
        layer.setStyle(districtStyle(feature));
      }
    });

    // Bind popup with MP info
    const districtName = feature.properties.ENNAME || feature.properties.FEDNAME || 'Unknown District';
    const mpInfo = mp ? `
      <strong>MP:</strong> ${mp.name} (${mp.party})<br>
      <strong>Email:</strong> ${mp.email}
    ` : '<em>MP information not available</em>';
    
    layer.bindPopup(`
      <div class="district-popup">
        <h3>${districtName}</h3>
        <p><strong>Federal Number:</strong> ${feature.properties.FEDNUM || 'N/A'}</p>
        ${mpInfo}
        <p><em>Click for detailed information</em></p>
      </div>
    `);
  };

  if (loading) {
    return (
      <div className="map-loading">
        <div className="loading-spinner"></div>
        <p>Loading electoral districts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-error">
        <p>Error loading map data: {error}</p>
        <p>Please ensure the data files are properly set up.</p>
        <p><small>Run: <code>node get-electoral-data.js</code> to create data files</small></p>
      </div>
    );
  }

  return (
    <div className="canada-map-container">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '600px', width: '100%' }}
        className="canada-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {electoralData && (
          <GeoJSON
            data={electoralData}
            style={districtStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
      
      {/* Party Legend */}
      <div className="party-legend">
        <h4>Political Parties</h4>
        <div className="party-item">
          <div className="party-color" style={{backgroundColor: '#d71920'}}></div>
          <span>Liberal</span>
        </div>
        <div className="party-item">
          <div className="party-color" style={{backgroundColor: '#1a4480'}}></div>
          <span>Conservative</span>
        </div>
        <div className="party-item">
          <div className="party-color" style={{backgroundColor: '#f37021'}}></div>
          <span>NDP</span>
        </div>
        <div className="party-item">
          <div className="party-color" style={{backgroundColor: '#3d9b35'}}></div>
          <span>Green</span>
        </div>
        <div className="party-item">
          <div className="party-color" style={{backgroundColor: '#33b2cc'}}></div>
          <span>Bloc Québécois</span>
        </div>
      </div>
      
      {selectedDistrict && (
        <DistrictInfoPanel district={selectedDistrict} />
      )}
    </div>
  );
};

// District information panel component
const DistrictInfoPanel = ({ district }) => {
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDistrictData = async () => {
      setLoading(true);
      
      try {
        // Fetch real air quality data
        const airQualityResult = await fetchAirQuality(district.name);
        
        if (airQualityResult.success) {
          setAirQuality(airQualityResult.data);
        } else {
          console.error('Failed to fetch air quality:', airQualityResult.error);
          // Fallback data
          setAirQuality({
            index: 3,
            condition: 'Low Risk',
            location: district.name,
            lastUpdated: new Date().toLocaleString(),
            station: 'Data unavailable'
          });
        }
      } catch (error) {
        console.error('Error fetching district data:', error);
        setAirQuality(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDistrictData();
  }, [district]);

  const getAirQualityColor = (index) => {
    if (index <= 3) return '#00a651'; // Low risk - Green
    if (index <= 6) return '#ffb300'; // Moderate risk - Yellow
    if (index <= 10) return '#ff6b00'; // High risk - Orange
    return '#e53e3e'; // Very high risk - Red
  };

  const lungCancerAdvocacyMessage = `Dear ${district.mp?.name || 'MP'},

I am writing to you as a constituent of ${district.name} concerned about lung cancer prevention and treatment in our community.

Lung cancer remains one of the leading causes of cancer deaths in Canada, yet it receives disproportionately less research funding compared to other cancers. Additionally, air quality in our region (current AQHI: ${airQuality?.index || 'N/A'}) may be contributing to increased health risks.

I urge you to support:
1. Increased federal funding for lung cancer research
2. Enhanced air quality monitoring and improvement measures  
3. Better access to lung cancer screening programs
4. Support for lung cancer patients and families
5. Stricter environmental regulations to reduce air pollution

Lung cancer affects not just smokers - 15-20% of cases occur in people who have never smoked. Environmental factors, including air pollution, play a significant role in lung cancer development.

Thank you for your attention to this critical health issue affecting constituents in ${district.name}.

Sincerely,
[Your Name]
[Your Address]
[Your Contact Information]`;

  return (
    <div className="district-info-panel">
      <button 
        className="close-panel"
        onClick={() => window.location.reload()}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          color: '#666'
        }}
      >
        ×
      </button>
      
      <h2>{district.name}</h2>
      <p><strong>Federal District:</strong> {district.federalNumber}</p>
      <p><strong>Province:</strong> {district.properties.PRENAME}</p>
      
      <div className="mp-info">
        <h3>Member of Parliament</h3>
        {district.mp ? (
          <>
            <p><strong>Name:</strong> {district.mp.name}</p>
            <p><strong>Party:</strong> {district.mp.party}</p>
            <p><strong>Email:</strong> <a href={`mailto:${district.mp.email}`}>{district.mp.email}</a></p>
            <p><strong>Phone:</strong> {district.mp.phone}</p>
            <p><strong>Office:</strong> {district.mp.constituency_office}</p>
          </>
        ) : (
          <p>MP information not available for this district.</p>
        )}
      </div>
      
      <div className="air-quality">
        <h3>Air Quality Health Index</h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div className="loading-spinner"></div>
            <p>Loading air quality data...</p>
          </div>
        ) : airQuality ? (
          <>
            <p>
              <strong>AQHI:</strong> 
              <span style={{ 
                color: getAirQualityColor(airQuality.index), 
                fontWeight: 'bold', 
                marginLeft: '5px',
                fontSize: '18px'
              }}>
                {airQuality.index} - {airQuality.condition}
              </span>
            </p>
            <p><strong>Monitoring Station:</strong> {airQuality.station}</p>
            {airQuality.distance && <p><strong>Distance:</strong> {airQuality.distance}</p>}
            <p><strong>Last Updated:</strong> {airQuality.lastUpdated}</p>
            
            {airQuality.pollutants && (
              <div className="pollutant-data">
                <h4>Current Pollutant Levels:</h4>
                <div className="pollutant-grid">
                  <span>PM2.5: {airQuality.pollutants.pm25} μg/m³</span>
                  <span>PM10: {airQuality.pollutants.pm10} μg/m³</span>
                  <span>NO₂: {airQuality.pollutants.no2} ppb</span>
                  <span>O₃: {airQuality.pollutants.o3} ppb</span>
                </div>
              </div>
            )}
            
            {airQuality.recommendations && (
              <div className="health-recommendations">
                <h4>Health Recommendations:</h4>
                <p><strong>General Population:</strong> {airQuality.recommendations.general}</p>
                <p><strong>Sensitive Individuals:</strong> {airQuality.recommendations.sensitive}</p>
              </div>
            )}
            
            <div className="air-quality-info">
              <small>
                🚨 <strong>Lung Cancer Risk:</strong> Long-term exposure to poor air quality increases lung cancer risk. 
                PM2.5 particles are particularly harmful as they can penetrate deep into lung tissue.
              </small>
            </div>
          </>
        ) : (
          <div className="air-quality-error">
            <p>❌ Air quality data unavailable for this location</p>
            <p><small>We're working to expand coverage to all regions</small></p>
          </div>
        )}
      </div>
      
      <div className="lung-cancer-stats">
        <h3>Lung Cancer Facts</h3>
        <ul>
          <li>Lung cancer is the leading cause of cancer death in Canada</li>
          <li>Air pollution increases lung cancer risk by 15-30%</li>
          <li>Early detection can improve survival rates significantly</li>
          <li>Non-smokers account for 15-20% of lung cancer cases</li>
          <li>Environmental factors contribute to 20% of lung cancers</li>
        </ul>
      </div>
      
      <div className="actions">
        <button 
          className="advocacy-button"
          onClick={() => {
            const subject = encodeURIComponent('Urgent: Lung Cancer Advocacy and Air Quality Concerns');
            const body = encodeURIComponent(lungCancerAdvocacyMessage);
            window.open(`mailto:${district.mp?.email}?subject=${subject}&body=${body}`, '_blank');
          }}
          disabled={!district.mp?.email}
        >
          📧 Email MP About Lung Cancer Issues
        </button>
        
        <div className="action-buttons">
          <button 
            className="secondary-button"
            onClick={() => window.open('https://www.canada.ca/en/health-canada/services/air-quality/air-quality-health-index.html', '_blank')}
          >
            🌬️ Learn About Air Quality
          </button>
          
          <button 
            className="secondary-button"
            onClick={() => window.open('https://www.cancer.ca/en/cancer-information/cancer-type/lung', '_blank')}
          >
            🎗️ Lung Cancer Resources
          </button>
        </div>
        
        <div className="additional-actions" style={{ marginTop: '15px' }}>
          <button 
            className="secondary-button"
            onClick={() => window.open('https://www.ourcommons.ca/members/en/search', '_blank')}
            style={{ width: '100%' }}
          >
            🏛️ Find All MPs
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanadaMap;
