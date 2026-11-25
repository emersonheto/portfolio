import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import enMessages from "@/i18n/locales/en.json";
import esMessages from "@/i18n/locales/es.json";
import ptMessages from "@/i18n/locales/pt.json";

/** Case-study pages come from the locale messages; English is the unprefixed default locale. */
const CASE_STUDY_PATHS = Object.entries({ en: enMessages, es: esMessages, pt: ptMessages }).flatMap(
  ([locale, messages]) =>
    messages.caseStudies.items.map(
      ({ slug }) => `${locale === "en" ? "" : `/${locale}`}/case-studies/${slug}`
    )
);

/** Public pages that the CDN caches; keep in sync with the Cloudflare cache rule. */
const CACHED_PATHS = ["/", "/es", "/pt", ...CASE_STUDY_PATHS];

/** Ask Cloudflare to drop its copy of the public pages. Optional: skipped without credentials. */
async function purgeCdn() {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const token = process.env.CLOUDFLARE_PURGE_TOKEN;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!zoneId || !token || !siteUrl) return;

  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ files: CACHED_PATHS.map((path) => new URL(path, siteUrl).toString()) }),
    });
    if (!response.ok) console.error(`Cloudflare purge failed: HTTP ${response.status}`);
  } catch (error) {
    console.error("Cloudflare purge failed:", error);
  }
}

/** Refresh the cached public pages whenever site content changes. */
async function refreshSite(purgeCdnCache = true) {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
    for (const path of CASE_STUDY_PATHS) revalidatePath(path);
  } catch {
    // Outside a Next.js request (CLI, migrations) there is no cache to refresh.
    return;
  }
  if (purgeCdnCache) await purgeCdn();
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  await refreshSite(req?.headers?.get("x-portfolio-content-loader") !== "1");
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await refreshSite(req?.headers?.get("x-portfolio-content-loader") !== "1");
  return doc;
};
