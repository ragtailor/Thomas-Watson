from __future__ import annotations

from abc import ABC, abstractmethod

from star_craft.app.dtos.kerrigan_context_router_dto import ContextRouteCommand, ContextRouteResponse


class KerriganContextRouterPort(ABC):

    @abstractmethod
    async def route(self, command: ContextRouteCommand) -> ContextRouteResponse:
        pass
