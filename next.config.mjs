import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// Enforced policy. Inline scripts/styles are needed by the Next runtime, JSON-LD and Payload admin;
// Cloudinary/GitHub hosts serve next/image sources. No nonces on purpose: they would make every page
// dynamic and defeat ISR and Cloudflare edge caching, so 'unsafe-inline' stays.
const buildCsp = ({ allowEval }) =>
  [
    "default-src 'self'",
    // Cloudflare Web Analytics injects its beacon at the edge.
    `script-src 'self' 'unsafe-inline'${allowEval ? " 'unsafe-eval'" : ''} https://static.cloudflareinsights.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://res.cloudinary.com https://avatars.githubusercontent.com https://opengraph.githubassets.com https://www.gravatar.com",
    "font-src 'self' data:",
    // Payload admin talks to its own origin; the analytics beacon posts to cloudflareinsights.com.
    "connect-src 'self' https://cloudflareinsights.com",
    "worker-src 'self' blob:",
    "media-src 'self' blob:",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'report-uri /api/csp-report',
    'report-to csp-endpoint',
  ].join('; ')

// Admin keeps 'unsafe-eval'; the public site is enforced with it and also reports without it.
const adminCsp = buildCsp({ allowEval: true })
const publicCsp = buildCsp({ allowEval: true })
const publicStrictCsp = buildCsp({ allowEval: false })

/** @type {import('next').NextConfig} */
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
        // `/admin/:path*` also matches `/admin`; the public rule excludes it, so exactly one CSP applies.
        source: '/admin/:path*',
        headers: [{ key: 'Content-Security-Policy', value: adminCsp }],
      },
      {
        source: '/((?!admin).*)',
        headers: [
          { key: 'Content-Security-Policy', value: publicCsp },
          { key: 'Content-Security-Policy-Report-Only', value: publicStrictCsp },
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
