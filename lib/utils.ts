export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function formatCurrency(value: string | number, currency = "£"): string {
  if (typeof value === "string") return value;
  return currency + formatNumber(value);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getRatingColor(rating: number): string {
  if (rating >= 85) return "text-pitch-400";
  if (rating >= 75) return "text-pitch-500";
  if (rating >= 65) return "text-accent-amber";
  if (rating >= 50) return "text-accent-orange";
  return "text-accent-red";
}

export function getRatingBg(rating: number): string {
  if (rating >= 85) return "bg-pitch-500/20 text-pitch-400";
  if (rating >= 75) return "bg-pitch-600/20 text-pitch-500";
  if (rating >= 65) return "bg-accent-amber/20 text-accent-amber";
  if (rating >= 50) return "bg-accent-orange/20 text-accent-orange";
  return "bg-accent-red/20 text-accent-red";
}
