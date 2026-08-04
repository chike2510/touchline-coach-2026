import type { StaffOverview } from "@/types";

export const staffOverview: StaffOverview = {
  totalStaff: 32,
  staffQuality: 81,
  teamCohesion: 74,
  monthlyWage: 412_000,
  wageBudget: 650_000,
  keyStaff: [
    {
      id: "s-carrick", name: "Michael Carrick", role: "Manager", department: "Coaching Team", age: 43,
      nationality: "England", nationalityFlag: "🏴", reputation: 4.5,
      attributes: [{ label: "Tactical Knowledge", value: 19 }, { label: "Man Management", value: 17 }, { label: "Motivating", value: 18 }],
    },
    {
      id: "s-mckenna", name: "Kieran McKenna", role: "Assistant Manager", department: "Coaching Team", age: 39,
      nationality: "Northern Ireland", nationalityFlag: "🇬🇧", reputation: 4.5,
      attributes: [{ label: "Tactical Knowledge", value: 16 }, { label: "Man Management", value: 15 }, { label: "Motivating", value: 16 }],
    },
    {
      id: "s-davies", name: "Ben Davies", role: "Head Coach", department: "Coaching Team", age: 41,
      nationality: "England", nationalityFlag: "🏴", reputation: 4,
      attributes: [{ label: "Tactical Knowledge", value: 15 }, { label: "Judging Player Ability", value: 16 }, { label: "Discipline", value: 14 }],
    },
    {
      id: "s-rouwelaar", name: "Jelle ten Rouwelaar", role: "Goalkeeping Coach", department: "Coaching Team", age: 44,
      nationality: "Netherlands", nationalityFlag: "🇳🇱", reputation: 4,
      attributes: [{ label: "GK Distribution", value: 15 }, { label: "GK Shot Stopping", value: 18 }, { label: "GK Handling", value: 14 }],
    },
    {
      id: "s-brown", name: "Steve Brown", role: "Head Scout", department: "Scouting", age: 58,
      nationality: "Scotland", nationalityFlag: "🏴", reputation: 4,
      attributes: [{ label: "Judging Player Ability", value: 17 }, { label: "Judging Potential", value: 18 }, { label: "Negotiation", value: 15 }],
    },
  ],
  byDepartment: [
    { department: "Coaching Team", count: 8 },
    { department: "Scouting", count: 7 },
    { department: "Medical Team", count: 6 },
    { department: "Sports Science", count: 5 },
    { department: "Analytics", count: 3 },
    { department: "Other", count: 3 },
  ],
  rolesFilled: [
    { role: "Manager", filled: 1, total: 1 },
    { role: "Assistant Manager", filled: 1, total: 1 },
    { role: "Coaching Staff", filled: 6, total: 8 },
    { role: "Scouting Staff", filled: 5, total: 7 },
    { role: "Medical Staff", filled: 4, total: 6 },
    { role: "Sports Science", filled: 3, total: 5 },
    { role: "Analytics Staff", filled: 2, total: 3 },
  ],
  recruitmentPriorities: [
    { role: "Tactical Coach", department: "Coaching Team", description: "A specialist in tactical analysis would enhance your coaching setup.", priority: "High" },
    { role: "Scout", department: "Scouting", description: "More scouts will help us discover better talent worldwide.", priority: "Medium" },
    { role: "Sports Scientist", department: "Sports Science", description: "Adding more sports scientists will improve player performance.", priority: "Medium" },
  ],
  recentUpdates: [
    { id: "u1", name: "Joe Edwards", role: "Performance Analyst", status: "Joined", timeAgo: "2 days ago", reputation: 4 },
    { id: "u2", name: "Andrea Maldera", role: "Fitness Coach", status: "Left", timeAgo: "1 week ago", reputation: 3 },
    { id: "u3", name: "Billy Mercer", role: "Scout", status: "Joined", timeAgo: "2 weeks ago", reputation: 4.5 },
  ],
};
