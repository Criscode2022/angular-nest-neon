# Angular + Nest + Neon

Turborepo starter for a full-stack TypeScript app:

- **`apps/web`** — Angular 22 + Tailwind
- **`apps/api`** — NestJS 11 + Neon Postgres
- **JWT sessions** — register / login / logout / me
- **Vercel** — one project serves the SPA and the `/api` function

Use this repository as a GitHub template, then replace the placeholder product name and add your domain modules.

## Layout

```
apps/web     Angular app (dev server + Vercel static output)
apps/api     NestJS API (local :3001, Vercel Function)
api/         Vercel serverless entry for Nest
packages/    Shared packages (empty — add `@repo/types` when needed)
```

## Prerequisites

- Node.js 20+
- A [Neon](https://console.neon.tech) project
- npm 10+

## Getting started

```bash
git clone <your-repo-url>
cd angular-nest-neon
cp .env.example .env
```

Fill in `DATABASE_URL` and `JWT_SECRET` (`openssl rand -hex 32`). Tables `users` and `sessions` are created on API boot.

```bash
npm install
npm run start:full
```

- Web: [http://localhost:4200](http://localhost:4200)
- API health: [http://localhost:3001/api/health](http://localhost:3001/api/health)

Or run them separately:

```bash
npm run api      # Nest watch mode
npm start        # Angular with /api proxy
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run api` | Nest API in watch mode |
| `npm start` | Angular dev server |
| `npm run start:full` | API + web via Turbo |
| `npm run build` | Build all workspaces |
| `npm run build:web` / `build:api` | Build one app |
| `npm test` | Unit tests |
| `npm run test:api` | API smoke test (API must be running) |
| `npm run lint` | Lint |

## Auth API

| Method | Path | Auth | Body |
|--------|------|------|------|
| `POST` | `/api/auth/register` | — | `{ "email", "password" }` |
| `POST` | `/api/auth/login` | — | `{ "email", "password" }` |
| `POST` | `/api/auth/logout` | Bearer | — |
| `GET` | `/api/auth/me` | Bearer | — |
| `GET` | `/api/users/:id` | Bearer (own id) | — |
| `DELETE` | `/api/users/:id` | Bearer (own id) | — |
| `GET` | `/api/health` | — | — |

Passwords are hashed with bcrypt. Sessions live in Neon and are revoked on logout.

## Add a domain module

1. Create `apps/api/src/<feature>/` (module, controller, service, DTO).
2. Import the module in `apps/api/src/app.module.ts`.
3. Add tables in `DatabaseService.ensureSchema()` (or a SQL migration).
4. Call the routes from `apps/web` through `ApiService`.

## Deploy on Vercel

1. Import the GitHub repo.
2. Set `DATABASE_URL`, `JWT_SECRET`, and `ALLOWED_ORIGINS` (your production URL).
3. Root directory stays the repo root. `vercel.json` builds both apps and routes `/api/*` to Nest.

See `docs/vercel.md` and `docs/neon.md`.
