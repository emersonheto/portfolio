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

export default function sitemap(): MetadataRoute.Sitemap {
  const home = localizedAlternates("");
  const caseStudies = enMessages.caseStudies.items.flatMap(({ slug }) => {
    const path = `/case-studies/${slug}`;
    const alternates = localizedAlternates(path);
    // x-default points at the English URL, so list each URL once.
    const { "x-default": _default, ...urls } = alternates.languages;
    return Object.values(urls).map((url) => ({
      url,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates,
    }));
  });

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1, alternates: home },
    { url: `${SITE_URL}/es`, changeFrequency: "monthly", priority: 0.9, alternates: home },
    { url: `${SITE_URL}/pt`, changeFrequency: "monthly", priority: 0.9, alternates: home },
    ...caseStudies,
  ];
}
