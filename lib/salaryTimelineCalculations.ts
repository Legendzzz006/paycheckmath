// Salary increase timeline calculations

export interface TimelineInput {
  currentSalary: number;
  annualRaisePercent: number;
  years: number;
  inflationRate: number;
}

export interface YearData {
  year: number;
  salary: number;
  raise: number;
  cumulativeRaise: number;
  realValue: number;
  purchasingPower: number;
}

export interface TimelineResult {
  yearlyData: YearData[];
  totalEarnings: number;
  totalRealEarnings: number;
  finalSalary: number;
  totalGrowth: number;
  totalGrowthPercent: number;
  averageAnnualGrowth: number;
  inflationImpact: number;
}

export function calculateSalaryTimeline(input: TimelineInput): TimelineResult {
  const { currentSalary, annualRaisePercent, years, inflationRate } = input;
  
  const yearlyData: YearData[] = [];
  let salary = currentSalary;
  let totalEarnings = 0;
  let totalRealEarnings = 0;
  
  for (let year = 1; year <= years; year++) {
    const raise = year === 1 ? 0 : salary * (annualRaisePercent / 100);
    if (year > 1) {
      salary += raise;
    }
    
    const cumulativeRaise = salary - currentSalary;
    const inflationMultiplier = Math.pow(1 + inflationRate / 100, year - 1);
    const realValue = salary / inflationMultiplier;
    const purchasingPower = (realValue / currentSalary) * 100;
    
    yearlyData.push({
      year,
      salary: Math.round(salary),
      raise: Math.round(raise),
      cumulativeRaise: Math.round(cumulativeRaise),
      realValue: Math.round(realValue),
      purchasingPower: Math.round(purchasingPower * 100) / 100,
    });
    
    totalEarnings += salary;
    totalRealEarnings += realValue;
  }
  
  const finalSalary = salary;
  const totalGrowth = finalSalary - currentSalary;
  const totalGrowthPercent = (totalGrowth / currentSalary) * 100;
  const averageAnnualGrowth = totalGrowthPercent / years;
  const inflationImpact = totalEarnings - totalRealEarnings;
  
  return {
    yearlyData,
    totalEarnings: Math.round(totalEarnings),
    totalRealEarnings: Math.round(totalRealEarnings),
    finalSalary: Math.round(finalSalary),
    totalGrowth: Math.round(totalGrowth),
    totalGrowthPercent: Math.round(totalGrowthPercent * 100) / 100,
    averageAnnualGrowth: Math.round(averageAnnualGrowth * 100) / 100,
    inflationImpact: Math.round(inflationImpact),
  };
}

export function compareRaiseScenarios(
  currentSalary: number,
  years: number,
  inflationRate: number,
  scenarios: { name: string; raisePercent: number }[]
): {
  name: string;
  raisePercent: number;
  finalSalary: number;
  totalEarnings: number;
  realFinalSalary: number;
  beatsInflation: boolean;
}[] {
  return scenarios.map(scenario => {
    const result = calculateSalaryTimeline({
      currentSalary,
      annualRaisePercent: scenario.raisePercent,
      years,
      inflationRate,
    });
    
    const beatsInflation = scenario.raisePercent > inflationRate;
    
    return {
      name: scenario.name,
      raisePercent: scenario.raisePercent,
      finalSalary: result.finalSalary,
      totalEarnings: result.totalEarnings,
      realFinalSalary: result.yearlyData[result.yearlyData.length - 1].realValue,
      beatsInflation,
    };
  });
}

export const typicalRaiseScenarios = [
  { name: 'No Raise', raisePercent: 0 },
  { name: 'Cost of Living', raisePercent: 2.5 },
  { name: 'Standard', raisePercent: 3 },
  { name: 'Good Performance', raisePercent: 5 },
  { name: 'Promotion', raisePercent: 10 },
  { name: 'Job Change', raisePercent: 15 },
];
