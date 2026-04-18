# Catering Helper

Catering Helper is a pnpm monorepo for a multi-tenant SaaS platform.

It includes:

- A Next.js frontend (App Router) with subdomain-based tenant routing.
- An Express backend API.
- Shared internal packages for types, utilities, and auth helpers.
- Nginx reverse proxy + MongoDB via Docker Compose.

## Monorepo Layout

```text
.
├─ apps/
│  ├─ frontend/   # Next.js app
│  └─ backend/    # Express API
├─ packages/
│  ├─ types/      # @catering/types
│  ├─ utils/      # @catering/utils
│  └─ authz/      # @catering/authz
├─ docker-compose.yml
├─ nginx.conf
├─ pnpm-workspace.yaml
└─ tsconfig.base.json
```

## Tech Stack

- pnpm workspaces
- Next.js 15 (App Router)
- Express + TypeScript
- MongoDB
- Nginx
- Docker Compose

## Prerequisites

- Node.js 20+
- pnpm 10+
- Docker + Docker Compose

## Install Dependencies

From repository root:

```bash
pnpm install
```

## Run Locally (Without Docker)

Use separate terminals.

Frontend:

```bash
pnpm --filter @catering/frontend dev
```

Backend:

```bash
pnpm --filter @catering/backend dev
```

Optional workspace build:

```bash
pnpm -r run build
```

## Tenant Subdomain Routing (Frontend)

Frontend middleware reads the Host header and rewrites tenant subdomains to a dynamic route:

- localhost -> no rewrite
- www.<main-domain> -> no rewrite
- <tenant>.<main-domain> -> rewritten to /<tenant>/...

Main domain is controlled by:

- MAIN_DOMAIN
- or NEXT_PUBLIC_MAIN_DOMAIN
- default: localhost

Example behavior when MAIN_DOMAIN=localhost:

- acme.localhost/menu -> /acme/menu (internal rewrite)
- localhost -> /

## Run Full Stack With Docker Compose

From repository root:

```bash
docker compose up --build
```

Services:

- db: MongoDB
- backend: Express API (port 5000 in network)
- frontend: Next.js app (port 3000 in network)
- nginx: Reverse proxy (published on port 80)

Nginx host routing:

- api.localhost -> backend:5000
- localhost -> frontend:3000
- \*.localhost -> frontend:3000

Stop stack:

```bash
docker compose down
```

Stop stack and remove volumes:

```bash
docker compose down -v
```

## Common Commands

Root:

```bash
pnpm build
pnpm lint
```

Backend:

```bash
pnpm --filter @catering/backend dev
pnpm --filter @catering/backend build
pnpm --filter @catering/backend start
```

Frontend:

```bash
pnpm --filter @catering/frontend dev
pnpm --filter @catering/frontend build
pnpm --filter @catering/frontend start
```

## Shared Packages

- @catering/types: shared interfaces/types
- @catering/utils: shared utility functions
- @catering/authz: shared auth/permission helpers

Each package is linked in apps using workspace:\* and can be imported directly.

## Notes

- Frontend Docker image uses Next.js standalone output.
- Backend Docker image runs compiled TypeScript from dist.
- If subdomains like tenant.localhost do not resolve on your machine, add host entries or use a local DNS helper.
