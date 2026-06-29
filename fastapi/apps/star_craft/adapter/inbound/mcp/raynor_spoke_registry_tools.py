from mcp.server.fastmcp import FastMCP

mcp = FastMCP("StarCraft Hub")

_SPOKES = [
    "silicon_valley", "titanic", "kingsman",
    "lion_king", "sherlock_homes", "harry_porter", "jobs",
]


@mcp.tool("list_spokes")
async def list_spokes() -> str:
    """허브에 등록된 모든 스포크 앱 목록을 반환한다."""
    return ", ".join(_SPOKES)
