from __future__ import annotations

import logging

from sqlalchemy.ext.asyncio import AsyncSession

from sherlock_homes.app.dtos.detective_mary_mail_dto import MaryMailQuery, MaryMailResponse
from sherlock_homes.app.ports.output.detective_mary_mail_repository import MaryMailRepository

logger = logging.getLogger(__name__)


class MaryMailPgRepository(MaryMailRepository):

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def introduce_myself(self, query: MaryMailQuery) -> MaryMailResponse:
        '''메리 왓슨의 자기소개'''
        logger.info(f"[MaryMailPgRepository] introduce_myself | id={query.id} name={query.name}")
        return MaryMailResponse(
            id=query.id,
            name=query.name,
        )
