# Multi-Currency System Documentation

## Overview

The salary calculator now supports automatic location detection and multi-currency functionality, providing a personalized experience for users worldwide.

## Features

### 1. Automatic Location Detection
- **Timezone-based detection**: Fast, privacy-friendly detection using browser timezone
- **IP-based geolocation**: Fallback to IP geolocation API for accurate country detection
- **Graceful fallback**: Defaults to USD if detection fails

### 2. Supported Currencies

The system currently supports 12 major currencies:

| Currency | Code | Countries |
|----------|------|-----------|
| US Dollar | USD | United States |
| Euro | EUR | Germany, France, Italy, Spain, Netherlands, Belgium, Austria, Portugal, Ireland, Finland, Greece |
| British Pound | GBP | United Kingdom |
| Canadian Dollar | CAD | Canada |
| Australian Dollar | AUD | Australia |
| Swiss Franc | CHF | Switzerland |
| Japanese Yen | JPY | Japan |
| Indian Rupee | INR | India |
| Chinese Yuan | CNY | China |
| Swedish Krona | SEK | Sweden |
| Norwegian Krone | NOK | Norway |
| Danish Krone | DKK | Denmark |

### 3. Country-Specific Defaults

Each currency includes localized defaults:
- Working hours per week
- Working weeks per year
- Paid time off weeks
- Average tax rates

### 4. Currency Selector

Users can manually override the detected currency using the currency selector dropdown available on all calculator pages.

## Implementation Details

### Core Files

1. **`lib/currencyConfig.ts`**
   - Currency definitions and configurations
   - Country-to-currency mapping
   - Formatting utilities

2. **`contexts/CurrencyContext.tsx`**
   - React context for currency state management
   - Location detection logic
   - LocalStorage persistence

3. **`components/CurrencySelector.tsx`**
   - UI component for manual currency selection
   - Displays current currency and available options

### Usage in Components

All calculator components have been updated to use the currency context:

```typescript
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/lib/salaryCalculations';

function MyCalculator() {
  const { currency } = useCurrency();
  
  // Use currency symbol in inputs
  <span>{currency.symbol}</span>
  
  // Format currency values
  {formatCurrency(amount, currency)}
}
```

### Updated Components

All calculator components now support multi-currency:
- Calculator.tsx (main salary calculator)
- BiweeklyCalculator.tsx
- MonthlyCalculator.tsx
- OvertimeCalculator.tsx
- PartTimeCalculator.tsx
- RaiseCalculator.tsx
- TakeHomeCalculator.tsx
- ComparisonCalculator.tsx
- SalaryBreakdownTable.tsx

## Adding New Currencies

To add a new currency:

1. Add currency configuration to `CURRENCIES` in `lib/currencyConfig.ts`:

```typescript
MXN: {
  code: 'MXN',
  symbol: '$',
  name: 'Mexican Peso',
  locale: 'es-MX',
  exchangeRate: 17.5, // Rate to USD
  taxRate: 0.30,
  workingHoursPerWeek: 48,
  workingWeeksPerYear: 52,
  paidTimeOffWeeks: 1,
}
```

2. Add country mapping to `COUNTRY_TO_CURRENCY`:

```typescript
MX: 'MXN',
```

3. (Optional) Add timezone mapping in `CurrencyContext.tsx`:

```typescript
'America/Mexico_City': 'MX',
```

## User Experience

1. **First Visit**: System detects user location and sets appropriate currency
2. **Subsequent Visits**: User's currency preference is saved in localStorage
3. **Manual Override**: Users can change currency anytime using the selector
4. **Consistent Experience**: Currency choice persists across all calculator pages

## Privacy & Performance

- Timezone detection is instant and privacy-friendly (no external API calls)
- IP geolocation is used as fallback with 3-second timeout
- User preference is stored locally (no server-side tracking)
- No personal data is collected or transmitted

## Future Enhancements

Potential improvements:
- Real-time exchange rate updates via API
- More granular tax calculations per region
- Additional currencies for more countries
- Currency conversion calculator
- Historical exchange rate data
