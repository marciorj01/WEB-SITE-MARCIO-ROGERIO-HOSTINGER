import { groq } from 'next-sanity'
import { client, isSanityConfigured } from './client'
import type { Brand, Partner, Property } from '@/types/content'

// GROQ Query para buscar todos os imóveis cadastrados
export const propertiesQuery = groq`
  *[_type == "property"] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    headline,
    price,
    status,
    propertyType,
    location,
    city,
    area,
    bedrooms,
    suites,
    bathrooms,
    parkingSpots,
    featured,
    "coverImageUrl": mainImage.asset->url,
    "galleryUrls": gallery[].asset->url,
    videoUrl,
    tour360Url,
    "pdfUrl": brochurePdf.asset->url,
    description,
    features
  }
`

// GROQ Query para buscar imóveis em destaque (para a Home)
export const featuredPropertiesQuery = groq`
  *[_type == "property" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    headline,
    price,
    status,
    propertyType,
    location,
    area,
    bedrooms,
    suites,
    parkingSpots,
    "coverImageUrl": mainImage.asset->url
  }
`

// GROQ Query para buscar um único imóvel pelo slug
export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    headline,
    price,
    status,
    propertyType,
    location,
    city,
    area,
    bedrooms,
    suites,
    bathrooms,
    parkingSpots,
    featured,
    "coverImageUrl": mainImage.asset->url,
    "galleryUrls": gallery[].asset->url,
    videoUrl,
    tour360Url,
    "pdfUrl": brochurePdf.asset->url,
    description,
    features
  }
`

// GROQ Query para buscar as configurações e textos da Home
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    name,
    tagline,
    whatsapp,
    email,
    professionalRegistration,
    heroVideoUrl,
    heroSlides[] {
      "image": {
        "url": image.asset->url,
        "alt": caption
      },
      caption,
      "mediaType": "image"
    },
    homeCollectionEyebrow,
    homeCollectionTitle,
    homeCollectionTitleEmphasis,
    homeCollectionLinkLabel,
    homeCollectionFooterText,
    homeCollectionFooterEmphasis,
    consultingEyebrow,
    consultingTitle,
    consultingTitleEmphasis,
    consultingText,
    consultingSecondaryText,
    consultingLinkLabel,
    "consultingImage": {
      "url": consultingImage.asset->url,
      "alt": consultingImageCaption
    },
    consultingImageEyebrow,
    consultingImageCaption
  }
`

// GROQ Query para buscar os parceiros estratégicos
export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc, _createdAt desc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    url,
    description,
    order
  }
`

function mapSanityToProperty(item: any, fallbackId: number | string): Property {
  const coverUrl =
    item.coverImageUrl ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'

  let segment: 'first' | 'medium' | 'high' = 'high'
  if (item.price && Number(item.price) < 800000) {
    segment = 'first'
  } else if (item.price && Number(item.price) < 2000000) {
    segment = 'medium'
  }

  return {
    id: item._id || fallbackId,
    title: item.title,
    slug: item.slug || `imovel-${fallbackId}`,
    subtitle: item.headline || null,
    description: item.description || '',
    image: {
      url: coverUrl,
      alt: item.title || 'Fotografia do imóvel',
    },
    gallery: Array.isArray(item.galleryUrls)
      ? item.galleryUrls.map((url: string, idx: number) => ({
          image: { url, alt: `${item.title} - Foto ${idx + 1}` },
          caption: null,
          id: String(idx + 1),
        }))
      : null,
    videoUrl: item.videoUrl || null,
    tour360Url: item.tour360Url || null,
    pdfUrl: item.pdfUrl || null,
    segment,
    type: (item.propertyType as any) || 'Apartamento',
    location: item.location || 'São Paulo',
    area: item.area ? Number(item.area) : null,
    bedrooms: item.bedrooms ? Number(item.bedrooms) : null,
    suites: item.suites ? Number(item.suites) : null,
    parking: item.parkingSpots ? Number(item.parkingSpots) : null,
    price: item.price ? Number(item.price) : null,
    featured: Boolean(item.featured),
    features: Array.isArray(item.features)
      ? item.features.map((f: string, idx: number) => ({ text: f, id: String(idx + 1) }))
      : null,
  }
}

/**
 * Função utilitária para buscar imóveis no Sanity e formatar no tipo Property do site
 */
export async function getSanityProperties(): Promise<Property[] | null> {
  if (!isSanityConfigured()) return null

  try {
    const rawProperties = await client.fetch<any[]>(
      propertiesQuery,
      {},
      { next: { revalidate: 60 } },
    )

    if (!Array.isArray(rawProperties) || rawProperties.length === 0) {
      return null
    }

    return rawProperties.map((item, index) => mapSanityToProperty(item, index + 1))
  } catch (error) {
    console.warn('Sanity: aviso ao consultar imóveis (usando fallback local):', error)
    return null
  }
}

/**
 * Função utilitária para buscar um único imóvel pelo slug no Sanity
 */
export async function getSanityPropertyBySlug(slug: string): Promise<Property | null> {
  if (!isSanityConfigured()) return null

  try {
    const item = await client.fetch<any>(
      propertyBySlugQuery,
      { slug },
      { next: { revalidate: 60 } },
    )

    if (!item) return null

    return mapSanityToProperty(item, slug)
  } catch (error) {
    console.warn(`Sanity: aviso ao consultar imóvel "${slug}" (usando fallback local):`, error)
    return null
  }
}

/**
 * Função utilitária para buscar os textos e configurações da Home no Sanity
 */
export async function getSanityBrand(): Promise<Partial<Brand> | null> {
  if (!isSanityConfigured()) return null

  try {
    const settings = await client.fetch<any>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60 } },
    )

    if (!settings) return null

    // Remove valores vazios para preservar fallbacks
    const cleaned: any = {}
    for (const [key, val] of Object.entries(settings)) {
      if (val !== null && val !== undefined && val !== '') {
        cleaned[key] = val
      }
    }

    return cleaned
  } catch (error) {
    console.warn('Sanity: aviso ao consultar configurações da marca (usando fallback):', error)
    return null
  }
}

/**
 * Função utilitária para buscar os parceiros estratégicos no Sanity
 */
export async function getSanityPartners(): Promise<Partner[] | null> {
  if (!isSanityConfigured()) return null

  try {
    const raw = await client.fetch<any[]>(
      partnersQuery,
      {},
      { next: { revalidate: 60 } },
    )

    if (!Array.isArray(raw) || raw.length === 0) {
      return null
    }

    return raw.map((item, idx) => ({
      id: item._id || idx + 1,
      name: item.name,
      logoUrl: item.logoUrl || null,
      url: item.url || null,
      description: item.description || null,
      order: item.order ? Number(item.order) : idx + 1,
    }))
  } catch (error) {
    console.warn('Sanity: aviso ao consultar parceiros (usando fallback):', error)
    return null
  }
}
