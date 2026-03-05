from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from models import AnalyzeRequest, AnalyzeResponse, ErrorResponse
from github_service import (
    GitHubService,
    UserNotFoundError,
    RateLimitError,
    InvalidURLError,
    GitHubServiceError,
)
from linkedin_service import (
    LinkedInService,
    InvalidLinkedInURLError,
    ProfileNotFoundError,
)

app = FastAPI(title="ResumeRadar AI", version="1.0.0")


@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=400,
        content={"detail": "Invalid GitHub URL format"},
    )


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    """
    Analyze a GitHub user's repositories and optionally LinkedIn profile.
    
    Request body:
    {
        "github_url": "https://github.com/Kasa1905",
        "linkedin_url": "https://linkedin.com/in/username" (optional)
    }
    """
    github_service = GitHubService()
    linkedin_service = LinkedInService()

    response = {}

    # Process GitHub profile
    try:
        username = await github_service.extract_username(str(request.github_url))
        repositories, skills_detected = await github_service.fetch_user_repositories(username)

        response["github"] = {
            "total_repos": len(repositories),
            "skills_detected": skills_detected,
            "repos": [repo.model_dump() for repo in repositories],
        }

    except InvalidURLError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RateLimitError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except GitHubServiceError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

    # Process LinkedIn profile if provided
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

        except InvalidLinkedInURLError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except ProfileNotFoundError as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            # Don't fail the entire request if LinkedIn fails
            response["linkedin"] = {
                "error": "Failed to fetch LinkedIn profile",
                "detail": str(e),
            }

    return response


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}
