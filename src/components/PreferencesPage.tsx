import { useState } from 'react';
import { DollarSign, Ticket, Hotel, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { TripPreferences } from '../types';

interface PreferencesPageProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PreferencesPage({ onNext, onBack }: PreferencesPageProps) {
  const { setPreferences } = useTrip();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<TripPreferences>({
    budget: 0,
    ticketBooking: '',
    hotelPreference: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPreferences(formData);

    setTimeout(() => {
      setLoading(false);
      onNext();
    }, 1500);
  };

  const hotelOptions = [
    { value: 'luxury', label: 'Luxury', desc: '5-star hotels with premium amenities' },
    { value: 'comfort', label: 'Comfort', desc: '4-star hotels with great service' },
    { value: 'budget', label: 'Budget', desc: '3-star hotels, best value' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Trip Preferences
          </h1>
          <p className="text-lg text-gray-600">
            Help us customize your perfect journey
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <DollarSign className="mr-2 text-green-500" size={24} />
                What's your budget?
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Enter your total budget"
                  value={formData.budget || ''}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                  required
                  min="0"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Include accommodation, transport, food, and activities
              </p>
            </div>

            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-3">
                <Ticket className="mr-2 text-blue-500" size={24} />
                Ticket Booking Preferences
              </label>
              <select
                value={formData.ticketBooking}
                onChange={(e) => setFormData({ ...formData, ticketBooking: e.target.value })}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                required
              >
                <option value="">Select booking preference</option>
                <option value="direct">Direct Booking (Non-stop)</option>
                <option value="flexible">Flexible (1-2 stops allowed)</option>
                <option value="cheapest">Cheapest Option</option>
                <option value="fastest">Fastest Route</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-gray-700 font-semibold mb-4">
                <Hotel className="mr-2 text-orange-500" size={24} />
                Hotel Preferences
              </label>
              <div className="space-y-3">
                {hotelOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, hotelPreference: option.value })}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      formData.hotelPreference === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-5 h-5 rounded-full border-2 mt-1 mr-3 flex items-center justify-center ${
                        formData.hotelPreference === option.value
                          ? 'border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.hotelPreference === option.value && (
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold text-lg hover:bg-gray-300 transition-all flex items-center justify-center space-x-2"
              >
                <ArrowLeft size={24} />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span>Generating Trip...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Trip</span>
                    <ArrowRight size={24} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p>© 2025 Lakshana Sri S S</p>
        </footer>
      </div>
    </div>
  );
}
