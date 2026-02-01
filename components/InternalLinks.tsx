import Link from 'next/link';
import { popularSalaries } from '@/lib/salaryData';

interface InternalLinksProps {
  currentSalary?: number;
  limit?: number;
}

export default function InternalLinks({ currentSalary, limit = 12 }: InternalLinksProps) {
  const salariesToShow = popularSalaries
    .filter(s => s !== currentSalary)
    .slice(0, limit);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
      {salariesToShow.map(salary => (
        <Link
          key={salary}
          href={`/${salary}-a-year-is-how-much-an-hour`}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all text-center"
        >
          ${salary.toLocaleString()}/year
        </Link>
      ))}
    </div>
  );
}
