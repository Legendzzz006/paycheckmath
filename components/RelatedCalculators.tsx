import Link from 'next/link';

interface RelatedCalculatorsProps {
  currentPage?: string;
  variant?: 'compact' | 'full';
}

export default function RelatedCalculators({ currentPage, variant = 'full' }: RelatedCalculatorsProps) {
  const allCalculators = [
    {
      href: '/salary-to-hourly/',
      title: 'Salary to Hourly',
      description: 'Quick conversion from annual salary to hourly wage',
      icon: '⏱️',
      category: 'essential',
    },
    {
      href: '/overtime-calculator/',
      title: 'Overtime Calculator',
      description: 'Calculate overtime pay with time and a half rates',
      icon: '⏰',
      category: 'essential',
    },
    {
      href: '/take-home-pay-calculator/',
      title: 'Take-Home Pay',
      description: 'Calculate net pay after taxes and deductions',
      icon: '💰',
      category: 'essential',
    },
    {
      href: '/biweekly-paycheck-calculator/',
      title: 'Bi-Weekly Paycheck',
      description: 'Calculate your bi-weekly paycheck amount',
      icon: '📅',
      category: 'essential',
    },
    {
      href: '/monthly-income-calculator/',
      title: 'Monthly Income',
      description: 'Calculate monthly income from any pay period',
      icon: '📊',
      category: 'planning',
    },
    {
      href: '/compare/',
      title: 'Job Offer Comparison',
      description: 'Compare up to 3 job offers with benefits and sharing',
      icon: '⚖️',
      category: 'planning',
    },
    {
      href: '/negotiation-calculator/',
      title: 'Salary Negotiation',
      description: 'Calculate counter offers and get negotiation scripts',
      icon: '💼',
      category: 'planning',
    },
    {
      href: '/cost-of-living-calculator/',
      title: 'Cost of Living',
      description: 'Compare cities and calculate equivalent salaries',
      icon: '🏙️',
      category: 'planning',
    },
    {
      href: '/salary-history/',
      title: 'Salary History Tracker',
      description: 'Track your salary growth and lifetime earnings',
      icon: '📊',
      category: 'planning',
    },
    {
      href: '/freelance-rate-calculator/',
      title: 'Freelance Rate',
      description: 'Calculate your freelance hourly rate',
      icon: '💼',
      category: 'planning',
    },
    {
      href: '/salary-timeline/',
      title: 'Salary Timeline',
      description: 'Project future salary with annual raises',
      icon: '📈',
      category: 'planning',
    },
    {
      href: '/salary-comparison-calculator/',
      title: 'Salary Comparison',
      description: 'Compare multiple job offers side by side',
      icon: '📊',
      category: 'planning',
    },
    {
      href: '/raise-calculator/',
      title: 'Raise Calculator',
      description: 'Calculate your new salary after a raise',
      icon: '📈',
      category: 'planning',
    },
    {
      href: '/part-time-salary-calculator/',
      title: 'Part-Time Income',
      description: 'Calculate income from part-time work',
      icon: '👥',
      category: 'planning',
    },
  ];

  // Filter out current page
  const calculators = allCalculators.filter(calc => calc.href !== currentPage);

  // For compact variant, show only 4 calculators
  const displayCalculators = variant === 'compact' ? calculators.slice(0, 4) : calculators;

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {displayCalculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition-all text-center group"
          >
            <div className="text-2xl mb-1">{calc.icon}</div>
            <div className="text-xs font-semibold text-gray-900 group-hover:text-blue-600">
              {calc.title}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Essential Calculators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calculators
            .filter(calc => calc.category === 'essential')
            .map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl flex-shrink-0">{calc.icon}</div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-600 mb-1">
                      {calc.title}
                    </h4>
                    <p className="text-sm text-gray-600">{calc.description}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Planning Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calculators
            .filter(calc => calc.category === 'planning')
            .map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 hover:border-purple-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl flex-shrink-0">{calc.icon}</div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-purple-600 mb-1">
                      {calc.title}
                    </h4>
                    <p className="text-sm text-gray-600">{calc.description}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
