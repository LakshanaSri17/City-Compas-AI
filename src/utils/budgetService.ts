import { BudgetBreakdown } from '../types';
import { convertCurrency } from './currencyService';

interface BudgetParams {
  budget: number;
  nights: number;
  transportCost: number;
  hotelPricePerNight: number;
  destination: string;
}

export function calculateBudgetBreakdown(params: BudgetParams): BudgetBreakdown {
  const { budget, nights, transportCost, hotelPricePerNight, destination } = params;

  const accommodation = hotelPricePerNight * nights;
  const transport = transportCost;
  const remaining = budget - accommodation - transport;

  const food = Math.max(remaining * 0.5, nights * 50);
  const activities = Math.max(remaining * 0.5, nights * 40);

  const total = transport + accommodation + food + activities;

  const localConversion = convertCurrency(total, destination);

  let budgetWarning: string | undefined;

  const minRecommendedBudget = (transportCost + (hotelPricePerNight * nights) + (nights * 100));

  if (budget < minRecommendedBudget * 0.7) {
    budgetWarning = `Your budget seems too low for this location. We recommend at least $${Math.round(minRecommendedBudget)} for a comfortable trip.`;
  }

  return {
    transport: Math.round(transport),
    accommodation: Math.round(accommodation),
    food: Math.round(food),
    activities: Math.round(activities),
    total: Math.round(total),
    currency: 'USD',
    localCurrencyTotal: localConversion.amount,
    localCurrency: localConversion.currency,
    budgetWarning,
  };
}
