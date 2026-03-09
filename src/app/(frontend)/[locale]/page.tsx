import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Experience } from '@/components/sections/experience'
import { Projects } from '@/components/sections/projects'
import { Education as EducationComponent } from '@/components/sections/education'
import { Certifications } from '@/components/sections/certifications'
import { Contact } from '@/components/sections/contact'
import { getProfile, getProjects, getExperience, getEducation, getCertifications, getSkills } from '@/services/payload'
import { SITE_URL, SITE_NAME } from '@/lib/constants'
import type { Profile, Project, Experience as ExperienceType, Education as EducationType, Certification, Skill } from '@/payload-types'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('hero')

  try {
    const profileData = await getProfile()
    const profile = profileData.docs?.[0] as Profile | undefined

    if (!profile) {
      return {
        title: SITE_NAME,
        description: t('hi'),
      }
    }

    return {
      title: profile.name,
      description: profile.shortDescription,
      openGraph: {
        title: profile.name,
        description: profile.shortDescription,
        images: [
          {
            url: typeof profile.photo === 'string' ? profile.photo : profile.photo.url,
            width: 1200,
            height: 630,
          },
        ],
        type: 'website',
        siteName: SITE_NAME,
      },
      twitter: {
        card: 'summary_large_image',
        title: profile.name,
        description: profile.shortDescription,
        images: [
          typeof profile.photo === 'string' ? profile.photo : profile.photo.url,
        ],
      },
    }
  } catch {
    return {
      title: SITE_NAME,
      description: t('hi'),
    }
  }
}

export default async function HomePage() {
  try {
    const [profileData, projectsData, experienceData, educationData, certificationsData, skillsData] =
      await Promise.all([
        getProfile(),
        getProjects(),
        getExperience(),
        getEducation(),
        getCertifications(),
        getSkills(),
      ])

    const profile = profileData.docs?.[0] as Profile | undefined
    const projects = (projectsData.docs || []) as Project[]
    const experiences = (experienceData.docs || []) as ExperienceType[]
    const education = (educationData.docs || []) as EducationType[]
    const certifications = (certificationsData.docs || []) as Certification[]
    const skills = (skillsData.docs || []) as Skill[]

    if (!profile) {
      notFound()
    }

    return (
      <>
        <Hero profile={profile} />
        <About profile={profile} skills={skills} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <EducationComponent education={education} />
        <Certifications certifications={certifications} />
        <Contact />
      </>
    )
  } catch (error) {
    console.error('Error loading home page:', error)
    notFound()
  }
}
