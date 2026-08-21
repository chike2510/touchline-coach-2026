# Mobile-first landscape verification

The tactics and matchday surfaces were rebuilt around explicit mobile-landscape grid classes instead of desktop-only Tailwind breakpoints.

At the available landscape browser viewport, the navigation rail is reduced to a phone-safe width while retaining full department labels. Tactics uses a compact left summary, central pitch, right inspector, and bottom starter band. Formation controls remain visible and touch-sized. Matchday uses a compact commentary rail, central live pitch, right-side match data, and a touch-sized five-action command bar.

The previous 176-pixel legacy phone override was removed because it undid the intended mobile rail dimensions. The new mobile contract uses a 138-pixel rail, 118/202-pixel tactics side columns, and 205/190-pixel matchday side columns below the 900-pixel landscape breakpoint. Larger screens progressively widen these columns without changing the interaction model.
