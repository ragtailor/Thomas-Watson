from __future__ import annotations

from fastapi import APIRouter, Depends

from star_craft.adapter.inbound.api.schemas.kerrigan_context_router_schema import (
    ContextRouteRequest,
    ContextRouteResult,
)
from star_craft.app.dtos.kerrigan_context_router_dto import ContextRouteCommand
from star_craft.app.ports.input.kerrigan_context_router_use_case import KerriganContextRouterUseCase
from star_craft.dependencies.providers import get_kerrigan_use_case

kerrigan_router = APIRouter(prefix="/hub", tags=["star_craft:hub"])


@kerrigan_router.post("/route", response_model=ContextRouteResult)
async def route_context(
    request: ContextRouteRequest,
    use_case: KerriganContextRouterUseCase = Depends(get_kerrigan_use_case),
) -> ContextRouteResult:
    result = await use_case.route(ContextRouteCommand(query=request.query))
    return ContextRouteResult(
        target_spoke=result.target_spoke,
        reasoning=result.reasoning,
        available_spokes=result.available_spokes,
    )
