/**
 * Cliente de Integração com Strapi CMS
 * Preparado para conectar a qualquer instância Strapi v4 ou v5 rodando externamente.
 */

export interface StrapiConfig {
  url: string
  apiToken?: string
}

export function getStrapiConfig(): StrapiConfig | null {
  const url = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
  if (!url) return null
  return {
    url: url.replace(/\/$/, ''),
    apiToken: process.env.STRAPI_API_TOKEN,
  }
}

export function isStrapiConfigured(): boolean {
  return Boolean(process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL)
}

/**
 * Normaliza respostas do Strapi (suporta v4 com data.attributes e v5 com objetos diretos)
 */
export function normalizeStrapiData<T = any>(data: any): T {
  if (!data) return data

  // Array de itens
  if (Array.isArray(data)) {
    return data.map((item) => normalizeStrapiData(item)) as unknown as T
  }

  // Item do Strapi v4 com { id, attributes }
  if (data.id !== undefined && data.attributes) {
    const normalized: any = { id: data.id }
    for (const [key, val] of Object.entries(data.attributes)) {
      normalized[key] = normalizeStrapiData(val)
    }
    return normalized as T
  }

  // Objeto aninhado com { data }
  if (data.data !== undefined) {
    return normalizeStrapiData(data.data)
  }

  return data
}

/**
 * Executa requisições HTTP para a API REST do Strapi
 */
export async function fetchStrapi<T = any>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | null> {
  const config = getStrapiConfig()
  if (!config) return null

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${config.url}/api${cleanEndpoint}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(config.apiToken ? { Authorization: `Bearer ${config.apiToken}` } : {}),
    ...(options?.headers as Record<string, string>),
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 60, ...(options as any)?.next },
    })

    if (!res.ok) {
      console.warn(`[strapi] Erro na requisição ${url}: status ${res.status}`)
      return null
    }

    const json = await res.json()
    return normalizeStrapiData<T>(json)
  } catch (err: any) {
    console.warn(`[strapi] Falha ao conectar em ${url}:`, err?.message || err)
    return null
  }
}

/**
 * Helper para resolver URLs de mídia do Strapi
 */
export function getStrapiMedia(url?: string | null): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  const config = getStrapiConfig()
  const baseUrl = config?.url || ''
  return `${baseUrl}${url}`
}

