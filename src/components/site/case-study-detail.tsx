import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

export type CaseStudySection = {
  heading: string;
  body: string;
};

export type CaseStudyDiagramNode = {
  title: string;
  text: string;
};

export type CaseStudyEvidence = {
  href: string;
  label: string;
};

export type CaseStudyDetailData = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  contribution: string;
  architecture: string;
  result: string;
  role: string;
  stack: string[];
  sections: CaseStudySection[];
  diagram: {
    heading: string;
    nodes: CaseStudyDiagramNode[];
  };
  evidence: CaseStudyEvidence[];
  visual?: {
    src: string;
    alt: string;
    caption: string;
  };
};

export type CaseStudyDetailLabels = {
  back: string;
  role: string;
  stack: string;
  evidence: string;
  architectureDiagram: string;
  problem: string;
  contribution: string;
  architecture: string;
  result: string;
};

export function CaseStudyDetail({
  item,
  labels,
  backHref,
}: {
  item: CaseStudyDetailData;
  labels: CaseStudyDetailLabels;
  backHref: string;
}) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-10 font-sans text-haze-100 sm:px-10 lg:px-12 lg:py-16">
      <a
        href={backHref}
        className="hover:text-mint-200 inline-flex items-center gap-2 text-sm font-medium text-mint-300 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint-300"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {labels.back}
      </a>

      <header className="mt-12 border-b border-mint-400/20 pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-300">
          {item.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-haze-100 sm:text-5xl">
          {item.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-haze-300">{item.summary}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <InfoCard label={labels.role} value={item.role} />
          <InfoCard label={labels.stack} value={item.stack.join(" · ")} />
        </div>
      </header>

      {item.visual && (
        <figure className="border-b border-mint-400/20 pb-12">
          <Image
            src={item.visual.src}
            alt={item.visual.alt}
            width={1988}
            height={1264}
            priority
            className="rounded-lg border border-mint-400/20"
          />
          <figcaption className="mt-3 text-sm leading-relaxed text-haze-500">
            {item.visual.caption}
          </figcaption>
        </figure>
      )}

      <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-12">
          <DetailSection label={labels.problem} body={item.problem} />
          <DetailSection label={labels.contribution} body={item.contribution} />
          <DetailSection label={labels.architecture} body={item.architecture} />
          <DetailSection label={labels.result} body={item.result} />
          {item.sections.map((section) => (
            <DetailSection key={section.heading} label={section.heading} body={section.body} />
          ))}
        </div>

        <aside className="space-y-8">
          <section
            aria-labelledby="case-study-stack"
            className="rounded-lg border border-mint-400/20 bg-ink-800/50 p-5"
          >
            <h2
              id="case-study-stack"
              className="text-haze-200 text-xs font-bold uppercase tracking-[0.16em]"
            >
              {labels.stack}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((technology) => (
                <li
                  key={technology}
                  className="text-mint-200 rounded-full bg-mint-400/10 px-3 py-1 text-xs font-medium"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="case-study-evidence"
            className="rounded-lg border border-mint-400/20 bg-ink-800/50 p-5"
          >
            <h2
              id="case-study-evidence"
              className="text-haze-200 text-xs font-bold uppercase tracking-[0.16em]"
            >
              {labels.evidence}
            </h2>
            <ul className="mt-4 space-y-3">
              {item.evidence.map((evidence) => (
                <li key={evidence.href}>
                  <a
                    href={evidence.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-mint-200 inline-flex items-start gap-2 text-sm leading-relaxed text-mint-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-300"
                  >
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{evidence.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <section aria-labelledby="case-study-diagram" className="border-t border-mint-400/20 pt-10">
        <h2
          id="case-study-diagram"
          className="text-xs font-bold uppercase tracking-[0.16em] text-mint-300"
        >
          {item.diagram.heading}
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {item.diagram.nodes.map((node, index) => (
            <div
              key={node.title}
              className="relative rounded-lg border border-mint-400/20 bg-gradient-to-br from-ink-700/70 to-ink-800/40 p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-haze-400">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-base font-semibold text-haze-100">{node.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-haze-400">{node.text}</p>
              {index < item.diagram.nodes.length - 1 && (
                <ArrowUpRight
                  className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-mint-300 md:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-mint-400/20 bg-ink-800/50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-haze-400">{label}</p>
      <p className="text-haze-200 mt-2 text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function DetailSection({ label, body }: { label: string; body: string }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-haze-100">{label}</h2>
      <p className="mt-3 text-base leading-8 text-haze-300">{body}</p>
    </section>
  );
}
