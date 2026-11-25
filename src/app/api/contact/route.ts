import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import { z } from "zod";
import config from "@/payload/config";
import { CONTACT_FORM_RATE_LIMIT, CONTACT_FORM_RATE_WINDOW_MS } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

// Simple in-memory rate limiter (per instance). Use Upstash Redis or similar for multi-instance setups.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_TRACKED_IPS = 10_000;

function pruneExpired(now: number) {
  for (const [key, record] of rateLimitMap) {
    if (now > record.resetTime) rateLimitMap.delete(key);
  }
}

function checkRateLimit(
  ip: string,
  limit: number = CONTACT_FORM_RATE_LIMIT,
  windowMs: number = CONTACT_FORM_RATE_WINDOW_MS
): boolean {
  const now = Date.now();
  pruneExpired(now);

  const record = rateLimitMap.get(ip);

  if (!record) {
    // Hard cap: if still full after pruning, drop the oldest entry (Map keeps insertion order).
    if (rateLimitMap.size >= MAX_TRACKED_IPS) {
      const oldest = rateLimitMap.keys().next().value;
      if (oldest !== undefined) rateLimitMap.delete(oldest);
    }
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIp(request: NextRequest): string {
  // Behind Cloudflare, cf-connecting-ip is set by the edge; x-forwarded-for is client-appendable.
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  const xff = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return xff || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address
    const ip = getClientIp(request);

    // Check rate limit per client IP
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Validate input
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Sanitize input
    const sanitizedData = {
      name: validatedData.name.trim().replace(/[<>]/g, ""),
      email: validatedData.email.trim().toLowerCase(),
      message: validatedData.message.trim().replace(/[<>]/g, ""),
    };

    // Save to Payload
    const payload = await getPayload({ config });
    await payload.create({
      collection: "messages",
      data: {
        ...sanitizedData,
        ipAddress: ip,
        userAgent: request.headers.get("user-agent"),
      },
    });

    return NextResponse.json({ message: "Message sent successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
