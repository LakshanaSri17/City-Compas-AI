interface CurrencyInfo {
  code: string;
  rate: number;
}

const currencyByDestination: Record<string, CurrencyInfo> = {
  paris: { code: 'EUR', rate: 0.92 },
  france: { code: 'EUR', rate: 0.92 },
  tokyo: { code: 'JPY', rate: 149.5 },
  japan: { code: 'JPY', rate: 149.5 },
  london: { code: 'GBP', rate: 0.79 },
  'united kingdom': { code: 'GBP', rate: 0.79 },
  uk: { code: 'GBP', rate: 0.79 },
  'new york': { code: 'USD', rate: 1.0 },
  usa: { code: 'USD', rate: 1.0 },
  america: { code: 'USD', rate: 1.0 },
  delhi: { code: 'INR', rate: 83.2 },
  india: { code: 'INR', rate: 83.2 },
  dubai: { code: 'AED', rate: 3.67 },
  uae: { code: 'AED', rate: 3.67 },
  sydney: { code: 'AUD', rate: 1.52 },
  australia: { code: 'AUD', rate: 1.52 },
  singapore: { code: 'SGD', rate: 1.34 },
  bangkok: { code: 'THB', rate: 35.8 },
  thailand: { code: 'THB', rate: 35.8 },
};

export function getCurrencyForDestination(destination: string): CurrencyInfo {
  const destLower = destination.toLowerCase();

  for (const [key, value] of Object.entries(currencyByDestination)) {
    if (destLower.includes(key)) {
      return value;
    }
  }

  return { code: 'USD', rate: 1.0 };
}

export function convertCurrency(amountUSD: number, destination: string): { amount: number; currency: string } {
  const currencyInfo = getCurrencyForDestination(destination);
  return {
    amount: Math.round(amountUSD * currencyInfo.rate),
    currency: currencyInfo.code,
  };
}
