from __future__ import annotations

from abc import ABC, abstractmethod

from star_craft.app.dtos.raynor_spoke_registry_dto import SpokeListQuery, SpokeListResponse


class RaynorSpokeRegistryPort(ABC):

    @abstractmethod
    async def list_spokes(self, query: SpokeListQuery) -> SpokeListResponse:
        pass
