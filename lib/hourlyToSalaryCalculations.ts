export interface HourlyToSalaryInputs {
    hourlyRate: number;
    hoursPerWeek: number;
    weeksPerYear: number;
}

export interface HourlyToSalaryResult {
    annual: number;
    monthly: number;
    biweekly: number;
    weekly: number;
    daily: number;
}

export function calculateHourlyToSalary(inputs: HourlyToSalaryInputs): HourlyToSalaryResult {
    const { hourlyRate, hoursPerWeek, weeksPerYear } = inputs;
    if (hourlyRate <= 0 || hoursPerWeek <= 0 || weeksPerYear <= 0) {
        return { annual: 0, monthly: 0, biweekly: 0, weekly: 0, daily: 0 };
    }
    const annual = hourlyRate * hoursPerWeek * weeksPerYear;
    const monthly = annual / 12;
    const weekly = hourlyRate * hoursPerWeek;
    const biweekly = weekly * 2;
    const daily = hourlyRate * (hoursPerWeek / 5);
    return {
        annual: Math.round(annual * 100) / 100,
        monthly: Math.round(monthly * 100) / 100,
        biweekly: Math.round(biweekly * 100) / 100,
        weekly: Math.round(weekly * 100) / 100,
        daily: Math.round(daily * 100) / 100,
    };
}
