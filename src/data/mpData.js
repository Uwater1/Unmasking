// MP data for electoral districts
export const mpData = {
  "11001": {
    "name": "Lawrence MacAulay",
    "party": "Liberal",
    "email": "lawrence.macaulay@parl.gc.ca",
    "phone": "(613) 992-1064",
    "constituency_office": "Souris, PE"
  },
  "12001": {
    "name": "Ken McDonald",
    "party": "Liberal",
    "email": "ken.mcdonald@parl.gc.ca",
    "phone": "(613) 992-0946",
    "constituency_office": "Conception Bay South, NL"
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
  "46001": {
    "name": "Larry Maguire",
    "party": "Conservative",
    "email": "larry.maguire@parl.gc.ca",
    "phone": "(613) 992-0946",
    "constituency_office": "Brandon, MB"
  },
  "47001": {
    "name": "Rosemarie Falk",
    "party": "Conservative",
    "email": "rosemarie.falk@parl.gc.ca",
    "phone": "(613) 992-1400",
    "constituency_office": "Kindersley, SK"
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
  }
};

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
