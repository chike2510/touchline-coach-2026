import type { InboxMessage } from "@/types";

export const inboxMessages: InboxMessage[] = [
  {
    id: "m1", from: "John Murtough", role: "Director of Football", subject: "Transfer offer received for Alejandro Garnacho",
    preview: "We have received a transfer offer from Chelsea for Alejandro Garnacho.",
    body: ["Hi Auracle,", "We have received a transfer offer from Chelsea for Alejandro Garnacho.", "You can find the full details in your transfers inbox.", "Best regards,", "John Murtough"],
    category: "transfers", categoryLabel: "Transfers", timeLabel: "09:15", dateGroup: "Today", read: false, type: "info",
    quickActions: ["View Offer", "Discuss with Agent", "Reject Offer"],
    attachments: [{ name: "Chelsea_Offer_Details.pdf", sizeLabel: "245 KB" }],
    relatedPlayer: { name: "Alejandro Garnacho", age: 21, position: "LW", nationality: "Argentina", overall: 83 },
    offer: { club: "Chelsea", fee: 60_000_000, wage: 7_500_000 },
  },
  {
    id: "m2", from: "Benni McCarthy", role: "Fitness Coach", subject: "Training schedule for the upcoming week",
    preview: "Please review and approve the training schedule for the upcoming week.",
    body: ["Hi Auracle,", "Please review and approve the training schedule for the upcoming week.", "Regards,", "Benni McCarthy"],
    category: "staff", categoryLabel: "Training", timeLabel: "08:47", dateGroup: "Today", read: false, type: "info",
  },
  {
    id: "m3", from: "Dr. Steve McNally", role: "Head of Medical", subject: "Lisandro Martínez injury update",
    preview: "Lisandro's scan results are back — expected return in 2-3 weeks.",
    body: ["Hi Auracle,", "Lisandro's scan results are back. He's expected to return in 2-3 weeks.", "We'll keep monitoring his progress.", "Dr. Steve McNally"],
    category: "players", categoryLabel: "Injuries", timeLabel: "08:30", dateGroup: "Today", read: false, type: "warning",
  },
  {
    id: "m4", from: "Richard Arnold", role: "CEO", subject: "Commercial opportunity: New global partnership",
    preview: "The board have identified a new commercial partnership opportunity.",
    body: ["Hi Auracle,", "The board have identified a new commercial partnership opportunity that could boost revenue significantly.", "Richard Arnold"],
    category: "board", categoryLabel: "Finances", timeLabel: "07:58", dateGroup: "Today", read: false, type: "success",
  },
  {
    id: "m5", from: "Premier League", role: "Competition", subject: "Match schedule confirmed",
    preview: "Your fixture list for the upcoming matchweek has been confirmed.",
    body: ["The match schedule for the upcoming round has been confirmed.", "Check your calendar for full details."],
    category: "competition", categoryLabel: "Competitions", timeLabel: "Yesterday", dateGroup: "Yesterday", read: true, type: "info",
  },
  {
    id: "m6", from: "Kieran McKenna", role: "Assistant Manager", subject: "Monthly scouting report",
    preview: "Here's the latest scouting report covering our shortlisted targets.",
    body: ["Hi Auracle,", "Here's the latest scouting report covering our shortlisted targets across Europe.", "Kieran"],
    category: "staff", categoryLabel: "Scouting", timeLabel: "Yesterday", dateGroup: "Yesterday", read: true, type: "info",
  },
];
