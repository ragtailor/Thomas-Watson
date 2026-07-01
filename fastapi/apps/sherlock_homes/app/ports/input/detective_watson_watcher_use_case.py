from __future__ import annotations

from abc import ABC, abstractmethod

from sherlock_homes.adapter.inbound.api.schemas.detective_watson_watcher_schema import WatsonWatcherSchema
from sherlock_homes.app.dtos.detective_watson_watcher_dto import WatsonWatcherResponse


class WatsonWatcherUseCase(ABC):

    @abstractmethod
    async def introduce_myself(self, schema: WatsonWatcherSchema) -> WatsonWatcherResponse:
        '''존 왓슨의 자기소개 메소드'''
        pass
