import pytest
from linkedin_service import LinkedInService, InvalidLinkedInURLError, ProfileNotFoundError


class TestLinkedInService:
    @pytest.fixture
    def service(self):
        return LinkedInService()

    @pytest.mark.asyncio
    async def test_extract_profile_id_valid(self, service):
        """Test extracting valid profile ID from LinkedIn URL."""
        url = "https://www.linkedin.com/in/johndoe"
        profile_id = await service.extract_profile_id(url)
        assert profile_id == "johndoe"

    @pytest.mark.asyncio
    async def test_extract_profile_id_with_trailing_slash(self, service):
        """Test extracting profile ID from URL with trailing slash."""
        url = "https://www.linkedin.com/in/johndoe/"
        profile_id = await service.extract_profile_id(url)
        assert profile_id == "johndoe"

    @pytest.mark.asyncio
    async def test_extract_profile_id_without_www(self, service):
        """Test extracting profile ID from URL without www."""
        url = "https://linkedin.com/in/johndoe"
        profile_id = await service.extract_profile_id(url)
        assert profile_id == "johndoe"

    @pytest.mark.asyncio
    async def test_extract_profile_id_without_https(self, service):
        """Test extracting profile ID from URL without https."""
        url = "linkedin.com/in/johndoe"
        profile_id = await service.extract_profile_id(url)
        assert profile_id == "johndoe"

    @pytest.mark.asyncio
    async def test_extract_profile_id_with_hyphens(self, service):
        """Test extracting profile ID with hyphens."""
        url = "https://www.linkedin.com/in/john-doe-123"
        profile_id = await service.extract_profile_id(url)
        assert profile_id == "john-doe-123"

    @pytest.mark.asyncio
    async def test_extract_profile_id_invalid_url(self, service):
        """Test with invalid LinkedIn URL."""
        with pytest.raises(InvalidLinkedInURLError):
            await service.extract_profile_id("https://example.com/profile")

    @pytest.mark.asyncio
    async def test_extract_profile_id_empty_url(self, service):
        """Test with empty URL."""
        with pytest.raises(InvalidLinkedInURLError):
            await service.extract_profile_id("")

    @pytest.mark.asyncio
    async def test_extract_profile_id_missing_profile_id(self, service):
        """Test with URL missing profile ID."""
        with pytest.raises(InvalidLinkedInURLError):
            await service.extract_profile_id("https://www.linkedin.com/in/")

    @pytest.mark.asyncio
    async def test_extract_profile_id_company_url(self, service):
        """Test with company URL instead of profile URL."""
        with pytest.raises(InvalidLinkedInURLError):
            await service.extract_profile_id("https://www.linkedin.com/company/microsoft")

    def test_extract_certifications_empty_html(self, service):
        """Test extracting certifications from empty HTML."""
        certifications = service._extract_certifications("")
        assert certifications == []

    def test_extract_certifications_no_matches(self, service):
        """Test extracting certifications when no patterns match."""
        html = "<html><body>No certifications here</body></html>"
        certifications = service._extract_certifications(html)
        assert certifications == []

    def test_extract_roles_empty_html(self, service):
        """Test extracting roles from empty HTML."""
        roles = service._extract_roles("")
        assert roles == []

    def test_extract_roles_no_matches(self, service):
        """Test extracting roles when no patterns match."""
        html = "<html><body>No roles here</body></html>"
        roles = service._extract_roles(html)
        assert roles == []

    def test_create_placeholder_profile(self, service):
        """Test creating placeholder profile."""
        aggregated, profile = service._create_placeholder_profile("johndoe")
        assert aggregated["total_certifications"] == 0
        assert aggregated["total_roles"] == 0
        assert profile.profile_id == "johndoe"
        assert profile.certifications == []
        assert profile.roles == []
        assert "authentication" in profile.access_note.lower()

    @pytest.mark.asyncio
    async def test_fetch_linkedin_profile_returns_structure(self, service):
        """Test that fetch_linkedin_profile returns proper structure."""
        # This will likely return placeholder data due to LinkedIn restrictions
        try:
            aggregated, profile = await service.fetch_linkedin_profile(
                "https://www.linkedin.com/in/test-profile"
            )
            assert "total_certifications" in aggregated
            assert "total_roles" in aggregated
            assert hasattr(profile, "profile_id")
            assert hasattr(profile, "certifications")
            assert hasattr(profile, "roles")
        except ProfileNotFoundError:
            # Expected for non-existent profiles
            pass
