from __future__ import annotations

from fastapi import APIRouter, Depends

from star_craft.adapter.inbound.api.schemas.raynor_spoke_registry_schema import (
    SpokeInfoResult,
    SpokeListResult,
)
from star_craft.app.dtos.raynor_spoke_registry_dto import SpokeListQuery
from star_craft.app.ports.input.raynor_spoke_registry_use_case import RaynorSpokeRegistryUseCase
from star_craft.dependencies.providers import get_raynor_use_case

raynor_router = APIRouter(prefix="/hub", tags=["star_craft:hub"])


@raynor_router.get("/spokes", response_model=SpokeListResult)
async def list_spokes(
    use_case: RaynorSpokeRegistryUseCase = Depends(get_raynor_use_case),
) -> SpokeListResult:
    result = await use_case.list_spokes(SpokeListQuery())
    return SpokeListResult(
        spokes=[
            SpokeInfoResult(
                name=s.name,
                description=s.description,
                capabilities=s.capabilities,
                status=s.status,
            )
            for s in result.spokes
        ]
    )
