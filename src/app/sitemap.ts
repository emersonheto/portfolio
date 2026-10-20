import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1, alternates: { languages: { en: SITE_URL, es: `${SITE_URL}/es` } } },
    { url: `${SITE_URL}/es`, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: SITE_URL, es: `${SITE_URL}/es` } } },
  ];
}
