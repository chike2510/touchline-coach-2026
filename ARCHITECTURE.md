# Touchline 26 — Architecture Notes

Feature-first, service-backed structure. Read this before making changes.

## Layout

```
app/                    Next.js App Router routes only (no business logic)
  (main)/               Shell with bottom nav — every in-app screen lives here
features/               Domain-specific UI pieces used by 2+ routes (tactics, match, squad)
components/ui/          Generic, reusable design-system primitives
components/navigation/  Header, BottomNavigation
components/layout/      BottomSheet, PageTransition
services/                Repository layer — the ONLY place that reads mock data today
lib/mock/                Mock datasets, one file per domain
types/                   Domain types, one file per domain, barrel-exported from types/index.ts
store/                   Zustand slices (appStore, tacticsStore, matchStore)
hooks/                   Small reusable hooks (useSquad, useDebounce, useDisclosure)
```

## Swapping mocks for a real API later

Every `services/*.service.ts` function currently reads from `lib/mock/*`.
To go live: change the function body to `fetch(...)` (or an API client call)
and keep the same return type. No consumer code changes, because pages only
ever import from `@/services`, never from `@/lib/mock` directly.

## Adding a new screen

1. Add types to `types/<domain>.ts` if needed, export from `types/index.ts`.
2. Add mock data to `lib/mock/<domain>.ts`, export from `lib/mock/index.ts`.
3. Add repository functions to `services/<domain>.service.ts`, export from `services/index.ts`.
4. Build the page in `app/(main)/...`, importing only from `@/services`, `@/components/ui`, `@/features`.
5. If the screen needs local interactive state (drag, multi-step forms, live ticking), add a slice to `store/`.

## Known trade-offs

- Services are synchronous today (straight function calls, not Promises) since
  everything is in-memory mock data. This was a deliberate simplification —
  swapping a function to `async` + `fetch` is a one-line change per function
  when a real backend exists.
- `matchStore`'s live-tick simulation uses a single module-level `setInterval`;
  fine for a single active match screen, would need reworking for multiple
  concurrent live matches.
