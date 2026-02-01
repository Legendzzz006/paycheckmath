export interface SalaryBreakdown {
  annual: number;
  hourly: number;
  daily: number;
  weekly: number;
  monthly: number;
}

export interface CalculatorInputs {
  annualSalary: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  paidTimeOffWeeks?: number;
}

export function calculateSalaryBreakdown(inputs: CalculatorInputs): SalaryBreakdown {
  const { annualSalary, hoursPerWeek, weeksPerYear, paidTimeOffWeeks = 0 } = inputs;
  
  const workingWeeks = weeksPerYear - paidTimeOffWeeks;
  const totalWorkingHours = workingWeeks * hoursPerWeek;
  
  const hourly = annualSalary / totalWorkingHours;
  const daily = hourly * (hoursPerWeek / 5);
  const weekly = annualSalary / weeksPerYear;
  const monthly = annualSalary / 12;
  
  return {
    annual: annualSalary,
    hourly: Math.round(hourly * 100) / 100,
    daily: Math.round(daily * 100) / 100,
    weekly: Math.round(weekly * 100) / 100,
    monthly: Math.round(monthly * 100) / 100,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
