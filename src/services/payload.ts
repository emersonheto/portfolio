import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { REVALIDATE_SECONDS } from '@/lib/constants'
import config from '@/payload/config'

// Reusable cache key generator
function getCacheKey(collection: string, locale: string = 'en') {
  return [collection, locale]
}

// Helper to get payload instance
async function getPayloadInstance() {
  return await getPayload({ config })
}

// Profile service (singleton)
export async function getProfile() {
  const payload = await getPayloadInstance()
  return unstable_cache(
    async () =>
      payload.find({
        collection: 'profile',
        depth: 1,
        limit: 1,
      }),
    getCacheKey('profile'),
    { revalidate: REVALIDATE_SECONDS }
  )()
}

// Projects service
export async function getProjects() {
  const payload = await getPayloadInstance()
  return unstable_cache(
    async () =>
      payload.find({
        collection: 'projects',
        sort: '-createdAt',
        depth: 1,
      }),
    getCacheKey('projects'),
    { revalidate: REVALIDATE_SECONDS }
  )()
}

// Experience service
export async function getExperience() {
  const payload = await getPayloadInstance()
  return unstable_cache(
    async () =>
      payload.find({
        collection: 'experience',
        sort: '-startDate',
      }),
    getCacheKey('experience'),
    { revalidate: REVALIDATE_SECONDS }
  )()
}

// Education service
export async function getEducation() {
  const payload = await getPayloadInstance()
  return unstable_cache(
    async () =>
      payload.find({
        collection: 'education',
        sort: '-startDate',
      }),
    getCacheKey('education'),
    { revalidate: REVALIDATE_SECONDS }
  )()
}

// Certifications service
export async function getCertifications() {
  const payload = await getPayloadInstance()
  return unstable_cache(
    async () =>
      payload.find({
        collection: 'certifications',
        sort: '-date',
      }),
    getCacheKey('certifications'),
    { revalidate: REVALIDATE_SECONDS }
  )()
}

// Skills service
export async function getSkills() {
  const payload = await getPayloadInstance()
  return unstable_cache(
    async () =>
      payload.find({
        collection: 'skills',
        sort: 'category',
      }),
    getCacheKey('skills'),
    { revalidate: REVALIDATE_SECONDS }
  )()
}
