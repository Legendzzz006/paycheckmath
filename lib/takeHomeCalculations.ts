export interface TakeHomeInputs {
  grossPay: number;
  payFrequency: 'hourly' | 'weekly' | 'biweekly' | 'monthly' | 'annual';
  federalTaxRate: number;
  stateTaxRate: number;
  otherDeductions: number;
  filingStatus?: 'single' | 'married' | 'head_of_household';
}

export interface TakeHomeBreakdown {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
  takeHomePercentage: number;
}

// 2024 Social Security wage base
const SS_WAGE_BASE = 168600;
const SS_TAX_RATE = 0.062; // 6.2%
const MEDICARE_TAX_RATE = 0.0145; // 1.45%
const ADDITIONAL_MEDICARE_RATE = 0.009; // 0.9% on income over threshold
const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
const ADDITIONAL_MEDICARE_THRESHOLD_MARRIED = 250000;

export function calculateTakeHome(inputs: TakeHomeInputs): TakeHomeBreakdown {
  const { grossPay, federalTaxRate, stateTaxRate, otherDeductions, filingStatus = 'single' } = inputs;
  
  // Calculate annual gross pay for accurate FICA calculations
  let annualGross = grossPay;
  switch (inputs.payFrequency) {
    case 'hourly':
      annualGross = grossPay * 2080; // Assume 40 hrs/week, 52 weeks
      break;
    case 'weekly':
      annualGross = grossPay * 52;
      break;
    case 'biweekly':
      annualGross = grossPay * 26;
      break;
    case 'monthly':
      annualGross = grossPay * 12;
      break;
  }
  
  // Calculate Social Security tax (capped at wage base)
  const socialSecurityWages = Math.min(annualGross, SS_WAGE_BASE);
  const annualSocialSecurityTax = socialSecurityWages * SS_TAX_RATE;
  
  // Calculate Medicare tax (no cap, with additional tax for high earners)
  const medicareThreshold = filingStatus === 'married' 
    ? ADDITIONAL_MEDICARE_THRESHOLD_MARRIED 
    : ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;
  
  let annualMedicareTax = annualGross * MEDICARE_TAX_RATE;
  if (annualGross > medicareThreshold) {
    annualMedicareTax += (annualGross - medicareThreshold) * ADDITIONAL_MEDICARE_RATE;
  }
  
  // Convert annual FICA taxes back to pay period
  let socialSecurityTax = annualSocialSecurityTax;
  let medicareTax = annualMedicareTax;
  
  switch (inputs.payFrequency) {
    case 'hourly':
      socialSecurityTax = annualSocialSecurityTax / 2080;
      medicareTax = annualMedicareTax / 2080;
      break;
    case 'weekly':
      socialSecurityTax = annualSocialSecurityTax / 52;
      medicareTax = annualMedicareTax / 52;
      break;
    case 'biweekly':
      socialSecurityTax = annualSocialSecurityTax / 26;
      medicareTax = annualMedicareTax / 26;
      break;
    case 'monthly':
      socialSecurityTax = annualSocialSecurityTax / 12;
      medicareTax = annualMedicareTax / 12;
      break;
  }
  
  // Use provided tax rates for federal and state (user can input their effective rate)
  const federalTax = grossPay * (federalTaxRate / 100);
  const stateTax = grossPay * (stateTaxRate / 100);
  
  const totalDeductions = federalTax + stateTax + socialSecurityTax + medicareTax + otherDeductions;
  const netPay = grossPay - totalDeductions;
  const takeHomePercentage = grossPay > 0 ? (netPay / grossPay) * 100 : 0;
  
  return {
    grossPay: Math.round(grossPay * 100) / 100,
    federalTax: Math.round(federalTax * 100) / 100,
    stateTax: Math.round(stateTax * 100) / 100,
    socialSecurityTax: Math.round(socialSecurityTax * 100) / 100,
    medicareTax: Math.round(medicareTax * 100) / 100,
    otherDeductions: Math.round(otherDeductions * 100) / 100,
    totalDeductions: Math.round(totalDeductions * 100) / 100,
    netPay: Math.round(netPay * 100) / 100,
    takeHomePercentage: Math.round(takeHomePercentage * 100) / 100,
  };
}
