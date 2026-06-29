from __future__ import annotations

from dataclasses import dataclass


@dataclass
class ContextRouteCommand:
    query: str


@dataclass
class ContextRouteResponse:
    target_spoke: str
    reasoning: str
    available_spokes: list[str]
