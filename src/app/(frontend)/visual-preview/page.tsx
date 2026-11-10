import { createHmac, timingSafeEqual } from 'node:crypto'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { renderVisualPage } from '@/components/visual-page'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { robots: { index: false, follow: false } }

const allowedPaths = new Set([
  '/', '/comprar', '/investir', '/empreendimentos', '/vender', '/conteudo', '/sobre', '/contato', '/privacidade',
])

export default async function VisualPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string; expires?: string; token?: string }>
}) {
  const { path, expires: expiryText, token } = await searchParams
  const expires = Number(expiryText)
  if (!path || !allowedPaths.has(path) || !Number.isSafeInteger(expires) || !token) notFound()
  if (expires <= Date.now() || expires > Date.now() + 5 * 60 * 1000) notFound()

  const secret = process.env.PAYLOAD_SECRET || 'marcio-rogerio-secret-dev-key-2026-payload'
  const expected = createHmac('sha256', secret).update(`${path}:${expires}`).digest('hex')
  if (!/^[a-f0-9]{64}$/i.test(token) || !timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(expected, 'hex')))
    notFound()

  const page = await renderVisualPage(path, true)
  if (!page) notFound()
  return page
}
