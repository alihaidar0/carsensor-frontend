# ⚛️ React App Template

> **Blank-canvas React project template — 2026 Standard**
> Clone, open in container, scaffold your project, start building.

[![CI](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml)

---

## 🚀 Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [VS Code](https://code.visualstudio.com) + [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### 1. Use this template on GitHub
Click **"Use this template"** → **"Create a new repository"** → name your project.

### 2. Clone to your machine
```bash
git clone git@github.com-YOUR_ALIAS:YOUR_USERNAME/your-project.git
cd your-project
```

### 3. Pull the dev image
```bash
docker pull alihaidar199527/react-devcontainer:latest
```

### 4. Open in VS Code
```bash
code .
# Ctrl+Shift+P → "Dev Containers: Reopen in Container"
```

`post_create.sh` runs automatically — sets up git hooks and prints the scaffold guide.

### 5. Scaffold your React project (inside the container terminal)

```bash
# Scaffold
pnpm create vite@latest . --template react-ts
pnpm install

# Routing
pnpm add react-router-dom

# Server state
pnpm add @tanstack/react-query @tanstack/react-query-devtools

# Client state
pnpm add zustand

# Forms + validation
pnpm add react-hook-form @hookform/resolvers zod

# HTTP client
pnpm add axios

# Styling
pnpm add -D tailwindcss @tailwindcss/vite
pnpm add class-variance-authority clsx tailwind-merge lucide-react

# Testing
pnpm add -D vitest @testing-library/react @testing-library/user-event
pnpm add -D @testing-library/jest-dom @vitest/coverage-v8 @vitest/ui jsdom
pnpm add -D @playwright/test

# Code quality
pnpm add -D @biomejs/biome knip
```

### 6. Update `vite.config.ts` for Docker

```typescript
server: {
  host: "0.0.0.0",              // Required for Docker port forwarding
  port: 5173,
  watch: { usePolling: true },  // Required for HMR on Windows
},
```

### 7. Start developing

```bash
pnpm dev
# → http://localhost:5173
```

---

## 📁 What's in This Template

```
react-template/
├── .devcontainer/
│   └── devcontainer.json    ← VS Code pulls dev image + installs extensions
├── .github/
│   └── workflows/
│       └── ci.yml           ← CI checks + production image push on main
├── .husky/                  ← Git hooks (commit format, lint, branch protection)
├── docker/
│   ├── Dockerfile.prod      ← Production build (Vite → Nginx, ~25MB)
│   └── nginx.conf           ← SPA routing + caching + security headers
├── scripts/
│   ├── post_create.sh       ← Runs once: git setup + scaffold guide
│   └── post_start.sh        ← Runs on start: print versions
├── docker-compose.yml       ← Pulls dev image, mounts project, exposes :5173
└── package.json             ← Husky + commitlint only
```

No `src/`, no `public/`, no React files — this is a blank canvas.
You scaffold the React project yourself inside the container.

---

## 🔄 CI Pipeline

Runs on every push to `feature/*`, `fix/*`, `chore/*`, `develop`, `main`
and on every PR to `main` or `develop`.

```
typecheck → lint → test → build → e2e → security → CI gate
                                                       ↓
                                          main only + all passed
                                                       ↓
                                     push production Docker image
```

### Branch Protection

Direct push to `main` is blocked at two levels:
- **Local** — Husky `pre-push` hook
- **Server** — GitHub Actions `protect` job

Always use: `feature/name` → `develop` → PR → `main`

---

## 🐳 Production Docker Image

On every merge to `main` — after all CI checks pass — a production image is
built from `docker/Dockerfile.prod` and pushed to Docker Hub automatically.

### Required GitHub Secrets

| Secret | Where to get it |
|--------|----------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub → Account Settings → Personal access tokens → Read & Write |

### Image name

Auto-derived from your GitHub repo name:
```
GitHub repo:  YOUR_USERNAME/my-app
Docker image: YOUR_DOCKERHUB_USERNAME/my-app:latest
```

---

## 🌍 Deployment

Not included — add per project depending on your target:

| Target | Add to `.github/workflows/` |
|--------|----------------------------|
| Netlify | `deploy-netlify.yml` + `netlify.toml` |
| Vercel | `deploy-vercel.yml` |
| GCP Cloud Run | `deploy-cloudrun.yml` |
| AWS | `deploy-aws.yml` |
| Cloudflare Pages | `deploy-cloudflare.yml` |

---

## 🔄 Git Workflow

```
main         ← production (protected — PRs only)
  └─ develop ← integration
       └─ feature/name
       └─ fix/name
       └─ chore/name
```

### Commit format
```
feat: add user authentication
fix: resolve token expiry bug
chore: update dependencies
test: add form validation tests
```

---

## 📦 Dev Image

| | |
|---|---|
| **Image** | `alihaidar199527/react-devcontainer:latest` |
| **Source** | `github.com/alihaidar0/react-devcontainer` |
| **Platforms** | `linux/amd64` (Windows/Linux) · `linux/arm64` (Apple Silicon) |
| **Contents** | Node 24 · pnpm · Bun · GitHub CLI · TypeScript · Biome · Starship |
