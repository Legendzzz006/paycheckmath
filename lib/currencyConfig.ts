export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  locale: string;
  exchangeRate: number; // Rate to USD
  taxRate: number; // Average tax rate for the country
  workingHoursPerWeek: number;
  workingWeeksPerYear: number;
  paidTimeOffWeeks: number;
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
    exchangeRate: 1,
    taxRate: 0.22,
    workingHoursPerWeek: 40,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 2,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'de-DE',
    exchangeRate: 0.92,
    taxRate: 0.40,
    workingHoursPerWeek: 40,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 4,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    locale: 'en-GB',
    exchangeRate: 0.79,
    taxRate: 0.32,
    workingHoursPerWeek: 40,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 4,
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    locale: 'en-CA',
    exchangeRate: 1.35,
    taxRate: 0.28,
    workingHoursPerWeek: 40,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 2,
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    locale: 'en-AU',
    exchangeRate: 1.52,
    taxRate: 0.30,
    workingHoursPerWeek: 38,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 4,
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF',
    name: 'Swiss Franc',
    locale: 'de-CH',
    exchangeRate: 0.88,
    taxRate: 0.25,
    workingHoursPerWeek: 42,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 4,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    locale: 'ja-JP',
    exchangeRate: 149.50,
    taxRate: 0.33,
    workingHoursPerWeek: 40,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 2,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    locale: 'en-IN',
    exchangeRate: 83.12,
    taxRate: 0.20,
    workingHoursPerWeek: 48,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 2,
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
    locale: 'zh-CN',
    exchangeRate: 7.24,
    taxRate: 0.25,
    workingHoursPerWeek: 40,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 2,
  },
  SEK: {
    code: 'SEK',
    symbol: 'kr',
    name: 'Swedish Krona',
    locale: 'sv-SE',
    exchangeRate: 10.35,
    taxRate: 0.42,
    workingHoursPerWeek: 40,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 5,
  },
  NOK: {
    code: 'NOK',
    symbol: 'kr',
    name: 'Norwegian Krone',
    locale: 'nb-NO',
    exchangeRate: 10.68,
    taxRate: 0.38,
    workingHoursPerWeek: 37.5,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 5,
  },
  DKK: {
    code: 'DKK',
    symbol: 'kr',
    name: 'Danish Krone',
    locale: 'da-DK',
    exchangeRate: 6.87,
    taxRate: 0.45,
    workingHoursPerWeek: 37,
    workingWeeksPerYear: 52,
    paidTimeOffWeeks: 5,
  },
};

// Country to currency mapping
export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  IE: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  GB: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  CH: 'CHF',
  JP: 'JPY',
  IN: 'INR',
  CN: 'CNY',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
};

export function getCurrencyByCountry(countryCode: string): CurrencyConfig {
  const currencyCode = COUNTRY_TO_CURRENCY[countryCode] || 'USD';
  return CURRENCIES[currencyCode];
}

export function formatCurrencyWithConfig(amount: number, config: CurrencyConfig): string {
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.code === 'JPY' ? 0 : 2,
    maximumFractionDigits: config.code === 'JPY' ? 0 : 2,
  }).format(amount);
}

export function formatNumberWithLocale(num: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(num);
}
