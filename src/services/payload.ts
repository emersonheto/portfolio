import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import { REVALIDATE_SECONDS } from "@/lib/constants";
import config from "@/payload/config";

type Locale = "en" | "es" | "pt";

// Reusable cache key generator
function getCacheKey(collection: string, locale: string = "en") {
  return [collection, locale];
}

// Helper to get payload instance
async function getPayloadInstance() {
  return await getPayload({ config });
}

// Profile service (singleton)
export async function getProfile(locale: Locale = "en") {
  const payload = await getPayloadInstance();
  return unstable_cache(
    async () =>
      payload.find({
        locale,
        collection: "profile",
        depth: 1,
        limit: 1,
      }),
    getCacheKey("profile", locale),
    { revalidate: REVALIDATE_SECONDS }
  )();
}

// Projects service
export async function getProjects(locale: Locale = "en") {
  const payload = await getPayloadInstance();
  return unstable_cache(
    async () =>
      payload.find({
        locale,
        collection: "projects",
        sort: "createdAt",
        limit: 100,
        depth: 1,
      }),
    getCacheKey("projects", locale),
    { revalidate: REVALIDATE_SECONDS }
  )();
}

// Experience service
export async function getExperience(locale: Locale = "en") {
  const payload = await getPayloadInstance();
  return unstable_cache(
    async () =>
      payload.find({
        locale,
        collection: "experience",
        sort: "-startDate",
        limit: 100,
      }),
    getCacheKey("experience", locale),
    { revalidate: REVALIDATE_SECONDS }
  )();
}

// Education service
export async function getEducation(locale: Locale = "en") {
  const payload = await getPayloadInstance();
  return unstable_cache(
    async () =>
      payload.find({
        locale,
        collection: "education",
        sort: "-startDate",
        limit: 100,
      }),
    getCacheKey("education", locale),
    { revalidate: REVALIDATE_SECONDS }
  )();
}

// Certifications service
export async function getCertifications(locale: Locale = "en") {
  const payload = await getPayloadInstance();
  return unstable_cache(
    async () =>
      payload.find({
        locale,
        collection: "certifications",
        sort: "-date",
        limit: 100,
      }),
    getCacheKey("certifications", locale),
    { revalidate: REVALIDATE_SECONDS }
  )();
}

// Skills service
export async function getSkills(locale: Locale = "en") {
  const payload = await getPayloadInstance();
  return unstable_cache(
    async () =>
      payload.find({
        locale,
        collection: "skills",
        sort: "category",
        limit: 100,
      }),
    getCacheKey("skills", locale),
    { revalidate: REVALIDATE_SECONDS }
  )();
}
