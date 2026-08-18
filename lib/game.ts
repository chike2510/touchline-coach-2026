export type Position = "GK" | "CB" | "FB" | "DM" | "CM" | "AM" | "WG" | "ST";
export type Mentality = "Cautious" | "Balanced" | "Assertive";

export type Player = {
  id: string; name: string; position: Position; age: number; overall: number; fitness: number;
  form: number; morale: number; wage: number; value: number; status: "Available" | "Doubtful" | "Unavailable";
};

export type ClubState = {
  name: string; city: string; founded: number; division: string; points: number; position: number;
  budget: number; wageRoom: number; boardConfidence: number; morale: number; nextOpponent: string;
  nextMatchAt: string; match: { minute: number; homeGoals: number; awayGoals: number; phase: "idle" | "live" | "finished"; events: MatchEvent[] };
  mentality: Mentality;
};

export type MatchEvent = { id: string; minute: number; kind: "Chance" | "Goal" | "Card" | "Tactical"; text: string; side: "home" | "away" };

export const players: Player[] = [
  { id: "p1", name: "Marek Varga", position: "GK", age: 27, overall: 76, fitness: 94, form: 7.2, morale: 78, wage: 2200, value: 800000, status: "Available" },
  { id: "p2", name: "Jonas Bell", position: "CB", age: 24, overall: 74, fitness: 91, form: 7.0, morale: 82, wage: 1800, value: 650000, status: "Available" },
  { id: "p3", name: "Sami Okoro", position: "CB", age: 29, overall: 78, fitness: 87, form: 7.4, morale: 75, wage: 2600, value: 900000, status: "Available" },
  { id: "p4", name: "Elias Hart", position: "FB", age: 22, overall: 71, fitness: 96, form: 6.8, morale: 86, wage: 1400, value: 430000, status: "Available" },
  { id: "p5", name: "Tomas Ilic", position: "DM", age: 31, overall: 79, fitness: 84, form: 7.1, morale: 77, wage: 3100, value: 520000, status: "Available" },
  { id: "p6", name: "Noah Mensah", position: "CM", age: 23, overall: 77, fitness: 89, form: 7.6, morale: 91, wage: 2300, value: 1200000, status: "Available" },
  { id: "p7", name: "Rui Duarte", position: "AM", age: 26, overall: 81, fitness: 92, form: 7.8, morale: 88, wage: 4200, value: 2100000, status: "Available" },
  { id: "p8", name: "Luka Baresic", position: "WG", age: 20, overall: 73, fitness: 90, form: 7.3, morale: 84, wage: 1600, value: 980000, status: "Available" },
  { id: "p9", name: "Isaac Cole", position: "WG", age: 25, overall: 75, fitness: 79, form: 6.9, morale: 69, wage: 2500, value: 760000, status: "Doubtful" },
  { id: "p10", name: "Matteo Riva", position: "ST", age: 28, overall: 83, fitness: 93, form: 8.1, morale: 94, wage: 5100, value: 2500000, status: "Available" },
  { id: "p11", name: "Adem Kaya", position: "CM", age: 19, overall: 68, fitness: 98, form: 7.0, morale: 89, wage: 900, value: 320000, status: "Available" },
];

export const initialClub: ClubState = {
  name: "Riverside Athletic", city: "Northport", founded: 1912, division: "National League One", points: 31, position: 5,
  budget: 4200000, wageRoom: 18400, boardConfidence: 68, morale: 82, nextOpponent: "Crown Vale", nextMatchAt: "Saturday · 15:00",
  match: { minute: 0, homeGoals: 0, awayGoals: 0, phase: "idle", events: [] }, mentality: "Balanced",
};

const store = globalThis as typeof globalThis & { __touchline26?: ClubState };
export function getClub() { store.__touchline26 ??= structuredClone(initialClub); return store.__touchline26; }

export function simulateTick() {
  const club = getClub();
  if (club.match.phase !== "live") club.match = { minute: 0, homeGoals: 0, awayGoals: 0, phase: "live", events: [] };
  club.match.minute = Math.min(90, club.match.minute + 5);
  const minute = club.match.minute;
  const seed = (minute * 17 + club.points * 3 + club.match.events.length * 11) % 100;
  const chance = seed > 72;
  if (chance) {
    const homeEdge = club.mentality === "Assertive" ? 0.62 : club.mentality === "Cautious" ? 0.46 : 0.54;
    const home = seed % 10 / 10 < homeEdge;
    const goal = seed > 91 || (home && seed > 84);
    const kind = goal ? "Goal" : "Chance";
    const event: MatchEvent = { id: `${minute}-${club.match.events.length}`, minute, kind, side: home ? "home" : "away", text: goal ? `${home ? "Riverside" : club.nextOpponent} convert a big moment.` : `${home ? "Riverside" : club.nextOpponent} work an opening.` };
    club.match.events.unshift(event);
    if (goal) home ? club.match.homeGoals++ : club.match.awayGoals++;
  }
  if (minute >= 90) club.match.phase = "finished";
  return club;
}

export function setMentality(mentality: Mentality) { getClub().mentality = mentality; return getClub(); }
