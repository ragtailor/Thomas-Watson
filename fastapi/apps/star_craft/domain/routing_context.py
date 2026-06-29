from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class RoutingContext:
    query: str
    intent: str | None = None
    target_spoke: str | None = None
