# Portfolio review fixes

Apply every finding from the 2026-11-25 portfolio review (security, caching, SEO, a11y, cleanup).
Four parallel work units, each in its own linked worktree/branch off `fix/portfolio-review`; integration back is a human decision.

## Specs

- S1 (P0, access): Payload collections must not accept unauthenticated writes. Content collections (Projects, Experience, Education, Certifications, Skills, Profile) keep `read: () => true`; `create/update/delete` require `({ req }) => Boolean(req.user)`. `Users`: no public read/create/update/delete (authenticated only; `create` authenticated only so the first-admin flow via `/admin` still works only when Payload's own first-user screen is used — keep Payload's first-user registration working). `Messages`: `create/read/update/delete` authenticated only (the contact form writes through the local API with `overrideAccess`, so public REST create is unnecessary and would bypass the rate limiter; see L3). Review finding: "Anyone can `POST /api/users` to self-register an admin account".
- S2 (hardening): contact rate limiter keys on `cf-connecting-ip` (fallback to first `x-forwarded-for` entry, then "unknown"), uses `CONTACT_FORM_RATE_LIMIT` from `src/lib/constants.ts` instead of the hardcoded `5`, and prunes expired entries so the `Map` cannot grow without bound.
- S3 (hardening): `next.config.mjs` sets `poweredByHeader: false` and adds a `Content-Security-Policy-Report-Only` header compatible with the public site and Payload `/admin`.
- S4 (hardening): `.github/workflows/deploy.yml` pins every third-party action to a full commit SHA with the tag as a trailing comment.
- S5 (caching): case-study pages (`src/app/(frontend)/[locale]/case-studies/[slug]/page.tsx`, `src/app/(frontend)/case-studies/[slug]/page.tsx`) drop `dynamic = "force-dynamic"` and keep ISR `revalidate`; `CACHED_PATHS` in `src/collections/hooks/revalidate.ts` also purges every case-study URL for all locales. Production today returns `cache-control: private, no-cache, no-store` and `cf-cache-status: DYNAMIC` for `/case-studies/bcrp-rag`.
- S6 (caching): `src/components/site/portfolio-page.tsx` only maps a genuinely missing profile to `notFound()`; other failures (e.g. DB down) are logged and rethrown so `error.tsx` renders; the metadata fallback logs its error.
- S7 (SEO): JSON-LD in `src/components/site/seo-jsonld.tsx` uses a valid schema.org type (`SoftwareSourceCode` or `CreativeWork`) instead of `"@type": "Project"`.
- S8 (perf): the priority image in `src/components/site/case-study-detail.tsx` gets a `sizes` prop matching its `max-w-4xl` container.
- S9 (a11y/i18n): icon-only GitHub links in Projects get an accessible name; hardcoded English `aria-label`s (`sidebar.tsx` "Social media", `sections.tsx` "Technologies"/"Tools", `side-nav.tsx` "In-page") are translated via next-intl in en/es/pt with key parity kept.
- S10 (cleanup): README matches reality (Payload 3.79, real folder tree, no false Zod-env claim); remove dead `src/payload.ts` and the unused `env` in `src/lib/validations.ts`; remove unused `framer-motion`; `@types/node` matches `engines` node>=24; remove stale `nixpacks.toml` (deploy is GHCR image → Dokploy); migrate ESLint 8 `.eslintrc.json` to ESLint 9 flat config only if `npm run lint` and `npm run build` still pass, else report partial.

## Tasks

- T1 S1 — worker, worktree `sitio-access`, branch `fix/review-access` — Risk: item 2 (security) — commits: 0733371, 4fcb499
- T2 S2-S4 — worker, worktree `sitio-hardening`, branch `fix/review-hardening` — Risk: items 2, 5 — commits: 7a3ba56, d20bdac, 437496c
- T3 S5-S8 — worker, worktree `sitio-caching`, branch `fix/review-caching` — commits: 54bde68, 1f8e007, f6e2753 (next build OK, case studies SSG + ISR 1h)
- T4 S9-S10 — worker, worktree `sitio-cleanup`, branch `fix/review-cleanup` — Risk: item 5 (dependencies) — commits: 3cb902b, a084ad8, fb33ee9, 68b42fd, adce854, a02ddbf

## Log

- L1 (user, after the review summary was presented): "haz todas en paralelo"
- L2: review evidence — prod `GET /api/users` returned 200 with the admin doc; `tsc --noEmit` and `next lint` pass on base 2d3eb90; repo has no test runner (verification = type-check, lint, build, structural checks).
- L3 (decision, parent): T1 worker showed `src/app/api/contact/route.ts` creates messages via local API (overrideAccess defaults true), so S1 changed to close `Messages.create` over REST too (commit 4fcb499). First-user registration still works: `registerFirstUser` uses `overrideAccess: true` and refuses once a user exists.
- L4 (evidence): independent verifiers — T1 S1 PASS, T2 S2-S4 MET, T4 S9-S10 PASS after fixing an `eslint.config.mjs` self-ignore that made `next build` warn "The Next.js plugin was not detected" (a02ddbf; lint exit 0, build exit 0, warning count 0). Residual: CSP needs connect-src/worker-src before enforcing; Payload forgot/reset/unlock endpoints remain default; npm audit findings untouched; `cf-connecting-ip` trust assumes origin only reachable through Cloudflare.
