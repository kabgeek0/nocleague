import React from 'react';
import { User } from 'lucide-react';
import type { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 ${
        onClick ? 'hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        {player.photoUrl ? (
          <img 
            src={player.photoUrl} 
            alt={player.name} 
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center border-2 border-blue-100">
            <User className="w-10 h-10 text-blue-400" />
          </div>
        )}
        <div>
          <h3 className="font-bold text-xl text-gray-800">{player.name}</h3>
          {player.bio && (
            <p className="text-gray-600 text-sm mt-1">{player.bio}</p>
          )}
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        {Object.entries(player.averageSkills).map(([skill, rating]) => (
          <div key={skill} className="text-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-600 capitalize">
                {skill.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="font-semibold text-blue-600">{rating.toFixed(1)}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(rating / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};