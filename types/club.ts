export interface ClubHonor {
  label: string;
  count: number;
  icon: "trophy" | "cup" | "shield" | "star";
}

export interface ClubVisionGoal {
  term: "Short Term" | "Medium Term" | "Long Term";
  goal: string;
  status: "On Track" | "In Progress" | "Off Track";
}

export interface ClubNewsItem {
  id: string;
  title: string;
  timeAgo: string;
  imageUrl?: string;
}

export interface ClubPartner {
  name: string;
  tier: string;
}

export interface ClubFinancialSummary {
  balance: number;
  profitLoss: number;
  wageBudget: number;
  wageBudgetUsed: number;
  transferBudget: number;
}

export interface ClubSquadOverview {
  totalPlayers: number;
  goalkeepers: number;
  defenders: number;
  midfielders: number;
  forwards: number;
  averageAge: number;
  foreignPlayers: number;
  foreignPlayersPct: number;
  squadValue: number;
  topEarner: { name: string; wage: number };
}

export interface ClubKeyPlayer {
  id: string;
  name: string;
  position: string;
  number: number;
  rating: number;
  photoUrl?: string;
}

export interface ClubOverview {
  name: string;
  crestUrl?: string;
  country: string;
  founded: number;
  status: string;
  reputationStars: number;
  league: string;
  leaguePosition: number;
  seasonTicketHolders: number;
  clubValue: number;
  annualRevenue: number;
  stadium: {
    name: string;
    imageUrl?: string;
    capacity: number;
    condition: string;
    yearBuilt: number;
    expansionPlanned: boolean;
  };
  finances: ClubFinancialSummary;
  squad: ClubSquadOverview;
  recentForm: { opponent: string; result: "W" | "D" | "L"; score: string }[];
  formGoalsScored: number;
  formGoalsConceded: number;
  honors: ClubHonor[];
  otherHonors: { label: string; count: number }[];
  vision: ClubVisionGoal[];
  keyPlayers: ClubKeyPlayer[];
  news: ClubNewsItem[];
  partners: ClubPartner[];
  boardConfidence: number;
  squadMorale: number;
}
