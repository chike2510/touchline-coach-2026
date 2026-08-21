# Viewport verification — landscape workstation

The current production build was inspected after the fixed landscape canvas pass.

## Tactics

At the landscape browser viewport, the tactics route now stays in a persistent three-column composition: left team-shape summary, central pitch, and right instruction inspector. The formation strip remains visible above the grid, the pitch no longer forces the whole page into a vertical stack, and the starter band is contained at the bottom of the workstation. The right inspector correctly filters controls by tab rather than showing every instruction group at once.

## Matchday

The match route now stays in a persistent three-pane room: commentary on the left, a central pitch surface, and match stats, momentum, ratings, and opponent plan on the right. The bottom command bar remains visible inside the same viewport. The pre-match team-talk state is rendered as a compact briefing inside the commentary pane, while the central pitch and right-side match information remain visible. Starting the team talk transitions the simulation into live play and allows commentary events to populate.

## Root cause fixed

The previous layout waited for Tailwind's `xl` breakpoint, which was wider than the usable phone landscape canvas after the navigation rail. At the supplied landscape dimensions this caused the `xl` grid to fall back to a single-column layout. The workstations now use a landscape `lg` grid and explicit viewport-constrained row heights, with overflow contained inside commentary and the workstation canvas rather than extending the whole page.
