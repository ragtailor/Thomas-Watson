import pytest
from unittest.mock import AsyncMock

from star_craft.app.dtos.kerrigan_context_router_dto import ContextRouteCommand, ContextRouteResponse
from star_craft.app.use_cases.kerrigan_context_router_interactor import KerriganContextRouterInteractor


@pytest.fixture
def mock_port():
    return AsyncMock()


@pytest.fixture
def interactor(mock_port):
    return KerriganContextRouterInteractor(mock_port)


async def test_route_delegates_to_port(interactor, mock_port):
    mock_port.route.return_value = ContextRouteResponse(
        target_spoke="titanic",
        reasoning="test",
        available_spokes=["titanic"],
    )
    result = await interactor.route(ContextRouteCommand(query="타이타닉 승객 조회"))
    assert result.target_spoke == "titanic"
    mock_port.route.assert_called_once()


async def test_route_passes_command_to_port(interactor, mock_port):
    mock_port.route.return_value = ContextRouteResponse(
        target_spoke="silicon_valley",
        reasoning="test",
        available_spokes=[],
    )
    command = ContextRouteCommand(query="AI 분석")
    await interactor.route(command)
    mock_port.route.assert_called_once_with(command)
