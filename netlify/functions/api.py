"""Netlify Functions entry point for the ResumeRadar API."""

import base64
import json
import sys
from pathlib import Path
from typing import Any

# Netlify packages the function from this directory; add the repository root so
# the existing service and model modules remain shared with the FastAPI app.
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from github_service import (
    GitHubService,
    GitHubServiceError,
    InvalidURLError,
    RateLimitError,
    UserNotFoundError,
)
from linkedin_service import (
    InvalidLinkedInURLError,
    LinkedInService,
    ProfileNotFoundError,
)
from models import AnalyzeRequest
from pydantic import ValidationError


JSON_HEADERS = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
}


def _response(status_code: int, body: dict[str, Any]) -> dict[str, Any]:
    return {
        "statusCode": status_code,
        "headers": JSON_HEADERS,
        "body": json.dumps(body),
    }


def _request_body(event: dict[str, Any]) -> dict[str, Any]:
    raw_body = event.get("body") or "{}"
    if event.get("isBase64Encoded"):
        raw_body = base64.b64decode(raw_body).decode("utf-8")
    parsed = json.loads(raw_body)
    if not isinstance(parsed, dict):
        raise ValueError("Request body must be a JSON object")
    return parsed


async def _analyze(body: dict[str, Any]) -> dict[str, Any]:
    request = AnalyzeRequest.model_validate(body)
    github_service = GitHubService()
    linkedin_service = LinkedInService()

    username = await github_service.extract_username(str(request.github_url))
    repositories, skills_detected = await github_service.fetch_user_repositories(username)
    response: dict[str, Any] = {
        "github": {
            "total_repos": len(repositories),
            "skills_detected": skills_detected,
            "repos": [repo.model_dump(mode="json") for repo in repositories],
        }
    }

    if request.linkedin_url:
        try:
            aggregated, profile = await linkedin_service.fetch_linkedin_profile(
                str(request.linkedin_url)
            )
            response["linkedin"] = {
                "profile_id": profile.profile_id,
                "total_certifications": aggregated["total_certifications"],
                "total_roles": aggregated["total_roles"],
                "certifications": profile.certifications,
                "roles": profile.roles,
                "access_note": profile.access_note,
            }
        except (InvalidLinkedInURLError, ProfileNotFoundError) as exc:
            response["linkedin"] = {"error": str(exc)}
        except Exception:
            response["linkedin"] = {
                "error": "Failed to fetch LinkedIn profile",
            }

    return response


async def _handle(event: dict[str, Any]) -> dict[str, Any]:
    method = str(event.get("httpMethod", "GET")).upper()
    path = str(event.get("path", "")).rstrip("/")
    endpoint = path.rsplit("/", 1)[-1] if path else ""

    if method == "GET" and endpoint == "health":
        return _response(200, {"status": "ok", "version": "1.0.0"})

    if method != "POST" or endpoint != "analyze":
        return _response(404, {"error": "Not found"})

    try:
        data = await _analyze(_request_body(event))
        return _response(200, data)
    except (ValidationError, ValueError, InvalidURLError, InvalidLinkedInURLError) as exc:
        return _response(400, {"error": "Invalid request", "detail": str(exc)})
    except UserNotFoundError as exc:
        return _response(404, {"error": "GitHub user not found", "detail": str(exc)})
    except RateLimitError as exc:
        return _response(429, {"error": "GitHub rate limit exceeded", "detail": str(exc)})
    except GitHubServiceError as exc:
        return _response(502, {"error": "GitHub service error", "detail": str(exc)})
    except Exception:
        return _response(500, {"error": "Internal server error"})


def handler(event: dict[str, Any], context: Any) -> dict[str, Any]:
    """Netlify Python Functions synchronous entry point."""
    import asyncio

    return asyncio.run(_handle(event))
