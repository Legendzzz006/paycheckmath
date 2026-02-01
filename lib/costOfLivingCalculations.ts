// Cost of Living Adjustment Calculator

// Simplified cost of living index by state (100 = national average)
// Source: Approximate values for demonstration
export const STATE_COL_INDEX: { [state: string]: number } = {
  'Alabama': 88,
  'Alaska': 127,
  'Arizona': 97,
  'Arkansas': 86,
  'California': 138,
  'Colorado': 105,
  'Connecticut': 116,
  'Delaware': 102,
  'Florida': 99,
  'Georgia': 91,
  'Hawaii': 184,
  'Idaho': 95,
  'Illinois': 95,
  'Indiana': 90,
  'Iowa': 89,
  'Kansas': 87,
  'Kentucky': 88,
  'Louisiana': 91,
  'Maine': 105,
  'Maryland': 119,
  'Massachusetts': 131,
  'Michigan': 89,
  'Minnesota': 97,
  'Mississippi': 84,
  'Missouri': 87,
  'Montana': 100,
  'Nebraska': 91,
  'Nevada': 101,
  'New Hampshire': 109,
  'New Jersey': 120,
  'New Mexico': 91,
  'New York': 139,
  'North Carolina': 94,
  'North Dakota': 98,
  'Ohio': 90,
  'Oklahoma': 86,
  'Oregon': 115,
  'Pennsylvania': 96,
  'Rhode Island': 110,
  'South Carolina': 92,
  'South Dakota': 92,
  'Tennessee': 89,
  'Texas': 92,
  'Utah': 99,
  'Vermont': 110,
  'Virginia': 103,
  'Washington': 113,
  'West Virginia': 87,
  'Wisconsin': 94,
  'Wyoming': 92,
};

export interface COLInputs {
  currentSalary: number;
  currentState: string;
  newState: string;
}

export interface COLResults {
  currentSalary: number;
  equivalentSalary: number;
  difference: number;
  percentageChange: number;
  currentStateIndex: number;
  newStateIndex: number;
  breakdown: {
    current: {
      annual: number;
      monthly: number;
      hourly: number;
    };
    equivalent: {
      annual: number;
      monthly: number;
      hourly: number;
    };
  };
  recommendation: string;
}

export function calculateCostOfLiving(inputs: COLInputs): COLResults {
  const currentIndex = STATE_COL_INDEX[inputs.currentState] || 100;
  const newIndex = STATE_COL_INDEX[inputs.newState] || 100;

  // Calculate equivalent salary
  const equivalentSalary = inputs.currentSalary * (newIndex / currentIndex);
  const difference = equivalentSalary - inputs.currentSalary;
  const percentageChange = ((equivalentSalary - inputs.currentSalary) / inputs.currentSalary) * 100;

  const current = {
    annual: inputs.currentSalary,
    monthly: inputs.currentSalary / 12,
    hourly: inputs.currentSalary / 2080,
  };

  const equivalent = {
    annual: equivalentSalary,
    monthly: equivalentSalary / 12,
    hourly: equivalentSalary / 2080,
  };

  let recommendation: string;
  if (Math.abs(percentageChange) < 2) {
    recommendation = 'The cost of living is similar between these states.';
  } else if (percentageChange > 0) {
    recommendation = `You would need ${percentageChange.toFixed(1)}% more income in ${inputs.newState} to maintain the same standard of living.`;
  } else {
    recommendation = `Your money will go ${Math.abs(percentageChange).toFixed(1)}% further in ${inputs.newState}.`;
  }

  return {
    currentSalary: inputs.currentSalary,
    equivalentSalary,
    difference,
    percentageChange,
    currentStateIndex: currentIndex,
    newStateIndex: newIndex,
    breakdown: {
      current,
      equivalent,
    },
    recommendation,
  };
}

export function getStatesList(): string[] {
  return Object.keys(STATE_COL_INDEX).sort();
}
