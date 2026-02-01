'use client';

import { useState } from 'react';
import { calculateMultipleJobs, PartTimeJob } from '@/lib/partTimeCalculations';

export default function PartTimeCalculator() {
  const [jobs, setJobs] = useState<PartTimeJob[]>([
    { hourlyRate: 15, hoursPerWeek: 20, weeksPerYear: 52 },
  ]);

  const results = calculateMultipleJobs({ jobs });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const addJob = () => {
    setJobs([...jobs, { hourlyRate: 15, hoursPerWeek: 20, weeksPerYear: 52 }]);
  };

  const removeJob = (index: number) => {
    if (jobs.length > 1) {
      setJobs(jobs.filter((_, i) => i !== index));
    }
  };

  const updateJob = (index: number, field: keyof PartTimeJob, value: number) => {
    const newJobs = [...jobs];
    newJobs[index] = { ...newJobs[index], [field]: value };
    setJobs(newJobs);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Part-Time Income Calculator</h2>
        
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 sm:p-6 border-2 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Job {index + 1}
                </h3>
                {jobs.length > 1 && (
                  <button
                    onClick={() => removeJob(index)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hourly Rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={job.hourlyRate}
                      onChange={(e) => updateJob(index, 'hourlyRate', parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="15.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hours/Week
                  </label>
                  <input
                    type="number"
                    value={job.hoursPerWeek}
                    onChange={(e) => updateJob(index, 'hoursPerWeek', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weeks/Year
                  </label>
                  <input
                    type="number"
                    value={job.weeksPerYear}
                    onChange={(e) => updateJob(index, 'weeksPerYear', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="52"
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-300">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Annual:</span>
                    <span className="ml-2 font-bold text-gray-900">
                      {formatCurrency(results.jobBreakdown[index]?.annual || 0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Monthly:</span>
                    <span className="ml-2 font-bold text-gray-900">
                      {formatCurrency(results.jobBreakdown[index]?.monthly || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addJob}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all border-2 border-dashed border-gray-300"
          >
            + Add Another Job
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Total Combined Income</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Annual</div>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(results.totalAnnual)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Monthly</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.totalMonthly)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Weekly</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(results.totalWeekly)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Bi-Weekly</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(results.totalBiweekly)}</div>
          </div>
        </div>

        <div className="bg-blue-100 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-700 mb-1">Total Hours/Week</div>
              <div className="text-lg font-bold text-gray-900">{results.totalHoursPerWeek.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-gray-700 mb-1">Average Hourly Rate</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(results.averageHourlyRate)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
