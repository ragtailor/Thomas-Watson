from __future__ import annotations

from star_craft.app.dtos.kerrigan_context_router_dto import ContextRouteCommand, ContextRouteResponse
from star_craft.app.ports.output.kerrigan_context_router_port import KerriganContextRouterPort

_SPOKE_NAMES = [
    "silicon_valley", "titanic", "kingsman",
    "lion_king", "sherlock_homes", "harry_porter", "jobs",
]


class KerriganContextRouterRepository(KerriganContextRouterPort):
    """컨텍스트 라우팅 구현체. 현재는 placeholder — LLM 또는 규칙 기반 라우터로 교체 예정."""

    async def route(self, command: ContextRouteCommand) -> ContextRouteResponse:
        # TODO: LLM 기반 라우팅 또는 키워드 규칙 구현
        return ContextRouteResponse(
            target_spoke="silicon_valley",
            reasoning="placeholder — 구현 전 기본값",
            available_spokes=_SPOKE_NAMES,
        )
