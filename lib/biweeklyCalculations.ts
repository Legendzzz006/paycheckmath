export interface BiweeklyInputs {
  annualSalary?: number;
  hourlyRate?: number;
  hoursPerWeek?: number;
}

export interface BiweeklyBreakdown {
  biweeklyGross: number;
  monthlyEquivalent: number;
  annualEquivalent: number;
  weeklyPay: number;
}

export function calculateBiweekly(inputs: BiweeklyInputs): BiweeklyBreakdown {
  let annualSalary = inputs.annualSalary || 0;
  
  if (!annualSalary && inputs.hourlyRate && inputs.hoursPerWeek) {
    annualSalary = inputs.hourlyRate * inputs.hoursPerWeek * 52;
  }
  
  const biweeklyGross = annualSalary / 26;
  const monthlyEquivalent = annualSalary / 12;
  const weeklyPay = annualSalary / 52;
  
  return {
    biweeklyGross: Math.round(biweeklyGross * 100) / 100,
    monthlyEquivalent: Math.round(monthlyEquivalent * 100) / 100,
    annualEquivalent: Math.round(annualSalary * 100) / 100,
    weeklyPay: Math.round(weeklyPay * 100) / 100,
  };
}
