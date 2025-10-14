import { TripBasicInfo, TripPreferences, TripPlan, DayItinerary, Hotel, TransportInfo } from '../types';
import { getWeatherInfo } from './weatherService';
import { calculateBudgetBreakdown } from './budgetService';

const destinationData: Record<string, any> = {
  paris: {
    attractions: [
      'Eiffel Tower',
      'Louvre Museum',
      'Notre-Dame Cathedral',
      'Arc de Triomphe',
      'Sacré-Cœur',
      'Versailles Palace',
      'Champs-Élysées',
      'Musée d\'Orsay',
    ],
    restaurants: [
      'Le Jules Verne',
      'L\'Ambroisie',
      'Septime',
      'Le Comptoir du Relais',
      'Café de Flore',
    ],
    foods: ['Croissants', 'Escargot', 'Coq au Vin', 'Crème Brûlée', 'French Onion Soup'],
    tips: [
      'Learn basic French phrases',
      'Buy museum passes in advance',
      'Validate metro tickets',
      'Avoid tourist traps near landmarks',
    ],
  },
  tokyo: {
    attractions: [
      'Senso-ji Temple',
      'Tokyo Skytree',
      'Shibuya Crossing',
      'Meiji Shrine',
      'Tsukiji Market',
      'Imperial Palace',
      'Akihabara',
      'Tokyo Tower',
    ],
    restaurants: [
      'Sukiyabashi Jiro',
      'Narisawa',
      'Ichiran Ramen',
      'Tsuta',
      'Gonpachi',
    ],
    foods: ['Sushi', 'Ramen', 'Tempura', 'Tonkatsu', 'Wagyu Beef'],
    tips: [
      'Get a Suica card for transportation',
      'Remove shoes when entering homes',
      'Cash is still preferred in many places',
      'Learn basic Japanese greetings',
    ],
  },
  'new york': {
    attractions: [
      'Statue of Liberty',
      'Central Park',
      'Times Square',
      'Empire State Building',
      'Brooklyn Bridge',
      'Metropolitan Museum of Art',
      'Broadway',
      '9/11 Memorial',
    ],
    restaurants: [
      'Le Bernardin',
      'Eleven Madison Park',
      'Peter Luger',
      'Katz\'s Delicatessen',
      'Joe\'s Pizza',
    ],
    foods: ['New York Pizza', 'Bagels', 'Hot Dogs', 'Cheesecake', 'Pastrami Sandwich'],
    tips: [
      'Use subway for transportation',
      'Walk between neighborhoods',
      'Book Broadway tickets in advance',
      'Tip 18-20% at restaurants',
    ],
  },
  london: {
    attractions: [
      'Big Ben',
      'Tower of London',
      'British Museum',
      'Buckingham Palace',
      'London Eye',
      'Tower Bridge',
      'Westminster Abbey',
      'Natural History Museum',
    ],
    restaurants: [
      'The Ledbury',
      'Dishoom',
      'Sketch',
      'Borough Market',
      'The Ivy',
    ],
    foods: ['Fish and Chips', 'Sunday Roast', 'Afternoon Tea', 'Bangers and Mash', 'Shepherd\'s Pie'],
    tips: [
      'Get an Oyster card for the Tube',
      'Stand on the right on escalators',
      'Book popular attractions online',
      'Tipping is optional but appreciated',
    ],
  },
};

function getDestinationInfo(destination: string) {
  const key = destination.toLowerCase();
  for (const [dest, info] of Object.entries(destinationData)) {
    if (key.includes(dest)) {
      return info;
    }
  }

  return {
    attractions: [
      'Historic Old Town',
      'National Museum',
      'City Center Square',
      'Local Market',
      'Scenic Viewpoint',
      'Cultural District',
      'Riverside Walk',
      'Art Gallery',
    ],
    restaurants: [
      'Local Fine Dining Restaurant',
      'Traditional Cuisine House',
      'Popular Street Food Market',
      'Riverside Bistro',
      'Historic Café',
    ],
    foods: ['Local Specialty Dish', 'Regional Delicacy', 'Traditional Dessert', 'Street Food Favorite'],
    tips: [
      'Research local customs beforehand',
      'Learn a few basic phrases',
      'Use public transportation when possible',
      'Respect local traditions',
    ],
  };
}

function isInternationalRoute(start: string, dest: string): boolean {
  const startLower = start.toLowerCase();
  const destLower = dest.toLowerCase();

  const countries: Record<string, string[]> = {
    usa: ['new york', 'los angeles', 'chicago', 'miami', 'san francisco', 'usa', 'america'],
    japan: ['tokyo', 'osaka', 'kyoto', 'japan'],
    france: ['paris', 'lyon', 'marseille', 'france'],
    uk: ['london', 'manchester', 'edinburgh', 'uk', 'united kingdom'],
    india: ['delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'india'],
    uae: ['dubai', 'abu dhabi', 'uae'],
    thailand: ['bangkok', 'phuket', 'thailand'],
    australia: ['sydney', 'melbourne', 'australia'],
  };

  let startCountry = '';
  let destCountry = '';

  for (const [country, cities] of Object.entries(countries)) {
    if (cities.some(city => startLower.includes(city))) startCountry = country;
    if (cities.some(city => destLower.includes(city))) destCountry = country;
  }

  return startCountry !== destCountry && startCountry !== '' && destCountry !== '';
}

function checkTransportFeasibility(
  startLocation: string,
  destination: string,
  mode: string
): TransportInfo {
  const isInternational = isInternationalRoute(startLocation, destination);

  if (mode === 'flight') {
    return {
      mode: 'Flight',
      feasible: true,
      estimatedCost: isInternational ? 600 : 250,
      duration: isInternational ? '8-12 hours' : '2-4 hours',
    };
  }

  if (mode === 'train' && isInternational) {
    return {
      mode: 'Train',
      feasible: false,
      alternatives: ['Flight'],
      estimatedCost: 0,
      duration: '',
      message: 'This transport mode is unavailable for your route. Try a flight or another feasible option.',
    };
  }

  if (mode === 'train') {
    return {
      mode: 'Train',
      feasible: true,
      estimatedCost: 150,
      duration: '4-8 hours',
    };
  }

  if (mode === 'bus' && isInternational) {
    return {
      mode: 'Bus',
      feasible: false,
      alternatives: ['Flight'],
      estimatedCost: 0,
      duration: '',
      message: 'This transport mode is unavailable for your route. Try a flight or another feasible option.',
    };
  }

  if (mode === 'bus') {
    return {
      mode: 'Bus',
      feasible: true,
      estimatedCost: 80,
      duration: '6-12 hours',
    };
  }

  return {
    mode: 'Flight',
    feasible: true,
    estimatedCost: 500,
    duration: '8 hours',
  };
}

function generateHotels(preference: string, budget: number, nights: number, destination: string): Hotel[] {
  const budgetPerNight = budget * 0.4 / nights;

  const allHotels: Hotel[] = [];

  const luxuryPrice = Math.min(budgetPerNight * 0.8, 400);
  allHotels.push({
    name: 'Grand Luxury Hotel',
    rating: 5,
    pricePerNight: Math.round(luxuryPrice),
    category: 'luxury',
    description: 'Five-star luxury with world-class amenities and exceptional service',
    nearbyAttractions: ['City Center', 'Shopping District', 'Fine Dining Area'],
    amenities: ['Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Room Service', 'Concierge', 'Valet Parking'],
    location: 'Prime City Center',
  });

  allHotels.push({
    name: 'Royal Palace Hotel',
    rating: 5,
    pricePerNight: Math.round(luxuryPrice * 0.95),
    category: 'luxury',
    description: 'Elegant accommodation with premium facilities and stunning views',
    nearbyAttractions: ['Historic District', 'Cultural Center', 'Upscale Shopping'],
    amenities: ['Free WiFi', 'Pool', 'Fine Dining', 'Spa', 'Business Center', 'Airport Shuttle'],
    location: 'Exclusive District',
  });

  const comfortPrice = Math.min(budgetPerNight * 0.7, 200);
  allHotels.push({
    name: 'Comfort Plaza Hotel',
    rating: 4,
    pricePerNight: Math.round(comfortPrice),
    category: 'comfort',
    description: 'Modern four-star hotel with excellent service and convenient location',
    nearbyAttractions: ['Main Attractions', 'Transport Hub', 'Shopping Area'],
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Gym', 'Meeting Rooms', 'Breakfast Included'],
    location: 'Central District',
  });

  allHotels.push({
    name: 'Downtown Suites',
    rating: 4,
    pricePerNight: Math.round(comfortPrice * 0.9),
    category: 'comfort',
    description: 'Stylish hotel in the heart of downtown with great amenities',
    nearbyAttractions: ['Business District', 'Entertainment Area', 'Restaurants'],
    amenities: ['Free WiFi', 'Kitchenette', 'Gym', 'Lounge', 'Daily Housekeeping'],
    location: 'Downtown Core',
  });

  const budgetPrice = Math.min(budgetPerNight * 0.6, 120);
  allHotels.push({
    name: 'City Budget Inn',
    rating: 3,
    pricePerNight: Math.round(budgetPrice),
    category: 'budget',
    description: 'Clean, comfortable budget accommodation with essential amenities',
    nearbyAttractions: ['Metro Station', 'Local Markets', 'Parks'],
    amenities: ['Free WiFi', 'Breakfast', 'Air Conditioning', '24/7 Front Desk'],
    location: 'Accessible Location',
  });

  allHotels.push({
    name: 'Smart Stay Hotel',
    rating: 3,
    pricePerNight: Math.round(budgetPrice * 0.85),
    category: 'budget',
    description: 'Great value hotel with modern amenities and friendly service',
    nearbyAttractions: ['Public Transport', 'Local Dining', 'Tourist Info Center'],
    amenities: ['Free WiFi', 'Self Check-in', 'Shared Kitchen', 'Laundry'],
    location: 'Transit-Friendly Area',
  });

  return allHotels.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return a.pricePerNight - b.pricePerNight;
  });
}

function generateDayItinerary(
  day: number,
  date: Date,
  destinationInfo: any
): DayItinerary {
  const attractionsPerDay = Math.min(3, destinationInfo.attractions.length);
  const startIdx = ((day - 1) * attractionsPerDay) % destinationInfo.attractions.length;

  return {
    day,
    date: date.toISOString().split('T')[0],
    activities: [
      `Morning: Breakfast and prepare for the day`,
      `Visit ${destinationInfo.attractions[startIdx] || 'local attraction'}`,
      `Lunch at a local restaurant`,
      `Explore ${destinationInfo.attractions[(startIdx + 1) % destinationInfo.attractions.length] || 'nearby area'}`,
      `Evening: ${destinationInfo.attractions[(startIdx + 2) % destinationInfo.attractions.length] || 'Leisure time'}`,
    ],
    attractions: [
      destinationInfo.attractions[startIdx],
      destinationInfo.attractions[(startIdx + 1) % destinationInfo.attractions.length],
      destinationInfo.attractions[(startIdx + 2) % destinationInfo.attractions.length],
    ].filter(Boolean),
    restaurants: [
      destinationInfo.restaurants[day % destinationInfo.restaurants.length],
      destinationInfo.restaurants[(day + 1) % destinationInfo.restaurants.length],
    ],
    localTips: destinationInfo.tips.slice(0, 2),
  };
}

export function generateTripPlan(
  basicInfo: TripBasicInfo,
  preferences: TripPreferences,
  userId: string
): TripPlan {
  const startDate = new Date(basicInfo.startDate);
  const endDate = new Date(basicInfo.endDate);
  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const days = nights + 1;

  const destinationInfo = getDestinationInfo(basicInfo.destination);
  const transportInfo = checkTransportFeasibility(
    basicInfo.startLocation,
    basicInfo.destination,
    basicInfo.transportMode
  );

  const hotels = generateHotels(preferences.hotelPreference, preferences.budget, nights, basicInfo.destination);

  const itinerary: DayItinerary[] = [];
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    itinerary.push(generateDayItinerary(i + 1, currentDate, destinationInfo));
  }

  const weather = getWeatherInfo(basicInfo.destination, basicInfo.startDate);

  const avgHotelPrice = hotels.reduce((sum, h) => sum + h.pricePerNight, 0) / hotels.length;
  const budgetBreakdown = calculateBudgetBreakdown({
    budget: preferences.budget,
    nights,
    transportCost: transportInfo.estimatedCost,
    hotelPricePerNight: avgHotelPrice,
    destination: basicInfo.destination,
  });

  return {
    id: Date.now().toString(),
    userId,
    basicInfo,
    preferences,
    itinerary,
    hotels,
    transportInfo,
    weather,
    budgetBreakdown,
    createdAt: new Date().toISOString(),
  };
}
