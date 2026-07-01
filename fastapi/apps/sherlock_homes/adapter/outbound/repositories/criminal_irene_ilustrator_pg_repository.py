from __future__ import annotations

import logging

from sqlalchemy.ext.asyncio import AsyncSession

from sherlock_homes.app.dtos.criminal_irene_ilustrator_dto import IreneIlustratorQuery, IreneIlustratorResponse
from sherlock_homes.app.ports.output.criminal_irene_ilustrator_repository import IreneIlustratorRepository

logger = logging.getLogger(__name__)


class IreneIlustratorPgRepository(IreneIlustratorRepository):

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def introduce_myself(self, query: IreneIlustratorQuery) -> IreneIlustratorResponse:
        '''아이린 애들러의 자기소개'''
        logger.info(f"[IreneIlustratorPgRepository] introduce_myself | id={query.id} name={query.name}")
        return IreneIlustratorResponse(
            id=query.id,
            name=query.name,
        )
