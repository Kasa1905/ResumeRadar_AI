# ResumeRadar AI

ResumeRadar AI analyzes public GitHub profiles and returns repository quality
signals, detected languages and technologies, and an optional structured
LinkedIn profile response.

## Architecture

```text
Browser
  ↓
Next.js frontend on Netlify
  ↓ /api/health and /api/analyze
Netlify Python Functions
  ↓
GitHub REST API
```

The application is stateless between requests. GitHub credentials are used
only by the serverless function and are never sent to the browser.

## Local development

### Backend compatibility mode

The FastAPI application remains available for local development and existing
tests:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python3 -m uvicorn main:app --reload
```

### Frontend

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

The frontend calls `/api/analyze` through the Next.js development server. For
production-like function testing, install the Netlify CLI and run:

```bash
npm install -g netlify-cli
netlify dev
```

## Environment variables

Configure these in Netlify under **Project configuration → Environment
variables**:

| Variable | Required | Description |
| --- | --- | --- |
| `GITHUB_TOKEN` | No | GitHub personal access token for higher API limits. Never expose this as a client variable. |

Copy `.env.example` for local development. Do not commit `.env` or real
credentials.

## API

### `GET /api/health`

Returns:

```json
{"status":"ok","version":"1.0.0"}
```

### `POST /api/analyze`

Example:

```bash
curl -X POST https://your-domain.example/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"github_url":"https://github.com/Kasa1905"}'
```

The response contains `github.total_repos`, `github.skills_detected`, and
`github.repos`. Supplying a valid LinkedIn profile URL adds a `linkedin`
section. Invalid input returns `400`, an unknown GitHub user returns `404`, a
GitHub rate limit returns `429`, and upstream GitHub failures return `502`.

## Deploying to Netlify with a custom domain

1. Push this repository to GitHub.
2. In Netlify, choose **Add new project → Import an existing project**.
3. Select `Kasa1905/ResumeRadar_AI`.
4. Netlify reads `netlify.toml`; the build command installs and builds the
   frontend, and `netlify/functions` is used for Python Functions.
5. Add `GITHUB_TOKEN` in the Netlify environment variables screen.
6. Deploy the site.
7. Test `https://your-domain.example/api/health`.
8. Test `POST https://your-domain.example/api/analyze`.
9. In **Domain management**, add your custom domain and follow your DNS
   provider's instructions. Netlify manages HTTPS after DNS is verified.

The public API routes are redirected to the Netlify function at
`/.netlify/functions/api`; users should use `/api/health` and `/api/analyze`.

## Troubleshooting

- **Function not found / 404:** confirm `netlify.toml` points to
  `netlify/functions` and trigger a fresh deploy.
- **`/api/analyze` returns 400:** send a JSON object with a full
  `https://github.com/<username>` URL.
- **GitHub rate limiting:** configure `GITHUB_TOKEN` in Netlify.
- **Frontend cannot reach the API:** use same-origin `/api/analyze`; do not
  hardcode `localhost:8000` in production.
- **Build failure:** check the Netlify deploy log and run `npm ci` and
  `npm run build` from `web` locally.
- **LinkedIn data is limited:** direct scraping is not supported; the service
  returns a structured response suitable for a future authorized API.

## Tests

```bash
python3 -m pytest -q
cd web && npm run lint && npm run build
```

## License

MIT. See [LICENSE](LICENSE).
