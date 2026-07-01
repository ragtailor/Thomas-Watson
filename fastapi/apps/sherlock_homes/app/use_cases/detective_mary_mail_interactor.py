from __future__ import annotations

from sherlock_homes.adapter.inbound.api.schemas.detective_mary_mail_schema import MaryMailSchema
from sherlock_homes.app.dtos.detective_mary_mail_dto import MaryMailQuery, MaryMailResponse
from sherlock_homes.app.ports.input.detective_mary_mail_use_case import MaryMailUseCase
from sherlock_homes.app.ports.output.detective_mary_mail_repository import MaryMailRepository


class MaryMailInteractor(MaryMailUseCase):

    def __init__(self, repository: MaryMailRepository):
        self.repository = repository

    async def introduce_myself(self, schema: MaryMailSchema) -> MaryMailResponse:
        '''메리 왓슨의 자기소개 인터렉트'''
        return await self.repository.introduce_myself(MaryMailQuery(
            id=schema.id,
            name=schema.name
        ))
