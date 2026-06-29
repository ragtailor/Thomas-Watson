from pydantic import BaseModel


class ContextRouteRequest(BaseModel):
    query: str


class ContextRouteResult(BaseModel):
    target_spoke: str
    reasoning: str
    available_spokes: list[str]
