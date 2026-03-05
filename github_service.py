import httpx
import re
from typing import Optional, List, Dict, Tuple
from datetime import datetime, timedelta, timezone
from config import GITHUB_TOKEN, GITHUB_API_BASE_URL
from models import RepositoryResponse, RepositoryAnalysis


class GitHubServiceError(Exception):
    pass


class UserNotFoundError(GitHubServiceError):
    pass


class RateLimitError(GitHubServiceError):
    pass


class InvalidURLError(GitHubServiceError):
    pass


class GitHubService:
    # Technology keywords to detect in README files
    TECH_KEYWORDS = {
        "Flask": ["flask", "flask-"],
        "FastAPI": ["fastapi", "fast-api"],
        "React": ["react", "reactjs", "react.js"],
        "Node": ["node.js", "nodejs", "node "],
        "TensorFlow": ["tensorflow", "tf."],
        "Docker": ["docker", "dockerfile"],
        "OpenCV": ["opencv", "cv2"],
        "Django": ["django"],
        "Vue": ["vue.js", "vuejs", "vue "],
        "Angular": ["angular"],
        "Spring": ["spring boot", "spring-boot", "springframework"],
        "Express": ["express.js", "expressjs"],
        "MongoDB": ["mongodb", "mongo"],
        "PostgreSQL": ["postgresql", "postgres"],
        "Redis": ["redis"],
        "Kubernetes": ["kubernetes", "k8s"],
        "AWS": ["aws", "amazon web services"],
        "Azure": ["azure"],
        "GCP": ["google cloud", "gcp"],
    }
    
    def __init__(self):
        self.base_url = GITHUB_API_BASE_URL
        self.token = GITHUB_TOKEN
        self.headers = {}
        if self.token:
            self.headers["Authorization"] = f"token {self.token}"
        self.headers["Accept"] = "application/vnd.github.v3+json"

    async def extract_username(self, github_url: str) -> str:
        """Extract username from GitHub URL."""
        try:
            url_str = str(github_url).rstrip("/")
            if not url_str.startswith("https://github.com/"):
                raise InvalidURLError("Invalid GitHub URL format")
            parts = url_str.split("/")
            if len(parts) < 4 or parts[-1] == "":
                raise InvalidURLError("Invalid GitHub URL format")
            username = parts[-1]
            if not username or not username.replace("-", "").replace("_", "").isalnum():
                raise InvalidURLError("Invalid username in GitHub URL")
            return username
        except InvalidURLError:
            raise
        except (IndexError, AttributeError):
            raise InvalidURLError("Invalid GitHub URL format")

    async def fetch_user_repositories(self, username: str) -> Tuple[List[RepositoryResponse], Dict[str, int]]:
        """Fetch all public repositories for a GitHub user and aggregate skills."""
        repositories = []
        skills_detected = {}
        page = 1

        async with httpx.AsyncClient(timeout=10.0) as client:
            while True:
                url = f"{self.base_url}/users/{username}/repos"
                params = {
                    "type": "public",
                    "per_page": 100,
                    "page": page,
                    "sort": "updated",
                    "direction": "desc",
                }

                response = await client.get(url, headers=self.headers, params=params)

                if response.status_code == 404:
                    raise UserNotFoundError(f"GitHub user '{username}' not found")

                if response.status_code == 403:
                    raise RateLimitError("GitHub API rate limit exceeded")

                if response.status_code != 200:
                    raise GitHubServiceError(
                        f"GitHub API error: {response.status_code}"
                    )

                repos = response.json()
                if not repos:
                    break

                for repo in repos:
                    repo_data = await self._process_repository(client, username, repo)
                    repositories.append(repo_data)
                    
                    # Aggregate primary language
                    if repo_data.primary_language:
                        skills_detected[repo_data.primary_language] = skills_detected.get(repo_data.primary_language, 0) + 1
                    
                    # Fetch and aggregate all languages from the repo
                    repo_languages = await self._fetch_repository_languages(client, username, repo["name"])
                    for lang in repo_languages:
                        if lang not in skills_detected:
                            skills_detected[lang] = 0
                        skills_detected[lang] += 1
                    
                    # Detect technologies from README
                    if repo_data.readme_first_lines:
                        detected_techs = self._detect_technologies_from_text(repo_data.readme_first_lines)
                        for tech in detected_techs:
                            skills_detected[tech] = skills_detected.get(tech, 0) + 1

                if len(repos) < 100:
                    break

                page += 1

        return repositories, skills_detected

    async def _process_repository(
        self, client: httpx.AsyncClient, username: str, repo: dict
    ) -> RepositoryResponse:
        """Process a single repository and fetch additional data."""
        readme = None

        if not repo.get("empty"):
            readme = await self._fetch_readme(client, username, repo["name"])

        # Compute analysis fields
        has_description = bool(repo.get("description") and repo.get("description").strip())
        has_readme = readme is not None
        has_topics = bool(repo.get("topics") and len(repo.get("topics", [])) > 0)
        
        # Check if recently updated (within 365 days)
        last_updated = datetime.fromisoformat(repo["updated_at"].replace("Z", "+00:00"))
        now = datetime.now(timezone.utc)
        recently_updated = (now - last_updated) <= timedelta(days=365)
        
        # Check for multiple languages (detect from README or use language field)
        multiple_languages = False
        
        # Check for external links in README
        has_external_link = self._has_external_link(readme)
        
        # strong_project: has_readme AND has_description AND recently_updated
        strong_project = has_readme and has_description and recently_updated
        
        analysis = RepositoryAnalysis(
            has_description=has_description,
            has_readme=has_readme,
            multiple_languages=multiple_languages,
            recently_updated=recently_updated,
            has_topics=has_topics,
            has_external_link=has_external_link,
            strong_project=strong_project,
        )

        return RepositoryResponse(
            name=repo["name"],
            description=repo.get("description"),
            primary_language=repo.get("language"),
            topics=repo.get("topics", []),
            last_updated=repo["updated_at"],
            default_branch=repo.get("default_branch", "main"),
            readme_first_lines=readme,
            analysis=analysis,
        )

    async def _fetch_readme(
        self, client: httpx.AsyncClient, username: str, repo_name: str
    ) -> Optional[str]:
        """Fetch the first 5 lines of README file."""
        url = f"{self.base_url}/repos/{username}/{repo_name}/readme"
        headers = {**self.headers, "Accept": "application/vnd.github.v3.raw"}

        response = await client.get(url, headers=headers)

        if response.status_code == 404:
            return None

        if response.status_code == 403:
            return None

        if response.status_code != 200:
            return None

        content = response.text
        lines = content.split("\n")[:5]
        return "\n".join(lines)

    def _has_external_link(self, readme: Optional[str]) -> bool:
        """Check if README contains external http/https links."""
        if not readme:
            return False
        
        link_pattern = r'https?://[^\s\)\]\}]+(?:(?:\[[^\]]*\])|(?:\([^)]*\))|(?:[^\s\)\]\}]))*'
        matches = re.findall(link_pattern, readme)
        return len(matches) > 0

    async def _fetch_repository_languages(
        self, client: httpx.AsyncClient, username: str, repo_name: str
    ) -> List[str]:
        """
        Fetch the languages used in a repository from GitHub Languages API.
        Returns a list of language names.
        """
        url = f"{GITHUB_API_BASE_URL}/repos/{username}/{repo_name}/languages"
        headers = {}
        if GITHUB_TOKEN:
            headers["Authorization"] = f"token {GITHUB_TOKEN}"

        try:
            response = await client.get(url, headers=headers, timeout=10.0)
            
            if response.status_code != 200:
                return []
            
            languages_data = response.json()
            # languages_data is a dict like {"Python": 12345, "JavaScript": 6789}
            # We just need the language names
            return list(languages_data.keys())
        except Exception:
            return []

    def _detect_technologies_from_text(self, text: Optional[str]) -> List[str]:
        """
        Detect technologies from text (e.g., README content) using TECH_KEYWORDS.
        Returns a list of detected technology names.
        """
        if not text:
            return []
        
        detected = []
        text_lower = text.lower()
        
        for tech_name, keywords in self.TECH_KEYWORDS.items():
            for keyword in keywords:
                if keyword.lower() in text_lower:
                    detected.append(tech_name)
                    break  # Found this technology, no need to check other keywords
        
        return detected
