import json

import pytest

from netlify.functions import api


def test_health_handler():
    response = api.handler({"httpMethod": "GET", "path": "/.netlify/functions/api/health"}, None)

    assert response["statusCode"] == 200
    assert json.loads(response["body"])["status"] == "ok"


def test_unknown_route_handler():
    response = api.handler({"httpMethod": "GET", "path": "/.netlify/functions/api/missing"}, None)

    assert response["statusCode"] == 404


def test_invalid_analysis_request():
    response = api.handler(
        {
            "httpMethod": "POST",
            "path": "/.netlify/functions/api/analyze",
            "body": json.dumps({"github_url": "https://example.com/user"}),
        },
        None,
    )

    assert response["statusCode"] == 400
    assert json.loads(response["body"])["error"] == "Invalid request"


@pytest.mark.parametrize("path", ["/.netlify/functions/api/analyze", "/api/analyze"])
def test_valid_analysis_request(monkeypatch, path):
    async def fake_analyze(body):
        assert body["github_url"] == "https://github.com/example"
        return {"github": {"total_repos": 0, "skills_detected": {}, "repos": []}}

    monkeypatch.setattr(api, "_analyze", fake_analyze)
    response = api.handler(
        {
            "httpMethod": "POST",
            "path": path,
            "body": json.dumps({"github_url": "https://github.com/example"}),
        },
        None,
    )

    assert response["statusCode"] == 200
    assert json.loads(response["body"])["github"]["total_repos"] == 0
