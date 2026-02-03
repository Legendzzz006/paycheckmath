// US State data with tax rates and cost of living indices
// Cost of Living Index: 100 = national average

export interface StateInfo {
  name: string;
  abbreviation: string;
  stateTaxRate: number; // Average effective state income tax rate
  costOfLivingIndex: number; // 100 = national average
  medianIncome: number;
  majorCities: string[];
}

export const US_STATES: Record<string, StateInfo> = {
  alabama: {
    name: 'Alabama',
    abbreviation: 'AL',
    stateTaxRate: 5.0,
    costOfLivingIndex: 87.9,
    medianIncome: 52035,
    majorCities: ['Birmingham', 'Montgomery', 'Mobile'],
  },
  alaska: {
    name: 'Alaska',
    abbreviation: 'AK',
    stateTaxRate: 0,
    costOfLivingIndex: 127.1,
    medianIncome: 77640,
    majorCities: ['Anchorage', 'Fairbanks', 'Juneau'],
  },
  arizona: {
    name: 'Arizona',
    abbreviation: 'AZ',
    stateTaxRate: 2.5,
    costOfLivingIndex: 108.9,
    medianIncome: 62055,
    majorCities: ['Phoenix', 'Tucson', 'Mesa'],
  },
  arkansas: {
    name: 'Arkansas',
    abbreviation: 'AR',
    stateTaxRate: 5.5,
    costOfLivingIndex: 86.9,
    medianIncome: 49475,
    majorCities: ['Little Rock', 'Fort Smith', 'Fayetteville'],
  },
  california: {
    name: 'California',
    abbreviation: 'CA',
    stateTaxRate: 9.3,
    costOfLivingIndex: 151.7,
    medianIncome: 78672,
    majorCities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose'],
  },
  colorado: {
    name: 'Colorado',
    abbreviation: 'CO',
    stateTaxRate: 4.4,
    costOfLivingIndex: 121.4,
    medianIncome: 77127,
    majorCities: ['Denver', 'Colorado Springs', 'Aurora'],
  },
  connecticut: {
    name: 'Connecticut',
    abbreviation: 'CT',
    stateTaxRate: 5.0,
    costOfLivingIndex: 127.7,
    medianIncome: 78833,
    majorCities: ['Hartford', 'New Haven', 'Stamford'],
  },
  delaware: {
    name: 'Delaware',
    abbreviation: 'DE',
    stateTaxRate: 6.6,
    costOfLivingIndex: 110.4,
    medianIncome: 70176,
    majorCities: ['Wilmington', 'Dover', 'Newark'],
  },
  florida: {
    name: 'Florida',
    abbreviation: 'FL',
    stateTaxRate: 0,
    costOfLivingIndex: 102.8,
    medianIncome: 59227,
    majorCities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
  },
  georgia: {
    name: 'Georgia',
    abbreviation: 'GA',
    stateTaxRate: 5.75,
    costOfLivingIndex: 91.4,
    medianIncome: 61224,
    majorCities: ['Atlanta', 'Augusta', 'Columbus', 'Savannah'],
  },
  hawaii: {
    name: 'Hawaii',
    abbreviation: 'HI',
    stateTaxRate: 8.25,
    costOfLivingIndex: 184.0,
    medianIncome: 83102,
    majorCities: ['Honolulu', 'Pearl City', 'Hilo'],
  },
  idaho: {
    name: 'Idaho',
    abbreviation: 'ID',
    stateTaxRate: 6.0,
    costOfLivingIndex: 97.7,
    medianIncome: 60999,
    majorCities: ['Boise', 'Meridian', 'Nampa'],
  },
  illinois: {
    name: 'Illinois',
    abbreviation: 'IL',
    stateTaxRate: 4.95,
    costOfLivingIndex: 93.4,
    medianIncome: 69187,
    majorCities: ['Chicago', 'Aurora', 'Naperville'],
  },
  indiana: {
    name: 'Indiana',
    abbreviation: 'IN',
    stateTaxRate: 3.23,
    costOfLivingIndex: 90.6,
    medianIncome: 58235,
    majorCities: ['Indianapolis', 'Fort Wayne', 'Evansville'],
  },
  iowa: {
    name: 'Iowa',
    abbreviation: 'IA',
    stateTaxRate: 6.0,
    costOfLivingIndex: 90.1,
    medianIncome: 61691,
    majorCities: ['Des Moines', 'Cedar Rapids', 'Davenport'],
  },
  kansas: {
    name: 'Kansas',
    abbreviation: 'KS',
    stateTaxRate: 5.7,
    costOfLivingIndex: 87.5,
    medianIncome: 61091,
    majorCities: ['Wichita', 'Overland Park', 'Kansas City'],
  },
  kentucky: {
    name: 'Kentucky',
    abbreviation: 'KY',
    stateTaxRate: 5.0,
    costOfLivingIndex: 90.9,
    medianIncome: 52295,
    majorCities: ['Louisville', 'Lexington', 'Bowling Green'],
  },
  louisiana: {
    name: 'Louisiana',
    abbreviation: 'LA',
    stateTaxRate: 4.25,
    costOfLivingIndex: 91.9,
    medianIncome: 51073,
    majorCities: ['New Orleans', 'Baton Rouge', 'Shreveport'],
  },
  maine: {
    name: 'Maine',
    abbreviation: 'ME',
    stateTaxRate: 7.15,
    costOfLivingIndex: 118.5,
    medianIncome: 58924,
    majorCities: ['Portland', 'Lewiston', 'Bangor'],
  },
  maryland: {
    name: 'Maryland',
    abbreviation: 'MD',
    stateTaxRate: 5.75,
    costOfLivingIndex: 129.7,
    medianIncome: 86738,
    majorCities: ['Baltimore', 'Columbia', 'Germantown'],
  },
  massachusetts: {
    name: 'Massachusetts',
    abbreviation: 'MA',
    stateTaxRate: 5.0,
    costOfLivingIndex: 148.4,
    medianIncome: 84385,
    majorCities: ['Boston', 'Worcester', 'Springfield'],
  },
  michigan: {
    name: 'Michigan',
    abbreviation: 'MI',
    stateTaxRate: 4.25,
    costOfLivingIndex: 89.6,
    medianIncome: 59584,
    majorCities: ['Detroit', 'Grand Rapids', 'Warren'],
  },
  minnesota: {
    name: 'Minnesota',
    abbreviation: 'MN',
    stateTaxRate: 7.05,
    costOfLivingIndex: 97.2,
    medianIncome: 74593,
    majorCities: ['Minneapolis', 'St. Paul', 'Rochester'],
  },
  mississippi: {
    name: 'Mississippi',
    abbreviation: 'MS',
    stateTaxRate: 5.0,
    costOfLivingIndex: 84.8,
    medianIncome: 45792,
    majorCities: ['Jackson', 'Gulfport', 'Southaven'],
  },
  missouri: {
    name: 'Missouri',
    abbreviation: 'MO',
    stateTaxRate: 5.4,
    costOfLivingIndex: 89.8,
    medianIncome: 57409,
    majorCities: ['Kansas City', 'St. Louis', 'Springfield'],
  },
  montana: {
    name: 'Montana',
    abbreviation: 'MT',
    stateTaxRate: 6.75,
    costOfLivingIndex: 104.1,
    medianIncome: 57153,
    majorCities: ['Billings', 'Missoula', 'Great Falls'],
  },
  nebraska: {
    name: 'Nebraska',
    abbreviation: 'NE',
    stateTaxRate: 6.84,
    costOfLivingIndex: 91.3,
    medianIncome: 61439,
    majorCities: ['Omaha', 'Lincoln', 'Bellevue'],
  },
  nevada: {
    name: 'Nevada',
    abbreviation: 'NV',
    stateTaxRate: 0,
    costOfLivingIndex: 110.5,
    medianIncome: 63276,
    majorCities: ['Las Vegas', 'Henderson', 'Reno'],
  },
  'new-hampshire': {
    name: 'New Hampshire',
    abbreviation: 'NH',
    stateTaxRate: 0,
    costOfLivingIndex: 119.2,
    medianIncome: 77933,
    majorCities: ['Manchester', 'Nashua', 'Concord'],
  },
  'new-jersey': {
    name: 'New Jersey',
    abbreviation: 'NJ',
    stateTaxRate: 6.37,
    costOfLivingIndex: 125.1,
    medianIncome: 85751,
    majorCities: ['Newark', 'Jersey City', 'Paterson'],
  },
  'new-mexico': {
    name: 'New Mexico',
    abbreviation: 'NM',
    stateTaxRate: 4.9,
    costOfLivingIndex: 95.7,
    medianIncome: 51945,
    majorCities: ['Albuquerque', 'Las Cruces', 'Rio Rancho'],
  },
  'new-york': {
    name: 'New York',
    abbreviation: 'NY',
    stateTaxRate: 6.5,
    costOfLivingIndex: 139.1,
    medianIncome: 72108,
    majorCities: ['New York City', 'Buffalo', 'Rochester', 'Albany'],
  },
  'north-carolina': {
    name: 'North Carolina',
    abbreviation: 'NC',
    stateTaxRate: 4.99,
    costOfLivingIndex: 94.2,
    medianIncome: 57341,
    majorCities: ['Charlotte', 'Raleigh', 'Greensboro'],
  },
  'north-dakota': {
    name: 'North Dakota',
    abbreviation: 'ND',
    stateTaxRate: 2.9,
    costOfLivingIndex: 98.9,
    medianIncome: 64577,
    majorCities: ['Fargo', 'Bismarck', 'Grand Forks'],
  },
  ohio: {
    name: 'Ohio',
    abbreviation: 'OH',
    stateTaxRate: 3.99,
    costOfLivingIndex: 93.0,
    medianIncome: 58642,
    majorCities: ['Columbus', 'Cleveland', 'Cincinnati'],
  },
  oklahoma: {
    name: 'Oklahoma',
    abbreviation: 'OK',
    stateTaxRate: 4.75,
    costOfLivingIndex: 87.9,
    medianIncome: 54449,
    majorCities: ['Oklahoma City', 'Tulsa', 'Norman'],
  },
  oregon: {
    name: 'Oregon',
    abbreviation: 'OR',
    stateTaxRate: 9.0,
    costOfLivingIndex: 134.2,
    medianIncome: 67058,
    majorCities: ['Portland', 'Eugene', 'Salem'],
  },
  pennsylvania: {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    stateTaxRate: 3.07,
    costOfLivingIndex: 102.5,
    medianIncome: 63463,
    majorCities: ['Philadelphia', 'Pittsburgh', 'Allentown'],
  },
  'rhode-island': {
    name: 'Rhode Island',
    abbreviation: 'RI',
    stateTaxRate: 5.99,
    costOfLivingIndex: 119.4,
    medianIncome: 71169,
    majorCities: ['Providence', 'Warwick', 'Cranston'],
  },
  'south-carolina': {
    name: 'South Carolina',
    abbreviation: 'SC',
    stateTaxRate: 7.0,
    costOfLivingIndex: 95.9,
    medianIncome: 56227,
    majorCities: ['Charleston', 'Columbia', 'North Charleston'],
  },
  'south-dakota': {
    name: 'South Dakota',
    abbreviation: 'SD',
    stateTaxRate: 0,
    costOfLivingIndex: 92.5,
    medianIncome: 59533,
    majorCities: ['Sioux Falls', 'Rapid City', 'Aberdeen'],
  },
  tennessee: {
    name: 'Tennessee',
    abbreviation: 'TN',
    stateTaxRate: 0,
    costOfLivingIndex: 90.2,
    medianIncome: 56071,
    majorCities: ['Nashville', 'Memphis', 'Knoxville'],
  },
  texas: {
    name: 'Texas',
    abbreviation: 'TX',
    stateTaxRate: 0,
    costOfLivingIndex: 92.1,
    medianIncome: 64034,
    majorCities: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
  },
  utah: {
    name: 'Utah',
    abbreviation: 'UT',
    stateTaxRate: 4.95,
    costOfLivingIndex: 110.8,
    medianIncome: 75780,
    majorCities: ['Salt Lake City', 'West Valley City', 'Provo'],
  },
  vermont: {
    name: 'Vermont',
    abbreviation: 'VT',
    stateTaxRate: 6.75,
    costOfLivingIndex: 118.2,
    medianIncome: 63001,
    majorCities: ['Burlington', 'South Burlington', 'Rutland'],
  },
  virginia: {
    name: 'Virginia',
    abbreviation: 'VA',
    stateTaxRate: 5.75,
    costOfLivingIndex: 103.7,
    medianIncome: 76456,
    majorCities: ['Virginia Beach', 'Norfolk', 'Richmond'],
  },
  washington: {
    name: 'Washington',
    abbreviation: 'WA',
    stateTaxRate: 0,
    costOfLivingIndex: 118.7,
    medianIncome: 78687,
    majorCities: ['Seattle', 'Spokane', 'Tacoma'],
  },
  'west-virginia': {
    name: 'West Virginia',
    abbreviation: 'WV',
    stateTaxRate: 6.5,
    costOfLivingIndex: 87.5,
    medianIncome: 48850,
    majorCities: ['Charleston', 'Huntington', 'Morgantown'],
  },
  wisconsin: {
    name: 'Wisconsin',
    abbreviation: 'WI',
    stateTaxRate: 6.27,
    costOfLivingIndex: 96.9,
    medianIncome: 64168,
    majorCities: ['Milwaukee', 'Madison', 'Green Bay'],
  },
  wyoming: {
    name: 'Wyoming',
    abbreviation: 'WY',
    stateTaxRate: 0,
    costOfLivingIndex: 92.0,
    medianIncome: 65003,
    majorCities: ['Cheyenne', 'Casper', 'Laramie'],
  },
};

export const STATE_SLUGS = Object.keys(US_STATES);

export function getStateBySlug(slug: string): StateInfo | null {
  return US_STATES[slug] || null;
}

export function calculateAdjustedSalary(
  salary: number,
  fromState: string,
  toState: string
): number {
  const from = US_STATES[fromState];
  const to = US_STATES[toState];
  
  if (!from || !to) return salary;
  
  // Adjust salary based on cost of living difference
  const adjustmentFactor = to.costOfLivingIndex / from.costOfLivingIndex;
  return Math.round(salary * adjustmentFactor);
}

export function generateStatePageContent(salary: number, stateSlug: string) {
  const state = getStateBySlug(stateSlug);
  if (!state) return null;
  
  const hourly = Math.round((salary / 2080) * 100) / 100;
  const monthly = Math.round((salary / 12) * 100) / 100;
  const weekly = Math.round((salary / 52) * 100) / 100;
  
  // Calculate take-home after state taxes
  const federalTaxRate = salary < 50000 ? 12 : salary < 100000 ? 22 : 24;
  const federalTax = salary * (federalTaxRate / 100);
  const stateTax = salary * (state.stateTaxRate / 100);
  const ficaTax = Math.min(salary, 168600) * 0.0765;
  const takeHome = salary - federalTax - stateTax - ficaTax;
  const takeHomeMonthly = Math.round(takeHome / 12);
  
  // Cost of living comparison
  const nationalAvgSalary = Math.round(salary * (100 / state.costOfLivingIndex));
  
  return {
    title: `$${salary.toLocaleString()} Salary in ${state.name} - Take Home Pay & Cost of Living`,
    metaDescription: `$${salary.toLocaleString()} salary in ${state.name} equals $${hourly.toFixed(2)}/hour. See take-home pay after ${state.stateTaxRate}% state tax, cost of living comparison, and major cities breakdown.`,
    h1: `$${salary.toLocaleString()} a Year in ${state.name}`,
    state,
    salary,
    hourly,
    monthly,
    weekly,
    takeHome,
    takeHomeMonthly,
    nationalAvgSalary,
    federalTaxRate,
  };
}
