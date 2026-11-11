import 'server-only'
import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'

const published = { _status: { equals: 'published' } } as const

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
    const { docs } = await payload.find({
      collection: 'properties',
      depth: 2,
      pagination: false,
      sort: 'order',
      overrideAccess: false,
      where: published,
    })
    return docs
  },
  ['properties-list'],
  { tags: ['properties', 'media'] },
)

export const getArticles = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'articles',
      depth: 2,
      pagination: false,
      sort: 'order',
      overrideAccess: false,
      where: published,
    })
    return docs
  },
  ['articles-list'],
  { tags: ['articles', 'categories', 'authors', 'media'] },
)

export const getCategories = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'categories',
      depth: 0,
      pagination: false,
      sort: 'order',
      overrideAccess: false,
    })
    return docs
  },
  ['categories-list'],
  { tags: ['categories'] },
)

export const getDevelopments = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'developments',
      depth: 2,
      pagination: false,
      sort: 'order',
      overrideAccess: false,
      where: published,
    })
    return docs
  },
  ['developments-list'],
  { tags: ['developments', 'media'] },
)