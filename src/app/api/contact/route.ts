import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

// Simple in-memory rate limiter for development
// In production, use Upstash Redis or similar
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60 * 60 * 1000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address
    const ip = request.headers.get('x-forwarded-for') ??
              request.headers.get('x-real-ip') ??
              'anonymous'

    // Check rate limit (5 requests per hour per IP)
    if (!checkRateLimit(ip, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Validate input
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Sanitize input
    const sanitizedData = {
      name: validatedData.name.trim().replace(/[<>]/g, ''),
      email: validatedData.email.trim().toLowerCase(),
      message: validatedData.message.trim().replace(/[<>]/g, ''),
    }

    // Save to Payload
    const payload = await getPayload()
    await payload.create({
      collection: 'messages',
      data: {
        ...sanitizedData,
        ipAddress: ip,
        userAgent: request.headers.get('user-agent'),
      },
    })

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
