import Link from 'next/link'
import type { Article, Category, Development, Property } from '@/payload-types'
import { Icon } from './icons'
import { MediaImage } from './ui'

export const segmentLabels = {
  first: 'Primeiro imóvel',
  medium: 'Médio padrão',
  high: 'Alto padrão',
}
export const stageLabels = {
  reference: 'Projeto de referência',
  prelaunch: 'Pré-lançamento',
  launch: 'Lançamento',
  construction: 'Em obras',
  ready: 'Pronto para morar',
}

export function PropertyCard({
  property,
  large = false,
  segmentLabelsOverride,
}: {
  property: Property
  large?: boolean
  segmentLabelsOverride?: Partial<typeof segmentLabels>
}) {
  return (
    <Link href={`/imoveis/${property.slug}`} className="group block">
      <div
        className={`relative overflow-hidden bg-sand ${large ? 'aspect-[1.42]' : 'aspect-[1.25]'}`}
      >
        <MediaImage
          media={property.image}
          sizes={large ? '(max-width: 768px) 100vw, 65vw' : '(max-width: 768px) 100vw, 33vw'}
          className="transition-transform duration-1000 group-hover:scale-[1.035]"
        />
        <span className="absolute top-5 left-5 border border-white/40 bg-navy/60 px-3 py-1.5 text-[8px] uppercase tracking-[.16em] text-white backdrop-blur-sm">
          {(segmentLabelsOverride ?? segmentLabels)[property.segment]}
        </span>
        <span className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full border border-white/60 text-white transition-all group-hover:rotate-45 group-hover:bg-white group-hover:text-navy">
          <Icon name="diagonal" className="size-4" />
        </span>
      </div>
      <div className="pt-5">
        <p className="mb-2 text-[9px] uppercase tracking-[.16em] text-muted">
          {property.location || property.type}
        </p>
        <h3
          className={`font-display leading-tight text-navy ${large ? 'text-[37px]' : 'text-[31px]'}`}
        >
          {property.title}
        </h3>
        <p className="mt-2 text-[11px] leading-6 text-muted">{property.subtitle}</p>
        <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-line pt-4 text-[10px] text-muted">
          {property.area ? (
            <span className="flex items-center gap-2">
              <Icon name="area" className="size-3.5 text-gold-dark" />
              {property.area} m²
            </span>
          ) : null}
          {property.bedrooms ? (
            <span className="flex items-center gap-2">
              <Icon name="bed" className="size-3.5 text-gold-dark" />
              {property.bedrooms} dorm.
            </span>
          ) : null}
          {property.parking ? (
            <span className="flex items-center gap-2">
              <Icon name="car" className="size-3.5 text-gold-dark" />
              {property.parking} vagas
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-[8px] tracking-wide text-muted">
          {property.referenceOnly
            ? 'Referência ilustrativa · não é oferta comercial'
            : property.price
              ? new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(property.price)
              : 'Informações sob consulta'}
        </p>
      </div>
    </Link>
  )
}

export function categoryOf(article: Article): Category | undefined {
  return typeof article.category === 'object' && article.category ? article.category : undefined
}

export function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
    .replaceAll('.', '')
}

export function ArticleMeta({ article, light = false }: { article: Article; light?: boolean }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-2.5 text-[9px] ${light ? 'text-white/60' : 'text-muted'}`}
    >
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      <span className="size-0.5 rounded-full bg-current" />
      <span>{article.readingTime || 5} min de leitura</span>
    </p>
  )
}

export function CategoryLabel({ article, light = false }: { article: Article; light?: boolean }) {
  const category = categoryOf(article)
  return (
    <p
      className={`text-[8px] font-semibold uppercase tracking-[.18em] ${light ? 'text-champagne-light' : 'text-gold-dark'}`}
    >
      {article.format === 'sponsored'
        ? `Conteúdo patrocinado${article.sponsor ? ` · ${article.sponsor}` : ''}`
        : category?.name || 'Perspectivas'}
    </p>
  )
}

export function ArticleCard({
  article,
  small = false,
  featured = false,
}: {
  article: Article
  small?: boolean
  featured?: boolean
}) {
  if (small)
    return (
      <Link
        href={`/conteudo/${article.slug}`}
        className="group grid grid-cols-[115px_1fr] gap-5 border-b border-line py-6 first:pt-0 last:border-0 sm:grid-cols-[145px_1fr]"
      >
        <div className="relative aspect-square overflow-hidden">
          <MediaImage
            media={article.cover}
            sizes="160px"
            className="transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center">
          <CategoryLabel article={article} />
          <h3 className="mt-2 mb-3 font-display text-[24px] leading-[1.12] text-navy transition-colors group-hover:text-gold-dark">
            {article.title}
          </h3>
          <ArticleMeta article={article} />
        </div>
      </Link>
    )
  return (
    <Link href={`/conteudo/${article.slug}`} className="group block">
      <div
        className={`relative overflow-hidden bg-sand ${featured ? 'aspect-[1.65]' : 'aspect-[1.45]'}`}
      >
        <MediaImage
          media={article.cover}
          sizes={featured ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 33vw'}
          className="transition-transform duration-1000 group-hover:scale-[1.035]"
        />
        <span className="absolute right-4 bottom-4 flex size-9 items-center justify-center rounded-full border border-white/70 text-white opacity-0 transition-all group-hover:opacity-100">
          <Icon name="diagonal" className="size-4" />
        </span>
      </div>
      <div className="pt-5">
        <CategoryLabel article={article} />
        <h3
          className={`mt-3 font-display leading-[1.08] tracking-[-.015em] text-navy transition-colors group-hover:text-gold-dark ${featured ? 'text-[34px] md:text-[42px]' : 'text-[29px]'}`}
        >
          {article.title}
        </h3>
        {featured && (
          <p className="mt-4 max-w-xl text-[12px] leading-7 text-muted">{article.subtitle}</p>
        )}
        <div className="mt-4">
          <ArticleMeta article={article} />
        </div>
      </div>
    </Link>
  )
}

export function DevelopmentCard({
  development,
  index = 0,
}: {
  development: Development
  index?: number
}) {
  return (
    <Link
      href={`/empreendimentos/${development.slug}`}
      className="group grid gap-7 border-t border-line py-10 md:grid-cols-[1.4fr_1fr] md:gap-16 md:py-14"
    >
      <div className={`relative aspect-[1.5] overflow-hidden ${index % 2 ? 'md:order-2' : ''}`}>
        <MediaImage
          media={development.image}
          className="transition-transform duration-1000 group-hover:scale-[1.035]"
        />
        <span className="absolute top-5 left-5 bg-ivory px-4 py-2 text-[8px] uppercase tracking-[.16em] text-navy">
          {stageLabels[development.launchStage || 'reference']}
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <p className="mb-5 text-[10px] uppercase tracking-[.2em] text-gold-dark">
          Projeto 0{index + 1} / Curadoria imobiliária
        </p>
        <h2 className="font-display text-[47px] leading-tight">{development.title}</h2>
        <p className="mt-2 font-display text-2xl italic text-gold-dark">{development.subtitle}</p>
        <p className="mt-5 text-xs leading-7 text-muted">{development.description}</p>
        <p className="mt-5 flex items-center gap-2 text-[10px] text-muted">
          <Icon name="pin" className="size-3.5 text-gold-dark" />
          {development.location || 'Localização em definição'}
        </p>
        <span className="mt-7 flex items-center gap-8 self-start border-b border-navy/30 pb-3 text-[11px] font-semibold">
          Conheça o projeto
          <Icon
            name="diagonal"
            className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  )
}
