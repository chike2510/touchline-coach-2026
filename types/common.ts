// Shared primitive types used across feature domains.

export type Interest = "very-high" | "high" | "medium" | "low";
export type Morale = "Excellent" | "Very Good" | "Good" | "Okay" | "Poor" | "Very Poor";
export type Chemistry = "Very Strong" | "Strong" | "Decent" | "Weak";
export type Trend = "up" | "down" | "stable";
export type RiskLevel = "Low" | "Medium" | "High" | "Very High";
export type Intensity = "low" | "medium" | "high";
export type NotificationCategory =
  | "board"
  | "players"
  | "staff"
  | "press"
  | "transfers"
  | "competition"
  | "social";
export type NotificationType = "info" | "success" | "warning" | "danger";

export interface Named {
  id: string;
  name: string;
}
