# Goal continuation and tactics density verification

## Matchday

After starting the balanced team talk, the match generated a goal at 5 minutes. The UI showed a transient goal replay card, but the match remained in the Live phase. After the replay disappeared automatically, the clock continued to 30 minutes, the commentary list grew to six events, momentum updated, and the score remained 0–1. This confirms that a goal no longer stops the simulation. Explicit pause remains available through the Pause command.

The engine fix removes the Goal interruption state. Injury interruptions still use the deliberate interruption flow because those require a manager decision.

## Tactics

Pitch player markers now use compact initials and positions only. Full names and roles remain in the lower player band, so the pitch no longer renders long names on top of each other. The inspector tabs now scroll horizontally when necessary, use smaller mobile-safe text, and have a clearer hierarchy. Panel shadow and label sizing were reduced for the phone landscape canvas.
