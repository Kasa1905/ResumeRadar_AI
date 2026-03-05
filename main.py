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
    Analyze a GitHub user's repositories.
    
    Request body:
    {
        "github_url": "https://github.com/Kasa1905"
    }
    """
    service = GitHubService()

    try:
        username = await service.extract_username(str(request.github_url))
        repositories, skills_detected = await service.fetch_user_repositories(username)

        response = {
            "github": {
                "total_repos": len(repositories),
                "skills_detected": skills_detected,
                "repos": [repo.model_dump() for repo in repositories],
            }
        }

        return response

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


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}
