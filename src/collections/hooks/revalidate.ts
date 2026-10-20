import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/** Refresh the cached public pages whenever site content changes. */
async function refreshSite() {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
  } catch {
    // Outside a Next.js request (CLI, migrations) there is no cache to refresh.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  await refreshSite();
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await refreshSite();
  return doc;
};
