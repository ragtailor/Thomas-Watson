from __future__ import annotations

import logging

logger = logging.getLogger(__name__)

from sqlalchemy.ext.asyncio import AsyncSession

from tailor.apps.silicon_valley.app.dtos.piper_gilfoyle_sys_dto import GilfoyleSysQuery, GilfoyleSysResponse


class GilfoyleSysRepository:

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def introduce_myself(self, query: GilfoyleSysQuery) -> GilfoyleSysResponse:
        '''길포일 시스템 자기소개 레포지터리 구현 메소드'''

        logger.info(f"[GilfoyleSysRepository] introduce_myself 진입 | request_data={query}")

        return GilfoyleSysResponse(
            id=query.id * 10000,
            name=query.name + "가 레포지토리에 다녀옴",
        )
