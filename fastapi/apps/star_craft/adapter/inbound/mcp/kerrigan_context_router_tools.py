from mcp.server.fastmcp import FastMCP

mcp = FastMCP("StarCraft Hub")


@mcp.tool("route_to_spoke")
async def route_to_spoke(query: str) -> str:
    """사용자 쿼리를 분석하여 적절한 스포크 앱으로 라우팅한다."""
    # TODO: KerriganContextRouterInteractor 연결
    return f"query='{query}' → 라우팅 대기 중"
