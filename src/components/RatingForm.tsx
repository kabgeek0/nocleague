import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { submitPlayerRating } from '../services/players';
import type { Player, Skill, SkillRating } from '../types';

interface RatingFormProps {
  player: Player;
  onSubmit: (ratings: SkillRating[]) => void;
}

export const RatingForm: React.FC<RatingFormProps> = ({ player, onSubmit }) => {
  const { user } = useAuthStore();
  const [ratings, setRatings] = useState<Record<Skill, number>>({
    defense: 5,
    goalMaking: 5,
    shootingAccuracy: 5,
    passingAbility: 5,
    goalkeeping: 5,
    speedAndStamina: 5,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const skillRatings: SkillRating[] = Object.entries(ratings).map(([skill, rating]) => ({
        skill: skill as Skill,
        rating,
      }));
      
      await submitPlayerRating(player.id, user.uid, skillRatings);
      onSubmit(skillRatings);
    } catch (error) {
      console.error('Error submitting ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold">Rate {player.name}</h3>
      </div>

      {Object.keys(ratings).map((skill) => (
        <div key={skill} className="space-y-2">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium capitalize">
              {skill.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="text-sm font-semibold">
              {ratings[skill as Skill]}
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={ratings[skill as Skill]}
            onChange={(e) =>
              setRatings((prev) => ({
                ...prev,
                [skill]: parseInt(e.target.value),
              }))
            }
            className="w-full"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Ratings'}
      </button>
    </form>
  );
};