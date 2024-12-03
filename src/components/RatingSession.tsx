import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PlayerCard } from './PlayerCard';
import { RatingForm } from './RatingForm';
import { usePlayerStore } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';
import type { Player } from '../types';

export const RatingSession: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { players } = usePlayerStore();
  const { user } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playersToRate, setPlayersToRate] = useState<Player[]>([]);

  useEffect(() => {
    // Filter out the current user and sort by name
    const filteredPlayers = players
      .filter(player => player.id !== user?.uid)
      .sort((a, b) => a.name.localeCompare(b.name));
    setPlayersToRate(filteredPlayers);
  }, [players, user]);

  const currentPlayer = playersToRate[currentIndex];

  const handleNext = () => {
    if (currentIndex < playersToRate.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentPlayer) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Rating Player {currentIndex + 1} of {playersToRate.length}
        </h3>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / playersToRate.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <PlayerCard player={currentPlayer} />
      </div>

      <RatingForm
        player={currentPlayer}
        onSubmit={() => handleNext()}
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 disabled:text-gray-400"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous Player</span>
        </button>
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-4 py-2 text-blue-600"
        >
          <span>{currentIndex === playersToRate.length - 1 ? 'Finish' : 'Skip Player'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};