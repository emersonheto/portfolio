import { payload } from '@/payload'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function handler(req: NextRequest) {
  // Payload 3.x with Next.js 15 integration
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path') || ''

  // Handle the request through Payload
  const response = await payload.handler(req, {
    params: { slug: path.split('/') },
  })

  return response
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH }
