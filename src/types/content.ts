export interface Media {
  id?: number | string
  alt?: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
}

export interface Brand {
  id?: number | string
  name: string
  tagline: string
  demoNotice?: string | null
  whatsapp?: string | null
  email?: string | null
  professionalRegistration?: string | null
  serviceLocation?: string | null
  heroVideo?: Media | string | null
  heroVideoUrl?: string | null
  heroSlides?: {
    mediaType?: 'image' | 'video' | null
    image?: Media | string | null
    video?: Media | string | null
    videoUrl?: string | null
    caption?: string | null
    id?: string | null
  }[] | null
  homeCollectionEyebrow?: string | null
  homeCollectionTitle?: string | null
  homeCollectionTitleEmphasis?: string | null
  homeCollectionLinkLabel?: string | null
  homeCollectionEmptyTitle?: string | null
  homeCollectionEmptyText?: string | null
  homeCollectionEmptyLinkLabel?: string | null
  homeCollectionFooterText?: string | null
  homeCollectionFooterEmphasis?: string | null
  homeSegmentFirstLabel?: string | null
  homeSegmentMediumLabel?: string | null
  homeSegmentHighLabel?: string | null
  consultingEyebrow?: string | null
  consultingImageEyebrow?: string | null
  consultingImageCaption?: string | null
  consultingTitle?: string | null
  consultingTitleEmphasis?: string | null
  consultingText?: string | null
  consultingSecondaryText?: string | null
  consultingLinkLabel?: string | null
  consultingImage?: Media | string | null
  investImage?: Media | string | null
  sellImage?: Media | string | null
  aboutImage?: Media | string | null
  profileName?: string | null
  profileRole?: string | null
  biography?: string | null
  philosophy?: string | null
}

export interface Category {
  id: number | string
  name: string
  slug: string
  description?: string | null
  tone?: 'navy' | 'olive' | 'sand' | 'slate' | 'terracotta' | 'sage' | 'gold' | null
  order?: number | null
}

export interface Author {
  id: number | string
  name: string
  bio?: string | null
  portrait?: Media | string | null
}

export interface Property {
  id: number | string
  title: string
  slug: string
  subtitle?: string | null
  description: string
  image: Media | string
  gallery?: {
    image: Media | string
    caption?: string | null
    id?: string | null
  }[] | null
  tour360Url?: string | null
  videoUrl?: string | null
  segment: 'first' | 'medium' | 'high'
  type?: 'Casa' | 'Apartamento' | 'Studio' | 'Cobertura' | null
  location?: string | null
  area?: number | null
  bedrooms?: number | null
  suites?: number | null
  parking?: number | null
  price?: number | null
  features?: {
    text: string
    id?: string | null
  }[] | null
  investment?: boolean | null
  referenceOnly?: boolean | null
  featured?: boolean | null
  order?: number | null
  updatedAt?: string
  createdAt?: string
}

export interface Development {
  id: number | string
  title: string
  slug: string
  subtitle?: string | null
  description: string
  image: Media | string
  gallery?: {
    image: Media | string
    caption?: string | null
    id?: string | null
  }[] | null
  tour360Url?: string | null
  videoUrl?: string | null
  location?: string | null
  architecture?: string | null
  launchStage?: 'reference' | 'prelaunch' | 'launch' | 'construction' | 'ready' | null
  typologies?: {
    name: string
    area?: string | null
    bedrooms?: string | null
    plan?: Media | string | null
    id?: string | null
  }[] | null
  features?: {
    text: string
    id?: string | null
  }[] | null
  referenceOnly?: boolean | null
  order?: number | null
  updatedAt?: string
  createdAt?: string
}

export interface Article {
  id: number | string
  title: string
  slug: string
  subtitle: string
  cover: Media | string
  videoUrl?: string | null
  category: Category | string
  author?: Author | string | null
  publishedAt: string
  readingTime?: number | null
  featured?: boolean | null
  order?: number | null
  format?: 'article' | 'guide' | 'report' | 'sponsored' | null
  sponsor?: string | null
  content: any
  pullquote?: string | null
  inlineImage?: Media | string | null
  conclusion?: any | null
  contactPrompt?: string | null
  updatedAt?: string
  createdAt?: string
}

export interface Lead {
  id?: number | string
  name: string
  email: string
  whatsapp: string
  intent: 'contact' | 'buy' | 'sell' | 'invest' | 'development' | 'material'
  propertyType?: 'Casa' | 'Apartamento' | 'Studio' | 'Cobertura' | 'Terreno' | 'Outro' | null
  location?: string | null
  message?: string | null
  property?: Property | number | string | null
  development?: Development | number | string | null
  consent: boolean
  status?: 'new' | 'contacted' | 'completed' | null
}

export interface NewsletterSubscriber {
  id?: number | string
  name: string
  email: string
  consent: boolean
}

