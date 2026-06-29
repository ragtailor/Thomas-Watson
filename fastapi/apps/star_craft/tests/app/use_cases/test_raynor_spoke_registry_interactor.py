import pytest
from unittest.mock import AsyncMock

from star_craft.app.dtos.raynor_spoke_registry_dto import SpokeInfo, SpokeListQuery, SpokeListResponse
from star_craft.app.use_cases.raynor_spoke_registry_interactor import RaynorSpokeRegistryInteractor


@pytest.fixture
def mock_port():
    return AsyncMock()


@pytest.fixture
def interactor(mock_port):
    return RaynorSpokeRegistryInteractor(mock_port)


async def test_list_spokes_delegates_to_port(interactor, mock_port):
    mock_port.list_spokes.return_value = SpokeListResponse(spokes=[
        SpokeInfo(name="titanic", description="test", capabilities=["ml"], status="active"),
    ])
    result = await interactor.list_spokes(SpokeListQuery())
    assert len(result.spokes) == 1
    assert result.spokes[0].name == "titanic"
    mock_port.list_spokes.assert_called_once()


async def test_list_spokes_passes_query_to_port(interactor, mock_port):
    mock_port.list_spokes.return_value = SpokeListResponse()
    query = SpokeListQuery(status_filter="active")
    await interactor.list_spokes(query)
    mock_port.list_spokes.assert_called_once_with(query)
