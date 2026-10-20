import type { Profile, Project } from "@/payload-types";
import type { CaseStudyDetailData } from "@/components/site/case-study-detail";

type Locale = "en" | "es" | "pt";

export type SeoJsonLdProps = {
  locale: Locale;
  siteUrl: string;
  profile: Profile;
  projects: Project[];
};

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

export function SeoJsonLd({ locale, siteUrl, profile, projects }: SeoJsonLdProps) {
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");
  const pageUrl = locale === "en" ? normalizedSiteUrl : `${normalizedSiteUrl}/${locale}`;
  const socialLinks = (profile.socialNetworks || [])
    .map((network) => toAbsoluteUrl(network.url, normalizedSiteUrl))
    .filter((url): url is string => Boolean(url));
  const email = profile.socialNetworks
    ?.find((network) => network.url.toLowerCase().startsWith("mailto:"))
    ?.url.slice(7);

  const person = {
    "@type": "Person",
    "@id": `${pageUrl}#person`,
    name: profile.name,
    jobTitle: profile.professionalTitle,
    description: profile.shortDescription,
    url: pageUrl,
    image: toAbsoluteUrl(profile.photo, normalizedSiteUrl),
    inLanguage: locale,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [person, ...projectItems],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#case-study`,
    headline: item.title,
    description: item.summary,
    url,
    inLanguage: locale,
    author: { "@type": "Person", name: "Emerson Herrera Tolentino", url: normalizedSiteUrl },
    about: item.stack,
    keywords: item.stack,
  };

  return <script type="application/ld+json">{serializeJsonLd(jsonLd)}</script>;
}

export default SeoJsonLd;
