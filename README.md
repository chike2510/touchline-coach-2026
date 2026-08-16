# Touchline 26

Touchline 26 is a premium, mobile-first football coaching simulation interface built with Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, Zustand, Lucide, and Recharts. The current implementation preserves the existing dark, lime-accented visual language while adding a real application entry flow and backend-owned career state.

## Product direction

The experience is designed for portrait-first use. It deliberately avoids desktop sidebars and default browser controls in favor of a persistent bottom navigation, reusable cards, motion-led transitions, accessible buttons, and placeholder-first visual assets. The dashboard routes already cover the main coaching loop: Home, Squad, Tactics, Match, and More, with supporting routes for training, transfers, analytics, scouting, medical, staff, club overview, inbox, competitions, calendar, settings, match preparation, and post-match review.

## Full-stack responsibility

The frontend is no longer treated as a standalone mockup. The backend boundary lives in `app/api/`, while domain reads remain behind `services/` and typed server state is centralized in `lib/server/state.ts`. The first backend slice provides a health check, a club overview endpoint, and a validated onboarding mutation that stores the current career profile for the running server instance.

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/health` | GET | Returns service health and timestamp. |
| `/api/club` | GET | Returns the club overview through the service layer plus the current career profile. |
| `/api/onboarding` | POST | Validates manager name, philosophy, tactical identity, difficulty, club, and league before saving the career profile. |

The state repository is intentionally isolated so that durable storage can be introduced without changing screen components. In a deployed serverless environment, the current store is process-local; the API contract is the stable integration seam for adding a database or external persistence provider next.

## Onboarding

New visitors are routed to `/onboarding`. The five-step flow covers manager information, coaching philosophy, tactical DNA, difficulty, and club selection. It uses button-based selection cards rather than HTML selects, validates completion before advancing, animates transitions with Framer Motion, and submits the final profile to the backend before entering `/home`.

## Assets and design system

All image categories have placeholder directories under `public/assets/`: player portraits, club badges, competition logos, stadiums, kits, manager avatars, illustrations, and icons. Existing token files under `styles/` define colors, typography, spacing, radius, motion, and shadows. Generic primitives live in `components/ui/`; navigation and layout primitives live in `components/navigation/` and `components/layout/`; domain components live in `features/`.

## Local development

Install dependencies and run the development server with:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/onboarding`. The production build can be checked with:

```bash
npm run build
```

## Source requirements

This implementation is based on the supplied Touchline 26 frontend master prompt and the existing repository/deployment audit. No real football imagery or copyrighted club assets are bundled.

## References

[1]: https://github.com/chike2510/touchline-coach-2026 "Touchline 26 GitHub repository"
[2]: https://touchline-coach-2026.vercel.app "Touchline 26 deployed app"

The repository and deployment referenced above were inspected during the implementation audit [1] [2].