# Netlify Serverless Migration Design

## Goal

Migrate ResumeRadar AI from a persistent FastAPI/Uvicorn deployment model to a
Netlify-compatible serverless application while preserving the existing API
behavior and Next.js frontend.

## Architecture

- Netlify hosts the Next.js frontend.
- Netlify Functions host the API handlers.
- Public API routes are exposed as:
  - `GET /api/health`
  - `POST /api/analyze`
- Netlify redirects map the public routes to function handlers.
- GitHub API calls remain server-side and use the `GITHUB_TOKEN` environment
  variable.
- LinkedIn behavior remains the existing structured placeholder/service
  behavior; no unauthorized scraping is introduced.
- Each request is stateless and does not depend on a persistent process,
  filesystem state, local database, or fixed port.

## API behavior

The migrated handlers preserve the existing `/health` and `/analyze` request
and response semantics wherever practical:

- Valid analysis requests return the existing JSON analysis structure.
- Invalid input returns a JSON `400` response.
- Missing or malformed input is validated before external API calls.
- GitHub not-found, rate-limit, network, and upstream failures map to safe,
  useful HTTP responses without exposing credentials or stack traces.
- The health endpoint does not require a GitHub token and returns a simple
  healthy status.

## Frontend integration

The frontend uses same-origin `/api/analyze` requests in production. Local
development may use a configurable backend URL where necessary, but production
configuration must not expose server-side secrets through client-visible
environment variables.

## Configuration and documentation

- Add a minimal `netlify.toml` with the functions directory, build settings,
  and API redirects.
- Add/update `.env.example` with placeholders only.
- Remove Vercel-specific deployment instructions and ignore rules.
- Update project documentation with local Netlify-compatible development,
  environment variable, deployment, custom-domain, and troubleshooting
  instructions.

## Testing and verification

Add or update tests covering:

- Health endpoint success
- Valid analysis requests
- Invalid and missing request fields
- GitHub not-found, rate-limit, and unexpected upstream failures
- JSON response shape
- Unknown routes
- Secret non-disclosure

Run the existing Python tests, frontend lint/build checks, and configuration
validation. Verify that production code no longer requires Uvicorn or
`localhost:8000`.
