import { MetadataRoute } from 'next';
import { popularSalaries } from '@/lib/salaryData';
import { STATE_SLUGS } from '@/lib/stateData';
import { getAllProfessionSlugs } from '@/lib/professionData';

export const dynamic = 'force-static';

// Use a fixed date for lastModified to avoid changing on every build
// Update this date manually when you make significant content changes
const LAST_CONTENT_UPDATE = new Date('2026-02-03');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://paycheckmath.com';
  
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/salary-to-hourly/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/overtime-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biweekly-paycheck-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/take-home-pay-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/monthly-income-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/part-time-salary-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/salary-comparison-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/raise-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/negotiation-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cost-of-living-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/salary-history/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/freelance-rate-calculator/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/salary-timeline/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  const salaryPages = popularSalaries.map((salary) => ({
    url: `${baseUrl}/${salary}-a-year-is-how-much-an-hour/`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // State-specific salary pages (top 10 salaries × 50 states = 500 pages)
  const topSalaries = [50000, 60000, 70000, 75000, 80000, 90000, 100000, 120000, 150000, 200000];
  const statePages = topSalaries.flatMap((salary) =>
    STATE_SLUGS.map((state) => ({
      url: `${baseUrl}/salary-in/${salary}-${state}/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // Profession salary pages (40+ pages)
  const professionSlugs = getAllProfessionSlugs();
  const professionPages = professionSlugs.map((slug) => ({
    url: `${baseUrl}/salary/${slug}/`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...salaryPages, ...statePages, ...professionPages];
}
