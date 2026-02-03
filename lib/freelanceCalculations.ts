// Freelance rate calculations

export interface FreelanceInput {
  desiredSalary: number;
  billableHoursPerWeek: number;
  weeksWorkedPerYear: number;
  selfEmploymentTaxRate: number; // 15.3% for US
  incomeTaxRate: number; // Estimated federal + state
  businessExpenses: number; // Annual
  healthInsurance: number; // Annual
  retirement: number; // Annual contribution
  ptoWeeks: number;
  profitMargin: number; // Desired profit margin %
}

export interface FreelanceResult {
  minimumHourlyRate: number;
  recommendedHourlyRate: number;
  premiumHourlyRate: number;
  annualRevenue: number;
  totalExpenses: number;
  netIncome: number;
  effectiveTaxRate: number;
  breakdown: {
    baseSalary: number;
    taxes: number;
    benefits: number;
    expenses: number;
    pto: number;
    profit: number;
  };
}

export function calculateFreelanceRate(input: FreelanceInput): FreelanceResult {
  const {
    desiredSalary,
    billableHoursPerWeek,
    weeksWorkedPerYear,
    selfEmploymentTaxRate,
    incomeTaxRate,
    businessExpenses,
    healthInsurance,
    retirement,
    ptoWeeks,
    profitMargin,
  } = input;

  // Calculate total billable hours per year
  const billableHoursPerYear = billableHoursPerWeek * weeksWorkedPerYear;

  // Calculate PTO cost (weeks not working but still need to cover)
  const ptoValue = (desiredSalary / 52) * ptoWeeks;

  // Calculate total benefits cost
  const totalBenefits = healthInsurance + retirement;

  // Calculate taxes on desired salary
  const selfEmploymentTax = desiredSalary * (selfEmploymentTaxRate / 100);
  const incomeTax = desiredSalary * (incomeTaxRate / 100);
  const totalTaxes = selfEmploymentTax + incomeTax;

  // Calculate total annual costs
  const totalCosts = desiredSalary + totalTaxes + totalBenefits + businessExpenses + ptoValue;

  // Calculate desired profit
  const desiredProfit = totalCosts * (profitMargin / 100);

  // Calculate total revenue needed
  const totalRevenueNeeded = totalCosts + desiredProfit;

  // Calculate minimum hourly rate (no profit margin)
  const minimumHourlyRate = Math.ceil(totalCosts / billableHoursPerYear);

  // Calculate recommended hourly rate (with profit margin)
  const recommendedHourlyRate = Math.ceil(totalRevenueNeeded / billableHoursPerYear);

  // Calculate premium rate (20% higher for premium clients)
  const premiumHourlyRate = Math.ceil(recommendedHourlyRate * 1.2);

  // Calculate actual results at recommended rate
  const annualRevenue = recommendedHourlyRate * billableHoursPerYear;
  const netIncome = annualRevenue - totalTaxes - totalBenefits - businessExpenses - ptoValue;
  const effectiveTaxRate = (totalTaxes / annualRevenue) * 100;

  return {
    minimumHourlyRate,
    recommendedHourlyRate,
    premiumHourlyRate,
    annualRevenue,
    totalExpenses: totalTaxes + totalBenefits + businessExpenses + ptoValue,
    netIncome,
    effectiveTaxRate,
    breakdown: {
      baseSalary: desiredSalary,
      taxes: totalTaxes,
      benefits: totalBenefits,
      expenses: businessExpenses,
      pto: ptoValue,
      profit: desiredProfit,
    },
  };
}

// Compare freelance vs W2 employment
export function compareFreelanceVsW2(
  freelanceRate: number,
  hoursPerWeek: number,
  weeksPerYear: number,
  w2Salary: number
): {
  freelanceAnnual: number;
  w2Annual: number;
  difference: number;
  differencePercent: number;
  breakEvenRate: number;
} {
  const freelanceAnnual = freelanceRate * hoursPerWeek * weeksPerYear;
  const difference = freelanceAnnual - w2Salary;
  const differencePercent = (difference / w2Salary) * 100;
  const breakEvenRate = Math.ceil(w2Salary / (hoursPerWeek * weeksPerYear));

  return {
    freelanceAnnual,
    w2Annual: w2Salary,
    difference,
    differencePercent,
    breakEvenRate,
  };
}

// Calculate project-based pricing
export function calculateProjectRate(
  hourlyRate: number,
  estimatedHours: number,
  complexityMultiplier: number = 1.0,
  rushMultiplier: number = 1.0
): {
  basePrice: number;
  adjustedPrice: number;
  hourlyEquivalent: number;
} {
  const basePrice = hourlyRate * estimatedHours;
  const adjustedPrice = Math.ceil(basePrice * complexityMultiplier * rushMultiplier);
  const hourlyEquivalent = adjustedPrice / estimatedHours;

  return {
    basePrice,
    adjustedPrice,
    hourlyEquivalent,
  };
}

// Calculate retainer pricing
export function calculateRetainerRate(
  hourlyRate: number,
  hoursPerMonth: number,
  discountPercent: number = 10
): {
  fullPrice: number;
  discountedPrice: number;
  savings: number;
  effectiveHourlyRate: number;
} {
  const fullPrice = hourlyRate * hoursPerMonth;
  const discountedPrice = Math.ceil(fullPrice * (1 - discountPercent / 100));
  const savings = fullPrice - discountedPrice;
  const effectiveHourlyRate = discountedPrice / hoursPerMonth;

  return {
    fullPrice,
    discountedPrice,
    savings,
    effectiveHourlyRate,
  };
}

// Typical business expenses for freelancers
export const typicalExpenses = {
  software: 2400, // $200/month
  equipment: 1500, // Annual depreciation
  internet: 720, // $60/month
  phone: 600, // $50/month
  coworking: 3600, // $300/month (optional)
  marketing: 2000, // Annual
  accounting: 1200, // Annual
  insurance: 1500, // Professional liability
  education: 1000, // Courses, conferences
};

// Calculate total typical expenses
export function calculateTypicalExpenses(includeCoworking: boolean = false): number {
  let total = 0;
  for (const [key, value] of Object.entries(typicalExpenses)) {
    if (key === 'coworking' && !includeCoworking) continue;
    total += value;
  }
  return total;
}
