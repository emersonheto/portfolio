import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
// Report-Only on purpose: observe violations before enforcing. Inline scripts/styles are needed
// by the Next runtime, JSON-LD and Payload admin; Cloudinary/GitHub hosts serve next/image sources.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://res.cloudinary.com https://avatars.githubusercontent.com https://opengraph.githubassets.com",
  "font-src 'self' data:",
  // Payload admin only talks to its own origin; add upload/API hosts here if that changes.
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "media-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'report-uri /api/csp-report',
  'report-to csp-endpoint',
].join('; ')

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com' },
    ],
  },
  async redirects() {
    // The vision-language case study duplicated the Research section; keep its indexed URLs alive.
    return [
      // Keep /en/... on the unprefixed URL in a single permanent hop (next-intl would answer 307).
      { source: '/en/case-studies/vision-language-research', destination: '/#research', permanent: true },
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      { source: '/case-studies/vision-language-research', destination: '/#research', permanent: true },
      { source: '/:locale(es|pt)/case-studies/vision-language-research', destination: '/:locale#research', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: csp
          },
          {
            key: 'Reporting-Endpoints',
            value: 'csp-endpoint="/api/csp-report"'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        // CV PDFs carry phone numbers: downloadable from the site, kept out of search results.
        source: '/cv/:file*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
