export interface TakeHomeInputs {
  grossPay: number;
  payFrequency: 'hourly' | 'weekly' | 'biweekly' | 'monthly' | 'annual';
  federalTaxRate: number;
  stateTaxRate: number;
  otherDeductions: number;
}

export interface TakeHomeBreakdown {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
  takeHomePercentage: number;
}

export function calculateTakeHome(inputs: TakeHomeInputs): TakeHomeBreakdown {
  const { grossPay, federalTaxRate, stateTaxRate, otherDeductions } = inputs;
  
  const federalTax = grossPay * (federalTaxRate / 100);
  const stateTax = grossPay * (stateTaxRate / 100);
  const ficaTax = grossPay * 0.0765; // 7.65% (6.2% Social Security + 1.45% Medicare)
  const totalDeductions = federalTax + stateTax + ficaTax + otherDeductions;
  const netPay = grossPay - totalDeductions;
  const takeHomePercentage = grossPay > 0 ? (netPay / grossPay) * 100 : 0;
  
  return {
    grossPay: Math.round(grossPay * 100) / 100,
    federalTax: Math.round(federalTax * 100) / 100,
    stateTax: Math.round(stateTax * 100) / 100,
    ficaTax: Math.round(ficaTax * 100) / 100,
    otherDeductions: Math.round(otherDeductions * 100) / 100,
    totalDeductions: Math.round(totalDeductions * 100) / 100,
    netPay: Math.round(netPay * 100) / 100,
    takeHomePercentage: Math.round(takeHomePercentage * 100) / 100,
  };
}
