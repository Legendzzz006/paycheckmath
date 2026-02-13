'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyConfig, CURRENCIES, getCurrencyByCountry } from '@/lib/currencyConfig';

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrency: (currency: CurrencyConfig) => void;
  detectedCountry: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyConfig>(CURRENCIES.USD);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem('preferredCurrency');
      if (savedCurrency && CURRENCIES[savedCurrency]) {
        setCurrencyState(CURRENCIES[savedCurrency]);
        return;
      }
    } catch { }

    // Detect location via timezone only (no external API calls)
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const country = getCountryFromTimezone(timezone);
      if (country) {
        const detected = getCurrencyByCountry(country);
        setDetectedCountry(country);
        setCurrencyState(detected);
      }
    } catch { }
  }, []);

  const setCurrency = (newCurrency: CurrencyConfig) => {
    setCurrencyState(newCurrency);
    try { localStorage.setItem('preferredCurrency', newCurrency.code); } catch { }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, detectedCountry }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

function getCountryFromTimezone(timezone: string): string | null {
  const timezoneMap: Record<string, string> = {
    'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
    'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US',
    'Pacific/Honolulu': 'US', 'America/Toronto': 'CA', 'America/Vancouver': 'CA',
    'Europe/London': 'GB', 'Europe/Berlin': 'DE', 'Europe/Paris': 'FR',
    'Europe/Rome': 'IT', 'Europe/Madrid': 'ES', 'Europe/Amsterdam': 'NL',
    'Europe/Brussels': 'BE', 'Europe/Vienna': 'AT', 'Europe/Lisbon': 'PT',
    'Europe/Dublin': 'IE', 'Europe/Helsinki': 'FI', 'Europe/Athens': 'GR',
    'Europe/Stockholm': 'SE', 'Europe/Oslo': 'NO', 'Europe/Copenhagen': 'DK',
    'Europe/Zurich': 'CH', 'Asia/Tokyo': 'JP', 'Asia/Shanghai': 'CN',
    'Asia/Kolkata': 'IN', 'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU',
  };
  return timezoneMap[timezone] || null;
}
