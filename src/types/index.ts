export type Skill = 'defense' | 'goalMaking' | 'shootingAccuracy' | 'passingAbility' | 'goalkeeping' | 'speedAndStamina';

export interface SkillRating {
  skill: Skill;
  rating: number;
}

export interface Player {
  id: string;
  name: string;
  photoUrl: string;
  bio?: string;
  averageSkills: Record<Skill, number>;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  averageTeamRating: number;
}