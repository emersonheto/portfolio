# Portfolio polish: case studies, SEO, language switcher, and LCP

Improve portfolio.certilab.app without adding paid services, preserving English, Spanish, and Portuguese.

## Specs

- **S1** — "pues hagamos 2 , 3 , 4 y 5".
- **S2** — "Agregar casos de estudio reales" with the recommended priority: "Plataforma RAG del BCRP", "Certilab Agentic/Adaptive RAG", and "Investigación de modelos visión-lenguaje"; show problem, Emerson's contribution, architecture/stack, measurable result, and a link where available.
- **S3** — "Mejorar SEO internacional" with `hreflang` for English, Spanish, and Portuguese; per-locale Open Graph; structured `Person` and `Project` data; and search-oriented titles/descriptions.
- **S4** — "Mostrar los tres idiomas directamente": make `EN | ES | PT` directly visible instead of requiring a cycle through languages.
- **S5** — "Optimizar un poco más el LCP": improve the initial hero rendering without adding paid infrastructure.
- **S6** — Existing English, Spanish, and Portuguese routes must continue to work and remain localized.

## Tasks

| ID  | Task                                                                        | Specs  | Route                       | Commit |
| --- | --------------------------------------------------------------------------- | ------ | --------------------------- | ------ |
| T1  | Add translated case studies for BCRP, Certilab RAG, and multimodal research | S2, S6 | worker + inline integration |        |
| T2  | Add international SEO metadata, hreflang, JSON-LD, and per-locale previews  | S3, S6 | worker + inline integration |        |
| T3  | Replace the cycling language control with explicit EN/ES/PT links           | S4, S6 | inline                      |        |
| T4  | Improve hero/LCP loading and image delivery                                 | S5, S6 | inline                      |        |
| T5  | Run type/build, Lighthouse, route, accessibility, and regression checks     | S2-S6  | inline                      |        |

## Log

- **L1** — "pues hagamos 2 , 3 , 4 y 5".
