// Raise/Increment Calculator

export interface RaiseInputs {
  currentSalary: number;
  raiseType: 'percentage' | 'amount';
  raiseValue: number;
  hoursPerWeek?: number;
  weeksPerYear?: number;
}

export interface RaiseResults {
  currentSalary: number;
  newSalary: number;
  raiseAmount: number;
  raisePercentage: number;
  breakdown: {
    current: {
      annual: number;
      monthly: number;
      biweekly: number;
      weekly: number;
      hourly: number;
    };
    new: {
      annual: number;
      monthly: number;
      biweekly: number;
      weekly: number;
      hourly: number;
    };
    increase: {
      annual: number;
      monthly: number;
      biweekly: number;
      weekly: number;
      hourly: number;
    };
  };
}

export function calculateRaise(inputs: RaiseInputs): RaiseResults {
  const hoursPerWeek = inputs.hoursPerWeek || 40;
  const weeksPerYear = inputs.weeksPerYear || 52;
  const totalHours = hoursPerWeek * weeksPerYear;

  let raiseAmount: number;
  let raisePercentage: number;

  if (inputs.raiseType === 'percentage') {
    raisePercentage = inputs.raiseValue;
    raiseAmount = inputs.currentSalary * (inputs.raiseValue / 100);
  } else {
    raiseAmount = inputs.raiseValue;
    raisePercentage = (inputs.raiseValue / inputs.currentSalary) * 100;
  }

  const newSalary = inputs.currentSalary + raiseAmount;

  const current = {
    annual: inputs.currentSalary,
    monthly: inputs.currentSalary / 12,
    biweekly: inputs.currentSalary / 26,
    weekly: inputs.currentSalary / weeksPerYear,
    hourly: inputs.currentSalary / totalHours,
  };

  const newCalc = {
    annual: newSalary,
    monthly: newSalary / 12,
    biweekly: newSalary / 26,
    weekly: newSalary / weeksPerYear,
    hourly: newSalary / totalHours,
  };

  const increase = {
    annual: raiseAmount,
    monthly: raiseAmount / 12,
    biweekly: raiseAmount / 26,
    weekly: raiseAmount / weeksPerYear,
    hourly: raiseAmount / totalHours,
  };

  return {
    currentSalary: inputs.currentSalary,
    newSalary,
    raiseAmount,
    raisePercentage,
    breakdown: {
      current,
      new: newCalc,
      increase,
    },
  };
}
