export type StaffDepartment =
  | "Coaching Team" | "Scouting" | "Medical Team" | "Sports Science" | "Analytics" | "Other";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: StaffDepartment;
  age: number;
  nationality: string;
  nationalityFlag: string;
  reputation: number; // 1-5
  photoUrl?: string;
  attributes: { label: string; value: number }[];
}

export interface StaffRoleSlot {
  role: string;
  filled: number;
  total: number;
}

export interface StaffRecruitmentPriority {
  role: string;
  department: StaffDepartment;
  description: string;
  priority: "High" | "Medium" | "Low";
}

export interface StaffUpdate {
  id: string;
  name: string;
  role: string;
  status: "Joined" | "Left";
  timeAgo: string;
  reputation: number;
}

export interface StaffOverview {
  totalStaff: number;
  staffQuality: number;
  teamCohesion: number;
  monthlyWage: number;
  wageBudget: number;
  keyStaff: StaffMember[];
  byDepartment: { department: StaffDepartment; count: number }[];
  rolesFilled: StaffRoleSlot[];
  recruitmentPriorities: StaffRecruitmentPriority[];
  recentUpdates: StaffUpdate[];
}
