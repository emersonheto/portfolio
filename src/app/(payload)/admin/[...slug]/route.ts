import { route } from '@payloadcms/next/next'
import config from '@/payload/config'

export const { GET, POST, PATCH, DELETE } = route({
  config,
})

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
