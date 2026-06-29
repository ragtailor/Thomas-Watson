import pytest

from star_craft.domain.spoke_registry import SpokeApp, SpokeStatus


def test_spoke_app_default_status_is_active():
    spoke = SpokeApp(name="titanic", description="test", capabilities=["ml"])
    assert spoke.status == SpokeStatus.ACTIVE


def test_spoke_app_can_be_set_inactive():
    spoke = SpokeApp(name="jobs", description="test", capabilities=[], status=SpokeStatus.INACTIVE)
    assert spoke.status == SpokeStatus.INACTIVE


def test_spoke_app_capabilities_defaults_to_empty_list():
    spoke = SpokeApp(name="harry_porter", description="미정")
    assert spoke.capabilities == []
