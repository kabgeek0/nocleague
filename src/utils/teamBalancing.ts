import type { Player, Team } from '../types';

export function generateBalancedTeams(players: Player[]): Team[] {
  if (players.length < 2) {
    throw new Error('Need at least 2 players to generate teams');
  }

  // Calculate overall rating for each player
  const playersWithRating = players.map(player => ({
    ...player,
    overallRating: Object.values(player.averageSkills).reduce((a, b) => a + b, 0) / 6
  }));

  // Sort players by rating in descending order
  playersWithRating.sort((a, b) => b.overallRating - a.overallRating);

  const team1: Player[] = [];
  const team2: Player[] = [];
  let team1Rating = 0;
  let team2Rating = 0;

  // Distribute players using the serpentine method
  playersWithRating.forEach((player, index) => {
    if (team1Rating <= team2Rating) {
      team1.push(player);
      team1Rating += player.overallRating;
    } else {
      team2.push(player);
      team2Rating += player.overallRating;
    }
  });

  return [
    {
      id: '1',
      name: 'Team A',
      players: team1,
      averageTeamRating: team1Rating / team1.length
    },
    {
      id: '2',
      name: 'Team B',
      players: team2,
      averageTeamRating: team2Rating / team2.length
    }
  ];
}