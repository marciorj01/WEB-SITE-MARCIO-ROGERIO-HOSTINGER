import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'
import { signRevalidation, type ContentTag } from '@/lib/revalidation'

async function invalidate(req: PayloadRequest, tags: ContentTag[], paths: string[]) {
  try {
    for (const tag of tags) revalidateTag(tag, { expire: 0 })
    for (const path of paths) revalidatePath(path, path === '/' ? 'layout' : 'page')
  } catch (error) {
    // CLI writes run outside Next's request store; notify the same app securely.
    if (
      !(error instanceof Error) ||
      !/static generation store|incremental cache|request store|work store/i.test(error.message)
    )
      throw error
    const body = JSON.stringify({ tags, paths, timestamp: Date.now() })
    const origin = process.env.REVALIDATION_ORIGIN || `http://127.0.0.1:${process.env.PORT || 3000}`
    const response = await fetch(`${origin}/api/revalidate-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Signature': signRevalidation(body, req.payload.config.secret),
      },
      body,
      signal: AbortSignal.timeout(20000),
    })
    if (!response.ok) throw new Error(`Content cache invalidation failed (${response.status})`)
  }
}

const routes = {
  articles: '/conteudo',
  properties: '/comprar',
  developments: '/empreendimentos',
} as const

export function editorialHooks(collection: keyof typeof routes) {
  const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
    const base = routes[collection]
    const detailBase = collection === 'properties' ? '/imoveis' : base
    const paths = [
      '/',
      base,
      '/investir',
      ...[previousDoc?.slug, doc.slug].filter(Boolean).map((slug) => `${detailBase}/${slug}`),
    ]
    await invalidate(req, [collection], [...new Set(paths)])
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
    const base = routes[collection]
    const detailBase = collection === 'properties' ? '/imoveis' : base
    await invalidate(req, [collection], ['/', base, '/investir', `${detailBase}/${doc.slug}`])
    return doc
  }
  return { afterChange: [afterChange], afterDelete: [afterDelete] }
}

export const revalidateShared: CollectionAfterChangeHook = async ({ doc, req }) => {
  await invalidate(
    req,
    ['media', 'site', 'articles', 'properties', 'developments', 'categories', 'authors'],
    ['/'],
  )
  return doc
}
export const revalidateSharedDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await invalidate(
    req,
    ['media', 'site', 'articles', 'properties', 'developments', 'categories', 'authors'],
    ['/'],
  )
  return doc
}
export const revalidateBrand: GlobalAfterChangeHook = async ({ doc, req }) => {
  await invalidate(req, ['site'], ['/'])
  return doc
}

export const revalidateSitePage: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if ((req.context as Record<string, unknown>)?.skipSitePageRevalidation === true) return doc
  const paths = [...new Set([doc?.path, previousDoc?.path].filter((path): path is string => Boolean(path)))]
  await invalidate(req, ['site-pages', 'media'], paths)
  return doc
}

export const revalidateSitePageDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await invalidate(req, ['site-pages', 'media'], doc?.path ? [doc.path] : [])
  return doc
}
