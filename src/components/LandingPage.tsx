import { useState } from 'react';
import { MapPin, Calendar, Plane, Train, Bus, ArrowRight, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';
import { TripBasicInfo } from '../types';
import AuthModal from './AuthModal';

interface LandingPageProps {
  onNext: () => void;
}

export default function LandingPage({ onNext }: LandingPageProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const { setBasicInfo } = useTrip();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [formData, setFormData] = useState<TripBasicInfo>({
    destination: '',
    startLocation: '',
    startDate: '',
    endDate: '',
    transportMode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBasicInfo(formData);
    onNext();
  };

  const transportOptions = [
    { value: 'flight', label: 'Flight', icon: Plane },
    { value: 'train', label: 'Train', icon: Train },
    { value: 'bus', label: 'Bus', icon: Bus },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Compass className="text-blue-500" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              CompasAI
            </span>
          </div>
          <div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              CompasAI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Your AI-Powered Travel Assistant
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <MapPin className="mr-2 text-blue-500" size={20} />
                  Where should you go?
                </label>
                <input
                  type="text"
                  placeholder="Enter destination (e.g., Paris, Tokyo, New York)"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <MapPin className="mr-2 text-cyan-500" size={20} />
                  Starting from?
                </label>
                <input
                  type="text"
                  placeholder="Enter your starting location"
                  value={formData.startLocation}
                  onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <Calendar className="mr-2 text-green-500" size={20} />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <Calendar className="mr-2 text-orange-500" size={20} />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 font-semibold mb-3 block">
                  Preferred Transport Mode
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {transportOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, transportMode: option.value as any })}
                        className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${
                          formData.transportMode === option.value
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                        }`}
                      >
                        <Icon size={28} />
                        <span className="font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Next</span>
              <ArrowRight size={24} />
            </button>
          </form>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p>© 2025 Lakshana Sri S S</p>
        </footer>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
