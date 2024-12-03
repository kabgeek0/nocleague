import React, { useState } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { generateBalancedTeams } from '../utils/teamBalancing';
import { TeamDisplay } from './TeamDisplay';
import type { Team } from '../types';

export const TeamSelector: React.FC = () => {
  const { players } = usePlayerStore();
  const [selectedPlayers, setSelectedPlayers] = useState<Set<string>>(new Set());
  const [teams, setTeams] = useState<Team[]>([]);

  const togglePlayer = (playerId: string) => {
    const newSelected = new Set(selectedPlayers);
    if (newSelected.has(playerId)) {
      newSelected.delete(playerId);
    } else {
      newSelected.add(playerId);
    }
    setSelectedPlayers(newSelected);
  };

  const handleGenerateTeams = () => {
    const availablePlayers = players.filter(p => selectedPlayers.has(p.id));
    const generatedTeams = generateBalancedTeams(availablePlayers);
    setTeams(generatedTeams);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Players for Next Game</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {players.map(player => (
            <label
              key={player.id}
              className="flex items-center space-x-2 p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedPlayers.has(player.id)}
                onChange={() => togglePlayer(player.id)}
                className="rounded text-blue-600"
              />
              <div className="flex items-center space-x-2">
                {player.photoUrl ? (
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                )}
                <span className="font-medium">{player.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {selectedPlayers.size >= 2 && (
        <button
          onClick={handleGenerateTeams}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          Generate Balanced Teams
        </button>
      )}

      {teams.length > 0 && <TeamDisplay teams={teams} />}
    </div>
  );
};