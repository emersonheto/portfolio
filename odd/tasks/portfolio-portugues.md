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
| T1 | Add `pt` to routing, middleware, Payload localization, services, and language switch | S2, S4 | inline | |
| T2 | Add Portuguese UI messages and localized source content loader | S2, S3 | inline | |
| T3 | Load Portuguese content into production and verify public routes, cache, and build | S2-S4 | inline | |

## Log

- **L1** — "necesito que agregues el idioma portugues recuerda que necesito en los 3 idiomas".
