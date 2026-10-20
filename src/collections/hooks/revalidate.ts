import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/** Public pages that the CDN caches; keep in sync with the Cloudflare cache rule. */
const CACHED_PATHS = ["/", "/es", "/pt"];

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
async function refreshSite() {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
  } catch {
    // Outside a Next.js request (CLI, migrations) there is no cache to refresh.
    return;
  }
  await purgeCdn();
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  await refreshSite();
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await refreshSite();
  return doc;
};
