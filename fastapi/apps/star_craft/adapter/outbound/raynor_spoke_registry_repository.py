from __future__ import annotations

from star_craft.app.dtos.raynor_spoke_registry_dto import SpokeInfo, SpokeListQuery, SpokeListResponse
from star_craft.app.ports.output.raynor_spoke_registry_port import RaynorSpokeRegistryPort
from star_craft.domain.spoke_registry import SpokeApp, SpokeStatus

_REGISTRY: list[SpokeApp] = [
    SpokeApp("silicon_valley", "AI 에이전트, 문서 벡터", ["ai", "vector-search"]),
    SpokeApp("titanic", "타이타닉 승객 CSV 업로드·조회", ["ml", "csv"]),
    SpokeApp("kingsman", "사용자·관리자 관리", ["auth", "user-management"]),
    SpokeApp("lion_king", "소셜 기능", ["social"]),
    SpokeApp("sherlock_homes", "문서 분석", ["document-analysis"]),
    SpokeApp("harry_porter", "(미정)", []),
    SpokeApp("jobs", "DB 헬스체크", ["health"]),
]


class RaynorSpokeRegistryRepository(RaynorSpokeRegistryPort):

    async def list_spokes(self, query: SpokeListQuery) -> SpokeListResponse:
        spokes = _REGISTRY
        if query.status_filter:
            target = SpokeStatus(query.status_filter)
            spokes = [s for s in spokes if s.status == target]
        return SpokeListResponse(
            spokes=[
                SpokeInfo(
                    name=s.name,
                    description=s.description,
                    capabilities=s.capabilities,
                    status=s.status.value,
                )
                for s in spokes
            ]
        )
