'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const contactSchema = z.object({
  name: z.string().min(2, 'contact.validation.nameMin'),
  email: z.string().email('contact.validation.emailInvalid'),
  message: z.string().min(10, 'contact.validation.messageMin'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const t = useTranslations()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else if (response.status === 429) {
        setSubmitStatus('error')
        alert(t('contact.rateLimit'))
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <h2 className="mb-8 text-3xl font-bold tracking-tight">{t('contact.title')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...register('name')}
            label={t('contact.name')}
            error={t(errors.name?.message as any)}
            aria-label="Your name"
          />

          <Input
            {...register('email')}
            label={t('contact.email')}
            type="email"
            error={t(errors.email?.message as any)}
            aria-label="Your email"
          />

          <Textarea
            {...register('message')}
            label={t('contact.message')}
            rows={5}
            error={t(errors.message?.message as any)}
            aria-label="Your message"
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t('contact.sending') : t('contact.send')}
          </Button>

          {submitStatus === 'success' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-600 dark:text-green-400"
            >
              {t('contact.success')}
            </motion.p>
          )}

          {submitStatus === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-600 dark:text-red-400"
            >
              {t('contact.error')}
            </motion.p>
          )}
        </form>
      </motion.div>
    </section>
  )
}
