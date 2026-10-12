# FitKnights · Fitness Trading Project

[![Security checks](https://github.com/MDCran/fitness-trading-project/actions/workflows/security-checks.yml/badge.svg)](https://github.com/MDCran/fitness-trading-project/actions/workflows/security-checks.yml) [![CodeQL](https://github.com/MDCran/fitness-trading-project/actions/workflows/codeql.yml/badge.svg)](https://github.com/MDCran/fitness-trading-project/actions/workflows/codeql.yml)

A UCF fitness-gamification project built around daily and weekly challenges. Users can create an account, join and complete challenges, earn Aura Points, and compare progress on a leaderboard.

The current implementation is a React/TypeScript client backed by an Express API and MongoDB. The trading-card screen is a visual prototype with placeholder profile data; it is not a completed trading marketplace.

## What to explore

- [Challenge routes](server/routes/challengeRoutes.ts): challenge creation, participation, completion, rewards, and leaderboard queries.
- [User routes](server/routes/userRoutes.ts): registration, login, and profile retrieval.
- [Home screen](client/src/pages/Home.tsx): daily/weekly challenges and countdowns.
- [Leaderboard](client/src/pages/Rank.tsx) and [card prototype](client/src/pages/CardPage.tsx).

## Stack and structure

| Path | Responsibility |
| --- | --- |
| [api/index.ts](api/index.ts) | Express entry point, MongoDB connection, sessions, routing, and development challenge seeding |
| [server/](server) | Mongoose models, route handlers, and middleware |
| [client/src/](client/src) | React 18, TypeScript, React Router, pages, components, and styles |
| [vercel.json](vercel.json) | API and client-side routing rewrites |

The UI uses Material UI, Tailwind/DaisyUI, and Framer Motion. Dependency and script definitions live in the [root package](package.json) and [client package](client/package.json).

## Local development

Requires Node.js **20.x** as declared by the root package, npm, and an isolated MongoDB development database. The repository does not include lockfiles; dependency installation is not currently reproducible from a pinned dependency tree.

### 1. Install dependencies

From the repository root:

```bash
npm install --legacy-peer-deps
cd client
npm install --legacy-peer-deps
cd ..
```

The root security workflow also uses legacy peer-dependency resolution.

### 2. Configure the API and client

Create an uncommitted `.env` at the repository root with:

| Variable | Local purpose |
| --- | --- |
| `MONGO_SRV` | Connection URI for your development MongoDB database |
| `REACT_APP_API_URL` | Allowed browser origin for API CORS, normally `http://localhost:3000` |
| `JWT_SECRET` | Unique local secret for signing authentication tokens |
| `SESSION_SECRET` | Separate unique local session secret |
| `PORT` | Optional API port; defaults to `8000` |

Create `client/.env.local` with `REACT_APP_API_URL=http://localhost:8000`. Despite sharing a name, the root variable is used as a CORS origin and the client variable is the API base URL. Setting the client variable also avoids falling back to the hosted API.

Use synthetic accounts and data. API startup automatically inserts sample daily and weekly challenges into the configured database.

### 3. Run both applications

In one terminal, from the repository root:

```bash
npm start
```

In another terminal:

```bash
cd client
npm start
```

Open [localhost:3000](http://localhost:3000). The API listens on port 8000 by default. The root `npm run dev` script can start both processes in a POSIX-compatible shell. Stop development servers with Ctrl+C.

To build the client, run `npm run build` from the repository root. [vercel.json](vercel.json) contains deployment rewrites; deployment also needs environment configuration and a database.

## Validation and security

- [CodeQL](.github/workflows/codeql.yml) analyzes JavaScript/TypeScript on pushes, pull requests, and a weekly schedule.
- [Security checks](.github/workflows/security-checks.yml) installs the root package, attempts an npm audit, and runs `git diff --check`.
- The audit step uses `continue-on-error: true` and runs without a committed lockfile. A green badge does **not** establish that dependency auditing succeeded or that no vulnerabilities were found. Review the [workflow logs](https://github.com/MDCran/fitness-trading-project/actions/workflows/security-checks.yml).
- The workflow does not separately install/audit the client package or run application builds or tests. Neither package currently defines an automated test script.
- A root `npm run lint` script exists, but its legacy ESLint configuration requires compatibility review with the declared ESLint 9 dependency.

Treat this as a development/demo project. Authentication and other application controls require review before use with real users or sensitive data; automated scans are not a production-security certification.

## Credits and contributors

The root package identifies its starting point as `vercel-mern-skeleton`, authored by Adam Janicki.

Thanks to everyone who has contributed:

- [pleber2021](https://github.com/pleber2021)
- [MDCran](https://github.com/MDCran)
- [xLaki](https://github.com/xLaki)
- [shanemcder](https://github.com/shanemcder)
- [RageBHM](https://github.com/RageBHM)
- [brunofregoso](https://github.com/brunofregoso)
- [Daniel-Quinonez](https://github.com/Daniel-Quinonez)
