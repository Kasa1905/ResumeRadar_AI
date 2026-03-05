import pytest
from github_service import GitHubService, InvalidURLError
from datetime import datetime, timedelta, timezone


class TestGitHubService:
    @pytest.fixture
    def service(self):
        return GitHubService()

    @pytest.mark.asyncio
    async def test_extract_username_valid(self, service):
        """Test extracting valid username from GitHub URL."""
        url = "https://github.com/torvalds"
        username = await service.extract_username(url)
        assert username == "torvalds"

    @pytest.mark.asyncio
    async def test_extract_username_with_trailing_slash(self, service):
        """Test extracting username from URL with trailing slash."""
        url = "https://github.com/torvalds/"
        username = await service.extract_username(url)
        assert username == "torvalds"

    @pytest.mark.asyncio
    async def test_extract_username_invalid_url(self, service):
        """Test with invalid GitHub URL format."""
        with pytest.raises(InvalidURLError):
            await service.extract_username("https://example.com/user")

    @pytest.mark.asyncio
    async def test_extract_username_empty_path(self, service):
        """Test with just the domain."""
        with pytest.raises(InvalidURLError):
            await service.extract_username("https://github.com/")

    @pytest.mark.asyncio
    async def test_extract_username_invalid_characters(self, service):
        """Test username with invalid characters."""
        with pytest.raises(InvalidURLError):
            await service.extract_username("https://github.com/user@invalid")

    @pytest.mark.asyncio
    async def test_extract_username_with_hyphen(self, service):
        """Test username with hyphen (valid)."""
        url = "https://github.com/john-doe"
        username = await service.extract_username(url)
        assert username == "john-doe"

    @pytest.mark.asyncio
    async def test_extract_username_with_underscore(self, service):
        """Test username with underscore (valid)."""
        url = "https://github.com/john_doe"
        username = await service.extract_username(url)
        assert username == "john_doe"

    def test_has_external_link_with_url(self, service):
        """Test external link detection with URL in README."""
        readme = "Check out https://example.com for more info"
        assert service._has_external_link(readme) is True

    def test_has_external_link_without_url(self, service):
        """Test external link detection without URL in README."""
        readme = "This is a simple README without links"
        assert service._has_external_link(readme) is False

    def test_has_external_link_with_markdown_link(self, service):
        """Test external link detection with markdown link."""
        readme = "[Visit](https://example.com)"
        assert service._has_external_link(readme) is True

    def test_has_external_link_with_none(self, service):
        """Test external link detection with None."""
        assert service._has_external_link(None) is False

    def test_has_external_link_multiple_urls(self, service):
        """Test external link detection with multiple URLs."""
        readme = "See https://example1.com and https://example2.com"
        assert service._has_external_link(readme) is True

    def test_detect_technologies_from_text_flask(self, service):
        """Test technology detection with Flask keyword."""
        text = "This project uses Flask framework for the backend."
        detected = service._detect_technologies_from_text(text)
        assert "Flask" in detected

    def test_detect_technologies_from_text_multiple(self, service):
        """Test technology detection with multiple technologies."""
        text = "Built with React frontend and FastAPI backend, deployed on Docker."
        detected = service._detect_technologies_from_text(text)
        assert "React" in detected
        assert "FastAPI" in detected
        assert "Docker" in detected

    def test_detect_technologies_from_text_case_insensitive(self, service):
        """Test technology detection is case-insensitive."""
        text = "TENSORFLOW machine learning with REACT frontend"
        detected = service._detect_technologies_from_text(text)
        assert "TensorFlow" in detected
        assert "React" in detected

    def test_detect_technologies_from_text_none(self, service):
        """Test technology detection with None input."""
        detected = service._detect_technologies_from_text(None)
        assert detected == []

    def test_detect_technologies_from_text_no_match(self, service):
        """Test technology detection with no matching keywords."""
        text = "This is a simple project with custom tooling."
        detected = service._detect_technologies_from_text(text)
        assert detected == []
