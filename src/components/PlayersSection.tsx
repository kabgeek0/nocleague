import React from 'react';
import { PlayerCard } from './PlayerCard';
import { usePlayerStore } from '../store/playerStore';

export const PlayersSection: React.FC = () => {
  const { players } = usePlayerStore();

  if (players.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Players Yet</h2>
        <p className="text-gray-600">
          Players will appear here once they create their accounts.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Team Players</h2>
        <p className="text-gray-600">View all registered players and their current skill ratings</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};