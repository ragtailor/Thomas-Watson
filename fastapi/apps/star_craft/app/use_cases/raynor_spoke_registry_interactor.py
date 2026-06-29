from __future__ import annotations

from star_craft.app.dtos.raynor_spoke_registry_dto import SpokeListQuery, SpokeListResponse
from star_craft.app.ports.input.raynor_spoke_registry_use_case import RaynorSpokeRegistryUseCase
from star_craft.app.ports.output.raynor_spoke_registry_port import RaynorSpokeRegistryPort


class RaynorSpokeRegistryInteractor(RaynorSpokeRegistryUseCase):

    def __init__(self, port: RaynorSpokeRegistryPort) -> None:
        self._port = port

    async def list_spokes(self, query: SpokeListQuery) -> SpokeListResponse:
        return await self._port.list_spokes(query)
