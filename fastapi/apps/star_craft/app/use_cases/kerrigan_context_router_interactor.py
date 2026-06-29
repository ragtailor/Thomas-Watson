from __future__ import annotations

from star_craft.app.dtos.kerrigan_context_router_dto import ContextRouteCommand, ContextRouteResponse
from star_craft.app.ports.input.kerrigan_context_router_use_case import KerriganContextRouterUseCase
from star_craft.app.ports.output.kerrigan_context_router_port import KerriganContextRouterPort


class KerriganContextRouterInteractor(KerriganContextRouterUseCase):

    def __init__(self, port: KerriganContextRouterPort) -> None:
        self._port = port

    async def route(self, command: ContextRouteCommand) -> ContextRouteResponse:
        return await self._port.route(command)
