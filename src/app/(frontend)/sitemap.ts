import type { MetadataRoute } from 'next'
import { getArticles, getDevelopments, getProperties } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.marciorjcorretor.com.br'
  const [articles, properties, developments] = await Promise.all([
    getArticles(),
    getProperties(),
    getDevelopments(),
  ])
  return [
    ...[
      '',
      '/comprar',
      '/investir',
      '/empreendimentos',
      '/vender',
      '/conteudo',
      '/sobre',
      '/contato',
      '/privacidade',
    ].map((path) => ({ url: `${base}${path}`, priority: path ? 0.7 : 1 })),
    ...articles.map((article) => ({
      url: `${base}/conteudo/${article.slug}`,
      lastModified: article.updatedAt,
      priority: 0.8,
    })),
    ...properties.map((property) => ({
      url: `${base}/imoveis/${property.slug}`,
      lastModified: property.updatedAt,
      priority: 0.7,
    })),
    ...developments.map((project) => ({
      url: `${base}/empreendimentos/${project.slug}`,
      lastModified: project.updatedAt,
      priority: 0.7,
    })),
  ]
}
