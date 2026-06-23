from __future__ import annotations

from tailor.apps.sherlock_homes.adapter.inbound.api.schemas.detective_watson_executor_dto import WatsonExecutorDto
from tailor.apps.sherlock_homes.app.dtos.detective_watson_executor_dto import WatsonExecutorQuery, WatsonExecutorResponse
from tailor.apps.sherlock_homes.app.ports.input.detective_watson_executor_use_case import WatsonExecutorUseCase
from tailor.apps.sherlock_homes.app.ports.output.detective_watson_executor_repository import WatsonExecutorRepository


class WatsonExecutorInteractor(WatsonExecutorUseCase):

    def __init__(self, repository: WatsonExecutorRepository):
        self.repository = repository

    async def introduce_myself(self, schema: WatsonExecutorDto) -> WatsonExecutorResponse:
        '''존 왓슨의 자기소개 인터렉트'''
        return await self.repository.introduce_myself(WatsonExecutorQuery(
            id=schema.id,
            name=schema.name
        ))
