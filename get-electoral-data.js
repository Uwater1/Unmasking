// get-electoral-data.js - Run this script to fetch electoral district data
// Place this file in your project root and run: node get-electoral-data.js

import fs from 'fs';
import https from 'https';

// Simplified electoral districts data for testing
// This includes major cities and regions across Canada
const simplifiedElectoralData = {
  "type": "FeatureCollection",
  "features": [
    // Ontario districts
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "35001",
        "ENNAME": "Ajax",
        "FRNAME": "Ajax",
        "PROVCODE": "35",
        "PRENAME": "Ontario"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-79.09, 43.83], [-78.95, 43.83], [-78.95, 43.88], [-79.09, 43.88], [-79.09, 43.83]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "35025",
        "ENNAME": "Don Valley East",
        "FRNAME": "Don Valley-Est",
        "PROVCODE": "35",
        "PRENAME": "Ontario"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-79.35, 43.70], [-79.25, 43.70], [-79.25, 43.78], [-79.35, 43.78], [-79.35, 43.70]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "35063",
        "ENNAME": "Kitchener Centre",
        "FRNAME": "Kitchener-Centre",
        "PROVCODE": "35",
        "PRENAME": "Ontario"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-80.52, 43.43], [-80.42, 43.43], [-80.42, 43.48], [-80.52, 43.48], [-80.52, 43.43]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "35106",
        "ENNAME": "Toronto Centre",
        "FRNAME": "Toronto-Centre",
        "PROVCODE": "35",
        "PRENAME": "Ontario"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-79.39, 43.64], [-79.35, 43.64], [-79.35, 43.68], [-79.39, 43.68], [-79.39, 43.64]
        ]]
      }
    },
    // Quebec districts
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "24001",
        "ENNAME": "Abitibi—Baie-James—Nunavik—Eeyou",
        "FRNAME": "Abitibi—Baie-James—Nunavik—Eeyou",
        "PROVCODE": "24",
        "PRENAME": "Quebec"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-79.50, 49.00], [-78.00, 49.00], [-78.00, 50.50], [-79.50, 50.50], [-79.50, 49.00]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "24046",
        "ENNAME": "Papineau",
        "FRNAME": "Papineau",
        "PROVCODE": "24",
        "PRENAME": "Quebec"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-73.60, 45.54], [-73.56, 45.54], [-73.56, 45.58], [-73.60, 45.58], [-73.60, 45.54]
        ]]
      }
    },
    // British Columbia
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "59001",
        "ENNAME": "Burnaby North—Seymour",
        "FRNAME": "Burnaby-Nord—Seymour",
        "PROVCODE": "59",
        "PRENAME": "British Columbia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-123.05, 49.25], [-122.95, 49.25], [-122.95, 49.35], [-123.05, 49.35], [-123.05, 49.25]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "59033",
        "ENNAME": "Vancouver Centre",
        "FRNAME": "Vancouver-Centre",
        "PROVCODE": "59",
        "PRENAME": "British Columbia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-123.15, 49.26], [-123.10, 49.26], [-123.10, 49.30], [-123.15, 49.30], [-123.15, 49.26]
        ]]
      }
    },
    // Alberta
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "48001",
        "ENNAME": "Banff—Airdrie",
        "FRNAME": "Banff—Airdrie",
        "PROVCODE": "48",
        "PRENAME": "Alberta"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-114.50, 51.00], [-113.50, 51.00], [-113.50, 52.00], [-114.50, 52.00], [-114.50, 51.00]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "48012",
        "ENNAME": "Calgary Centre",
        "FRNAME": "Calgary-Centre",
        "PROVCODE": "48",
        "PRENAME": "Alberta"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-114.10, 51.03], [-114.05, 51.03], [-114.05, 51.08], [-114.10, 51.08], [-114.10, 51.03]
        ]]
      }
    },
    // Saskatchewan
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "47001",
        "ENNAME": "Battlefords—Lloydminster",
        "FRNAME": "Battlefords—Lloydminster",
        "PROVCODE": "47",
        "PRENAME": "Saskatchewan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-109.50, 52.50], [-108.00, 52.50], [-108.00, 54.00], [-109.50, 54.00], [-109.50, 52.50]
        ]]
      }
    },
    // Manitoba
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "46001",
        "ENNAME": "Brandon—Souris",
        "FRNAME": "Brandon—Souris",
        "PROVCODE": "46",
        "PRENAME": "Manitoba"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-100.50, 49.50], [-99.00, 49.50], [-99.00, 50.50], [-100.50, 50.50], [-100.50, 49.50]
        ]]
      }
    },
    // Atlantic provinces
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "12001",
        "ENNAME": "Avalon",
        "FRNAME": "Avalon",
        "PROVCODE": "10",
        "PRENAME": "Newfoundland and Labrador"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-53.50, 47.00], [-52.50, 47.00], [-52.50, 47.80], [-53.50, 47.80], [-53.50, 47.00]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "11001",
        "ENNAME": "Cardigan",
        "FRNAME": "Cardigan",
        "PROVCODE": "11",
        "PRENAME": "Prince Edward Island"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-62.50, 46.20], [-62.00, 46.20], [-62.00, 46.50], [-62.50, 46.50], [-62.50, 46.20]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "13001",
        "ENNAME": "Cape Breton—Canso",
        "FRNAME": "Cape Breton—Canso",
        "PROVCODE": "12",
        "PRENAME": "Nova Scotia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-61.00, 45.50], [-59.50, 45.50], [-59.50, 47.00], [-61.00, 47.00], [-61.00, 45.50]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "13007",
        "ENNAME": "Halifax",
        "FRNAME": "Halifax",
        "PROVCODE": "12",
        "PRENAME": "Nova Scotia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-63.70, 44.60], [-63.50, 44.60], [-63.50, 44.70], [-63.70, 44.70], [-63.70, 44.60]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "FEDNUM": "13010",
        "ENNAME": "New Brunswick Southwest",
        "FRNAME": "Nouveau-Brunswick-Sud-Ouest",
        "PROVCODE": "13",
        "PRENAME": "New Brunswick"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-67.00, 45.00], [-66.00, 45.00], [-66.00, 45.50], [-67.00, 45.50], [-67.00, 45.00]
        ]]
      }
    }
  ]
};

// Sample MP data corresponding to the districts above
const sampleMPData = {
  "35001": {
    "name": "Mark Holland",
    "party": "Liberal",
    "email": "mark.holland@parl.gc.ca",
    "phone": "(613) 995-4100",
    "constituency_office": "Ajax, ON"
  },
  "35025": {
    "name": "Nathaniel Erskine-Smith",
    "party": "Liberal", 
    "email": "nathaniel.erskine-smith@parl.gc.ca",
    "phone": "(613) 995-8085",
    "constituency_office": "Toronto, ON"
  },
  "35063": {
    "name": "Mike Morrice",
    "party": "Green Party",
    "email": "mike.morrice@parl.gc.ca", 
    "phone": "(613) 995-0047",
    "constituency_office": "Kitchener, ON"
  },
  "35106": {
    "name": "Marci Ien",
    "party": "Liberal",
    "email": "marci.ien@parl.gc.ca",
    "phone": "(613) 992-4337",
    "constituency_office": "Toronto, ON"
  },
  "24001": {
    "name": "Sylvie Bérubé",
    "party": "Bloc Québécois",
    "email": "sylvie.berube@parl.gc.ca",
    "phone": "(613) 995-4262",
    "constituency_office": "Val-d'Or, QC"
  },
  "24046": {
    "name": "Steven Guilbeault",
    "party": "Liberal",
    "email": "steven.guilbeault@parl.gc.ca",
    "phone": "(613) 995-1551",
    "constituency_office": "Montreal, QC"
  },
  "59001": {
    "name": "Terry Beech",
    "party": "Liberal",
    "email": "terry.beech@parl.gc.ca",
    "phone": "(613) 996-1564",
    "constituency_office": "Burnaby, BC"
  },
  "59033": {
    "name": "Hedy Fry",
    "party": "Liberal",
    "email": "hedy.fry@parl.gc.ca",
    "phone": "(613) 996-7298",
    "constituency_office": "Vancouver, BC"
  },
  "48001": {
    "name": "Blake Richards",
    "party": "Conservative",
    "email": "blake.richards@parl.gc.ca",
    "phone": "(613) 992-2792",
    "constituency_office": "Airdrie, AB"
  },
  "48012": {
    "name": "Greg McLean",
    "party": "Conservative",
    "email": "greg.mclean@parl.gc.ca",
    "phone": "(613) 992-0946",
    "constituency_office": "Calgary, AB"
  },
  "47001": {
    "name": "Rosemarie Falk",
    "party": "Conservative",
    "email": "rosemarie.falk@parl.gc.ca",
    "phone": "(613) 992-1400",
    "constituency_office": "Kindersley, SK"
  },
  "46001": {
    "name": "Larry Maguire",
    "party": "Conservative",
    "email": "larry.maguire@parl.gc.ca",
    "phone": "(613) 992-0946",
    "constituency_office": "Brandon, MB"
  },
  "12001": {
    "name": "Ken McDonald",
    "party": "Liberal",
    "email": "ken.mcdonald@parl.gc.ca",
    "phone": "(613) 992-0946",
    "constituency_office": "Conception Bay South, NL"
  },
  "11001": {
    "name": "Lawrence MacAulay",
    "party": "Liberal",
    "email": "lawrence.macaulay@parl.gc.ca",
    "phone": "(613) 992-1064",
    "constituency_office": "Souris, PE"
  },
  "13001": {
    "name": "Mike Kelloway",
    "party": "Liberal",
    "email": "mike.kelloway@parl.gc.ca",
    "phone": "(613) 992-0946",
    "constituency_office": "Sydney, NS"
  },
  "13007": {
    "name": "Andy Fillmore",
    "party": "Liberal",
    "email": "andy.fillmore@parl.gc.ca",
    "phone": "(613) 992-0946",
    "constituency_office": "Halifax, NS"
  },
  "13010": {
    "name": "John Williamson",
    "party": "Conservative",
    "email": "john.williamson@parl.gc.ca",
    "phone": "(613) 992-0946",
    "constituency_office": "Saint John, NB"
  }
};

async function saveDataFiles() {
  try {
    // Ensure directories exist
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    if (!fs.existsSync('public/data')) {
      fs.mkdirSync('public/data');
    }
    if (!fs.existsSync('src')) {
      fs.mkdirSync('src');
    }
    if (!fs.existsSync('src/data')) {
      fs.mkdirSync('src/data');
    }

    // Save electoral districts GeoJSON
    fs.writeFileSync(
      'public/data/canada-electoral-districts.geojson',
      JSON.stringify(simplifiedElectoralData, null, 2)
    );

    // Save MP data as JavaScript module
    const mpDataContent = `// MP data for electoral districts
export const mpData = ${JSON.stringify(sampleMPData, null, 2)};

// Function to get MP by district federal number
export const getMPByFedNum = (fedNum) => {
  return mpData[fedNum] || null;
};

// Function to get all MPs
export const getAllMPs = () => {
  return Object.entries(mpData).map(([fedNum, mp]) => ({
    fedNum,
    ...mp
  }));
};
`;

    fs.writeFileSync('src/data/mpData.js', mpDataContent);

    console.log('✅ Electoral districts data saved to: public/data/canada-electoral-districts.geojson');
    console.log('✅ MP data saved to: src/data/mpData.js');
    console.log('✅ Data files created successfully!');
    console.log('\nNext steps:');
    console.log('1. Copy the React components from the artifacts');
    console.log('2. Run: npm run dev');
    console.log('3. Open http://localhost:3000');

  } catch (error) {
    console.error('❌ Error creating data files:', error);
  }
}

// Run the function
saveDataFiles();
