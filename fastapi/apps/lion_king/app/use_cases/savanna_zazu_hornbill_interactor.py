from __future__ import annotations

from tailor.apps.lion_king.adapter.inbound.api.schemas.savanna_zazu_hornbill_schema import ZazuHornbillSchema
from tailor.apps.lion_king.app.dtos.savanna_zazu_hornbill_dto import ZazuHornbillQuery, ZazuHornbillResponse
from tailor.apps.lion_king.app.ports.input.savanna_zazu_hornbill_use_case import ZazuHornbillUseCase
from tailor.apps.lion_king.app.ports.output.savanna_zazu_hornbill_repository import ZazuHornbillRepository


class ZazuHornbillInteractor(ZazuHornbillUseCase):

    def __init__(self, repository: ZazuHornbillRepository):
        self.repository = repository

    async def introduce_myself(self, schema: ZazuHornbillSchema) -> ZazuHornbillResponse:
        '''자주의 자기소개 인터렉트'''

        return await self.repository.introduce_myself(ZazuHornbillQuery(
            id = schema.id,
            name = schema.name
        ))
