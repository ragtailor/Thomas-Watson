from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum


class SpokeStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"


@dataclass
class SpokeApp:
    name: str
    description: str
    capabilities: list[str] = field(default_factory=list)
    status: SpokeStatus = SpokeStatus.ACTIVE
