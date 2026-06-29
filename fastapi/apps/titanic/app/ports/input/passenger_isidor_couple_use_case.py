from __future__ import annotations

from abc import ABC, abstractmethod

from tailor.apps.titanic.adapter.inbound.api.schemas.passenger_isidor_couple_schema import IsidorCoupleSchema
from tailor.apps.titanic.app.dtos.passenger_isidor_couple_dto import IsidorCoupleResponse


class IsidorCoupleUseCase(ABC):

    @abstractmethod
    async def introduce_myself(self, schema: IsidorCoupleSchema) -> IsidorCoupleResponse:
        pass
