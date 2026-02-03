// Google Analytics event tracking utilities

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific tracking functions for common events
export const trackCalculatorUsage = (calculatorType: string, salary?: number) => {
  trackEvent('calculator_used', 'Calculator', calculatorType, salary);
};

export const trackCurrencyChange = (fromCurrency: string, toCurrency: string) => {
  trackEvent('currency_changed', 'Currency', `${fromCurrency}_to_${toCurrency}`);
};

export const trackInternalLinkClick = (linkType: string, destination: string) => {
  trackEvent('internal_link_click', 'Navigation', `${linkType}:${destination}`);
};

export const trackCalculatorInteraction = (
  calculatorType: string,
  interactionType: string
) => {
  trackEvent('calculator_interaction', 'Engagement', `${calculatorType}:${interactionType}`);
};

export const trackTimeOnCalculator = (calculatorType: string, seconds: number) => {
  trackEvent('time_on_calculator', 'Engagement', calculatorType, seconds);
};
