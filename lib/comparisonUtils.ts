// Salary comparison utilities with URL encoding/decoding

export interface JobOffer {
  id: string;
  title: string;
  salary: number;
  bonus: number;
  equity: number;
  pto: number;
  retirement401k: number;
  healthInsurance: number;
  otherBenefits: number;
}

export interface ComparisonResult {
  totalComp: number;
  monthlyComp: number;
  hourlyRate: number;
  effectiveHourly: number; // Including benefits
  ptoValue: number;
  retirementValue: number;
  totalBenefitsValue: number;
}

export function calculateJobValue(job: JobOffer): ComparisonResult {
  const totalComp = job.salary + job.bonus + job.equity;
  const monthlyComp = totalComp / 12;
  const hourlyRate = job.salary / 2080;
  
  // Calculate PTO value (assuming 40 hrs/week)
  const ptoValue = (job.salary / 52) * job.pto;
  
  // Calculate 401k match value
  const retirementValue = job.salary * (job.retirement401k / 100);
  
  // Total benefits
  const totalBenefitsValue = ptoValue + retirementValue + job.healthInsurance + job.otherBenefits;
  
  // Effective hourly including all benefits
  const effectiveHourly = (totalComp + totalBenefitsValue) / 2080;
  
  return {
    totalComp: Math.round(totalComp),
    monthlyComp: Math.round(monthlyComp),
    hourlyRate: Math.round(hourlyRate * 100) / 100,
    effectiveHourly: Math.round(effectiveHourly * 100) / 100,
    ptoValue: Math.round(ptoValue),
    retirementValue: Math.round(retirementValue),
    totalBenefitsValue: Math.round(totalBenefitsValue),
  };
}

// Encode comparison data to URL-safe string
export function encodeComparison(jobs: JobOffer[]): string {
  const data = JSON.stringify(jobs);
  return btoa(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Decode comparison data from URL
export function decodeComparison(encoded: string): JobOffer[] | null {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const data = atob(padded);
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// Generate shareable URL
export function generateShareableUrl(jobs: JobOffer[]): string {
  const encoded = encodeComparison(jobs);
  return `${typeof window !== 'undefined' ? window.location.origin : 'https://paycheckmath.com'}/compare?data=${encoded}`;
}

// Create default job offer
export function createDefaultJob(id: string, title: string = 'Job Offer'): JobOffer {
  return {
    id,
    title,
    salary: 75000,
    bonus: 0,
    equity: 0,
    pto: 2,
    retirement401k: 3,
    healthInsurance: 0,
    otherBenefits: 0,
  };
}
