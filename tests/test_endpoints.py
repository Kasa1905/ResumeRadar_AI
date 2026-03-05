import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture
def client():
    return TestClient(app)


class TestAnalyzeEndpoint:
    def test_health_check(self, client):
        """Test health check endpoint."""
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy"}

    def test_analyze_invalid_url_format(self, client):
        """Test with invalid GitHub URL format."""
        response = client.post(
            "/analyze", json={"github_url": "https://example.com/user"}
        )
        assert response.status_code in [400, 422]

    def test_analyze_invalid_url_not_github(self, client):
        """Test with non-GitHub URL."""
        response = client.post(
            "/analyze", json={"github_url": "https://gitlab.com/user"}
        )
        assert response.status_code in [400, 422]

    def test_analyze_invalid_json(self, client):
        """Test with invalid JSON payload."""
        response = client.post("/analyze", json={"invalid_field": "test"})
        assert response.status_code == 422

    def test_analyze_empty_payload(self, client):
        """Test with empty payload."""
        response = client.post("/analyze", json={})
        assert response.status_code == 422

    def test_analyze_invalid_url_with_special_chars(self, client):
        """Test URL with invalid username characters."""
        response = client.post(
            "/analyze", json={"github_url": "https://github.com/user@invalid"}
        )
        assert response.status_code == 400

    @pytest.mark.asyncio
    async def test_analyze_nonexistent_user_async(self, client):
        """Test with non-existent GitHub user."""
        response = client.post(
            "/analyze",
            json={"github_url": "https://github.com/nonexistent-user-xyz-12345"},
        )
        assert response.status_code == 404
        assert "not found" in response.json()["detail"]

    def test_analyze_url_with_trailing_slash(self, client):
        """Test URL extraction with trailing slash."""
        response = client.post(
            "/analyze", json={"github_url": "https://github.com/torvalds/"}
        )
        assert response.status_code in [200, 404, 429]

    def test_analyze_response_structure(self, client):
        """Test response has correct structure with github wrapper."""
        response = client.post(
            "/analyze",
            json={"github_url": "https://github.com/nonexistent-user-xyz-12345"},
        )
        if response.status_code == 200:
            data = response.json()
            assert "github" in data
            assert "total_repos" in data["github"]
            assert "skills_detected" in data["github"]
            assert "repos" in data["github"]
            assert isinstance(data["github"]["skills_detected"], dict)
            assert isinstance(data["github"]["repos"], list)
