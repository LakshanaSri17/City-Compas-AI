import { MapPin, Calendar, DollarSign, Hotel, Plane, Star, AlertCircle, Utensils, Lightbulb, Clock, Home, Cloud, Thermometer, Droplets } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { generateTripPlan } from '../utils/tripGenerator';
import ChatAssistant from './ChatAssistant';
import BudgetPlanner from './BudgetPlanner';

interface ItineraryPageProps {
  onNewTrip: () => void;
}

export default function ItineraryPage({ onNewTrip }: ItineraryPageProps) {
  const { basicInfo, preferences, currentPlan, setCurrentPlan, resetTrip } = useTrip();
  const { user } = useAuth();

  useEffect(() => {
    if (basicInfo && preferences && !currentPlan) {
      const userId = user?.id || 'guest';
      const plan = generateTripPlan(basicInfo, preferences, userId);
      setCurrentPlan(plan);
    }
  }, [basicInfo, preferences, user, currentPlan, setCurrentPlan]);

  if (!currentPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your perfect trip...</p>
        </div>
      </div>
    );
  }

  const handleNewTrip = () => {
    resetTrip();
    onNewTrip();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Your Trip to {currentPlan.basicInfo.destination}
          </h1>
          <button
            onClick={handleNewTrip}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <Home size={20} />
            <span>Plan New Trip</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="text-blue-500" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Journey</h3>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold">From:</span> {currentPlan.basicInfo.startLocation}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">To:</span> {currentPlan.basicInfo.destination}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="text-green-500" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Dates</h3>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold">Start:</span> {new Date(currentPlan.basicInfo.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">End:</span> {new Date(currentPlan.basicInfo.endDate).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="text-green-500" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Budget</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              ${currentPlan.preferences.budget.toLocaleString()}
            </p>
          </div>
        </div>

        {!currentPlan.transportInfo.feasible && currentPlan.transportInfo.message && (
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <AlertCircle className="text-orange-500 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-orange-800 mb-2">Transport Notice</h3>
                <p className="text-orange-700">
                  {currentPlan.transportInfo.message}
                </p>
                <p className="text-orange-700 mt-2">
                  Recommended alternative: {currentPlan.transportInfo.alternatives?.join(' or ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentPlan.transportInfo.feasible && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Plane className="text-blue-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Transport Details</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Mode</p>
                <p className="text-lg font-semibold text-gray-800">{currentPlan.transportInfo.mode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Cost</p>
                <p className="text-lg font-semibold text-gray-800">${currentPlan.transportInfo.estimatedCost}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-lg font-semibold text-gray-800">{currentPlan.transportInfo.duration}</p>
              </div>
            </div>
          </div>
        )}

        {currentPlan.weather && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Cloud className="text-cyan-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Weather & Packing Tips</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-3">
                <Thermometer className="text-orange-500" size={32} />
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-xl font-bold text-gray-800">{currentPlan.weather.temperature}°C</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Cloud className="text-blue-500" size={32} />
                <div>
                  <p className="text-sm text-gray-600">Condition</p>
                  <p className="text-xl font-bold text-gray-800">{currentPlan.weather.condition}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Droplets className="text-cyan-500" size={32} />
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-xl font-bold text-gray-800">{currentPlan.weather.humidity}%</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-2">Packing Suggestions</h3>
              <ul className="space-y-1">
                {currentPlan.weather.packingTips.map((tip, idx) => (
                  <li key={idx} className="text-blue-700 text-sm">• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {currentPlan.budgetBreakdown && (
          <div className="mb-8">
            <BudgetPlanner budget={currentPlan.budgetBreakdown} />
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Hotel className="text-orange-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Recommended Hotels</h2>
            </div>
            <div className="flex space-x-2 text-xs">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold">⭐ Sorted by Rating</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPlan.hotels.map((hotel, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{hotel.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      hotel.category === 'luxury' ? 'bg-purple-100 text-purple-700' :
                      hotel.category === 'comfort' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {hotel.category === 'luxury' ? 'Luxury' : hotel.category === 'comfort' ? 'Mid-Range' : 'Budget-Friendly'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{hotel.description}</p>

                <p className="text-sm text-gray-600 mb-3">
                  <MapPin size={14} className="inline mr-1" />
                  {hotel.location}
                </p>

                <p className="text-2xl font-bold text-blue-600 mb-3">
                  ${hotel.pricePerNight}
                  <span className="text-sm text-gray-600 font-normal">/night</span>
                </p>

                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-1">Nearby:</p>
                  <p className="text-xs text-gray-600">{hotel.nearbyAttractions.slice(0, 2).join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <Calendar className="text-blue-500" size={32} />
            <span>Day-by-Day Itinerary</span>
          </h2>

          {currentPlan.itinerary.map((day) => (
            <div key={day.day} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="border-l-4 border-blue-500 pl-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Day {day.day}</h3>
                <p className="text-gray-600">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="text-blue-500" size={20} />
                    <h4 className="font-bold text-gray-800">Activities</h4>
                  </div>
                  <ul className="space-y-2">
                    {day.activities.map((activity, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="text-green-500" size={20} />
                    <h4 className="font-bold text-gray-800">Top Attractions</h4>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {day.attractions.map((attraction, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {attraction}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center space-x-2 mb-3">
                    <Utensils className="text-orange-500" size={20} />
                    <h4 className="font-bold text-gray-800">Restaurants</h4>
                  </div>
                  <ul className="space-y-2">
                    {day.restaurants.map((restaurant, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {restaurant}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="text-blue-600" size={20} />
                  <h4 className="font-bold text-blue-800">Local Tips</h4>
                </div>
                <ul className="space-y-1">
                  {day.localTips.map((tip, idx) => (
                    <li key={idx} className="text-blue-700 text-sm">• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p>© 2025 Lakshana Sri S S</p>
        </footer>
      </div>

      <ChatAssistant destination={currentPlan.basicInfo.destination} />
    </div>
  );
}
