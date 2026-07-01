from __future__ import annotations

from abc import ABC, abstractmethod

from sherlock_homes.adapter.inbound.api.schemas.detective_mary_mail_schema import MaryMailSchema
from sherlock_homes.app.dtos.detective_mary_mail_dto import MaryMailResponse


class MaryMailUseCase(ABC):

    @abstractmethod
    async def introduce_myself(self, schema: MaryMailSchema) -> MaryMailResponse:
        '''메리 왓슨의 자기소개 메소드'''
        pass
