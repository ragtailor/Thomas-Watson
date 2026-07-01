from fastapi import APIRouter, Depends

from sherlock_homes.adapter.inbound.api.schemas.detective_watson_watcher_schema import WatsonWatcherSchema
from sherlock_homes.app.dtos.detective_watson_watcher_dto import WatsonWatcherResponse
from sherlock_homes.app.ports.input.detective_watson_watcher_use_case import WatsonWatcherUseCase
from sherlock_homes.dependencies.detective_watson_watcher_provider import get_watson_watcher_use_case

'''
존 왓슨 (John)
역할 (keyword): watcher (관찰/기록자)
셜록의 파트너인 사설 탐정 조력자.
셜록의 모든 추론 과정을 블로그에 기록하듯, 시스템의 이벤트·로그·상태 변화를 관찰하고 기록합니다.
'''

watson_watcher_router = APIRouter(prefix="/watson", tags=["watson"])


@watson_watcher_router.get("/myself")
async def introduce_myself(
    watson: WatsonWatcherUseCase = Depends(get_watson_watcher_use_case)
) -> WatsonWatcherResponse:
    return await watson.introduce_myself(
        WatsonWatcherSchema(
            id=10,
            name="존 왓슨 (John)"
        )
    )
