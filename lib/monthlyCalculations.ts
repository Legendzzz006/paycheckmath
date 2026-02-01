// Monthly Income Calculator

export interface MonthlyInputs {
  inputType: 'annual' | 'monthly' | 'weekly' | 'hourly';
  amount: number;
  hoursPerWeek?: number;
  weeksPerYear?: number;
}

export interface MonthlyResults {
  monthly: number;
  annual: number;
  weekly: number;
  biweekly: number;
  daily: number;
  hourly: number;
}

export function calculateMonthly(inputs: MonthlyInputs): MonthlyResults {
  const hoursPerWeek = inputs.hoursPerWeek || 40;
  const weeksPerYear = inputs.weeksPerYear || 52;
  const totalHours = hoursPerWeek * weeksPerYear;

  let annual: number;

  switch (inputs.inputType) {
    case 'annual':
      annual = inputs.amount;
      break;
    case 'monthly':
      annual = inputs.amount * 12;
      break;
    case 'weekly':
      annual = inputs.amount * weeksPerYear;
      break;
    case 'hourly':
      annual = inputs.amount * totalHours;
      break;
    default:
      annual = 0;
  }

  return {
    monthly: annual / 12,
    annual,
    weekly: annual / weeksPerYear,
    biweekly: annual / 26,
    daily: annual / (weeksPerYear * 5), // Assuming 5-day work week
    hourly: annual / totalHours,
  };
}
