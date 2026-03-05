# ResumeRadar AI - Startup Guide

## Quick Start

### Activate Virtual Environment
```bash
cd "ResumeRadar AI"
source venv/bin/activate
# or
./venv/bin/python
```

### Run Server (Development)
```bash
./venv/bin/uvicorn main:app --reload
```

⚠️ **IMPORTANT**: Use `main:app` NOT `app.main:app`
- The module is at root level: `/main.py`
- Not inside a package: `/app/main.py`

### Run Server (Production)
```bash
./venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
```

### Run Tests
```bash
./venv/bin/python -m pytest tests/ -v
```

### Test API
```bash
# Health check
curl -X GET http://localhost:8000/health

# Analyze a GitHub user
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"github_url": "https://github.com/Kasa1905"}'
```

## Environment
- Create `.env` file with: `GITHUB_TOKEN=your_token_here`
- Token optional for public repos (60 req/hr unauthenticated)
- With token: 5000 req/hr limit

## Project Structure
```
ResumeRadar AI/
├── main.py              # FastAPI app & endpoints
├── models.py            # Pydantic models
├── github_service.py    # GitHub API logic
├── config.py            # Environment config
├── requirements.txt     # Dependencies
├── .env                 # GitHub token (create this)
├── .env.example         # Template
├── tests/               # Pytest test suite
│   ├── test_endpoints.py
│   └── test_github_service.py
└── venv/                # Virtual environment
```

## All Tests Passing ✓
- 21/21 tests pass
- No warnings or errors
- Edge cases covered

## API Response Format
```json
{
  "github": {
    "total_repos": 45,
    "skills_detected": {
      "Python": 12,
      "JavaScript": 8,
      "TypeScript": 5
    },
    "repos": [
      {
        "name": "repo-name",
        "description": "...",
        "primary_language": "Python",
        "topics": [],
        "last_updated": "2026-02-28T...",
        "default_branch": "main",
        "readme_first_lines": "...",
        "analysis": {
          "has_description": true,
          "has_readme": true,
          "multiple_languages": false,
          "recently_updated": true,
          "has_topics": false,
          "has_external_link": true,
          "strong_project": true
        }
      }
    ]
  }
}
```
