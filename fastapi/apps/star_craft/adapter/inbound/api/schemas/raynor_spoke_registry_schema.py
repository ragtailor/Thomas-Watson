from pydantic import BaseModel


class SpokeInfoResult(BaseModel):
    name: str
    description: str
    capabilities: list[str]
    status: str


class SpokeListResult(BaseModel):
    spokes: list[SpokeInfoResult]
