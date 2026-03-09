import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload/config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function handler(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    // @ts-ignore - Payload handler signature
    return await payload.handler(req)
  } catch (error) {
    console.error('Admin route error:', error)
    return NextResponse.json({ error: 'Admin error' }, { status: 500 })
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH }
