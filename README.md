# ResumeRadar AI

A production-ready FastAPI backend for analyzing GitHub profiles and LinkedIn profiles to extract skills, technologies, certifications, and professional roles.

## Features

- **GitHub Analysis**: Extract repositories, programming languages, and detected technologies
- **LinkedIn Parsing**: Extract certifications and professional roles (profile structure)
- **Technology Detection**: Identify frameworks and tools from README files and GitHub Languages API
- **Repository Analysis**: Evaluate project quality based on multiple criteria
- **Error Handling**: Comprehensive validation and graceful error responses

## Quick Start

### Prerequisites

- Python 3.12+ or 3.14+
- GitHub Personal Access Token (optional, recommended for higher rate limits)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kasa1905/ResumeRadar_AI.git
   cd ResumeRadar_AI
   ```

2. **Install dependencies**
   ```bash
   # System-wide (recommended for production)
   pip3 install -r requirements.txt
   
   # OR using virtual environment
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your GitHub token
   ```

### Running the Server

**Important**: Use `main:app` NOT `app.main:app`

```bash
# Development mode (with auto-reload)
python3 -m uvicorn main:app --reload

# Production mode
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
```

**Common Error**: If you see `ModuleNotFoundError: No module named 'app'`, you're using the wrong command. The files are at root level, not in an `app` directory.

### Testing

```bash
# Run all tests
python3 -m pytest -v

# Run specific test file
python3 -m pytest tests/test_github_service.py -v

# Quick test run
python3 -m pytest -q
```

## API Usage

### Health Check

```bash
curl http://localhost:8000/health
```

### Analyze GitHub Profile Only

```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "github_url": "https://github.com/username"
  }'
```

### Analyze GitHub + LinkedIn Profile

```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "github_url": "https://github.com/username",
    "linkedin_url": "https://linkedin.com/in/profile-name"
  }'
```

### Response Format

```json
{
  "github": {
    "total_repos": 45,
    "skills_detected": {
      "Python": 33,
      "JavaScript": 25,
      "React": 3,
      "Docker": 1
    },
    "repos": [
      {
        "name": "project-name",
        "description": "Project description",
        "primary_language": "Python",
        "topics": ["api", "backend"],
        "last_updated": "2026-03-05T12:00:00Z",
        "default_branch": "main",
        "readme_first_lines": "# Project Title\n...",
        "analysis": {
          "has_description": true,
          "has_readme": true,
          "multiple_languages": false,
          "recently_updated": true,
          "has_topics": true,
          "has_external_link": true,
          "strong_project": true
        }
      }
    ]
  },
  "linkedin": {
    "profile_id": "profile-name",
    "total_certifications": 0,
    "total_roles": 0,
    "certifications": [],
    "roles": [],
    "access_note": "Limited public data available. Use LinkedIn API for comprehensive profile information."
  }
}
```

## Project Structure

```
ResumeRadar_AI/
├── main.py                    # FastAPI application entry point
├── models.py                  # Pydantic models for request/response
├── github_service.py          # GitHub API integration
├── linkedin_service.py        # LinkedIn profile parsing
├── config.py                  # Configuration and environment variables
├── requirements.txt           # Python dependencies
├── .env.example              # Example environment configuration
├── .gitignore                # Git ignore patterns
├── tests/
│   ├── test_endpoints.py     # API endpoint tests
│   ├── test_github_service.py # GitHub service tests
│   └── test_linkedin_service.py # LinkedIn service tests
└── README.md                 # This file
```

## Technologies Used

- **FastAPI**: Modern, fast web framework for building APIs
- **Pydantic**: Data validation using Python type annotations
- **httpx**: Async HTTP client for external API calls
- **pytest**: Testing framework with async support
- **python-dotenv**: Environment variable management

## Testing

All 41 tests pass:
- 9 endpoint tests (API validation, error handling)
- 26 GitHub service tests (URL parsing, technology detection)
- 15 LinkedIn service tests (profile parsing, validation)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token | No (limits: 60 req/hr without, 5000 req/hr with token) |

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Invalid input (malformed URL, invalid format)
- `404`: Resource not found (user/profile doesn't exist)
- `422`: Validation error (missing required fields)
- `429`: Rate limit exceeded
- `500`: Internal server error

## LinkedIn Note

Due to LinkedIn's anti-scraping policies, the LinkedIn parser returns a structured placeholder response. For production use with real LinkedIn data:

1. Use the [LinkedIn Official API](https://developer.linkedin.com/) (requires OAuth)
2. Integrate with authorized third-party services
3. Implement authenticated scraping with user consent

The current implementation provides the data structure and validation logic that can be connected to any authorized LinkedIn data source.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `python3 -m pytest -v`
5. Commit and push
6. Create a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Author

Kaushik Sambe - [GitHub](https://github.com/Kasa1905)

## Support

For issues and questions, please open an issue on GitHub: https://github.com/Kasa1905/ResumeRadar_AI/issues
