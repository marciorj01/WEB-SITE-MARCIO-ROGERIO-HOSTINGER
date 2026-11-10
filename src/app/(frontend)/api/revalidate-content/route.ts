import { revalidatePath, revalidateTag } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'
import { contentTags, verifyRevalidation } from '@/lib/revalidation'

export async function POST(request: Request) {
  const text = await request.text()
  if (text.length > 12000) return new Response(null, { status: 413 })
  const payload = await getPayloadClient()
  if (
    !verifyRevalidation(
      text,
      request.headers.get('X-Content-Signature') || '',
      payload.config.secret,
    )
  ) {
    return new Response(null, { status: 401 })
  }
  let data: { timestamp?: number; tags?: string[]; paths?: string[] }
  try {
    data = JSON.parse(text)
  } catch {
    return new Response(null, { status: 400 })
  }
  if (
    typeof data.timestamp !== 'number' ||
    Math.abs(Date.now() - data.timestamp) > 60000 ||
    !Array.isArray(data.tags) ||
    !Array.isArray(data.paths) ||
    !data.tags.every((tag) => contentTags.includes(tag as (typeof contentTags)[number])) ||
    !data.paths.every(
      (path) =>
        typeof path === 'string' &&
        /^\/(?:|comprar|investir|vender|sobre|contato|privacidade|empreendimentos(?:\/[a-z0-9-]+)?|imoveis\/[a-z0-9-]+|conteudo(?:\/[a-z0-9-]+)?)$/.test(
          path,
        ),
    )
  ) {
    return new Response(null, { status: 400 })
  }
  for (const tag of data.tags) revalidateTag(tag, { expire: 0 })
  for (const path of data.paths) revalidatePath(path, path === '/' ? 'layout' : 'page')
  return Response.json({ success: true })
}
