// Part-Time Income Calculator

export interface PartTimeJob {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface PartTimeResults {
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
  effectiveFullTimeEquivalent: number; // What this would be as a 40hr/week job
}

export function calculatePartTime(job: PartTimeJob): PartTimeResults {
  const annual = job.hourlyRate * job.hoursPerWeek * job.weeksPerYear;
  const weekly = job.hourlyRate * job.hoursPerWeek;
  const biweekly = weekly * 2;
  const monthly = annual / 12;
  
  // Calculate what this would be as a full-time (40 hrs/week) salary
  const effectiveFullTimeEquivalent = job.hourlyRate * 40 * 52;

  return {
    weekly,
    biweekly,
    monthly,
    annual,
    effectiveFullTimeEquivalent,
  };
}

export interface MultipleJobsInput {
  jobs: PartTimeJob[];
}

export interface MultipleJobsResults {
  totalWeekly: number;
  totalBiweekly: number;
  totalMonthly: number;
  totalAnnual: number;
  totalHoursPerWeek: number;
  averageHourlyRate: number;
  jobBreakdown: PartTimeResults[];
}

export function calculateMultipleJobs(input: MultipleJobsInput): MultipleJobsResults {
  const jobBreakdown = input.jobs.map(calculatePartTime);
  
  const totalAnnual = jobBreakdown.reduce((sum, job) => sum + job.annual, 0);
  const totalWeekly = jobBreakdown.reduce((sum, job) => sum + job.weekly, 0);
  const totalBiweekly = jobBreakdown.reduce((sum, job) => sum + job.biweekly, 0);
  const totalMonthly = jobBreakdown.reduce((sum, job) => sum + job.monthly, 0);
  
  const totalHoursPerWeek = input.jobs.reduce((sum, job) => sum + job.hoursPerWeek, 0);
  const averageHourlyRate = totalHoursPerWeek > 0 ? totalWeekly / totalHoursPerWeek : 0;

  return {
    totalWeekly,
    totalBiweekly,
    totalMonthly,
    totalAnnual,
    totalHoursPerWeek,
    averageHourlyRate,
    jobBreakdown,
  };
}
