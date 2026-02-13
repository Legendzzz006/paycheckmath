import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProfessionBySlug, getAllProfessionSlugs } from '@/lib/professionData';
import { formatCurrency } from '@/lib/salaryCalculations';
import { CURRENCIES } from '@/lib/currencyConfig';
import Calculator from '@/components/Calculator';
import RelatedCalculators from '@/components/RelatedCalculators';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const CURRENCY = CURRENCIES.USD;

export async function generateStaticParams() {
  const slugs = getAllProfessionSlugs();
  return slugs.map((slug) => ({
    profession: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ profession: string }> }): Promise<Metadata> {
  const { profession: professionSlug } = await params;
  const profession = getProfessionBySlug(professionSlug);

  if (!profession) {
    return {
      title: 'Profession Not Found',
    };
  }

  const title = `${profession.title} Salary 2026 - Average Pay & Hourly Rate`;
  const description = `${profession.title} median salary is ${formatCurrency(profession.medianSalary, CURRENCY)} per year (${formatCurrency(profession.hourlyMedian, CURRENCY)}/hour). See salary ranges, percentiles, and career outlook for ${profession.title.toLowerCase()}s.`;

  return {
    title,
    description,
    keywords: `${profession.title} salary, ${profession.title} pay, ${profession.title} hourly rate, ${profession.title} income, ${profession.category.toLowerCase()} salary`,
    alternates: {
      canonical: `https://paycheckmath.com/salary/${professionSlug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://paycheckmath.com/salary/${professionSlug}`,
    },
  };
}

export default async function ProfessionPage({ params }: { params: Promise<{ profession: string }> }) {
  const { profession: professionSlug } = await params;
  const profession = getProfessionBySlug(professionSlug);

  if (!profession) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Occupation',
    name: profession.title,
    description: profession.description,
    occupationLocation: {
      '@type': 'Country',
      name: 'United States',
    },
    estimatedSalary: [
      {
        '@type': 'MonetaryAmountDistribution',
        name: 'base',
        currency: 'USD',
        duration: 'P1Y',
        percentile10: profession.percentile25,
        percentile25: profession.percentile25,
        median: profession.medianSalary,
        percentile75: profession.percentile75,
        percentile90: profession.percentile90,
      },
    ],
    educationRequirements: profession.education,
    skills: profession.skills.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://paycheckmath.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Salary by Profession',
        item: 'https://paycheckmath.com/salary',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: profession.title,
        item: `https://paycheckmath.com/salary/${professionSlug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">$</span>
              </div>
              PaycheckMath.com
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
          {/* Hero Section */}
          <div className="mb-12">
            <nav className="text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/salary" className="hover:text-blue-600">Salary by Profession</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-semibold">{profession.title}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {profession.title} Salary 2026
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mb-8">
              {profession.description}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-600 mb-1">Median Salary</div>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(profession.medianSalary, CURRENCY)}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-600 mb-1">Hourly Rate</div>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(profession.hourlyMedian, CURRENCY)}/hr</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-600 mb-1">Top 10%</div>
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(profession.percentile90, CURRENCY)}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-600 mb-1">Job Outlook</div>
                <div className="text-sm font-bold text-amber-700 mt-2">{profession.outlook}</div>
              </div>
            </div>
          </div>

          {/* Salary Distribution */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {profession.title} Salary Distribution
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-sm font-semibold text-gray-700">25th %ile</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden" style={{ width: '400px' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{ width: `${(profession.percentile25 / profession.percentile90) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 w-32 text-right">{formatCurrency(profession.percentile25, CURRENCY)}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-sm font-semibold text-gray-700">Median</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden" style={{ width: '400px' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: `${(profession.medianSalary / profession.percentile90) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 w-32 text-right">{formatCurrency(profession.medianSalary, CURRENCY)}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-sm font-semibold text-gray-700">75th %ile</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden" style={{ width: '400px' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full" style={{ width: `${(profession.percentile75 / profession.percentile90) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 w-32 text-right">{formatCurrency(profession.percentile75, CURRENCY)}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-sm font-semibold text-gray-700">90th %ile</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden" style={{ width: '400px' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 w-32 text-right">{formatCurrency(profession.percentile90, CURRENCY)}</div>
                </div>
              </div>
            </div>

            <p className="text-gray-600">
              The salary distribution shows that 25% of {profession.title.toLowerCase()}s earn less than {formatCurrency(profession.percentile25, CURRENCY)},
              while the top 10% earn more than {formatCurrency(profession.percentile90, CURRENCY)} annually. The median salary of {formatCurrency(profession.medianSalary, CURRENCY)} represents
              the midpoint where half earn more and half earn less.
            </p>
          </section>

          {/* Career Information */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Career Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Education Requirements</h3>
                <p className="text-gray-700">{profession.education}</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Job Outlook</h3>
                <p className="text-gray-700">{profession.outlook}</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-6 md:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profession.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-white border border-purple-300 rounded-full text-sm font-semibold text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Calculator */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Calculate Your {profession.title} Salary
            </h2>
            <ErrorBoundary>
              <Calculator initialSalary={profession.medianSalary} />
            </ErrorBoundary>
          </section>

          {/* Detailed Analysis */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding {profession.title} Compensation
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Salary Breakdown</h3>
              <p>
                As a {profession.title.toLowerCase()}, your total compensation typically includes base salary, and may include bonuses,
                benefits, and other perks depending on your employer and experience level. The median annual salary of {formatCurrency(profession.medianSalary, CURRENCY)} translates
                to approximately {formatCurrency(profession.medianSalary / 12, CURRENCY)} per month or {formatCurrency(profession.hourlyMedian, CURRENCY)} per hour based on a standard
                2,080-hour work year.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Factors Affecting Salary</h3>
              <p>
                Several factors influence {profession.title.toLowerCase()} salaries:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Experience Level:</strong> Entry-level positions typically start near the 25th percentile ({formatCurrency(profession.percentile25, CURRENCY)}),
                  while senior professionals can earn in the 75th-90th percentile range ({formatCurrency(profession.percentile75, CURRENCY)}-{formatCurrency(profession.percentile90, CURRENCY)}).</li>
                <li><strong>Location:</strong> Salaries vary significantly by geographic location, with major metropolitan areas typically offering 20-40% higher compensation.</li>
                <li><strong>Company Size:</strong> Larger organizations often provide higher base salaries and more comprehensive benefits packages.</li>
                <li><strong>Industry:</strong> Different industries value {profession.title.toLowerCase()} skills differently, leading to salary variations.</li>
                <li><strong>Education & Certifications:</strong> Advanced degrees and professional certifications can increase earning potential by 15-30%.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900">Career Growth Potential</h3>
              <p>
                The career outlook for {profession.title.toLowerCase()}s is {profession.outlook.toLowerCase()}. This profession offers strong opportunities
                for advancement, with experienced professionals often moving into senior or specialized roles that command salaries in the top percentiles.
              </p>

              <h3 className="text-2xl font-bold text-gray-900">Benefits & Total Compensation</h3>
              <p>
                Beyond base salary, {profession.title.toLowerCase()}s typically receive benefits worth 20-30% of their base salary, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Health, dental, and vision insurance</li>
                <li>401(k) retirement plans with employer matching (typically 3-6%)</li>
                <li>Paid time off (2-4 weeks annually)</li>
                <li>Professional development and training opportunities</li>
                <li>Performance bonuses and profit sharing</li>
              </ul>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Salary Calculators
            </h2>
            <RelatedCalculators currentPage={`/salary/${professionSlug}/`} />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
