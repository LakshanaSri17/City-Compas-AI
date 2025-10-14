import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import LandingPage from './components/LandingPage';
import PreferencesPage from './components/PreferencesPage';
import ItineraryPage from './components/ItineraryPage';

type Page = 'landing' | 'preferences' | 'itinerary';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  return (
    <AuthProvider>
      <TripProvider>
        {currentPage === 'landing' && (
          <LandingPage onNext={() => setCurrentPage('preferences')} />
        )}
        {currentPage === 'preferences' && (
          <PreferencesPage
            onNext={() => setCurrentPage('itinerary')}
            onBack={() => setCurrentPage('landing')}
          />
        )}
        {currentPage === 'itinerary' && (
          <ItineraryPage onNewTrip={() => setCurrentPage('landing')} />
        )}
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
