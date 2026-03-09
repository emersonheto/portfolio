import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload/config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function handler(req: NextRequest) {
  const payload = await getPayload({ config })
  return await payload.handler(req)
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH }
