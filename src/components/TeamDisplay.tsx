import React from 'react';
import type { Team } from '../types';
import { PlayerCard } from './PlayerCard';

interface TeamDisplayProps {
  teams: Team[];
}

export const TeamDisplay: React.FC<TeamDisplayProps> = ({ teams }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {teams.map((team) => (
        <div key={team.id} className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
            <p className="text-sm text-gray-600">
              Team Rating: {team.averageTeamRating.toFixed(2)}
            </p>
            <div className="mt-4 space-y-4">
              {team.players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};