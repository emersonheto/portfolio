import { MetadataRoute } from 'next'
import { getProfile, getProjects } from '@/services/payload'
import { SITE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [profileData, projectsData] = await Promise.all([
      getProfile(),
      getProjects(),
    ])

    const profile = profileData.docs?.[0]
    const projects = projectsData.docs || []

    const staticRoutes = [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
      },
      {
        url: `${SITE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/experience`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/education`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/certifications`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
    ]

    return staticRoutes
  } catch {
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
      },
    ]
  }
}
