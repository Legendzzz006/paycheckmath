// Inflation Impact Calculator

// Historical US inflation rates (approximate averages)
export const INFLATION_RATES: { [year: number]: number } = {
  2024: 3.4,
  2023: 4.1,
  2022: 8.0,
  2021: 4.7,
  2020: 1.2,
  2019: 1.8,
  2018: 2.4,
  2017: 2.1,
  2016: 1.3,
  2015: 0.1,
  2014: 1.6,
  2013: 1.5,
  2012: 2.1,
  2011: 3.2,
  2010: 1.6,
};

export interface InflationInputs {
  currentSalary: number;
  startYear: number;
  endYear: number;
  customInflationRate?: number; // For future projections
}

export interface InflationResults {
  currentSalary: number;
  adjustedSalary: number;
  totalInflation: number;
  purchasingPowerLoss: number;
  yearByYear: Array<{
    year: number;
    salary: number;
    inflationRate: number;
    realValue: number;
  }>;
}

export function calculateInflationImpact(inputs: InflationInputs): InflationResults {
  const currentYear = 2026;
  let adjustedSalary = inputs.currentSalary;
  const yearByYear: Array<{
    year: number;
    salary: number;
    inflationRate: number;
    realValue: number;
  }> = [];

  // Calculate backwards or forwards
  if (inputs.startYear < inputs.endYear) {
    // Forward calculation (what you need in the future)
    for (let year = inputs.startYear; year <= inputs.endYear; year++) {
      const inflationRate = inputs.customInflationRate || INFLATION_RATES[year] || 3.0;
      const realValue = adjustedSalary;
      
      yearByYear.push({
        year,
        salary: adjustedSalary,
        inflationRate,
        realValue,
      });

      adjustedSalary = adjustedSalary * (1 + inflationRate / 100);
    }
  } else {
    // Backward calculation (what it was worth before)
    for (let year = inputs.startYear; year >= inputs.endYear; year--) {
      const inflationRate = INFLATION_RATES[year] || 3.0;
      const realValue = adjustedSalary;
      
      yearByYear.push({
        year,
        salary: adjustedSalary,
        inflationRate,
        realValue,
      });

      adjustedSalary = adjustedSalary / (1 + inflationRate / 100);
    }
  }

  const totalInflation = ((adjustedSalary - inputs.currentSalary) / inputs.currentSalary) * 100;
  const purchasingPowerLoss = inputs.currentSalary - adjustedSalary;

  return {
    currentSalary: inputs.currentSalary,
    adjustedSalary,
    totalInflation,
    purchasingPowerLoss,
    yearByYear,
  };
}
