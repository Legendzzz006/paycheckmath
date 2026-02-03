'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EnhancedComparisonCalculator from '@/components/EnhancedComparisonCalculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import ErrorBoundary from '@/components/ErrorBoundary';

function CompareContent() {
  const searchParams = useSearchParams();
  const [initialData, setInitialData] = useState<string | undefined>();

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      setInitialData(data);
    }
  }, [searchParams]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Compare Job Offers
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
          Make informed career decisions by comparing total compensation packages. Include salary, bonuses, equity, 
          PTO, 401k matching, and benefits to see which offer provides the best overall value.
        </p>
      </div>

      <div className="mb-16">
        <ErrorBoundary>
          <EnhancedComparisonCalculator initialData={initialData} />
        </ErrorBoundary>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How to Use the Job Comparison Tool
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">1. Enter Job Details</h3>
            <p className="text-gray-700">
              Input the base salary, bonuses, equity, and benefits for each job offer. Include PTO weeks, 
              401k match percentage, and estimated health insurance value.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">2. Compare Total Value</h3>
            <p className="text-gray-700">
              See the total compensation package including all benefits. The tool calculates PTO value, 
              retirement contributions, and effective hourly rate.
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">3. Share Your Comparison</h3>
            <p className="text-gray-700">
              Generate a shareable link to discuss with family, friends, or mentors. Your comparison data 
              is encoded in the URL for easy sharing.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">4. Make Your Decision</h3>
            <p className="text-gray-700">
              Use the total package value to make an informed decision. Remember to consider non-financial 
              factors like work-life balance, growth opportunities, and company culture.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          What to Consider When Comparing Jobs
        </h2>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Total Compensation vs Base Salary</h3>
          <p>
            Don't just look at base salary. A job with a lower base salary but better benefits, higher bonus potential, 
            or equity could be worth significantly more. Our calculator helps you see the complete picture.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Value Your Time Off</h3>
          <p>
            PTO has real monetary value. If one job offers 4 weeks of PTO versus 2 weeks, that's worth thousands of 
            dollars annually. Our calculator automatically values your PTO based on your salary.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Retirement Benefits Matter</h3>
          <p>
            A 6% 401k match versus 3% can mean tens of thousands of dollars over your career. Even a 1% difference 
            compounds significantly over time. Don't overlook retirement benefits when comparing offers.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Health Insurance Costs</h3>
          <p>
            If one employer covers 100% of health insurance while another requires you to pay $500/month, that's 
            $6,000 per year in additional compensation. Include these costs in your comparison.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Beyond the Numbers</h3>
          <p>
            While our calculator focuses on financial compensation, remember to consider: commute time, remote work 
            flexibility, career growth opportunities, company stability, team culture, and work-life balance. The 
            highest-paying job isn't always the best choice.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Related Calculators
        </h2>
        <RelatedCalculators currentPage="/compare/" />
      </section>
    </main>
  );
}

export default function ComparePageClient() {
  return (
    <Suspense fallback={
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Compare Job Offers
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
            Loading comparison tool...
          </p>
        </div>
      </main>
    }>
      <CompareContent />
    </Suspense>
  );
}
