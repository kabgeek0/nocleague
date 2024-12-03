import React, { useState } from 'react';
import { Users, Trophy, Star, LogOut } from 'lucide-react';
import { PlayersSection } from './components/PlayersSection';
import { RatingsSection } from './components/RatingsSection';
import { TeamSelector } from './components/TeamSelector';
import { EditProfileButton } from './components/EditProfileButton';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';
import { signOut } from './services/auth';

function App() {
  const [activeTab, setActiveTab] = useState<'players' | 'ratings' | 'teams'>('players');
  const { user } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const tabs = [
    { id: 'players', label: 'Players', icon: Users },
    { id: 'ratings', label: 'Rate Players', icon: Star },
    { id: 'teams', label: 'Teams', icon: Trophy },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Football Team Manager</h1>
            <div className="flex items-center space-x-4">
              <EditProfileButton />
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex space-x-4">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as typeof activeTab)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 border-b-2
                    ${activeTab === id 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-blue-600'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          {activeTab === 'players' && <PlayersSection />}
          {activeTab === 'ratings' && <RatingsSection />}
          {activeTab === 'teams' && <TeamSelector />}
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default App;