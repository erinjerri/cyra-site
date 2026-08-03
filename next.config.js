import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const isDev = process.env.NODE_ENV === 'development'

// R2 public hostname must be an allowed remote pattern, or next/image returns
// 400 for every uploaded asset in production. See docs/MediaStorage.md.
const r2PublicHost = (process.env.R2_PUBLIC_HOSTNAME || process.env.R2_PUBLIC_URL || '')
  .trim()
  .replace(/^https?:\/\//, '')
  .replace(/\/+$/, '')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Skip image optimization in development to avoid localhost private IP blocking
    unoptimized: isDev,
    // Allow quality 100 (used by some components)
    qualities: [100, 75],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      ...(r2PublicHost ? [{ hostname: r2PublicHost, protocol: 'https' }] : []),
    ],
    // Allow localhost images
    localPatterns: [
      {
        pathname: '/api/media/**',
      },
      {
        pathname: '/media/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
