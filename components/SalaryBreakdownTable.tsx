import { formatCurrency } from '@/lib/salaryCalculations';

interface SalaryBreakdownTableProps {
  salary: number;
}

export default function SalaryBreakdownTable({ salary }: SalaryBreakdownTableProps) {
  const hourly = salary / 2080;
  const daily = salary / 260;
  const weekly = salary / 52;
  const biweekly = salary / 26;
  const monthly = salary / 12;

  const rows = [
    { period: 'Hourly', amount: hourly, hours: 1 },
    { period: 'Daily', amount: daily, hours: 8 },
    { period: 'Weekly', amount: weekly, hours: 40 },
    { period: 'Bi-weekly', amount: biweekly, hours: 80 },
    { period: 'Monthly', amount: monthly, hours: 173.33 },
    { period: 'Annually', amount: salary, hours: 2080 },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Pay Period
            </th>
            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              Gross Pay
            </th>
            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
              Hours Worked
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, index) => (
            <tr key={row.period} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-50'}>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {row.period}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 text-right font-bold">
                {formatCurrency(row.amount)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 text-right">
                {row.hours.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
