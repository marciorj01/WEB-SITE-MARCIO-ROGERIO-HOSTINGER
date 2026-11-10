import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'

export const getBrand = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'brand', depth: 2, overrideAccess: false })
  },
  ['brand'],
  { tags: ['site', 'media'] },
)

export const getProperties = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'properties',
      depth: 2,
      limit: 100,
      sort: 'order',
      overrideAccess: false,
      where: { _status: { equals: 'published' } },
    })
    return result.docs
  },
  ['properties-list'],
  { tags: ['properties', 'media'] },
)

export const getArticles = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'articles',
      depth: 2,
      limit: 100,
      sort: 'order',
      overrideAccess: false,
      where: { _status: { equals: 'published' } },
    })
    return result.docs
  },
  ['articles-list'],
  { tags: ['articles', 'categories', 'authors', 'media'] },
)

export const getCategories = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return (
      await payload.find({
        collection: 'categories',
        depth: 0,
        limit: 100,
        sort: 'order',
        overrideAccess: false,
      })
    ).docs
  },
  ['categories-list'],
  { tags: ['categories'] },
)

export const getDevelopments = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return (
      await payload.find({
        collection: 'developments',
        depth: 2,
        limit: 100,
        sort: 'order',
        overrideAccess: false,
        where: { _status: { equals: 'published' } },
      })
    ).docs
  },
  ['developments-list'],
  { tags: ['developments', 'media'] },
)
