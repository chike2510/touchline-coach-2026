// Barrel export for the entire domain type system.
// Import from "@/types" anywhere in the app.

export * from "./common";
export * from "./player";
export * from "./staff";
export * from "./club";
export * from "./match";
export * from "./tactics";
export * from "./competition";
export * from "./transfer";
export * from "./training";
export * from "./medical";
export * from "./calendar";
export * from "./notification";
export * from "./finance";
export * from "./scouting";
export * from "./tournament";

export interface AppState {
  currentScreen: string;
  previousScreen: string | null;
  bottomSheet: {
    isOpen: boolean;
    content: React.ReactNode | null;
    title?: string;
  };
  toast: {
    isOpen: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  };
  isLoading: boolean;
  isOffline: boolean;
}

export type ScreenName =
  | "home"
  | "squad"
  | "tactics"
  | "match"
  | "more"
  | "transfers"
  | "training"
  | "analytics"
  | "scouting"
  | "medical"
  | "calendar"
  | "competitions"
  | "staff"
  | "inbox"
  | "settings"
  | "club"
  | "player-profile"
  | "tactical-overlay"
  | "match-prep"
  | "post-match"
  | "contract-negotiation"
  | "player-development";
