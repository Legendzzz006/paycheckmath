'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import { 
  JobOffer, 
  calculateJobValue, 
  createDefaultJob, 
  generateShareableUrl,
  decodeComparison 
} from '@/lib/comparisonUtils';
import { trackCalculatorUsage, trackCalculatorInteraction } from '@/lib/analytics';

interface Props {
  initialData?: string; // Encoded comparison data from URL
}

export default function EnhancedComparisonCalculator({ initialData }: Props) {
  const { currency } = useCurrency();
  const [jobs, setJobs] = useState<JobOffer[]>([
    createDefaultJob('job1', 'Job Offer A'),
    createDefaultJob('job2', 'Job Offer B'),
  ]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Load data from URL if provided
  useEffect(() => {
    if (initialData) {
      const decoded = decodeComparison(initialData);
      if (decoded && decoded.length > 0) {
        setJobs(decoded);
      }
    }
    trackCalculatorUsage('enhanced_comparison_calculator');
  }, [initialData]);

  const updateJob = (index: number, field: keyof JobOffer, value: string | number) => {
    const newJobs = [...jobs];
    if (typeof value === 'string') {
      const numValue = parseFloat(value) || 0;
      newJobs[index] = { ...newJobs[index], [field]: numValue };
    } else {
      newJobs[index] = { ...newJobs[index], [field]: value };
    }
    setJobs(newJobs);
    trackCalculatorInteraction('comparison_calculator', `updated_${field}`);
  };

  const addJob = () => {
    if (jobs.length < 3) {
      setJobs([...jobs, createDefaultJob(`job${jobs.length + 1}`, `Job Offer ${String.fromCharCode(65 + jobs.length)}`)]);
      trackCalculatorInteraction('comparison_calculator', 'added_job');
    }
  };

  const removeJob = (index: number) => {
    if (jobs.length > 2) {
      setJobs(jobs.filter((_, i) => i !== index));
      trackCalculatorInteraction('comparison_calculator', 'removed_job');
    }
  };

  const handleShare = () => {
    const url = generateShareableUrl(jobs);
    setShareUrl(url);
    setShowShareModal(true);
    trackCalculatorInteraction('comparison_calculator', 'opened_share');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackCalculatorInteraction('comparison_calculator', 'copied_link');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const results = jobs.map(job => calculateJobValue(job));
  const bestJobIndex = results.reduce((best, current, index) => 
    current.totalComp + current.totalBenefitsValue > results[best].totalComp + results[best].totalBenefitsValue ? index : best
  , 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compare Job Offers</h2>
          <p className="text-gray-600 mt-1">Compare up to 3 job offers including salary, benefits, and total compensation</p>
        </div>
        <button
          onClick={handleShare}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Comparison
        </button>
      </div>

      {/* Job Input Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div key={job.id} className={`bg-white border-2 rounded-xl p-6 shadow-sm ${index === bestJobIndex ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={job.title}
                onChange={(e) => updateJob(index, 'title', e.target.value)}
                className="text-lg font-bold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
              />
              {jobs.length > 2 && (
                <button
                  onClick={() => removeJob(index)}
                  className="text-red-600 hover:text-red-700"
                  aria-label="Remove job"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {index === bestJobIndex && (
              <div className="mb-4 px-3 py-2 bg-green-100 border border-green-300 rounded-lg text-sm font-semibold text-green-800">
                🏆 Best Total Value
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Base Salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">{currency.symbol}</span>
                  <input
                    type="number"
                    value={job.salary || ''}
                    onChange={(e) => updateJob(index, 'salary', e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Bonus</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 text-sm">{currency.symbol}</span>
                    <input
                      type="number"
                      value={job.bonus || ''}
                      onChange={(e) => updateJob(index, 'bonus', e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Equity</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 text-sm">{currency.symbol}</span>
                    <input
                      type="number"
                      value={job.equity || ''}
                      onChange={(e) => updateJob(index, 'equity', e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">PTO (weeks)</label>
                  <input
                    type="number"
                    value={job.pto || ''}
                    onChange={(e) => updateJob(index, 'pto', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">401k Match %</label>
                  <input
                    type="number"
                    value={job.retirement401k || ''}
                    onChange={(e) => updateJob(index, 'retirement401k', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    step="0.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Health Insurance Value</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 text-sm">{currency.symbol}</span>
                  <input
                    type="number"
                    value={job.healthInsurance || ''}
                    onChange={(e) => updateJob(index, 'healthInsurance', e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Other Benefits</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 text-sm">{currency.symbol}</span>
                  <input
                    type="number"
                    value={job.otherBenefits || ''}
                    onChange={(e) => updateJob(index, 'otherBenefits', e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {jobs.length < 3 && (
        <button
          onClick={addJob}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-semibold"
        >
          + Add Another Job Offer
        </button>
      )}

      {/* Comparison Results */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Total Compensation Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Metric</th>
                {jobs.map((job, index) => (
                  <th key={job.id} className={`text-right py-3 px-4 font-semibold ${index === bestJobIndex ? 'text-green-600' : 'text-gray-700'}`}>
                    {job.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">Base Salary</td>
                {jobs.map(job => (
                  <td key={job.id} className="py-3 px-4 text-right text-gray-900">{formatCurrency(job.salary, currency)}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">Total Cash Comp</td>
                {results.map((result, index) => (
                  <td key={jobs[index].id} className="py-3 px-4 text-right font-semibold text-gray-900">{formatCurrency(result.totalComp, currency)}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">PTO Value</td>
                {results.map((result, index) => (
                  <td key={jobs[index].id} className="py-3 px-4 text-right text-gray-600">{formatCurrency(result.ptoValue, currency)}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">401k Match Value</td>
                {results.map((result, index) => (
                  <td key={jobs[index].id} className="py-3 px-4 text-right text-gray-600">{formatCurrency(result.retirementValue, currency)}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">Total Benefits</td>
                {results.map((result, index) => (
                  <td key={jobs[index].id} className="py-3 px-4 text-right font-semibold text-gray-900">{formatCurrency(result.totalBenefitsValue, currency)}</td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-4 font-bold text-gray-900">Total Package Value</td>
                {results.map((result, index) => (
                  <td key={jobs[index].id} className={`py-3 px-4 text-right font-bold text-lg ${index === bestJobIndex ? 'text-green-600' : 'text-gray-900'}`}>
                    {formatCurrency(result.totalComp + result.totalBenefitsValue, currency)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">Effective Hourly Rate</td>
                {results.map((result, index) => (
                  <td key={jobs[index].id} className="py-3 px-4 text-right text-gray-600">{formatCurrency(result.effectiveHourly, currency)}/hr</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Share Your Comparison</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">Share this comparison with others or save it for later:</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-sm text-gray-700 break-all">{shareUrl}</code>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
