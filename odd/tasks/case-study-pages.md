# Case study detail pages

Create recruiter-focused, evidence-backed case study pages for the portfolio in English, Spanish, and Portuguese, using public or non-sensitive technical details.

## Specs

- **S1** — "dale hazlo"
- **S2** — "Recruiters y hiring managers"
- **S3** — "Técnico sin datos sensibles"
- **S4** — "Sí, capturas y diagramas"

## Tasks

| ID  | Task                                                                | Specs | Route  | Commit  |
| --- | ------------------------------------------------------------------- | ----- | ------ | ------- |
| T1  | Audit local project evidence and confirm public-safe facts          | S1-S4 | inline | ab70f20 |
| T2  | Build reusable localized case-study detail pages                    | S1-S4 | inline | ab70f20 |
| T3  | Add BCRP, Certilab RAG, and vision-language research content        | S1-S4 | inline | ab70f20 |
| T4  | Link cards, add per-page SEO, and include public-safe visual assets | S1-S4 | inline | ab70f20 |
| T5  | Verify all locales, accessibility, performance, and production      | S1-S4 | inline | ab70f20 |

## Log

- **L1** — "dale hazlo"
- **L2** — The requested audience is "Recruiters y hiring managers".
- **L3** — BCRP detail must be "Técnico sin datos sensibles".
- **L4** — Include "Sí, capturas y diagramas".
- **L5** — Local evidence confirmed the BCRP RAG report and public Certilab/VLM repositories; no project screenshots were available locally, so the implementation uses public evidence links, one public BCRP Portal capture, and non-fabricated architecture diagrams.
- **L6** — Added reusable EN/ES/PT case-study detail routes, recruiter-oriented sections, stack/evidence cards, architecture diagrams, card links, per-page metadata and Article JSON-LD.
- **L7** — Verified TypeScript, production build, nine localized routes returning 200 with JSON-LD, and desktop visual rendering in Ego Lite.
- **L8** — Added the public BCRP Portal capture at `public/case-studies/bcrp-research-portal.png`; no private screenshots or VPS/BCRP internal data were added.
