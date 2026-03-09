'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import type { Certification } from '@/payload-types'

interface CertificationsProps {
  certifications: Certification[]
}

export function Certifications({ certifications }: CertificationsProps) {
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
        {t('certifications.title')}
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              {cert.image && (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={typeof cert.image === 'string' ? cert.image : cert.image.url}
                    alt={cert.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{cert.name}</CardTitle>
                <CardDescription>{cert.institution}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(cert.date)}
                </div>
              </CardContent>
              {cert.verificationUrl && (
                <CardFooter>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('certifications.verify')}
                    </Button>
                  </a>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
