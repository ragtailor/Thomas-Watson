from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class SpokeListQuery:
    status_filter: str | None = None


@dataclass
class SpokeInfo:
    name: str
    description: str
    capabilities: list[str]
    status: str


@dataclass
class SpokeListResponse:
    spokes: list[SpokeInfo] = field(default_factory=list)
