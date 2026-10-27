import { ArrowUpRight } from "lucide-react";

export type CaseStudy = {
  id?: string;
  slug?: string;
  title: string;
  eyebrow: string;
  problem: string;
  contribution: string;
  architecture: string;
  result: string;
  link?: {
    href: string;
    label: string;
  };
};

export type CaseStudyLabels = {
  problem: string;
  contribution: string;
  architecture: string;
  result: string;
  detail?: string;
};

/** Presentational case-study cards. All copy is supplied by the localized caller. */
export function CaseStudies({
  items,
  labels,
  detailBasePath,
}: {
  items: CaseStudy[];
  labels: CaseStudyLabels;
  detailBasePath?: string;
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => {
        const titleId = `${item.id ?? `case-study-${index + 1}`}-title`;

        return (
          <li key={item.id ?? item.title} className="group h-full">
            <article
              aria-labelledby={titleId}
              className="flex h-full flex-col rounded-lg border border-mint-400/20 bg-gradient-to-br from-ink-700/60 to-ink-800/40 p-6 transition hover:border-mint-400/40 hover:shadow-[0_12px_32px_rgba(45,212,191,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-mint-300">
                {item.eyebrow}
              </p>
              <h3 id={titleId} className="mt-2 text-lg font-semibold leading-snug text-haze-100">
                {item.title}
              </h3>

              <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="text-haze-200 font-semibold">{labels.problem}</dt>
                  <dd className="mt-1 text-haze-400">{item.problem}</dd>
                </div>
                <div>
                  <dt className="text-haze-200 font-semibold">{labels.contribution}</dt>
                  <dd className="mt-1 text-haze-400">{item.contribution}</dd>
                </div>
                <div>
                  <dt className="text-haze-200 font-semibold">{labels.architecture}</dt>
                  <dd className="mt-1 text-haze-400">{item.architecture}</dd>
                </div>
                <div>
                  <dt className="text-haze-200 font-semibold">{labels.result}</dt>
                  <dd className="mt-1 text-haze-400">{item.result}</dd>
                </div>
              </dl>

              {detailBasePath && item.slug && labels.detail && (
                <a
                  href={`${detailBasePath}/${item.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-mint-300 transition hover:text-mint-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-300"
                >
                  {labels.detail}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}

              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-flex items-center gap-1.5 self-start text-sm font-medium text-mint-300 transition hover:text-mint-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-300"
                >
                  {item.link.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
