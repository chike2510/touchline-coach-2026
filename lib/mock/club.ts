import type { ClubOverview } from "@/types";

export const clubOverview: ClubOverview = {
  name: "Manchester United", country: "England", founded: 1878, status: "Professional",
  reputationStars: 4, league: "Premier League", leaguePosition: 3, seasonTicketHolders: 187_354,
  clubValue: 745_000_000, annualRevenue: 620_000_000,
  stadium: { name: "Old Trafford", capacity: 74_310, condition: "Excellent", yearBuilt: 1910, expansionPlanned: false },
  finances: { balance: 85_200_000, profitLoss: 42_700_000, wageBudget: 228_000_000, wageBudgetUsed: 215_000_000, transferBudget: 96_500_000 },
  squad: {
    totalPlayers: 26, goalkeepers: 3, defenders: 9, midfielders: 8, forwards: 6,
    averageAge: 25.4, foreignPlayers: 14, foreignPlayersPct: 53.8, squadValue: 927_000_000,
    topEarner: { name: "Bruno Fernandes", wage: 320_000 },
  },
  recentForm: [
    { opponent: "Chelsea", result: "W", score: "2-1" },
    { opponent: "Everton", result: "W", score: "3-0" },
    { opponent: "Arsenal", result: "D", score: "1-1" },
    { opponent: "Newcastle", result: "W", score: "4-2" },
    { opponent: "Man City", result: "L", score: "0-1" },
  ],
  formGoalsScored: 10, formGoalsConceded: 5,
  honors: [
    { label: "League Titles", count: 20, icon: "trophy" },
    { label: "FA Cups", count: 13, icon: "cup" },
    { label: "UEFA Champions League", count: 6, icon: "shield" },
    { label: "FIFA Club World Cup", count: 1, icon: "star" },
  ],
  otherHonors: [
    { label: "Europa League", count: 1 }, { label: "League Cups", count: 6 },
    { label: "Community Shields", count: 21 }, { label: "UEFA Super Cup", count: 1 }, { label: "Intercontinental Cup", count: 1 },
  ],
  vision: [
    { term: "Short Term", goal: "Win the Premier League", status: "On Track" },
    { term: "Medium Term", goal: "Win the UEFA Champions League", status: "On Track" },
    { term: "Long Term", goal: "Establish sustained dominance in English and European football", status: "In Progress" },
  ],
  keyPlayers: [
    { id: "p-fernandes", name: "Bruno Fernandes", position: "CAM", number: 8, rating: 8.2 },
    { id: "p-rashford", name: "Marcus Rashford", position: "LW", number: 10, rating: 7.8 },
    { id: "p-martinez", name: "Lisandro Martínez", position: "CB", number: 6, rating: 7.6 },
    { id: "p-onana", name: "André Onana", position: "GK", number: 24, rating: 7.4 },
    { id: "p-hojlund", name: "Rasmus Højlund", position: "ST", number: 9, rating: 7.3 },
  ],
  news: [
    { id: "n1", title: "Club announce new training facility upgrade", timeAgo: "2 days ago" },
    { id: "n2", title: "Youth prospect Garnacho signs new contract", timeAgo: "4 days ago" },
    { id: "n3", title: "Season ticket sales reach record high", timeAgo: "1 week ago" },
  ],
  partners: [
    { name: "adidas", tier: "Technical Partner" }, { name: "TeamViewer", tier: "Principal Partner" },
    { name: "DXC Technology", tier: "Sleeve Partner" }, { name: "KOHLER", tier: "Training Wear Partner" },
    { name: "Marriott Bonvoy", tier: "Official Hotel Partner" },
  ],
  boardConfidence: 92, squadMorale: 87,
};
