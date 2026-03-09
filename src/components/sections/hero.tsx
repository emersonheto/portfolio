'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/payload-types'

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  const t = useTranslations()

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8 md:flex-row"
      >
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t('hero.hi')} {profile.name}
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {profile.professionalTitle}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-2xl text-lg text-gray-600 dark:text-gray-400"
          >
            {profile.shortDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4"
          >
            <Button asChild>
              <Link href="/contact">{t('hero.contact')}</Link>
            </Button>
            {profile.cv && (
              <Button variant="outline" asChild>
                <a
                  href={(typeof profile.cv === 'string' ? profile.cv : profile.cv.url)}
                  download
                >
                  {t('hero.downloadCV')}
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {profile.photo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative h-64 w-64 overflow-hidden rounded-full sm:h-80 sm:w-80"
          >
            <Image
              src={
                typeof profile.photo === 'string' ? profile.photo : profile.photo.url
              }
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
