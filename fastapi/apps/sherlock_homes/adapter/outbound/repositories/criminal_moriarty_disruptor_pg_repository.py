from __future__ import annotations

import logging

from sqlalchemy.ext.asyncio import AsyncSession

from sherlock_homes.app.dtos.criminal_moriarty_disruptor_dto import MoriartyDisruptorQuery, MoriartyDisruptorResponse
from sherlock_homes.app.ports.output.criminal_moriarty_disruptor_repository import MoriartyDisruptorRepository

logger = logging.getLogger(__name__)


class MoriartyDisruptorPgRepository(MoriartyDisruptorRepository):

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def introduce_myself(self, query: MoriartyDisruptorQuery) -> MoriartyDisruptorResponse:
        '''모리어티의 자기소개'''
        logger.info(f"[MoriartyDisruptorPgRepository] introduce_myself | id={query.id} name={query.name}")
        return MoriartyDisruptorResponse(
            id=query.id,
            name=query.name,
        )
