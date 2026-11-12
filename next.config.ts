import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const siteUrlHost = (() => {
  const publicURL = process.env.NEXT_PUBLIC_SITE_URL
  if (!publicURL) return undefined

  try {
    return new URL(publicURL).host
  } catch {
    return undefined
  }
})()

const allowedHostOrigins = [
  'localhost:3000',
  '127.0.0.1:3000',
  'www.marciorjcorretor.com.br',
  'marciorjcorretor.com.br',
  'red-hyena-420447.hostingersite.com',
  '*.hostingersite.com',
  ...(siteUrlHost ? [siteUrlHost] : []),
]

const nextConfig: NextConfig = {
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: allowedHostOrigins,
  enablePrerenderSourceMaps: false,
  experimental: {
    cpus: 1,
    serverActions: {
      bodySizeLimit: '20mb',
      allowedOrigins: allowedHostOrigins,
    },
  },
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || 'https://www.marciorjcorretor.com.br',
  },
}

export default nextConfig
