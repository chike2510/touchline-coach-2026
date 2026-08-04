export interface LeagueTableEntry {
  position: number;
  club: string;
  crestUrl?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: ("W" | "D" | "L")[];
  highlight?: boolean;
}

export interface CompetitionFixtureRef {
  homeTeam: string;
  awayTeam: string;
  homeCrest?: string;
  awayCrest?: string;
  date: string;
  time: string;
  venue?: string;
}

export interface CompetitionTopScorer {
  name: string;
  goals: number;
  photoUrl?: string;
}

export interface Competition {
  id: string;
  name: string;
  shortName: string;
  country: string;
  crestUrl?: string;
  reputationStars: number;
  status: string; // "In Progress" | "Semi Final" | "Final" | "Won" | "Not Entered" | "Qualification"
  stage?: string;
  round?: string;
  table?: LeagueTableEntry[];
  nextMatch?: CompetitionFixtureRef;
  progressResult?: { homeTeam: string; awayTeam: string; homeScore: number; awayScore: number; aggregate?: string; completed?: boolean; date: string; venue?: string; won?: boolean };
  topScorers?: CompetitionTopScorer[];
  qualificationNote?: string;
}

export interface CompetitionsSummary {
  competitionsEntered: number;
  titlesWon: number;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
}
