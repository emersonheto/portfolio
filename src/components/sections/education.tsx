'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Education as EducationType } from '@/payload-types'

interface EducationProps {
  education: EducationType[]
}

export function Education({ education }: EducationProps) {
  const t = useTranslations()

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold tracking-tight"
      >
        {t('education.title')}
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{edu.degree}</CardTitle>
                <CardDescription className="text-lg">{edu.institution}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(edu.startDate)} -{' '}
                  {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </div>
                {edu.description && (
                  <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
