import Image from "next/image";
import { ArrowUpRight, Github, Mail, Linkedin } from "lucide-react";
import type { Certification, Education, Experience, Profile, Project, Skill } from "@/payload-types";
import { AI_TOOLS, initials, organizationLogo } from "@/lib/logos";

type Locale = "en" | "es" | "pt";

/** Organization logo on a white tile; initials when there is no logo. */
function OrgLogo({ name, size = 40 }: { name: string; size?: number }) {
  const logo = organizationLogo(name);
  const box = { width: size, height: size };
  return logo ? (
    <span style={box} className="flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-1 ring-1 ring-mint-400/20">
      <Image src={logo} alt="" width={size * 2} height={size * 2} className="h-full w-full object-contain" />
    </span>
  ) : (
    <span style={box} aria-hidden className="flex shrink-0 items-center justify-center rounded-md bg-ink-700 text-xs font-bold text-mint-300 ring-1 ring-mint-400/20">
      {initials(name)}
    </span>
  );
}

/** Section wrapper: on small screens the title sticks to the top while scrolling the section. */
export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-label={title} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-ink-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-haze-100 lg:sr-only">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-mint-400/10 px-3 py-1 text-xs font-medium leading-5 text-mint-300">
          {item}
        </li>
      ))}
    </ul>
  );
}

function formatMonth(value: string | null | undefined, locale: Locale) {
  if (!value) return "";
  const text = new Intl.DateTimeFormat(locale === "es" ? "es-PE" : "en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
  return text.replace(".", "");
}

function formatRange(start: string, end: string | null | undefined, current: boolean | null | undefined, locale: Locale, present: string) {
  return `${formatMonth(start, locale)} — ${current || !end ? present : formatMonth(end, locale)}`;
}

/** Card with a hover highlight that spans the full row, in the style of the reference design. */
function Row({ aside, children, href }: { aside: React.ReactNode; children: React.ReactNode; href?: string | null }) {
  return (
    <div className="group relative grid gap-2 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-ink-700/40 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(94,234,212,0.08)] lg:group-hover:drop-shadow-lg" />
      <div className="z-10 sm:col-span-2">{aside}</div>
      <div className="z-10 sm:col-span-6">{children}</div>
      {href && <a href={href} target="_blank" rel="noreferrer noopener" className="absolute inset-0 z-20" aria-hidden tabIndex={-1} />}
    </div>
  );
}

export function About({ profile, highlights }: { profile: Profile; highlights: { value: string; label: string }[] }) {
  return (
    <>
      <div className="space-y-4 leading-relaxed text-haze-400">
        {profile.longDescription.split(/\n\s*\n/).map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
      <dl className="mt-10 grid grid-cols-2 gap-4">
        {highlights.map((item) => (
          <div key={item.value} className="rounded-lg border border-mint-400/15 bg-ink-800/60 p-4">
            <dt className="sr-only">{item.label}</dt>
            <dd className="text-2xl font-bold tracking-tight text-mint-300 sm:text-3xl">{item.value}</dd>
            <dd className="mt-1 text-xs leading-snug text-haze-400">{item.label}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function ExperienceList({ items, locale, present }: { items: Experience[]; locale: Locale; present: string }) {
  return (
    <ol className="group/list space-y-12">
      {items.map((item) => (
        <li key={item.id}>
          <Row
            aside={
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-haze-500">
                {formatRange(item.startDate, item.endDate, item.current, locale, present)}
              </p>
            }
          >
            <div className="flex items-start gap-3">
              <OrgLogo name={item.company} />
              <h3 className="font-medium leading-snug text-haze-100">
                <span className="group-hover:text-mint-300">{item.position}</span>
                <span className="block text-sm text-haze-300">{item.company}</span>
              </h3>
            </div>
            <p className="mt-2 text-sm leading-normal text-haze-400">{item.description}</p>
            <Chips items={(item.technologies || []).map((t) => t.technology)} />
          </Row>
        </li>
      ))}
    </ol>
  );
}

export function Research({ text, href }: { text: { title: string; venue: string; authors: string; summary: string; code: string }; href: string }) {
  return (
    <div className="rounded-lg border border-mint-400/20 bg-gradient-to-br from-ink-700/60 to-ink-800/40 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-mint-300">{text.venue}</p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-haze-100">{text.title}</h3>
      <p className="mt-1 text-sm text-haze-300">{text.authors}</p>
      <p className="mt-3 text-sm leading-normal text-haze-400">{text.summary}</p>
      <a href={href} target="_blank" rel="noreferrer noopener" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-mint-300 hover:text-mint-400">
        <Github className="h-4 w-4" aria-hidden /> {text.code} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </div>
  );
}

export function ProjectList({ items, labels }: { items: Project[]; labels: { featured: string; viewCode: string } }) {
  return (
    <ul className="group/list space-y-12">
      {items.map((item) => (
        <li key={item.id}>
          <Row
            href={item.githubUrl || item.demoUrl}
            aside={
              <Image
                src={item.image}
                alt=""
                width={240}
                height={120}
                className="aspect-[2/1] w-full max-w-[200px] rounded border-2 border-ink-700 object-cover transition group-hover:border-mint-400/40 sm:translate-y-1"
              />
            }
          >
            <h3 className="font-medium leading-snug text-haze-100">
              <span className="inline-flex items-baseline gap-1 group-hover:text-mint-300">
                {item.name}
                {(item.githubUrl || item.demoUrl) && <ArrowUpRight className="h-4 w-4 shrink-0 translate-y-0.5" aria-label={labels.viewCode} />}
              </span>
              {item.featured && (
                <span className="ml-2 rounded-full border border-mint-400/40 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-mint-300">
                  {labels.featured}
                </span>
              )}
            </h3>
            <p className="mt-2 text-sm leading-normal text-haze-400">{item.description}</p>
            <Chips items={(item.technologies || []).map((t) => t.technology)} />
          </Row>
        </li>
      ))}
    </ul>
  );
}

const CATEGORY_ORDER = ["ai", "backend", "frontend", "data", "devops", "tools", "design", "soft"];

export function Skills({ items, labels }: { items: Skill[]; labels: Record<string, string> }) {
  const groups = CATEGORY_ORDER.map((category) => ({ category, skills: items.filter((s) => s.category === category) })).filter((g) => g.skills.length);
  return (
    <div className="space-y-6">
      {groups.map(({ category, skills }) => (
        <div key={category}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-haze-300">{labels[category] ?? category}</h3>
          <Chips items={skills.map((s) => s.name)} />
        </div>
      ))}
    </div>
  );
}

export function EducationList({ items, locale, present }: { items: Education[]; locale: Locale; present: string }) {
  return (
    <ol className="space-y-8">
      {items.map((item) => (
        <li key={item.id} className="grid gap-1 sm:grid-cols-8 sm:gap-4">
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-haze-500 sm:col-span-2">
            {formatRange(item.startDate, item.endDate, !item.endDate, locale, present)}
          </p>
          <div className="flex items-start gap-3 sm:col-span-6">
            <OrgLogo name={item.institution} />
            <div>
            <h3 className="font-medium leading-snug text-haze-100">{item.degree}</h3>
            <p className="text-sm text-haze-300">{item.institution}</p>
            {item.description && <p className="mt-1 text-sm leading-normal text-haze-400">{item.description}</p>}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CertificationList({ items, locale, labels }: { items: Certification[]; locale: Locale; labels: { verify: string; view: string } }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.id} className="group flex flex-col overflow-hidden rounded-lg border border-mint-400/15 bg-ink-800/60 transition hover:border-mint-400/40">
          {item.image && (
            <a href={item.image} target="_blank" rel="noreferrer noopener" aria-label={`${labels.view}: ${item.name}`} className="block overflow-hidden bg-white">
              <Image
                src={item.image}
                alt={item.name}
                width={640}
                height={480}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                className="aspect-[4/3] w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
              />
            </a>
          )}
          <div className="flex flex-1 flex-col p-4">
            <p className="text-sm font-medium leading-snug text-haze-100">{item.name}</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-haze-400">
              <OrgLogo name={item.institution} size={22} />
              {item.institution} · {formatMonth(item.date, locale)}
            </p>
            <div className="mt-auto flex gap-4 pt-3">
              {item.image && (
                <a href={item.image} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-xs font-medium text-mint-300 hover:text-mint-400">
                  {labels.view} <ArrowUpRight className="h-3 w-3" aria-hidden />
                </a>
              )}
              {item.verificationUrl && (
                <a href={item.verificationUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-xs font-medium text-mint-300 hover:text-mint-400">
                  {labels.verify} <ArrowUpRight className="h-3 w-3" aria-hidden />
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AiWork({ text }: { text: { intro: string; items: { title: string; text: string }[] } }) {
  return (
    <>
      <p className="leading-relaxed text-haze-400">{text.intro}</p>
      <ul className="mt-6 flex flex-wrap gap-3" aria-label="Tools">
        {AI_TOOLS.map((tool) => (
          <li key={tool.name} className="flex items-center gap-2 rounded-full border border-mint-400/20 bg-ink-800/60 py-1 pl-1 pr-3">
            <span className={`flex h-7 w-7 items-center justify-center overflow-hidden rounded-full ${"fill" in tool ? "bg-black" : "bg-white p-1"}`}>
              <Image src={tool.logo} alt="" width={56} height={56} unoptimized={tool.logo.endsWith(".svg")} className={`h-full w-full ${"fill" in tool ? "object-cover" : "object-contain"}`} />
            </span>
            <span className="text-xs font-medium text-haze-100">{tool.name}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {text.items.map((item) => (
          <li key={item.title} className="rounded-lg border border-mint-400/15 bg-ink-800/60 p-4">
            <h3 className="text-sm font-semibold text-haze-100">{item.title}</h3>
            <p className="mt-2 text-sm leading-normal text-haze-400">{item.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Contact({ profile, text }: { profile: Profile; text: { title: string; body: string } }) {
  const links = profile.socialNetworks || [];
  const email = links.find((l) => l.url.startsWith("mailto:"));
  const linkedin = links.find((l) => l.platform.toLowerCase() === "linkedin");
  return (
    <div className="rounded-lg border border-mint-400/15 bg-ink-800/60 p-6">
      <h3 className="text-lg font-semibold text-haze-100">{text.title}</h3>
      <p className="mt-2 text-sm leading-normal text-haze-400">{text.body}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {email && (
          <a href={email.url} className="inline-flex items-center gap-2 rounded-md bg-mint-400 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-mint-300">
            <Mail className="h-4 w-4" aria-hidden /> {email.url.replace("mailto:", "")}
          </a>
        )}
        {linkedin && (
          <a href={linkedin.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-md border border-mint-400/40 px-4 py-2 text-sm font-semibold text-mint-300 transition hover:border-mint-300">
            <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
