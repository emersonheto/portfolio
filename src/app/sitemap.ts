import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import enMessages from "@/i18n/locales/en.json";

function localizedAlternates(path: string) {
  return {
    languages: {
      en: `${SITE_URL}${path}`,
      es: `${SITE_URL}/es${path}`,
      pt: `${SITE_URL}/pt${path}`,
      "x-default": `${SITE_URL}${path}`,
    },
  };
}

// Build-time date: pages are ISR (revalidated hourly), so the build date is the honest upper bound.
const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const home = localizedAlternates("");
  const academic = localizedAlternates("/academic");
  const caseStudies = enMessages.caseStudies.items.flatMap(({ slug }) => {
    const path = `/case-studies/${slug}`;
    const alternates = localizedAlternates(path);
    // x-default points at the English URL, so list each URL once.
    const { "x-default": _default, ...urls } = alternates.languages;
    return Object.values(urls).map((url) => ({
      url,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates,
    }));
  });

  return [
    { url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 1, alternates: home },
    { url: `${SITE_URL}/es`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9, alternates: home },
    { url: `${SITE_URL}/pt`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9, alternates: home },
    {
      url: `${SITE_URL}/academic`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: academic,
    },
    {
      url: `${SITE_URL}/es/academic`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: academic,
    },
    {
      url: `${SITE_URL}/pt/academic`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: academic,
    },
    ...caseStudies,
  ];
}
