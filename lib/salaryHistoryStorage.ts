// Salary history tracking with localStorage

export interface SalaryEntry {
  id: string;
  date: string; // ISO date string
  salary: number;
  jobTitle: string;
  company: string;
  notes: string;
}

export interface SalaryHistory {
  entries: SalaryEntry[];
  lastUpdated: string;
}

const STORAGE_KEY = 'paycheckmath_salary_history';

// Get all salary entries
export function getSalaryHistory(): SalaryHistory {
  if (typeof window === 'undefined') {
    return { entries: [], lastUpdated: new Date().toISOString() };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { entries: [], lastUpdated: new Date().toISOString() };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading salary history:', error);
    return { entries: [], lastUpdated: new Date().toISOString() };
  }
}

// Save salary history
export function saveSalaryHistory(history: SalaryHistory): void {
  if (typeof window === 'undefined') return;

  try {
    history.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving salary history:', error);
  }
}

// Add new salary entry
export function addSalaryEntry(entry: Omit<SalaryEntry, 'id'>): SalaryEntry {
  const history = getSalaryHistory();
  const newEntry: SalaryEntry = {
    ...entry,
    id: generateId(),
  };
  history.entries.push(newEntry);
  history.entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  saveSalaryHistory(history);
  return newEntry;
}

// Update existing entry
export function updateSalaryEntry(id: string, updates: Partial<Omit<SalaryEntry, 'id'>>): void {
  const history = getSalaryHistory();
  const index = history.entries.findIndex(e => e.id === id);
  if (index !== -1) {
    history.entries[index] = { ...history.entries[index], ...updates };
    history.entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    saveSalaryHistory(history);
  }
}

// Delete entry
export function deleteSalaryEntry(id: string): void {
  const history = getSalaryHistory();
  history.entries = history.entries.filter(e => e.id !== id);
  saveSalaryHistory(history);
}

// Clear all history
export function clearSalaryHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// Export to CSV
export function exportToCSV(): string {
  const history = getSalaryHistory();
  const headers = ['Date', 'Salary', 'Job Title', 'Company', 'Notes'];
  const rows = history.entries.map(entry => [
    entry.date,
    entry.salary.toString(),
    entry.jobTitle,
    entry.company,
    entry.notes,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
}

// Calculate statistics
export function calculateStatistics(entries: SalaryEntry[]): {
  totalEarnings: number;
  averageSalary: number;
  highestSalary: number;
  lowestSalary: number;
  totalGrowth: number;
  totalGrowthPercent: number;
  averageYearlyGrowth: number;
  yearsTracked: number;
} {
  if (entries.length === 0) {
    return {
      totalEarnings: 0,
      averageSalary: 0,
      highestSalary: 0,
      lowestSalary: 0,
      totalGrowth: 0,
      totalGrowthPercent: 0,
      averageYearlyGrowth: 0,
      yearsTracked: 0,
    };
  }

  const sortedEntries = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Calculate total earnings (sum of all salaries weighted by time)
  let totalEarnings = 0;
  for (let i = 0; i < sortedEntries.length; i++) {
    const entry = sortedEntries[i];
    const nextEntry = sortedEntries[i + 1];
    
    const startDate = new Date(entry.date);
    const endDate = nextEntry ? new Date(nextEntry.date) : new Date();
    const yearsInRole = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    
    totalEarnings += entry.salary * yearsInRole;
  }

  const salaries = entries.map(e => e.salary);
  const averageSalary = salaries.reduce((sum, s) => sum + s, 0) / salaries.length;
  const highestSalary = Math.max(...salaries);
  const lowestSalary = Math.min(...salaries);

  const firstEntry = sortedEntries[0];
  const lastEntry = sortedEntries[sortedEntries.length - 1];
  const totalGrowth = lastEntry.salary - firstEntry.salary;
  const totalGrowthPercent = (totalGrowth / firstEntry.salary) * 100;

  const firstDate = new Date(firstEntry.date);
  const lastDate = new Date(lastEntry.date);
  const yearsTracked = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  
  const averageYearlyGrowth = yearsTracked > 0 ? totalGrowthPercent / yearsTracked : 0;

  return {
    totalEarnings: Math.round(totalEarnings),
    averageSalary: Math.round(averageSalary),
    highestSalary,
    lowestSalary,
    totalGrowth,
    totalGrowthPercent,
    averageYearlyGrowth,
    yearsTracked,
  };
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Import from CSV
export function importFromCSV(csvContent: string): SalaryEntry[] {
  const lines = csvContent.trim().split('\n');
  if (lines.length < 2) return [];

  const entries: SalaryEntry[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Simple CSV parsing (handles quoted fields)
    const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
    if (!matches || matches.length < 5) continue;

    const [date, salary, jobTitle, company, notes] = matches.map(m => m.replace(/^"|"$/g, '').trim());

    entries.push({
      id: generateId(),
      date,
      salary: parseFloat(salary) || 0,
      jobTitle,
      company,
      notes,
    });
  }

  return entries;
}
