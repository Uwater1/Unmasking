// src/data/aqhiAPI.js
// AQHI (Air Quality Health Index) API integration for Environment Canada

// AQHI monitoring stations across Canada with coordinates
const AQHI_STATIONS = {
  // British Columbia (Most AQHI stations are in BC)
  'JABNO': { name: 'Central Fraser Valley', coords: [-122.25, 49.0583333333333], province: 'BC' },
  'JAFNW': { name: 'Kamloops', coords: [-120.327222222222, 50.6733333333333], province: 'BC' },
  'JAFUV': { name: 'Central Okanagan', coords: [-119.483333333333, 49.8833333333333], province: 'BC' },
  'JAGPB': { name: 'Fort St. John', coords: [-120.846667, 56.2525], province: 'BC' },
  'JAHJY': { name: 'Comox Valley', coords: [-124.9833, 49.6833], province: 'BC' },
  'JAIQY': { name: 'Cranbrook', coords: [-115.7667, 49.5], province: 'BC' },
  'JAQAL': { name: 'Nanaimo / Parksville', coords: [-123.933333333333, 49.1666666666667], province: 'BC' },
  'JAZBU': { name: 'Metro Vancouver - SE', coords: [-122.75, 49.1166666666667], province: 'BC' },
  'JBBWA': { name: 'Duncan', coords: [-123.7, 48.783333], province: 'BC' },
  'JBHJG': { name: 'South Okanagan', coords: [-119.45, 49.0333333333333], province: 'BC' },
  'JBJFI': { name: 'Metro Vancouver - SW', coords: [-123.163333, 49.163333], province: 'BC' },
  'JBLVS': { name: 'Prince George', coords: [-122.75, 53.9166666666667], province: 'BC' },
  'JBMPJ': { name: 'Sparwood', coords: [-114.885833, 49.733333], province: 'BC' },
  'JBMQO': { name: 'Smithers', coords: [-127.176111, 54.779167], province: 'BC' },
  'JBNTS': { name: 'Quesnel', coords: [-122.5, 53.0], province: 'BC' },
  'JBOAP': { name: 'North Okanagan', coords: [-119.266666666667, 50.2583333333333], province: 'BC' },
  'JBOBQ': { name: 'Victoria / Saanich', coords: [-123.366666666667, 48.4333333333333], province: 'BC' },
  'JBRIK': { name: 'Metro Vancouver - NW', coords: [-123.113889, 49.261111], province: 'BC' },
  'JBTMB': { name: 'Williams Lake', coords: [-122.141666666667, 52.1416666666667], province: 'BC' },
  'JBXCK': { name: 'Terrace', coords: [-128.599722, 54.516389], province: 'BC' },
  'JBXHZ': { name: 'Metro Vancouver - NE', coords: [-122.683333333333, 49.2333333333333], province: 'BC' },
  'JCAAC': { name: 'Castlegar', coords: [-117.666667, 49.324722], province: 'BC' },
  'JCJHI': { name: 'Whistler', coords: [-122.966666666667, 50.1166666666667], province: 'BC' },
  'JCLMX': { name: 'WestShore', coords: [-123.493333, 48.423611], province: 'BC' },
  'JCMDB': { name: 'Kitimat', coords: [-128.652222, 54.053333], province: 'BC' },
  'JCVCC': { name: 'Eastern Fraser Valley', coords: [-121.941666666667, 49.175], province: 'BC' },
  
  // Yukon
  'KAHFT': { name: 'Whitehorse', coords: [-135.0808333, 60.6961111], province: 'YT' },
  
  // Additional stations may be available for other provinces
  'BADSZ': { name: 'Summerside (Wellington)', coords: [-64.0, 46.45], province: 'PE' },
  'BAEMV': { name: 'St. Peters Bay', coords: [-62.5833333333333, 46.4166666666667], province: 'PE' },
  'CAPHL': { name: 'Halifax Downtown', coords: [-63.590651, 44.647401], province: 'NS' }
};

/**
 * AQHI Risk Categories and Colors
 */
export const AQHI_CATEGORIES = {
  1: { risk: 'Low Risk', color: '#00e400', description: 'Ideal air quality for outdoor activities.' },
  2: { risk: 'Low Risk', color: '#00e400', description: 'Ideal air quality for outdoor activities.' },
  3: { risk: 'Low Risk', color: '#00e400', description: 'Ideal air quality for outdoor activities.' },
  4: { risk: 'Moderate Risk', color: '#ffff00', description: 'Consider reducing or rescheduling strenuous activities outdoors if you are experiencing symptoms.' },
  5: { risk: 'Moderate Risk', color: '#ffff00', description: 'Consider reducing or rescheduling strenuous activities outdoors if you are experiencing symptoms.' },
  6: { risk: 'Moderate Risk', color: '#ffff00', description: 'Consider reducing or rescheduling strenuous activities outdoors if you are experiencing symptoms.' },
  7: { risk: 'High Risk', color: '#ff7e00', description: 'Reduce or reschedule strenuous activities outdoors.' },
  8: { risk: 'High Risk', color: '#ff7e00', description: 'Reduce or reschedule strenuous activities outdoors.' },
  9: { risk: 'High Risk', color: '#ff7e00', description: 'Reduce or reschedule strenuous activities outdoors.' },
  10: { risk: 'Very High Risk', color: '#ff0000', description: 'Avoid strenuous activities outdoors.' },
  '10+': { risk: 'Very High Risk', color: '#8f3f97', description: 'Avoid strenuous activities outdoors.' }
};

/**
 * Get the color for an AQHI value
 */
export const getAqhiColor = (aqhi) => {
  if (!aqhi) return '#cccccc'; // Gray for no data
  
  if (aqhi >= 10) return AQHI_CATEGORIES['10+'].color;
  
  const category = AQHI_CATEGORIES[Math.max(1, Math.min(10, Math.round(aqhi)))];
  return category ? category.color : '#cccccc';
};

/**
 * Get the risk category for an AQHI value
 */
export const getAqhiRisk = (aqhi) => {
  if (!aqhi) return 'No Data';
  
  if (aqhi >= 10) return AQHI_CATEGORIES['10+'].risk;
  
  const category = AQHI_CATEGORIES[Math.max(1, Math.min(10, Math.round(aqhi)))];
  return category ? category.risk : 'No Data';
};

/**
 * Find the nearest AQHI station to given coordinates
 */
export const findNearestAqhiStation = (lat, lng) => {
  let nearestStation = null;
  let minDistance = Infinity;
  
  Object.entries(AQHI_STATIONS).forEach(([stationId, station]) => {
    const distance = calculateDistance(lat, lng, station.coords[1], station.coords[0]);
    if (distance < minDistance) {
      minDistance = distance;
      nearestStation = { id: stationId, ...station, distance };
    }
  });
  
  return nearestStation;
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRadians = (degrees) => degrees * (Math.PI / 180);

/**
 * Fetch current AQHI data from Environment Canada API
 */
export const fetchAqhiData = async () => {
  try {
    const response = await fetch(
      'https://api.weather.gc.ca/collections/aqhi-forecasts-realtime/items?lang=en&f=json&limit=1000'
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch AQHI data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process the data to get the latest AQHI values for each station
    const stationData = {};
    
    data.features.forEach(feature => {
      const props = feature.properties;
      const stationId = props.location_id;
      const aqhi = props.aqhi;
      const forecastTime = new Date(props.forecast_datetime);
      
      // Keep only the most recent forecast for each station
      if (!stationData[stationId] || new Date(stationData[stationId].forecast_datetime) < forecastTime) {
        stationData[stationId] = {
          id: stationId,
          name: props.location_name_en,
          coordinates: feature.geometry.coordinates,
          aqhi: aqhi,
          risk: getAqhiRisk(aqhi),
          color: getAqhiColor(aqhi),
          forecast_datetime: props.forecast_datetime,
          publication_datetime: props.publication_datetime
        };
      }
    });
    
    return {
      success: true,
      data: stationData,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching AQHI data:', error);
    return {
      success: false,
      error: error.message,
      data: {}
    };
  }
};

/**
 * Get AQHI data for a specific region/coordinates
 */
export const getAqhiForRegion = async (lat, lng) => {
  try {
    const aqhiData = await fetchAqhiData();
    
    if (!aqhiData.success) {
      return {
        success: false,
        error: aqhiData.error
      };
    }
    
    // Find the nearest station
    const nearestStation = findNearestAqhiStation(lat, lng);
    
    if (!nearestStation) {
      return {
        success: false,
        error: 'No AQHI stations found'
      };
    }
    
    // Get data for the nearest station
    const stationData = aqhiData.data[nearestStation.id];
    
    if (!stationData) {
      return {
        success: false,
        error: 'No current data available for nearest station'
      };
    }
    
    return {
      success: true,
      data: {
        aqhi: stationData.aqhi,
        risk: stationData.risk,
        color: stationData.color,
        station: stationData.name,
        distance: Math.round(nearestStation.distance),
        lastUpdated: new Date(stationData.publication_datetime).toLocaleString(),
        coordinates: stationData.coordinates
      }
    };
  } catch (error) {
    console.error('Error getting AQHI for region:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default {
  fetchAqhiData,
  getAqhiForRegion,
  findNearestAqhiStation,
  getAqhiColor,
  getAqhiRisk,
  AQHI_CATEGORIES,
  AQHI_STATIONS
};