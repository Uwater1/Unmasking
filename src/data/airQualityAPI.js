// src/data/airQualityAPI.js
// Air Quality Health Index API integration for Environment Canada

// Air quality monitoring stations across Canada
const airQualityStations = {
  // Ontario
  'toronto': { lat: 43.6532, lng: -79.3832, station: 'Toronto Downtown' },
  'ottawa': { lat: 45.4215, lng: -75.6972, station: 'Ottawa Downtown' },
  'hamilton': { lat: 43.2557, lng: -79.8711, station: 'Hamilton Downtown' },
  'kitchener': { lat: 43.4516, lng: -80.4925, station: 'Kitchener' },
  
  // Quebec
  'montreal': { lat: 45.5017, lng: -73.5673, station: 'Montreal Downtown' },
  'quebec_city': { lat: 46.8139, lng: -71.2080, station: 'Quebec City' },
  
  // British Columbia  
  'vancouver': { lat: 49.2827, lng: -123.1207, station: 'Vancouver Downtown' },
  'victoria': { lat: 48.4284, lng: -123.3656, station: 'Victoria' },
  'burnaby': { lat: 49.2488, lng: -122.9805, station: 'Burnaby' },
  
  // Alberta
  'calgary': { lat: 51.0447, lng: -114.0719, station: 'Calgary Downtown' },
  'edmonton': { lat: 53.5461, lng: -113.4938, station: 'Edmonton Central' },
  
  // Saskatchewan
  'saskatoon': { lat: 52.1579, lng: -106.6702, station: 'Saskatoon' },
  'regina': { lat: 50.4452, lng: -104.6189, station: 'Regina' },
  
  // Manitoba
  'winnipeg': { lat: 49.8951, lng: -97.1384, station: 'Winnipeg Downtown' },
  
  // Atlantic provinces
  'halifax': { lat: 44.6488, lng: -63.5752, station: 'Halifax Downtown' },
  'st_johns': { lat: 47.5615, lng: -52.7126, station: 'St. John\'s' },
  'fredericton': { lat: 45.9636, lng: -66.6431, station: 'Fredericton' },
  'charlottetown': { lat: 46.2382, lng: -63.1311, station: 'Charlottetown' }
};

/**
 * Find the nearest air quality station to given coordinates
 */
function findNearestStation(lat, lng) {
  let nearestStation = null;
  let minDistance = Infinity;
  
  Object.entries(airQualityStations).forEach(([key, station]) => {
    const distance = calculateDistance(lat, lng, station.lat, station.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestStation = { key, ...station, distance };
    }
  });
  
  return nearestStation;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return R * c;
}

function toRadians(degrees) {
  return degrees * (Math.PI/180);
}

/**
 * Get AQHI condition description
 */
function getAQHICondition(index) {
  if (index >= 1 && index <= 3) return 'Low Risk';
  if (index >= 4 && index <= 6) return 'Moderate Risk';
  if (index >= 7 && index <= 10) return 'High Risk';
  if (index >= 11) return 'Very High Risk';
  return 'Unknown';
}

/**
 * Generate realistic AQHI data based on location and season
 */
function generateRealisticAQHI(location, season = 'current') {
  // Base AQHI varies by region
  let baseAQHI = 3; // Default moderate
  
  // Adjust based on location (urban areas typically higher)
  const urbanAreas = ['toronto', 'montreal', 'vancouver', 'calgary', 'edmonton'];
  if (urbanAreas.some(city => location.toLowerCase().includes(city))) {
    baseAQHI += 1;
  }
  
  // Add some random variation (-2 to +3)
  const variation = Math.floor(Math.random() * 6) - 2;
  let aqhi = Math.max(1, Math.min(11, baseAQHI + variation));
  
  // Seasonal adjustments (summer tends to be higher due to smog)
  const currentMonth = new Date().getMonth();
  if (currentMonth >= 5 && currentMonth <= 8) { // June to September
    aqhi = Math.min(11, aqhi + 1);
  }
  
  return aqhi;
}

/**
 * Fetch air quality data for a specific district
 * This is a mock implementation - replace with real API calls
 */
export async function fetchAirQuality(districtName, coordinates = null) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Find nearest monitoring station
    let station = null;
    if (coordinates) {
      station = findNearestStation(coordinates.lat, coordinates.lng);
    } else {
      // Find station by district name matching
      const stationKey = Object.keys(airQualityStations).find(key => 
        districtName.toLowerCase().includes(key.replace('_', ' ')) ||
        airQualityStations[key].station.toLowerCase().includes(districtName.toLowerCase().split(/[-—]/)[0])
      );
      if (stationKey) {
        station = { key: stationKey, ...airQualityStations[stationKey] };
      }
    }
    
    // Generate AQHI data
    const aqhi = generateRealisticAQHI(districtName);
    const condition = getAQHICondition(aqhi);
    
    return {
      success: true,
      data: {
        index: aqhi,
        condition: condition,
        location: station ? station.station : `${districtName} Area`,
        coordinates: station ? { lat: station.lat, lng: station.lng } : null,
        lastUpdated: new Date().toLocaleString('en-CA', {
          timeZone: 'America/Toronto',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        station: station?.station || 'Nearest Available Station',
        distance: station?.distance ? `${Math.round(station.distance)} km away` : null,
        recommendations: getHealthRecommendations(aqhi),
        pollutants: generatePollutantData(aqhi)
      }
    };
    
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
}

/**
 * Get health recommendations based on AQHI
 */
function getHealthRecommendations(aqhi) {
  if (aqhi <= 3) {
    return {
      general: "Ideal air quality for outdoor activities",
      sensitive: "Enjoy usual outdoor activities"
    };
  } else if (aqhi <= 6) {
    return {
      general: "Consider reducing or rescheduling strenuous activities outdoors if you experience symptoms",
      sensitive: "Consider reducing or rescheduling strenuous activities outdoors"
    };
  } else if (aqhi <= 10) {
    return {
      general: "Reduce or reschedule strenuous activities outdoors, especially if you experience symptoms",
      sensitive: "Avoid strenuous activities outdoors"
    };
  } else {
    return {
      general: "Avoid strenuous activities outdoors",
      sensitive: "Avoid all outdoor activities"
    };
  }
}

/**
 * Generate mock pollutant data
 */
function generatePollutantData(aqhi) {
  const baseMultiplier = aqhi / 3;
  
  return {
    pm25: Math.round((5 + Math.random() * 15) * baseMultiplier), // μg/m³
    pm10: Math.round((10 + Math.random() * 25) * baseMultiplier), // μg/m³
    no2: Math.round((15 + Math.random() * 20) * baseMultiplier), // ppb
    o3: Math.round((20 + Math.random() * 30) * baseMultiplier), // ppb
    so2: Math.round((2 + Math.random() * 8) * baseMultiplier)   // ppb
  };
}

/**
 * Real Environment Canada API integration (use this for production)
 * Uncomment and modify when ready to use real data
 */
/*
export async function fetchRealAirQuality(coordinates) {
  try {
    // Environment Canada Weather API
    const response = await fetch(
      `https://api.weather.gc.ca/collections/aqhi-observations-realtime/items?bbox=${coordinates.lng-0.1},${coordinates.lat-0.1},${coordinates.lng+0.1},${coordinates.lat+0.1}&limit=1`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch air quality data');
    }
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const properties = feature.properties;
      
      return {
        success: true,
        data: {
          index: properties.aqhi_value,
          condition: getAQHICondition(properties.aqhi_value),
          location: properties.location_name,
          lastUpdated: new Date(properties.datetime_utc).toLocaleString(),
          coordinates: {
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0]
          }
        }
      };
    } else {
      throw new Error('No air quality data available for this location');
    }
    
  } catch (error) {
    console.error('Error fetching real air quality data:', error);
    return fetchAirQuality(coordinates.lat + ',' + coordinates.lng); // Fallback to mock data
  }
}
*/

export default {
  fetchAirQuality,
  findNearestStation,
  getAQHICondition,
  airQualityStations
};
