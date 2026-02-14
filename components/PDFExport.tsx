'use client';

interface PDFExportProps {
    title: string;
    subtitle?: string;
    data: Record<string, string>;
    inputs?: Record<string, string>;
    tableData?: { headers: string[]; rows: string[][] };
    accentColor?: string;
}

export default function PDFExport({ title, subtitle, data, inputs, tableData, accentColor = '#2563eb' }: PDFExportProps) {
    const handleExport = () => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const inputsHTML = inputs ? `
            <div class="section">
                <div class="section-title">Calculation Inputs</div>
                <div class="inputs-grid">
                    ${Object.entries(inputs).map(([k, v]) => `
                        <div class="input-item">
                            <span class="input-label">${k}</span>
                            <span class="input-value">${v}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        const resultsHTML = `
            <div class="section">
                <div class="section-title">Results</div>
                <div class="results-grid">
                    ${Object.entries(data).map(([k, v], i) => `
                        <div class="result-card ${i === 0 ? 'primary' : ''}">
                            <div class="result-label">${k}</div>
                            <div class="result-value">${v}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const tableHTML = tableData ? `
            <div class="section">
                <div class="section-title">Detailed Breakdown</div>
                <table>
                    <thead>
                        <tr>${tableData.headers.map(h => `<th>${h}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${tableData.rows.map(row => `
                            <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        ` : '';

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title} — PaycheckMath.com</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            color: #1e293b;
            background: #ffffff;
            line-height: 1.6;
        }

        .page {
            max-width: 700px;
            margin: 0 auto;
            padding: 40px;
        }

        /* Header */
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 24px;
            border-bottom: 3px solid ${accentColor};
            margin-bottom: 32px;
        }
        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .brand-icon {
            width: 44px;
            height: 44px;
            background: ${accentColor};
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 22px;
            font-weight: 800;
        }
        .brand-text {
            font-size: 20px;
            font-weight: 700;
            color: #0f172a;
        }
        .brand-tagline {
            font-size: 11px;
            color: #64748b;
            font-weight: 500;
        }
        .header-meta {
            text-align: right;
            font-size: 12px;
            color: #64748b;
        }
        .header-meta span {
            display: block;
        }

        /* Title */
        .doc-title {
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 4px;
            letter-spacing: -0.02em;
        }
        .doc-subtitle {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 28px;
        }

        /* Sections */
        .section {
            margin-bottom: 28px;
        }
        .section-title {
            font-size: 13px;
            font-weight: 700;
            color: ${accentColor};
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 14px;
            padding-bottom: 6px;
            border-bottom: 1px solid #e2e8f0;
        }

        /* Inputs */
        .inputs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 10px;
        }
        .input-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 10px 14px;
        }
        .input-label {
            font-size: 12px;
            color: #64748b;
            font-weight: 500;
        }
        .input-value {
            font-size: 14px;
            font-weight: 600;
            color: #0f172a;
        }

        /* Results */
        .results-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        .result-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 16px 18px;
            border-left: 4px solid #cbd5e1;
        }
        .result-card.primary {
            background: linear-gradient(135deg, ${accentColor}08, ${accentColor}14);
            border-left-color: ${accentColor};
        }
        .result-label {
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 4px;
        }
        .result-value {
            font-size: 22px;
            font-weight: 700;
            color: #0f172a;
        }
        .result-card.primary .result-value {
            color: ${accentColor};
        }

        /* Table */
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }
        thead th {
            background: #f1f5f9;
            padding: 10px 12px;
            text-align: left;
            font-weight: 600;
            color: #475569;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            border-bottom: 2px solid #e2e8f0;
        }
        tbody td {
            padding: 8px 12px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
        }
        tbody tr:nth-child(even) {
            background: #fafbfc;
        }

        /* Footer */
        .footer {
            margin-top: 36px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .footer-left {
            font-size: 11px;
            color: #94a3b8;
            line-height: 1.5;
        }
        .footer-right {
            text-align: right;
        }
        .footer-url {
            font-size: 14px;
            font-weight: 700;
            color: ${accentColor};
        }
        .footer-cta {
            font-size: 11px;
            color: #64748b;
            margin-top: 2px;
        }

        /* Disclaimer */
        .disclaimer {
            margin-top: 20px;
            padding: 12px 16px;
            background: #fffbeb;
            border: 1px solid #fde68a;
            border-radius: 8px;
            font-size: 10px;
            color: #92400e;
            line-height: 1.5;
        }

        @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .page { padding: 20px 30px; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="brand">
                <div class="brand-icon">$</div>
                <div>
                    <div class="brand-text">PaycheckMath.com</div>
                    <div class="brand-tagline">Free Salary &amp; Pay Calculators</div>
                </div>
            </div>
            <div class="header-meta">
                <span>${dateStr}</span>
                <span>${timeStr}</span>
            </div>
        </div>

        <div class="doc-title">${title}</div>
        ${subtitle ? `<div class="doc-subtitle">${subtitle}</div>` : '<div style="margin-bottom:24px"></div>'}

        ${inputsHTML}
        ${resultsHTML}
        ${tableHTML}

        <div class="disclaimer">
            ⚠️ <strong>Disclaimer:</strong> These calculations are estimates based on gross pay before taxes and deductions. 
            Actual take-home pay will vary. This report is for informational purposes only and does not constitute financial advice.
        </div>

        <div class="footer">
            <div class="footer-left">
                Generated by PaycheckMath.com<br>
                This report is free for personal use.
            </div>
            <div class="footer-right">
                <div class="footer-url">paycheckmath.com</div>
                <div class="footer-cta">Free salary calculators for everyone</div>
            </div>
        </div>
    </div>

    <script>
        window.onload = function() {
            window.print();
            window.onafterprint = function() { window.close(); };
        };
    </script>
</body>
</html>`;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(html);
            printWindow.document.close();
        }
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors no-print"
            aria-label={`Export ${title} as PDF`}
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
        </button>
    );
}
