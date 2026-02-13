import { CurrencyConfig, formatCurrencyWithConfig, formatNumberWithLocale } from './currencyConfig';

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

  const workingWeeks = Math.max(weeksPerYear - paidTimeOffWeeks, 0);
  const totalWorkingHours = workingWeeks * hoursPerWeek;

  // Guard against division by zero
  const hourly = totalWorkingHours > 0 ? annualSalary / totalWorkingHours : 0;
  const daily = hoursPerWeek > 0 ? hourly * (hoursPerWeek / 5) : 0;
  const weekly = weeksPerYear > 0 ? annualSalary / weeksPerYear : 0;
  const monthly = annualSalary / 12;

  return {
    annual: annualSalary,
    hourly: Math.round(hourly * 100) / 100,
    daily: Math.round(daily * 100) / 100,
    weekly: Math.round(weekly * 100) / 100,
    monthly: Math.round(monthly * 100) / 100,
  };
}

// Legacy functions for backward compatibility
export function formatCurrency(amount: number, currencyConfig?: CurrencyConfig): string {
  if (currencyConfig) {
    return formatCurrencyWithConfig(amount, currencyConfig);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number, locale?: string): string {
  if (locale) {
    return formatNumberWithLocale(num, locale);
  }
  return new Intl.NumberFormat('en-US').format(num);
}
