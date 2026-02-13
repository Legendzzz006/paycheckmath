export interface InflationInputs {
    salary: number;
    years: number;
    inflationRate: number;
    raiseRate: number;
}

export interface InflationResult {
    nominalSalary: number;
    realValue: number;
    purchasingPowerLoss: number;
    realGainOrLoss: number;
    yearByYear: { year: number; nominal: number; real: number; cumInflation: number }[];
}

export function calculateInflation(inputs: InflationInputs): InflationResult {
    const { salary, years, inflationRate, raiseRate } = inputs;
    if (salary <= 0 || years <= 0) {
        return { nominalSalary: salary, realValue: salary, purchasingPowerLoss: 0, realGainOrLoss: 0, yearByYear: [] };
    }
    const yearByYear = [];
    let nominal = salary;
    for (let y = 1; y <= years; y++) {
        nominal = nominal * (1 + raiseRate / 100);
        const cumInflation = Math.pow(1 + inflationRate / 100, y);
        const real = nominal / cumInflation;
        yearByYear.push({
            year: y,
            nominal: Math.round(nominal),
            real: Math.round(real),
            cumInflation: Math.round((cumInflation - 1) * 10000) / 100,
        });
    }
    const finalNominal = yearByYear[yearByYear.length - 1]?.nominal ?? salary;
    const finalReal = yearByYear[yearByYear.length - 1]?.real ?? salary;
    return {
        nominalSalary: finalNominal,
        realValue: finalReal,
        purchasingPowerLoss: Math.round(((finalNominal - finalReal) / finalNominal) * 10000) / 100,
        realGainOrLoss: finalReal - salary,
        yearByYear,
    };
}
