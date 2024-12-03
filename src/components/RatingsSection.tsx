import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { PlayerCard } from './PlayerCard';
import { RatingSession } from './RatingSession';
import { usePlayerStore } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';

export const RatingsSection: React.FC = () => {
  const [isRatingSession, setIsRatingSession] = useState(false);
  const { players } = usePlayerStore();
  const { user } = useAuthStore();

  if (isRatingSession) {
    return (
      <RatingSession onComplete={() => setIsRatingSession(false)} />
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Rate Players</h2>
          <p className="text-gray-600">Rate your fellow players' skills to help create balanced teams</p>
        </div>
        <button
          onClick={() => setIsRatingSession(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Play className="w-5 h-5" />
          <span>Start Rating</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players
          .filter(player => player.id !== user?.uid)
          .map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
      </div>
    </div>
  );
};