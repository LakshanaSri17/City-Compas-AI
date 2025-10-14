interface DestinationKnowledge {
  foods: string[];
  transportation: string[];
  tips: string[];
  attractions: string[];
}

const destinationKnowledge: Record<string, DestinationKnowledge> = {
  paris: {
    foods: ['Try authentic croissants at local boulangeries', 'Must-try: Escargot, Coq au Vin, and Crème Brûlée', 'Visit Le Marais for the best falafel', 'Don\'t miss the macarons at Ladurée'],
    transportation: ['Metro is the fastest way around', 'Buy a Paris Visite pass for unlimited travel', 'Velib bike-sharing is great for short distances', 'Uber and taxis are readily available'],
    tips: ['Learn basic French phrases - locals appreciate it', 'Visit museums on first Sunday of the month (free!)', 'Avoid restaurants directly around Eiffel Tower - overpriced', 'Book Eiffel Tower tickets online in advance'],
    attractions: ['Eiffel Tower opens at 9 AM', 'Louvre is closed on Tuesdays', 'Walk along Seine River at sunset', 'Visit Montmartre for stunning city views'],
  },
  tokyo: {
    foods: ['Best sushi at Tsukiji Outer Market', 'Try authentic ramen at Ichiran', 'Must-try: Wagyu beef and tempura', 'Visit depachika (department store basements) for food'],
    transportation: ['Get a Suica or Pasmo card immediately', 'JR Pass is great for long-distance travel', 'Trains stop running around midnight', 'Tokyo Metro is incredibly efficient'],
    tips: ['Cash is still king in many places', 'Remove shoes when entering homes and some restaurants', 'Tipping is not customary', 'Download Google Translate with offline Japanese'],
    attractions: ['Visit Senso-ji Temple early morning (6 AM)', 'Shibuya Crossing is busiest around 6-8 PM', 'Tokyo Skytree offers best views on clear days', 'Harajuku is best visited on weekends'],
  },
  london: {
    foods: ['Try authentic fish and chips at a local pub', 'Borough Market for amazing street food', 'Must-try: Sunday roast and afternoon tea', 'Indian food in Brick Lane is excellent'],
    transportation: ['Get an Oyster card for cheaper fares', 'Tube runs until midnight on weekdays', 'Night buses run 24/7', 'Walk between attractions - London is beautiful on foot'],
    tips: ['Stand on right side of escalators', 'Book West End show tickets at TKTS for discounts', 'Many museums are free', 'Tipping 10-15% at restaurants'],
    attractions: ['Tower of London opens at 9 AM', 'British Museum is free entry', 'Book London Eye tickets online', 'Visit Sky Garden for free panoramic views'],
  },
  delhi: {
    foods: ['Try street food at Chandni Chowk', 'Must-try: Butter chicken, biryani, and chaat', 'Visit Paranthe Wali Gali for parathas', 'Karim\'s for authentic Mughlai cuisine'],
    transportation: ['Delhi Metro is clean and efficient', 'Use Uber or Ola for taxis', 'Auto-rickshaws - always negotiate fare', 'Avoid peak hours (8-10 AM, 6-8 PM)'],
    tips: ['Dress modestly at religious sites', 'Bargain at local markets', 'Stay hydrated - Delhi can be very hot', 'Keep small bills for purchases'],
    attractions: ['Red Fort opens at 9:30 AM', 'India Gate is beautiful in evening', 'Visit Qutub Minar early morning', 'Lotus Temple is closed on Mondays'],
  },
};

function findDestinationMatch(query: string): string | null {
  const queryLower = query.toLowerCase();
  for (const dest of Object.keys(destinationKnowledge)) {
    if (queryLower.includes(dest)) {
      return dest;
    }
  }
  return null;
}

export function generateChatResponse(userMessage: string, destination: string): string {
  const messageLower = userMessage.toLowerCase();
  const destLower = destination.toLowerCase();

  let destKey = findDestinationMatch(destLower);
  if (!destKey) destKey = findDestinationMatch(messageLower);

  const knowledge = destKey ? destinationKnowledge[destKey] : null;

  if (messageLower.includes('food') || messageLower.includes('eat') || messageLower.includes('restaurant')) {
    if (knowledge) {
      return `Great question about food in ${destination}! Here are my recommendations:\n\n${knowledge.foods.map((f, i) => `${i + 1}. ${f}`).join('\n')}\n\nEnjoy your culinary adventure!`;
    }
    return `For food in ${destination}, I recommend trying local specialties, visiting popular food markets, and asking locals for their favorite spots. Street food is often authentic and delicious!`;
  }

  if (messageLower.includes('transport') || messageLower.includes('travel') || messageLower.includes('get around') || messageLower.includes('metro') || messageLower.includes('taxi')) {
    if (knowledge) {
      return `Here's how to get around ${destination}:\n\n${knowledge.transportation.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nHappy travels!`;
    }
    return `For transportation in ${destination}, I recommend using public transport where available, ride-sharing apps like Uber, or local taxis. Always check if there are tourist transport passes available!`;
  }

  if (messageLower.includes('tip') || messageLower.includes('advice') || messageLower.includes('should i know')) {
    if (knowledge) {
      return `Important tips for ${destination}:\n\n${knowledge.tips.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nHave a wonderful trip!`;
    }
    return `Here are some general tips for ${destination}: Research local customs, learn a few phrases in the local language, respect cultural norms, and always keep your belongings secure.`;
  }

  if (messageLower.includes('attraction') || messageLower.includes('visit') || messageLower.includes('see') || messageLower.includes('place')) {
    if (knowledge) {
      return `Must-know about attractions in ${destination}:\n\n${knowledge.attractions.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\nEnjoy exploring!`;
    }
    return `${destination} has many wonderful attractions! I recommend booking popular sites in advance, visiting early morning to avoid crowds, and checking opening hours before you go.`;
  }

  if (messageLower.includes('weather') || messageLower.includes('climate')) {
    return `I can see weather information for your trip in the main itinerary. Check the weather section for temperature, conditions, and packing tips specific to your travel dates!`;
  }

  if (messageLower.includes('budget') || messageLower.includes('cost') || messageLower.includes('expensive')) {
    return `I've prepared a detailed budget breakdown for your trip. You can find it in the Budget Planner section with costs for transport, accommodation, food, and activities. The total is shown in both USD and local currency!`;
  }

  if (messageLower.includes('hotel')) {
    return `I've recommended several hotels sorted by rating and price. You'll find luxury, mid-range, and budget-friendly options with descriptions, amenities, and nearby attractions. Check the Hotels section above!`;
  }

  return `I'm here to help with your trip to ${destination}! You can ask me about:\n\n• Best food and restaurants\n• Transportation options\n• Travel tips and local customs\n• Attractions and sightseeing\n• Weather and packing\n• Budget and costs\n\nWhat would you like to know?`;
}
