'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/salaryCalculations';
import { useCurrency } from '@/contexts/CurrencyContext';
import {
  getSalaryHistory,
  addSalaryEntry,
  updateSalaryEntry,
  deleteSalaryEntry,
  clearSalaryHistory,
  exportToCSV,
  importFromCSV,
  calculateStatistics,
  type SalaryEntry,
} from '@/lib/salaryHistoryStorage';
import { trackCalculatorUsage, trackCalculatorInteraction } from '@/lib/analytics';

export default function SalaryHistoryTracker() {
  const { currency } = useCurrency();
  const [entries, setEntries] = useState<SalaryEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    salary: '',
    jobTitle: '',
    company: '',
    notes: '',
  });

  useEffect(() => {
    const history = getSalaryHistory();
    setEntries(history.entries);
    trackCalculatorUsage('salary_history_tracker');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateSalaryEntry(editingId, {
        date: formData.date,
        salary: parseFloat(formData.salary) || 0,
        jobTitle: formData.jobTitle,
        company: formData.company,
        notes: formData.notes,
      });
      trackCalculatorInteraction('salary_history', 'updated_entry');
    } else {
      addSalaryEntry({
        date: formData.date,
        salary: parseFloat(formData.salary) || 0,
        jobTitle: formData.jobTitle,
        company: formData.company,
        notes: formData.notes,
      });
      trackCalculatorInteraction('salary_history', 'added_entry');
    }

    const history = getSalaryHistory();
    setEntries(history.entries);
    resetForm();
  };

  const handleEdit = (entry: SalaryEntry) => {
    setFormData({
      date: entry.date,
      salary: entry.salary.toString(),
      jobTitle: entry.jobTitle,
      company: entry.company,
      notes: entry.notes,
    });
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteSalaryEntry(id);
      const history = getSalaryHistory();
      setEntries(history.entries);
      trackCalculatorInteraction('salary_history', 'deleted_entry');
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all salary history? This cannot be undone.')) {
      clearSalaryHistory();
      setEntries([]);
      trackCalculatorInteraction('salary_history', 'cleared_all');
    }
  };

  const handleExport = () => {
    const csv = exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salary-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    trackCalculatorInteraction('salary_history', 'exported_csv');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvContent = event.target?.result as string;
      const importedEntries = importFromCSV(csvContent);
      
      if (importedEntries.length > 0) {
        const history = getSalaryHistory();
        history.entries = [...history.entries, ...importedEntries];
        history.entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        // Remove duplicates based on date and salary
        const unique = history.entries.filter((entry, index, self) =>
          index === self.findIndex(e => e.date === entry.date && e.salary === entry.salary)
        );
        history.entries = unique;
        
        const updatedHistory = getSalaryHistory();
        setEntries(updatedHistory.entries);
        trackCalculatorInteraction('salary_history', 'imported_csv');
        alert(`Imported ${importedEntries.length} entries successfully!`);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      salary: '',
      jobTitle: '',
      company: '',
      notes: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const stats = calculateStatistics(entries);

  return (
    <div className="space-y-8">
      {/* Statistics */}
      {entries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-600 mb-1">Total Earnings</div>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalEarnings, currency)}</div>
            <div className="text-xs text-gray-600 mt-1">Over {stats.yearsTracked.toFixed(1)} years</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-600 mb-1">Total Growth</div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalGrowth, currency)}
            </div>
            <div className="text-xs text-gray-600 mt-1">+{stats.totalGrowthPercent.toFixed(1)}%</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-600 mb-1">Avg Yearly Growth</div>
            <div className="text-2xl font-bold text-purple-600">
              {stats.averageYearlyGrowth.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600 mt-1">Per year</div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-600 mb-1">Highest Salary</div>
            <div className="text-2xl font-bold text-amber-600">{formatCurrency(stats.highestSalary, currency)}</div>
            <div className="text-xs text-gray-600 mt-1">Peak earnings</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          {showForm ? 'Cancel' : '+ Add Salary Entry'}
        </button>

        {entries.length > 0 && (
          <>
            <button
              onClick={handleExport}
              className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-semibold"
            >
              📥 Export CSV
            </button>

            <label className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-semibold cursor-pointer">
              📤 Import CSV
              <input
                type="file"
                accept=".csv"
                onChange={handleImport}
                className="hidden"
              />
            </label>

            <button
              onClick={handleClearAll}
              className="px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors font-semibold"
            >
              🗑️ Clear All
            </button>
          </>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {editingId ? 'Edit Salary Entry' : 'Add New Salary Entry'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">{currency.symbol}</span>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    required
                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  required
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Tech Corp"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
                placeholder="e.g., Promotion, job change, raise..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {editingId ? 'Update Entry' : 'Add Entry'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline */}
      {entries.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Salary Timeline</h3>
          
          <div className="space-y-4">
            {entries.map((entry, index) => {
              const prevEntry = entries[index - 1];
              const growth = prevEntry ? entry.salary - prevEntry.salary : 0;
              const growthPercent = prevEntry ? (growth / prevEntry.salary) * 100 : 0;

              return (
                <div key={entry.id} className="relative pl-8 pb-8 border-l-2 border-blue-200 last:border-l-0 last:pb-0">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</div>
                        <div className="text-2xl font-bold text-gray-900">{formatCurrency(entry.salary, currency)}</div>
                        {growth !== 0 && (
                          <div className={`text-sm font-semibold ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {growth > 0 ? '+' : ''}{formatCurrency(growth, currency)} ({growthPercent > 0 ? '+' : ''}{growthPercent.toFixed(1)}%)
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="px-3 py-1 text-sm border border-gray-300 text-red-600 rounded hover:border-red-500 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-semibold text-gray-700">Position:</span> {entry.jobTitle}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-gray-700">Company:</span> {entry.company}
                      </div>
                      {entry.notes && (
                        <div className="text-sm">
                          <span className="font-semibold text-gray-700">Notes:</span> {entry.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Salary History Yet</h3>
          <p className="text-gray-600 mb-4">
            Start tracking your salary journey to see your growth over time, calculate lifetime earnings, and visualize your career progression.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Add Your First Entry
          </button>
        </div>
      )}
    </div>
  );
}
