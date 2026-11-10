import { createHmac, timingSafeEqual } from 'node:crypto'

export const contentTags = [
  'site',
  'properties',
  'articles',
  'developments',
  'categories',
  'authors',
  'media',
  'site-pages',
] as const
export type ContentTag = (typeof contentTags)[number]

export function signRevalidation(body: string, secret: string) {
  return createHmac('sha256', secret).update(`marcio-content:${body}`).digest('hex')
}

export function verifyRevalidation(body: string, signature: string, secret: string) {
  if (!/^[a-f0-9]{64}$/.test(signature)) return false
  return timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(signRevalidation(body, secret), 'hex'),
  )
}
