# ToolZone

A 100+ free online utility tools website — text, image, security, math, finance, QR codes, and more. Every tool runs fully client-side with no backend needed.

## Run & Operate

- `pnpm --filter @workspace/toolzone run dev` — run the ToolZone frontend (Vite dev server)
- `pnpm --filter @workspace/api-server run dev` — run the API server (Express, port 8080)
- `pnpm run typecheck:libs` — build lib declarations first (required before api-server typecheck)
- `pnpm run typecheck` — full typecheck across all packages (run `typecheck:libs` first)
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (for API server / DB features)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui + Wouter (routing)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/toolzone/` — React + Vite frontend
- `artifacts/toolzone/src/pages/tools/` — one file per tool category
- `artifacts/toolzone/src/data/tools.ts` — tool registry (titles, slugs, categories)
- `artifacts/api-server/` — Express 5 API server
- `lib/db/` — Drizzle schema and DB client
- `lib/api-zod/` — Zod schemas generated from OpenAPI spec
- `lib/api-client-react/` — React Query hooks generated from OpenAPI spec

## Architecture decisions

- All tools are 100% client-side — no API calls required to use any tool
- Wouter handles routing with a `BASE_URL` prefix so the app works under Replit's path-based proxy
- Lib packages use TypeScript project references (`composite: true`) — run `pnpm run typecheck:libs` to emit declarations before typechecking artifacts

## Product

ToolZone is a browser-based utility hub: users can run 100+ free tools (text manipulation, image processing, QR codes, security/password tools, math, finance, unit converters, date/time, encode/decode, fun/random, productivity) without creating an account or installing anything.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run `pnpm run typecheck:libs` before `pnpm run typecheck` or `pnpm --filter @workspace/api-server run typecheck` — the API server has TypeScript project references to `lib/api-zod` and `lib/db` that must emit declarations first.
- `node_modules` must be installed with `pnpm install` from the workspace root before any workflow can start.
- The `@assets` alias in `vite.config.ts` points to `../../attached_assets` (workspace root). This is used by `About.tsx` for the developer photo. Works on both Replit and Vercel since the full repo is available during build.
- Replit-specific Vite plugins (cartographer, dev-banner) are gated to `NODE_ENV !== 'production' && REPL_ID !== undefined` — they are automatically skipped on Vercel builds.

## Vercel Deployment

`vercel.json` is at the repo root and configures:
- Build: `pnpm run typecheck:libs && pnpm --filter @workspace/toolzone run build`
- Output: `artifacts/toolzone/dist/public`
- SPA rewrite: all routes → `index.html`

No environment variables required (all tools are 100% client-side).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
