export type MatchStatus = "upcoming" | "live" | "finished";

export interface MatchEvent {
  minute: number;
  type: "goal" | "yellow" | "red" | "sub" | "kickoff" | "halftime" | "fulltime" | "chance";
  team: "home" | "away";
  player?: string;
  detail?: string;
}

export interface MatchLineupPlayer {
  id: string;
  name: string;
  number: number;
  position: string;
  rating?: number;
  x: number;
  y: number;
}

export interface MatchStatLine {
  label: string;
  home: number | string;
  away: number | string;
}

export interface LiveMatchState {
  id: string;
  competition: string;
  venue: string;
  attendance: number;
  homeTeam: string;
  awayTeam: string;
  homeCrest?: string;
  awayCrest?: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: MatchStatus;
  homeFormation: string;
  awayFormation: string;
  stats: MatchStatLine[];
  events: MatchEvent[];
  momentum: number[]; // -100..100, home positive
  lastEvent?: MatchEvent;
  homeLineup: MatchLineupPlayer[];
  awayLineup: MatchLineupPlayer[];
}

export interface MatchPrepOpponent {
  name: string;
  crestUrl?: string;
  formation: string;
  style: string;
  strengths: string[];
  weaknesses: string[];
  form: ("W" | "D" | "L")[];
}

export interface MatchPreparation {
  matchId: string;
  competition: string;
  matchday: number;
  kickoff: string;
  venue: string;
  homeTeam: string;
  awayTeam: string;
  homeForm: ("W" | "D" | "L")[];
  awayForm: ("W" | "D" | "L")[];
  opponent: MatchPrepOpponent;
  predictedLineup: MatchLineupPlayer[];
  keyPlayer: { name: string; position: string; overall: number; dangerRating: number; goals: number; assists: number; xg: number };
  focusPlayer: { name: string; position: string; instruction: string };
  conditions: { weatherLabel: string; tempC: number; pitch: string; windKmh: number; humidityPct: number };
  trainingPlan: { day: string; type: string; focus: string }[];
  tacticalApproach: { mentality: string; inPossession: string[]; inTransition: string[]; outOfPossession: string[] };
  assistantAdvice: string;
  keyBattle: { home: { name: string; position: string }; away: { name: string; position: string }; stats: { label: string; home: number; away: number }[] };
  teamFluidity: string;
  likelyRatingStars: number;
}

export interface PostMatchReview {
  matchId: string;
  competition: string;
  matchday: number;
  result: "Win" | "Draw" | "Loss";
  importance: string;
  pointsGained: number;
  homeTeam: string;
  awayTeam: string;
  homeFormation: string;
  awayFormation: string;
  homeScore: number;
  awayScore: number;
  scorers: { team: "home" | "away"; player: string; minute: number; penalty?: boolean }[];
  timeline: MatchEvent[];
  momentum: number[];
  momentumSummary: string;
  stats: MatchStatLine[];
  pressingSuccessPct: number;
  restDefenceRating: number;
  buildUpSuccessPct: number;
  setPieceRatings: { label: string; stars: number }[];
  coachRating: string;
  coachRatingSummary: string;
  whatWentWell: string[];
  aiTacticalSuggestions: string[];
  assistantNotes: { author: string; role: string; note: string };
}
