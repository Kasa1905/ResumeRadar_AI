from pydantic import BaseModel, field_validator
from typing import Optional, List, Dict
from datetime import datetime


class AnalyzeRequest(BaseModel):
    github_url: str

    @field_validator("github_url", mode="before")
    @classmethod
    def validate_github_url(cls, v):
        if not isinstance(v, str):
            raise ValueError("Invalid GitHub URL format")
        if not v.startswith("https://github.com/"):
            raise ValueError("Invalid GitHub URL format")
        parts = v.rstrip("/").split("/")
        if len(parts) < 4 or not parts[-1]:
            raise ValueError("Invalid GitHub URL format")
        return v


class RepositoryAnalysis(BaseModel):
    has_description: bool
    has_readme: bool
    multiple_languages: bool
    recently_updated: bool
    has_topics: bool
    has_external_link: bool
    strong_project: bool


class RepositoryResponse(BaseModel):
    name: str
    description: Optional[str]
    primary_language: Optional[str]
    topics: List[str]
    last_updated: datetime
    default_branch: str
    readme_first_lines: Optional[str]
    analysis: RepositoryAnalysis


class GitHubAnalysisResponse(BaseModel):
    github: dict


class AnalyzeResponse(BaseModel):
    github: dict


class ErrorResponse(BaseModel):
    error: str
    detail: str
    status_code: int
