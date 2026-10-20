# Portfolio Portuguese locale

Add Portuguese as the third complete public language of portfolio.certilab.app while preserving English and Spanish behavior.

## Specs

- **S1** — "necesito que agregues el idioma portugues recuerda que necesito en los 3 idiomas".
- **S2** — The public portfolio must offer English, Spanish, and Portuguese routes and language switching.
- **S3** — Portuguese must include the interface copy and localized portfolio content (profile, experience, projects, education, certifications, and skills), not only a menu label.
- **S4** — Existing English and Spanish routes/content must keep working unchanged.

## Tasks

| ID | Task | Specs | Route | Commit |
| --- | --- | --- | --- | --- |
| T1 | Add `pt` to routing, middleware, Payload localization, services, and language switch | S2, S4 | inline | f0dafb0, d497949 |
| T2 | Add Portuguese UI messages and localized source content loader | S2, S3 | inline | f0dafb0, ea5d1ac, decc4c6, 918b9ea |
| T3 | Load Portuguese content into production and verify public routes, cache, and build | S2-S4 | inline | 39369397334, 39370243152; production evidence |

## Log

- **L1** — "necesito que agregues el idioma portugues recuerda que necesito en los 3 idiomas".
- **L2** — First production load exposed that the Payload `_locales` enum still had only `en` and `es`; migration `20261020_042319_add_portuguese_locale` added `pt`, and an isolated Postgres migration test passed.
- **L3** — Experience and project translations initially failed because the bulk loader sent nonlocalized technology arrays in localized PATCHes; `decc4c6` filters translation payloads to localized fields.
- **L4** — The bulk loader initially timed out because each mutation awaited a Cloudflare purge; `bd298c7` and `918b9ea` preserve ISR revalidation while skipping CDN purges for bulk loads. Production load then completed: profile 1, experience 6, projects 6, education 5, certifications 13, skills 38 in Portuguese.
- **L5** — Final verification: `/`, `/es`, and `/pt` returned 200 with language-specific markers and Cloudflare HIT; Portuguese CV returned 200 as PDF; sitemap included `/pt`; Ego Lite visually confirmed Portuguese content. English and Spanish markers remained present.
