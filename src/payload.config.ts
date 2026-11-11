import path from 'path'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt as adminLanguage } from '@payloadcms/translations/languages/pt'
import { fileURLToPath } from 'url'
import { createHmac } from 'node:crypto'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { Categories } from './collections/Categories'
import { Authors } from './collections/Authors'
import { Articles } from './collections/Articles'
import { Properties } from './collections/Properties'
import { Developments } from './collections/Developments'
import { Leads } from './collections/Leads'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { Pages } from './collections/Pages'
import { Brand } from './globals/Brand'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const rawDatabaseUri = process.env.DATABASE_URI || process.env.POSTGRES_URL

function getCleanDatabaseUri(uri: string | undefined): string | undefined {
  if (!uri) return undefined
  try {
    const url = new URL(uri)
    url.searchParams.delete('sslmode')
    url.searchParams.delete('ssl')
    return url.toString()
  } catch {
    return uri.replace(/[?&]sslmode=[^&]+/, '').replace(/[?&]ssl=[^&]+/, '')
  }
}

const databaseUri = getCleanDatabaseUri(rawDatabaseUri)

const databaseAdapter = databaseUri
  ? postgresAdapter({
      pool: {
        connectionString: databaseUri,
        max: 1,
        ssl: {
          rejectUnauthorized: false,
        },
      },
    })
  : sqliteAdapter({
      client: {
        url: `file:${path.resolve(dirname, 'payload.db')}`,
      },
    })

function formatEndpoint(endpoint?: string): string | undefined {
  if (!endpoint) return undefined
  const trimmed = endpoint.trim()
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`
  }
  return trimmed
}

const s3Bucket = process.env.SUPABASE_STORAGE_BUCKET?.trim() || 'site-media'
const s3Endpoint = formatEndpoint(process.env.SUPABASE_STORAGE_S3_ENDPOINT)
const s3Region = process.env.SUPABASE_STORAGE_S3_REGION?.trim() || 'sa-east-1'
const s3AccessKeyId = process.env.SUPABASE_STORAGE_S3_ACCESS_KEY_ID?.trim()
const s3SecretAccessKey = process.env.SUPABASE_STORAGE_S3_SECRET_ACCESS_KEY?.trim()

const supabaseStorageConfigured = Boolean(s3Endpoint && s3AccessKeyId && s3SecretAccessKey)

function normalizeOrigin(value?: string): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim().replace(/\/$/, '')
  if (!trimmed) return undefined
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return `https://${trimmed}`
  return trimmed
}

const siteURL =
  normalizeOrigin(process.env.SERVER_URL) ||
  'https://red-hyena-420447.hostingersite.com'

const allowedCmsOrigins = [
  ...new Set([
    siteURL,
    'https://www.marciorjcorretor.com.br',
    'https://marciorjcorretor.com.br',
    'https://red-hyena-420447.hostingersite.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]),
]

if (!databaseUri) {
  console.warn(
    '[payload] DATABASE_URI ausente. As migrações vão para um SQLite local e as fotos não entram no Postgres do site.',
  )
}

if (!supabaseStorageConfigured) {
  console.warn(
    '[media] Supabase Storage desligado. Defina SUPABASE_STORAGE_S3_ENDPOINT, SUPABASE_STORAGE_S3_ACCESS_KEY_ID e SUPABASE_STORAGE_S3_SECRET_ACCESS_KEY no ambiente da Hostinger.',
  )
}

export default buildConfig({
  serverURL: siteURL,
  cors: allowedCmsOrigins,
  csrf: allowedCmsOrigins,
  secret: process.env.PAYLOAD_SECRET || 'marcio-rogerio-secret-dev-key-2026-payload',
  db: databaseAdapter,
  editor: lexicalEditor(),
  admin: {
    user: Admins.slug,
    livePreview: {
      collections: ['pages'],
      breakpoints: [
        { label: 'Celular', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Computador', name: 'desktop', width: 1440, height: 900 },
      ],
      url: ({ data, req }) => {
        const path = typeof data.path === 'string' ? data.path : '/'
        const base = req.origin || siteURL
        if (req.user?.collection !== Admins.slug) return undefined
        const expires = Date.now() + 5 * 60 * 1000
        const secret = process.env.PAYLOAD_SECRET || 'marcio-rogerio-secret-dev-key-2026-payload'
        const token = createHmac('sha256', secret).update(`${path}:${expires}`).digest('hex')
        const query = new URLSearchParams({ path, expires: String(expires), token })
        return `${base}/visual-preview?${query.toString()}`
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt: adminLanguage },
  },
  collections: [
    Admins,
    Media,
    Folders,
    Tags,
    Categories,
    Authors,
    Articles,
    Properties,
    Developments,
    Leads,
    NewsletterSubscribers,
    Pages,
  ],
  storage: [
    s3Storage({
      enabled: supabaseStorageConfigured,
      collections: {
        media: true,
      },
      bucket: s3Bucket,
      config: {
        endpoint: s3Endpoint,
        forcePathStyle: true,
        region: s3Region,
        credentials: {
          accessKeyId: s3AccessKeyId || '',
          secretAccessKey: s3SecretAccessKey || '',
        },
      },
    }),
  ],
  globals: [Brand],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
