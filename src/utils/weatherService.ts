import { WeatherInfo } from '../types';

const weatherConditions = [
  { temp: [15, 25], condition: 'Mild', humidity: 60, season: 'spring' },
  { temp: [25, 35], condition: 'Warm', humidity: 50, season: 'summer' },
  { temp: [5, 15], condition: 'Cool', humidity: 70, season: 'fall' },
  { temp: [-5, 10], condition: 'Cold', humidity: 65, season: 'winter' },
];

const packingTipsByCondition: Record<string, string[]> = {
  'Warm': [
    'Pack light, breathable clothing',
    'Bring sunscreen and sunglasses',
    'Stay hydrated - carry a water bottle',
    'Wear comfortable walking shoes',
  ],
  'Hot': [
    'Pack very light cotton clothes',
    'Essential: High SPF sunscreen',
    'Wide-brimmed hat recommended',
    'Drink plenty of water',
  ],
  'Mild': [
    'Pack layers - weather may vary',
    'Light jacket for evenings',
    'Comfortable walking shoes',
    'Umbrella might be useful',
  ],
  'Cool': [
    'Bring warm layers and sweaters',
    'Pack a waterproof jacket',
    'Long pants and closed shoes',
    'Consider gloves and scarf',
  ],
  'Cold': [
    'Pack heavy winter coat',
    'Essential: Warm layers, thermal wear',
    'Winter boots, gloves, and hat',
    'Moisturizer for dry skin',
  ],
};

export function getWeatherInfo(destination: string, startDate: string): WeatherInfo {
  const date = new Date(startDate);
  const month = date.getMonth();

  let seasonIndex = 0;
  if (month >= 2 && month <= 4) seasonIndex = 0;
  else if (month >= 5 && month <= 8) seasonIndex = 1;
  else if (month >= 9 && month <= 10) seasonIndex = 2;
  else seasonIndex = 3;

  const destLower = destination.toLowerCase();
  if (destLower.includes('delhi') || destLower.includes('india')) {
    if (month >= 3 && month <= 6) seasonIndex = 1;
    else if (month >= 10 && month <= 2) seasonIndex = 2;
  }

  const weather = weatherConditions[seasonIndex];
  const avgTemp = (weather.temp[0] + weather.temp[1]) / 2;
  const condition = avgTemp > 30 ? 'Hot' : weather.condition;

  return {
    temperature: Math.round(avgTemp),
    condition,
    humidity: weather.humidity,
    packingTips: packingTipsByCondition[condition] || packingTipsByCondition['Mild'],
  };
}
