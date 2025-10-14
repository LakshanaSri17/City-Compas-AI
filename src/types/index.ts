export interface User {
  id: string;
  email: string;
  name: string;
}

export interface TripBasicInfo {
  destination: string;
  startLocation: string;
  startDate: string;
  endDate: string;
  transportMode: 'flight' | 'train' | 'bus' | '';
}

export interface TripPreferences {
  budget: number;
  ticketBooking: string;
  hotelPreference: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  activities: string[];
  attractions: string[];
  restaurants: string[];
  localTips: string[];
}

export interface TripPlan {
  id: string;
  userId: string;
  basicInfo: TripBasicInfo;
  preferences: TripPreferences;
  itinerary: DayItinerary[];
  hotels: Hotel[];
  transportInfo: TransportInfo;
  weather?: WeatherInfo;
  budgetBreakdown?: BudgetBreakdown;
  createdAt: string;
}

export interface Hotel {
  name: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  location: string;
  category: 'luxury' | 'comfort' | 'budget';
  description: string;
  nearbyAttractions: string[];
}

export interface TransportInfo {
  mode: string;
  feasible: boolean;
  alternatives?: string[];
  estimatedCost: number;
  duration: string;
  message?: string;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  humidity: number;
  packingTips: string[];
}

export interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  total: number;
  currency: string;
  localCurrencyTotal?: number;
  localCurrency?: string;
  budgetWarning?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
