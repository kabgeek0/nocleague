import { create } from 'zustand';
import type { Player, SkillRating } from '../types';
import { subscribeToPlayers } from '../services/players';

interface PlayerState {
  players: Player[];
  currentPlayer: Player | null;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  updatePlayerRatings: (playerId: string, ratings: SkillRating[]) => void;
  setCurrentPlayer: (player: Player | null) => void;
}

export const usePlayerStore = create<PlayerState>((set) => {
  // Initialize subscription to players collection
  const unsubscribe = subscribeToPlayers((players) => {
    set({ players });
  });

  return {
    players: [],
    currentPlayer: null,
    setPlayers: (players) => set({ players }),
    addPlayer: (player) =>
      set((state) => ({ players: [...state.players, player] })),
    updatePlayerRatings: (playerId, ratings) =>
      set((state) => ({
        players: state.players.map((player) => {
          if (player.id !== playerId) return player;
          
          const newSkills = { ...player.averageSkills };
          ratings.forEach(({ skill, rating }) => {
            newSkills[skill] = rating;
          });
          
          return { ...player, averageSkills: newSkills };
        }),
      })),
    setCurrentPlayer: (player) => set({ currentPlayer: player }),
  };
});