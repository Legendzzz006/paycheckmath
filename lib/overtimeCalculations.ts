export interface OvertimeInputs {
  hourlyRate: number;
  regularHours: number;
  overtimeHours: number;
  overtimeMultiplier: number;
}

export interface OvertimeBreakdown {
  regularPay: number;
  overtimePay: number;
  totalPay: number;
  effectiveHourlyRate: number;
}

export function calculateOvertime(inputs: OvertimeInputs): OvertimeBreakdown {
  const { hourlyRate, regularHours, overtimeHours, overtimeMultiplier } = inputs;
  
  const regularPay = hourlyRate * regularHours;
  const overtimePay = hourlyRate * overtimeMultiplier * overtimeHours;
  const totalPay = regularPay + overtimePay;
  const totalHours = regularHours + overtimeHours;
  const effectiveHourlyRate = totalHours > 0 ? totalPay / totalHours : 0;
  
  return {
    regularPay: Math.round(regularPay * 100) / 100,
    overtimePay: Math.round(overtimePay * 100) / 100,
    totalPay: Math.round(totalPay * 100) / 100,
    effectiveHourlyRate: Math.round(effectiveHourlyRate * 100) / 100,
  };
}
