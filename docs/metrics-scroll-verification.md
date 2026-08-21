# Metrics and scroll verification

The tactics pitch now has a wider mobile-safe center column and compact initials/position markers with visibly separated nodes. The previous formation collapse into a narrow crowd is removed.

The matchday right rail is now an internal scroll container with touch pan behavior. It contains match stats, momentum, player ratings, and opponent plan without requiring the whole match room to scroll.

The match state now includes `homeShots` and `awayShots`. Each chance or goal increments the relevant side's shot total, while possession is updated from the previous possession value plus a bounded tactical/event swing. The UI reads these authoritative values rather than deriving static-looking values from event count.
