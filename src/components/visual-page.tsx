import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { getArticles, getDevelopments, getProperties } from '@/lib/content'
import { VisualPageClient } from '@/components/visual-page-client'

export type VisualSection = Record<string, any> & { blockType: string; id?: string }
export type VisualPage = { id?: number; title: string; path: string; sections?: VisualSection[] }

export async function renderVisualPage(path: string, draftPreview = false) {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: draftPreview
        ? { path: { equals: path } }
        : { and: [{ path: { equals: path } }, { _status: { equals: 'published' } }] },
      depth: 2,
      limit: 1,
      draft: draftPreview,
      overrideAccess: draftPreview,
    })
    const page = result.docs[0] as VisualPage | undefined
    if (!page) return null
    const [properties, articles, developments, requestHeaders] = await Promise.all([
      getProperties(), getArticles(), getDevelopments(), headers(),
    ])
    const host = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host') || ''
    const protocol = requestHeaders.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https')
    const serverURL = process.env.NEXT_PUBLIC_SITE_URL || (host ? `${protocol}://${host}` : 'https://www.marciorjcorretor.com.br')
    return <VisualPageClient page={page} serverURL={serverURL} listings={{ properties, articles, developments }} />
  } catch {
    // Keep the established page available when the new CMS collection has no record yet.
    return null
  }
}
