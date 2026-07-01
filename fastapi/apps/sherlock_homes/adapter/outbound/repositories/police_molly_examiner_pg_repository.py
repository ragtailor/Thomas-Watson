from __future__ import annotations

import logging

from sqlalchemy.ext.asyncio import AsyncSession

from sherlock_homes.app.dtos.police_molly_examiner_dto import MollyExaminerQuery, MollyExaminerResponse
from sherlock_homes.app.ports.output.police_molly_examiner_repository import MollyExaminerRepository

logger = logging.getLogger(__name__)


class MollyExaminerPgRepository(MollyExaminerRepository):

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def introduce_myself(self, query: MollyExaminerQuery) -> MollyExaminerResponse:
        '''몰리의 자기소개'''
        logger.info(f"[MollyExaminerPgRepository] introduce_myself | id={query.id} name={query.name}")
        return MollyExaminerResponse(
            id=query.id,
            name=query.name,
        )
