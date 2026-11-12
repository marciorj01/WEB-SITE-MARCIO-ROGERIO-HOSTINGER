import type { Article, Brand, Category, Development, Property } from '@/types/content'
import { fetchStrapi, isStrapiConfigured } from '@/lib/strapi'

export const DEFAULT_BRAND: Brand = {
  name: 'Marcio Rogério',
  tagline: 'Corretor de Imóveis',
  demoNotice: '',
  whatsapp: '5511999999999',
  email: 'marciorogerio.corretor@gmail.com',
  professionalRegistration: 'CRECI F-59.138-F',
  serviceLocation: 'São Paulo e Região',
  heroVideoUrl: '',
  heroSlides: [
    {
      mediaType: 'image',
      image: {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
        alt: 'Residência contemporânea de alto padrão',
      },
      caption: 'Arquitetura e curadoria consciente',
    },
    {
      mediaType: 'image',
      image: {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
        alt: 'Espaços com luz natural e sofisticação',
      },
      caption: 'O valor de uma boa escolha',
    },
  ],
  homeCollectionEyebrow: 'Uma seleção, não apenas uma busca',
  homeCollectionTitle: 'Imóveis com identidade.',
  homeCollectionTitleEmphasis: 'Escolhas com significado.',
  homeCollectionLinkLabel: 'Conheça a curadoria completa',
  homeCollectionEmptyTitle: 'Uma nova seleção está sendo preparada.',
  homeCollectionEmptyText:
    'Converse com nossa consultoria para encontrar referências alinhadas ao seu momento.',
  homeCollectionEmptyLinkLabel: 'Solicitar atendimento',
  homeCollectionFooterText:
    'Para cada momento de vida, um jeito de morar. Descubra o que faz sentido para o seu.',
  homeCollectionFooterEmphasis: 'O essencial é pessoal.',
  homeSegmentFirstLabel: 'Primeiro imóvel',
  homeSegmentMediumLabel: 'Médio padrão',
  homeSegmentHighLabel: 'Alto padrão',
  consultingEyebrow: 'A perspectiva de Marcio Rogério',
  consultingImageEyebrow: 'Nosso ponto de vista',
  consultingImageCaption: 'O valor está no olhar.',
  consultingTitle: 'Não é sobre encontrar um imóvel.',
  consultingTitleEmphasis: 'É sobre reconhecer o seu lugar.',
  consultingText:
    'Entendemos que uma decisão imobiliária envolve muito mais do que metros quadrados. Envolve planos, patrimônio e o jeito como você quer viver.',
  consultingSecondaryText:
    'Por isso, combinamos escuta, curadoria e visão de mercado para acompanhar cada escolha com a atenção que ela merece.',
  consultingLinkLabel: 'Conheça o nosso olhar',
  consultingImage: {
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Consultoria e atendimento personalizado',
  },
  investImage: {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    alt: 'Investimento imobiliário estratégico',
  },
  sellImage: {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Estratégia exclusiva para venda de imóveis',
  },
  aboutImage: {
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Marcio Rogério - Corretor de Imóveis',
  },
  profileName: 'Marcio Rogério',
  profileRole: 'Corretor de Imóveis',
  biography:
    'Com ampla trajetória no mercado imobiliário, Marcio Rogério atua com foco em consultoria transparente, curadoria rigorosa de imóveis e assessoria completa em compras, vendas e investimentos de alto padrão.',
  philosophy:
    'Acreditamos que um imóvel não é apenas uma estrutura física, mas o cenário onde a história e o patrimônio de uma família são construídos.',
}

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Mercado & Inteligência',
    slug: 'mercado',
    description: 'Análises, tendências e perspectivas econômicas do setor imobiliário.',
    tone: 'navy',
    order: 1,
  },
  {
    id: 2,
    name: 'Arquitetura & Design',
    slug: 'arquitetura',
    description: 'Projetos autorais, inovação e o bem viver.',
    tone: 'sand',
    order: 2,
  },
  {
    id: 3,
    name: 'Investimento Patrimonial',
    slug: 'investimento',
    description: 'Estratégias de valorização, rentabilidade e proteção de capital.',
    tone: 'gold',
    order: 3,
  },
]

export const DEFAULT_PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Residência Jardim Europa',
    slug: 'residencia-jardim-europa',
    subtitle: 'Arquitetura contemporânea integrada à natureza',
    description:
      'Uma residência pensada para quem valoriza amplitude, luminosidade e acabamentos nobres. Living com pé direito duplo, integração total com jardim e área gourmet privativa.',
    image: {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      alt: 'Residência Jardim Europa',
    },
    segment: 'high',
    type: 'Casa',
    location: 'Jardim Europa, São Paulo',
    area: 520,
    bedrooms: 4,
    suites: 4,
    parking: 5,
    price: 8500000,
    featured: true,
    investment: false,
    features: [
      { text: 'Piscina aquecida com borda infinita' },
      { text: 'Espaço gourmet com churrasqueira' },
      { text: 'Automação residencial completa' },
      { text: 'Segurança e guarita blindada' },
    ],
  },
  {
    id: 2,
    title: 'Apartamento Vista Parque',
    slug: 'apartamento-vista-parque',
    subtitle: 'Conforto e elegância com vista panorâmica',
    description:
      'Apartamento com planta funcional e varanda espaçosa. Acabamentos selecionados, marcenaria de alto padrão e localização privilegiada próxima a parques e serviços essenciais.',
    image: {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Apartamento Vista Parque',
    },
    segment: 'medium',
    type: 'Apartamento',
    location: 'Moema, São Paulo',
    area: 185,
    bedrooms: 3,
    suites: 3,
    parking: 3,
    price: 2600000,
    featured: true,
    investment: true,
    features: [
      { text: 'Varanda gourmet envidraçada' },
      { text: 'Condomínio com lazer completo' },
      { text: 'Depósito privativo no subsolo' },
    ],
  },
  {
    id: 3,
    title: 'Studio Design Itaim',
    slug: 'studio-design-itaim',
    subtitle: 'Inteligência espacial para moradia ou locação ágil',
    description:
      'Studio compacto de alta rentabilidade no coração financeiro. Ideal para profissionais dinâmicos ou investidores que buscam alta liquidez e retorno consistente.',
    image: {
      url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      alt: 'Studio Design Itaim',
    },
    segment: 'first',
    type: 'Studio',
    location: 'Itaim Bibi, São Paulo',
    area: 42,
    bedrooms: 1,
    suites: 1,
    parking: 1,
    price: 680000,
    featured: true,
    investment: true,
    features: [
      { text: 'Fechadura eletrônica e biometria' },
      { text: 'Rooftop com piscina e coworking' },
      { text: 'Lavanderia compartilhada OMO' },
    ],
  },
]

export const DEFAULT_DEVELOPMENTS: Development[] = [
  {
    id: 1,
    title: 'Horizonte Jardins',
    slug: 'horizonte-jardins',
    subtitle: 'Empreendimento de luxo assinado por renomados arquitetos',
    description:
      'Uma torre única que redefine o skyline da região. Plantas amplas e customizáveis com vistas definitivas e infraestrutura sustentável.',
    image: {
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      alt: 'Fachada Horizonte Jardins',
    },
    location: 'Jardins, São Paulo',
    launchStage: 'launch',
    architecture: 'Studio Arthur Casas',
    features: [
      { text: 'Lobby com pé-direito triplo' },
      { text: 'Academia assinada por especialistas' },
      { text: 'Piscina coberta com raia de 25m' },
    ],
  },
]

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Critérios fundamentais para avaliar um imóvel de alto padrão',
    slug: 'criterios-fundamentais-imovel-alto-padrao',
    subtitle:
      'Da orientação solar à liquidez patrimonial: o que deve guiar uma decisão imobiliária consciente.',
    cover: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Interior contemporâneo',
    },
    category: DEFAULT_CATEGORIES[0],
    publishedAt: new Date().toISOString(),
    readingTime: 5,
    featured: true,
    format: 'article',
    content:
      '<p>Ao avaliar um imóvel de alto padrão, a localização é apenas o primeiro dos fatores determinantes. Aspectos como a iluminação natural, a ventilação cruzada, a flexibilidade da planta e a reputação da construtora exercem impacto direto sobre a qualidade de vida e a valorização do patrimônio a longo prazo.</p><p>Neste guia, analisamos as variáveis mais relevantes para quem busca segurança e exclusividade em cada negociação.</p>',
    pullquote: 'O verdadeiro luxo reside na coerência entre espaço, luz e rotina.',
  },
]

/**
 * Funções de consulta de conteúdo
 * Desacopladas: tentam Strapi se configurado, ou retornam os dados locais.
 */

export async function getBrand(): Promise<Brand> {
  if (isStrapiConfigured()) {
    const data = await fetchStrapi<Brand>('/brand?populate=*')
    if (data) return { ...DEFAULT_BRAND, ...data }
  }
  return DEFAULT_BRAND
}

export async function getProperties(): Promise<Property[]> {
  if (isStrapiConfigured()) {
    const data = await fetchStrapi<Property[]>('/properties?populate=*')
    if (data && Array.isArray(data) && data.length > 0) return data
  }
  return DEFAULT_PROPERTIES
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (isStrapiConfigured()) {
    const data = await fetchStrapi<Property[]>(
      `/properties?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    )
    if (data && Array.isArray(data) && data[0]) return data[0]
  }
  const found = DEFAULT_PROPERTIES.find((p) => p.slug === slug)
  return found || null
}

export async function getArticles(): Promise<Article[]> {
  if (isStrapiConfigured()) {
    const data = await fetchStrapi<Article[]>('/articles?populate=*')
    if (data && Array.isArray(data) && data.length > 0) return data
  }
  return DEFAULT_ARTICLES
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isStrapiConfigured()) {
    const data = await fetchStrapi<Article[]>(
      `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    )
    if (data && Array.isArray(data) && data[0]) return data[0]
  }
  const found = DEFAULT_ARTICLES.find((a) => a.slug === slug)
  return found || null
}

export async function getCategories(): Promise<Category[]> {
  if (isStrapiConfigured()) {
    const data = await fetchStrapi<Category[]>('/categories?populate=*')
    if (data && Array.isArray(data) && data.length > 0) return data
  }
  return DEFAULT_CATEGORIES
}

export async function getDevelopments(): Promise<Development[]> {
  if (isStrapiConfigured()) {
    const data = await fetchStrapi<Development[]>('/developments?populate=*')
    if (data && Array.isArray(data) && data.length > 0) return data
  }
  return DEFAULT_DEVELOPMENTS
}

export async function getDevelopmentBySlug(slug: string): Promise<Development | null> {
  if (isStrapiConfigured()) {
    const data = await fetchStrapi<Development[]>(
      `/developments?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    )
    if (data && Array.isArray(data) && data[0]) return data[0]
  }
  const found = DEFAULT_DEVELOPMENTS.find((d) => d.slug === slug)
  return found || null
}

/**
 * Função de conveniência genérica para lookup por slug
 */
export async function findBySlug(
  collection: 'properties' | 'articles' | 'developments',
  slug: string,
): Promise<any | null> {
  if (collection === 'properties') return getPropertyBySlug(slug)
  if (collection === 'articles') return getArticleBySlug(slug)
  if (collection === 'developments') return getDevelopmentBySlug(slug)
  return null
}
