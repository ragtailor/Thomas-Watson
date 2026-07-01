from __future__ import annotations

from sherlock_homes.adapter.inbound.api.schemas.detective_watson_watcher_schema import WatsonWatcherSchema
from sherlock_homes.app.dtos.detective_watson_watcher_dto import WatsonWatcherQuery, WatsonWatcherResponse
from sherlock_homes.app.ports.input.detective_watson_watcher_use_case import WatsonWatcherUseCase
from sherlock_homes.app.ports.output.detective_watson_watcher_repository import WatsonWatcherRepository


class WatsonWatcherInteractor(WatsonWatcherUseCase):

    def __init__(self, repository: WatsonWatcherRepository):
        self.repository = repository

    async def introduce_myself(self, schema: WatsonWatcherSchema) -> WatsonWatcherResponse:
        '''존 왓슨의 자기소개 인터렉트'''
        return await self.repository.introduce_myself(WatsonWatcherQuery(
            id=schema.id,
            name=schema.name
        ))
