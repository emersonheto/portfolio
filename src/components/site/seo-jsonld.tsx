import type { Education, Experience, Profile, Project } from "@/payload-types";
import type { CaseStudyDetailData } from "@/components/site/case-study-detail";

type Locale = "en" | "es" | "pt";

export type SeoJsonLdProps = {
  locale: Locale;
  siteUrl: string;
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
};

const EMPLOYER = "Canvia";
// Completed degrees only; the ongoing UFRGS program is an affiliation, not alumni status.
const ALUMNI_PATTERNS = [/UTP|Tecnol[oó]gica del Per[uú]/i, /SENATI/i];
const AFFILIATION_PATTERN = /UFRGS|Rio Grande do Sul/i;
// Academic profiles and the paper listing, so search engines link them to the same person.
const EXTRA_SAME_AS = [
  "https://orcid.org/0009-0001-2884-3582",
  "http://lattes.cnpq.br/3577308738802100",
  "https://www.latinxinai.org/cvpr-2026",
];
const KNOWS_ABOUT = [
  "Natural Language Processing",
  "Large Language Models",
  "Retrieval-Augmented Generation",
  "Information Retrieval",
  "LLM Evaluation",
  "Vision-Language Models",
  "Machine Learning",
];
const FALLBACK_OG_IMAGE = "/images/og-emerson-herrera.jpg";
const CASE_STUDY_PUBLISHED = "2026-10-20";
const CASE_STUDY_MODIFIED = "2026-10-22";

function toAbsoluteUrl(value: string | null | undefined, siteUrl: string) {
  if (!value) return undefined;

  try {
    const url = new URL(value, `${siteUrl}/`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function SeoJsonLd({
  locale,
  siteUrl,
  profile,
  projects,
  experiences,
  education,
}: SeoJsonLdProps) {
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");
  const pageUrl = locale === "en" ? normalizedSiteUrl : `${normalizedSiteUrl}/${locale}`;
  const socialLinks = [
    ...(profile.socialNetworks || [])
      .map((network) => toAbsoluteUrl(network.url, normalizedSiteUrl))
      .filter((url): url is string => Boolean(url)),
    ...EXTRA_SAME_AS,
  ];
  const email = profile.socialNetworks
    ?.find((network) => network.url.toLowerCase().startsWith("mailto:"))
    ?.url.slice(7);

  const employer = experiences.find(
    (experience) => experience.current && experience.company.includes(EMPLOYER)
  );
  const alumniOf = ALUMNI_PATTERNS.flatMap((pattern) => {
    const entry = education.find((item) => pattern.test(item.institution));
    return entry
      ? [{ "@type": "EducationalOrganization", name: entry.institution.split(",")[0].trim() }]
      : [];
  });
  const affiliationEntry = education.find((item) => AFFILIATION_PATTERN.test(item.institution));
  const affiliation = affiliationEntry
    ? {
        "@type": "EducationalOrganization",
        name: affiliationEntry.institution.split(",")[0].trim(),
      }
    : undefined;

  const person = {
    "@type": "Person",
    "@id": `${pageUrl}#person`,
    name: profile.name,
    jobTitle: profile.professionalTitle,
    description: profile.shortDescription,
    url: pageUrl,
    image: toAbsoluteUrl(profile.photo, normalizedSiteUrl),
    inLanguage: locale,
    ...(employer ? { worksFor: { "@type": "Organization", name: EMPLOYER } } : {}),
    ...(alumniOf.length ? { alumniOf } : {}),
    ...(affiliation ? { affiliation } : {}),
    knowsAbout: KNOWS_ABOUT,
    ...(email ? { email } : {}),
    ...(socialLinks.length ? { sameAs: socialLinks } : {}),
  };

  const projectItems = projects.map((project) => {
    const url = toAbsoluteUrl(project.githubUrl || project.demoUrl, normalizedSiteUrl);
    const image = toAbsoluteUrl(project.image, normalizedSiteUrl);
    const keywords = (project.technologies || [])
      .map((technology) => technology.technology)
      .filter(Boolean);

    return {
      "@type": "Project",
      "@id": `${pageUrl}#project-${project.id}`,
      name: project.name,
      description: project.description,
      inLanguage: locale,
      ...(url ? { url } : {}),
      ...(image ? { image } : {}),
      ...(keywords.length ? { keywords } : {}),
    };
  });

  const website = {
    "@type": "WebSite",
    "@id": `${normalizedSiteUrl}#website`,
    url: pageUrl,
    name: profile.name,
    inLanguage: locale,
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profilepage`,
    url: pageUrl,
    mainEntity: { "@id": person["@id"] },
    inLanguage: locale,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [website, profilePage, person, ...projectItems],
  };

  return <script type="application/ld+json">{serializeJsonLd(jsonLd)}</script>;
}

export function CaseStudyJsonLd({
  locale,
  siteUrl,
  item,
}: {
  locale: Locale;
  siteUrl: string;
  item: CaseStudyDetailData;
}) {
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const url = `${normalizedSiteUrl}${localePrefix}/case-studies/${item.slug}`;
  const personRef = {
    "@type": "Person",
    name: "Emerson Herrera Tolentino",
    url: normalizedSiteUrl,
  };
  const image = toAbsoluteUrl(item.visual?.src || FALLBACK_OG_IMAGE, normalizedSiteUrl);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#case-study`,
    headline: item.title,
    description: item.summary,
    url,
    inLanguage: locale,
    ...(image ? { image } : {}),
    datePublished: CASE_STUDY_PUBLISHED,
    dateModified: CASE_STUDY_MODIFIED,
    author: personRef,
    publisher: personRef,
    about: item.stack,
    keywords: item.stack,
  };

  return <script type="application/ld+json">{serializeJsonLd(jsonLd)}</script>;
}

export default SeoJsonLd;
