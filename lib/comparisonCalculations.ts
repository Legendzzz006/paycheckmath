// Salary vs Hourly Comparison Calculator

export interface ComparisonInputs {
  salaryAmount: number;
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  salaryBenefitsValue: number; // Annual value of benefits for salary job
  hourlyBenefitsValue: number; // Annual value of benefits for hourly job
}

export interface ComparisonResults {
  salary: {
    annual: number;
    hourly: number;
    weekly: number;
    monthly: number;
    withBenefits: number;
    effectiveHourly: number;
  };
  hourly: {
    annual: number;
    hourly: number;
    weekly: number;
    monthly: number;
    withBenefits: number;
    effectiveHourly: number;
  };
  difference: {
    annual: number;
    hourly: number;
    percentage: number;
    betterOption: 'salary' | 'hourly' | 'equal';
  };
}

export function calculateComparison(inputs: ComparisonInputs): ComparisonResults {
  const totalHours = inputs.hoursPerWeek * inputs.weeksPerYear;

  // Salary job calculations
  const salaryHourly = inputs.salaryAmount / totalHours;
  const salaryWeekly = inputs.salaryAmount / inputs.weeksPerYear;
  const salaryMonthly = inputs.salaryAmount / 12;
  const salaryWithBenefits = inputs.salaryAmount + inputs.salaryBenefitsValue;
  const salaryEffectiveHourly = salaryWithBenefits / totalHours;

  // Hourly job calculations
  const hourlyAnnual = inputs.hourlyRate * totalHours;
  const hourlyWeekly = inputs.hourlyRate * inputs.hoursPerWeek;
  const hourlyMonthly = hourlyAnnual / 12;
  const hourlyWithBenefits = hourlyAnnual + inputs.hourlyBenefitsValue;
  const hourlyEffectiveHourly = hourlyWithBenefits / totalHours;

  // Comparison
  const annualDiff = salaryWithBenefits - hourlyWithBenefits;
  const hourlyDiff = salaryEffectiveHourly - hourlyEffectiveHourly;
  const percentage = (annualDiff / hourlyWithBenefits) * 100;

  let betterOption: 'salary' | 'hourly' | 'equal';
  if (Math.abs(annualDiff) < 100) {
    betterOption = 'equal';
  } else if (annualDiff > 0) {
    betterOption = 'salary';
  } else {
    betterOption = 'hourly';
  }

  return {
    salary: {
      annual: inputs.salaryAmount,
      hourly: salaryHourly,
      weekly: salaryWeekly,
      monthly: salaryMonthly,
      withBenefits: salaryWithBenefits,
      effectiveHourly: salaryEffectiveHourly,
    },
    hourly: {
      annual: hourlyAnnual,
      hourly: inputs.hourlyRate,
      weekly: hourlyWeekly,
      monthly: hourlyMonthly,
      withBenefits: hourlyWithBenefits,
      effectiveHourly: hourlyEffectiveHourly,
    },
    difference: {
      annual: annualDiff,
      hourly: hourlyDiff,
      percentage,
      betterOption,
    },
  };
}
