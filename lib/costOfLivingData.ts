// Cost of Living data for major US cities
// Index based on national average = 100

export interface CityData {
  slug: string;
  name: string;
  state: string;
  colIndex: number; // Overall cost of living index (100 = national average)
  housingIndex: number;
  groceriesIndex: number;
  transportIndex: number;
  utilitiesIndex: number;
  healthcareIndex: number;
  medianRent: number; // 1-bedroom apartment
  medianHomePrice: number;
  population: number;
}

export const cities: CityData[] = [
  // High COL Cities
  {
    slug: 'new-york-ny',
    name: 'New York',
    state: 'NY',
    colIndex: 187,
    housingIndex: 294,
    groceriesIndex: 116,
    transportIndex: 117,
    utilitiesIndex: 108,
    healthcareIndex: 106,
    medianRent: 3500,
    medianHomePrice: 780000,
    population: 8336000,
  },
  {
    slug: 'san-francisco-ca',
    name: 'San Francisco',
    state: 'CA',
    colIndex: 179,
    housingIndex: 285,
    groceriesIndex: 114,
    transportIndex: 120,
    utilitiesIndex: 92,
    healthcareIndex: 112,
    medianRent: 3200,
    medianHomePrice: 1400000,
    population: 873000,
  },
  {
    slug: 'san-jose-ca',
    name: 'San Jose',
    state: 'CA',
    colIndex: 176,
    housingIndex: 280,
    groceriesIndex: 112,
    transportIndex: 118,
    utilitiesIndex: 88,
    healthcareIndex: 110,
    medianRent: 3000,
    medianHomePrice: 1300000,
    population: 1030000,
  },
  {
    slug: 'boston-ma',
    name: 'Boston',
    state: 'MA',
    colIndex: 162,
    housingIndex: 240,
    groceriesIndex: 110,
    transportIndex: 108,
    utilitiesIndex: 125,
    healthcareIndex: 115,
    medianRent: 2800,
    medianHomePrice: 720000,
    population: 692000,
  },
  {
    slug: 'washington-dc',
    name: 'Washington',
    state: 'DC',
    colIndex: 159,
    housingIndex: 235,
    groceriesIndex: 108,
    transportIndex: 110,
    utilitiesIndex: 95,
    healthcareIndex: 105,
    medianRent: 2400,
    medianHomePrice: 650000,
    population: 712000,
  },
  {
    slug: 'seattle-wa',
    name: 'Seattle',
    state: 'WA',
    colIndex: 156,
    housingIndex: 230,
    groceriesIndex: 109,
    transportIndex: 115,
    utilitiesIndex: 85,
    healthcareIndex: 118,
    medianRent: 2300,
    medianHomePrice: 820000,
    population: 749000,
  },
  {
    slug: 'los-angeles-ca',
    name: 'Los Angeles',
    state: 'CA',
    colIndex: 148,
    housingIndex: 215,
    groceriesIndex: 107,
    transportIndex: 125,
    utilitiesIndex: 92,
    healthcareIndex: 108,
    medianRent: 2500,
    medianHomePrice: 900000,
    population: 3967000,
  },
  {
    slug: 'san-diego-ca',
    name: 'San Diego',
    state: 'CA',
    colIndex: 146,
    housingIndex: 210,
    groceriesIndex: 106,
    transportIndex: 112,
    utilitiesIndex: 98,
    healthcareIndex: 110,
    medianRent: 2400,
    medianHomePrice: 850000,
    population: 1420000,
  },
  {
    slug: 'portland-or',
    name: 'Portland',
    state: 'OR',
    colIndex: 138,
    housingIndex: 190,
    groceriesIndex: 105,
    transportIndex: 108,
    utilitiesIndex: 82,
    healthcareIndex: 112,
    medianRent: 1900,
    medianHomePrice: 550000,
    population: 652000,
  },
  {
    slug: 'miami-fl',
    name: 'Miami',
    state: 'FL',
    colIndex: 135,
    housingIndex: 185,
    groceriesIndex: 108,
    transportIndex: 105,
    utilitiesIndex: 98,
    healthcareIndex: 102,
    medianRent: 2200,
    medianHomePrice: 480000,
    population: 467000,
  },

  // Medium COL Cities
  {
    slug: 'denver-co',
    name: 'Denver',
    state: 'CO',
    colIndex: 128,
    housingIndex: 170,
    groceriesIndex: 103,
    transportIndex: 102,
    utilitiesIndex: 92,
    healthcareIndex: 108,
    medianRent: 1900,
    medianHomePrice: 580000,
    population: 716000,
  },
  {
    slug: 'chicago-il',
    name: 'Chicago',
    state: 'IL',
    colIndex: 118,
    housingIndex: 145,
    groceriesIndex: 102,
    transportIndex: 115,
    utilitiesIndex: 95,
    healthcareIndex: 105,
    medianRent: 1700,
    medianHomePrice: 320000,
    population: 2697000,
  },
  {
    slug: 'philadelphia-pa',
    name: 'Philadelphia',
    state: 'PA',
    colIndex: 115,
    housingIndex: 140,
    groceriesIndex: 105,
    transportIndex: 110,
    utilitiesIndex: 108,
    healthcareIndex: 110,
    medianRent: 1600,
    medianHomePrice: 280000,
    population: 1584000,
  },
  {
    slug: 'atlanta-ga',
    name: 'Atlanta',
    state: 'GA',
    colIndex: 108,
    housingIndex: 125,
    groceriesIndex: 98,
    transportIndex: 105,
    utilitiesIndex: 95,
    healthcareIndex: 102,
    medianRent: 1600,
    medianHomePrice: 350000,
    population: 499000,
  },
  {
    slug: 'minneapolis-mn',
    name: 'Minneapolis',
    state: 'MN',
    colIndex: 107,
    housingIndex: 122,
    groceriesIndex: 100,
    transportIndex: 98,
    utilitiesIndex: 92,
    healthcareIndex: 115,
    medianRent: 1500,
    medianHomePrice: 340000,
    population: 425000,
  },
  {
    slug: 'phoenix-az',
    name: 'Phoenix',
    state: 'AZ',
    colIndex: 105,
    housingIndex: 118,
    groceriesIndex: 98,
    transportIndex: 102,
    utilitiesIndex: 105,
    healthcareIndex: 100,
    medianRent: 1400,
    medianHomePrice: 420000,
    population: 1660000,
  },
  {
    slug: 'charlotte-nc',
    name: 'Charlotte',
    state: 'NC',
    colIndex: 102,
    housingIndex: 112,
    groceriesIndex: 97,
    transportIndex: 100,
    utilitiesIndex: 95,
    healthcareIndex: 105,
    medianRent: 1400,
    medianHomePrice: 350000,
    population: 897000,
  },
  {
    slug: 'nashville-tn',
    name: 'Nashville',
    state: 'TN',
    colIndex: 101,
    housingIndex: 110,
    groceriesIndex: 96,
    transportIndex: 98,
    utilitiesIndex: 92,
    healthcareIndex: 102,
    medianRent: 1500,
    medianHomePrice: 400000,
    population: 694000,
  },

  // Lower COL Cities
  {
    slug: 'austin-tx',
    name: 'Austin',
    state: 'TX',
    colIndex: 119,
    housingIndex: 148,
    groceriesIndex: 96,
    transportIndex: 100,
    utilitiesIndex: 92,
    healthcareIndex: 98,
    medianRent: 1700,
    medianHomePrice: 550000,
    population: 978000,
  },
  {
    slug: 'dallas-tx',
    name: 'Dallas',
    state: 'TX',
    colIndex: 100,
    housingIndex: 105,
    groceriesIndex: 95,
    transportIndex: 102,
    utilitiesIndex: 98,
    healthcareIndex: 100,
    medianRent: 1400,
    medianHomePrice: 350000,
    population: 1343000,
  },
  {
    slug: 'houston-tx',
    name: 'Houston',
    state: 'TX',
    colIndex: 96,
    housingIndex: 98,
    groceriesIndex: 94,
    transportIndex: 100,
    utilitiesIndex: 102,
    healthcareIndex: 98,
    medianRent: 1300,
    medianHomePrice: 280000,
    population: 2314000,
  },
  {
    slug: 'san-antonio-tx',
    name: 'San Antonio',
    state: 'TX',
    colIndex: 92,
    housingIndex: 88,
    groceriesIndex: 93,
    transportIndex: 98,
    utilitiesIndex: 95,
    healthcareIndex: 95,
    medianRent: 1200,
    medianHomePrice: 250000,
    population: 1495000,
  },
  {
    slug: 'columbus-oh',
    name: 'Columbus',
    state: 'OH',
    colIndex: 91,
    housingIndex: 85,
    groceriesIndex: 95,
    transportIndex: 98,
    utilitiesIndex: 92,
    healthcareIndex: 102,
    medianRent: 1200,
    medianHomePrice: 260000,
    population: 906000,
  },
  {
    slug: 'indianapolis-in',
    name: 'Indianapolis',
    state: 'IN',
    colIndex: 88,
    housingIndex: 80,
    groceriesIndex: 93,
    transportIndex: 95,
    utilitiesIndex: 90,
    healthcareIndex: 100,
    medianRent: 1100,
    medianHomePrice: 240000,
    population: 880000,
  },
  {
    slug: 'kansas-city-mo',
    name: 'Kansas City',
    state: 'MO',
    colIndex: 87,
    housingIndex: 78,
    groceriesIndex: 92,
    transportIndex: 95,
    utilitiesIndex: 95,
    healthcareIndex: 98,
    medianRent: 1100,
    medianHomePrice: 250000,
    population: 508000,
  },
  {
    slug: 'oklahoma-city-ok',
    name: 'Oklahoma City',
    state: 'OK',
    colIndex: 84,
    housingIndex: 72,
    groceriesIndex: 90,
    transportIndex: 95,
    utilitiesIndex: 92,
    healthcareIndex: 95,
    medianRent: 1000,
    medianHomePrice: 210000,
    population: 687000,
  },
];

// Helper functions
export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find(c => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map(c => c.slug);
}

export function calculateEquivalentSalary(salary: number, fromCity: CityData, toCity: CityData): number {
  // Calculate equivalent salary based on COL difference
  const ratio = toCity.colIndex / fromCity.colIndex;
  return Math.round(salary * ratio);
}

export function calculateCostBreakdown(salary: number, city: CityData): {
  housing: number;
  groceries: number;
  transport: number;
  utilities: number;
  healthcare: number;
  other: number;
  total: number;
} {
  // Typical spending percentages (adjusted by COL index)
  const nationalAverage = {
    housing: 0.30,
    groceries: 0.12,
    transport: 0.15,
    utilities: 0.08,
    healthcare: 0.10,
    other: 0.25,
  };

  const housing = Math.round((salary * nationalAverage.housing * city.housingIndex) / 100);
  const groceries = Math.round((salary * nationalAverage.groceries * city.groceriesIndex) / 100);
  const transport = Math.round((salary * nationalAverage.transport * city.transportIndex) / 100);
  const utilities = Math.round((salary * nationalAverage.utilities * city.utilitiesIndex) / 100);
  const healthcare = Math.round((salary * nationalAverage.healthcare * city.healthcareIndex) / 100);
  const other = Math.round((salary * nationalAverage.other * city.colIndex) / 100);

  const total = housing + groceries + transport + utilities + healthcare + other;

  return {
    housing,
    groceries,
    transport,
    utilities,
    healthcare,
    other,
    total,
  };
}

export function compareQualityOfLife(fromCity: CityData, toCity: CityData): {
  category: string;
  fromCity: number;
  toCity: number;
  difference: number;
  winner: 'from' | 'to' | 'tie';
}[] {
  const categories = [
    { name: 'Housing Costs', from: fromCity.housingIndex, to: toCity.housingIndex, lowerIsBetter: true },
    { name: 'Groceries', from: fromCity.groceriesIndex, to: toCity.groceriesIndex, lowerIsBetter: true },
    { name: 'Transportation', from: fromCity.transportIndex, to: toCity.transportIndex, lowerIsBetter: true },
    { name: 'Utilities', from: fromCity.utilitiesIndex, to: toCity.utilitiesIndex, lowerIsBetter: true },
    { name: 'Healthcare', from: fromCity.healthcareIndex, to: toCity.healthcareIndex, lowerIsBetter: true },
  ];

  return categories.map(cat => {
    const difference = cat.to - cat.from;
    let winner: 'from' | 'to' | 'tie' = 'tie';
    
    if (Math.abs(difference) > 5) {
      if (cat.lowerIsBetter) {
        winner = difference < 0 ? 'to' : 'from';
      } else {
        winner = difference > 0 ? 'to' : 'from';
      }
    }

    return {
      category: cat.name,
      fromCity: cat.from,
      toCity: cat.to,
      difference,
      winner,
    };
  });
}

export function shouldRelocate(
  currentSalary: number,
  newSalary: number,
  fromCity: CityData,
  toCity: CityData
): {
  recommendation: 'yes' | 'no' | 'maybe';
  reasons: string[];
  realIncomeChange: number;
  realIncomeChangePercent: number;
} {
  const currentCosts = calculateCostBreakdown(currentSalary, fromCity);
  const newCosts = calculateCostBreakdown(newSalary, toCity);
  
  const currentDisposable = currentSalary - currentCosts.total;
  const newDisposable = newSalary - newCosts.total;
  
  const realIncomeChange = newDisposable - currentDisposable;
  const realIncomeChangePercent = (realIncomeChange / currentDisposable) * 100;

  const reasons: string[] = [];
  let recommendation: 'yes' | 'no' | 'maybe' = 'maybe';

  // Analyze the move
  if (realIncomeChangePercent > 15) {
    recommendation = 'yes';
    reasons.push(`Significant increase in disposable income (+${realIncomeChangePercent.toFixed(1)}%)`);
  } else if (realIncomeChangePercent < -10) {
    recommendation = 'no';
    reasons.push(`Decrease in disposable income (${realIncomeChangePercent.toFixed(1)}%)`);
  } else {
    recommendation = 'maybe';
    reasons.push(`Modest change in disposable income (${realIncomeChangePercent > 0 ? '+' : ''}${realIncomeChangePercent.toFixed(1)}%)`);
  }

  // Housing comparison
  const housingDiff = ((toCity.housingIndex - fromCity.housingIndex) / fromCity.housingIndex) * 100;
  if (housingDiff < -20) {
    reasons.push(`Much lower housing costs in ${toCity.name}`);
  } else if (housingDiff > 20) {
    reasons.push(`Much higher housing costs in ${toCity.name}`);
  }

  // Overall COL comparison
  const colDiff = ((toCity.colIndex - fromCity.colIndex) / fromCity.colIndex) * 100;
  if (Math.abs(colDiff) > 20) {
    reasons.push(`${Math.abs(colDiff).toFixed(0)}% ${colDiff > 0 ? 'higher' : 'lower'} overall cost of living`);
  }

  // Salary increase analysis
  const salaryIncrease = ((newSalary - currentSalary) / currentSalary) * 100;
  if (salaryIncrease > 20) {
    reasons.push(`Strong salary increase (+${salaryIncrease.toFixed(0)}%)`);
  } else if (salaryIncrease < 0) {
    reasons.push(`Salary decrease (${salaryIncrease.toFixed(0)}%)`);
  }

  return {
    recommendation,
    reasons,
    realIncomeChange,
    realIncomeChangePercent,
  };
}
