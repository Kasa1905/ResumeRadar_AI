from pydantic import BaseModel, field_validator
from typing import Optional, List, Dict
from datetime import datetime


class AnalyzeRequest(BaseModel):
    github_url: str
    linkedin_url: Optional[str] = None

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

    @field_validator("linkedin_url", mode="before")
    @classmethod
    def validate_linkedin_url(cls, v):
        if v is None or v == "":
            return None
        if not isinstance(v, str):
            raise ValueError("Invalid LinkedIn URL format")
        # Basic validation - more detailed validation in service
        if "linkedin.com/in/" not in v.lower():
            raise ValueError("Invalid LinkedIn URL format")
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
    linkedin: Optional[dict] = None


class ErrorResponse(BaseModel):
    error: str
    detail: str
    status_code: int


class LinkedInProfile(BaseModel):
    profile_id: str
    certifications: List[Dict[str, str]]
    roles: List[Dict[str, str]]
    access_note: Optional[str] = None


class LinkedInAnalysisResponse(BaseModel):
    linkedin: dict

