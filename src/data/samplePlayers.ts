import type { Player } from '../types';

export const samplePlayers: Player[] = [
  {
    id: '1',
    name: 'John Smith',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    bio: 'Striker with 5 years of experience',
    averageSkills: {
      defense: 7.5,
      goalMaking: 8.2,
      shootingAccuracy: 8.5,
      passingAbility: 7.8,
      goalkeeping: 5.0,
      speedAndStamina: 8.0
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    bio: 'Midfielder specializing in playmaking',
    averageSkills: {
      defense: 8.0,
      goalMaking: 6.5,
      shootingAccuracy: 7.0,
      passingAbility: 9.0,
      goalkeeping: 6.0,
      speedAndStamina: 8.5
    }
  },
  {
    id: '3',
    name: 'Mike Wilson',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    bio: 'Defensive specialist',
    averageSkills: {
      defense: 9.0,
      goalMaking: 5.5,
      shootingAccuracy: 6.0,
      passingAbility: 7.5,
      goalkeeping: 7.0,
      speedAndStamina: 7.5
    }
  }
];