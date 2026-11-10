import { renderVisualPage } from '@/components/visual-page'
import Link from 'next/link'
import { getArticles, getBrand, getProperties } from '@/lib/content'
import { HomeHero } from '@/components/hero'
import { PropertyCollection } from '@/components/collections'
import { ArticleCard } from '@/components/cards'
import { ContactCTA } from '@/components/contact-cta'
import { Newsletter } from '@/components/forms'
import { Icon } from '@/components/icons'
import {
  ButtonLink,
  Eyebrow,
  MediaImage,
  SectionHeading,
  TextLink,
  container,
} from '@/components/ui'

export default async function HomePage() {
  const visualPage = await renderVisualPage('/')
  if (visualPage) return visualPage
  const [brand, properties, articles] = await Promise.all([
    getBrand(),
    getProperties(),
    getArticles(),
  ])
  const editorial = articles.filter((article) => article.format === 'article').slice(0, 4)
  return (
    <main id="main-content">
      <HomeHero
        slides={brand.heroSlides}
        video={(brand as any).heroVideo}
        videoUrl={(brand as any).heroVideoUrl}
      />
      <div className="border-b border-line bg-ivory">
        <div
          className={`${container} flex flex-wrap items-center justify-between gap-5 py-6 text-[9px] uppercase tracking-[.18em] text-muted`}
        >
          <span className="flex items-center gap-3">
            <Icon name="compass" className="size-4 text-gold-dark" />
            Curadoria com propósito
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <span className="flex items-center gap-3">
            <Icon name="chart" className="size-4 text-gold-dark" />
            Inteligência de mercado
          </span>
          <span className="hidden h-4 w-px bg-line md:block" />
          <span className="hidden items-center gap-3 md:flex">
            <Icon name="shield" className="size-4 text-gold-dark" />
            Relações de confiança
          </span>
          <span className="hidden text-[8px] tracking-[.1em] text-gold-dark xl:block">
            O valor de uma boa escolha.
          </span>
        </div>
      </div>
      <section id="curadoria" className={`${container} py-20 md:py-24`}>
        <SectionHeading
          eyebrow={brand.homeCollectionEyebrow || 'Uma seleção, não apenas uma busca'}
          title={
            <>
              {brand.homeCollectionTitle || 'Imóveis com identidade.'}
              <br />
              <em>{brand.homeCollectionTitleEmphasis || 'Escolhas com significado.'}</em>
            </>
          }
          link={{ href: '/comprar', label: brand.homeCollectionLinkLabel || 'Conheça a curadoria completa' }}
        />
        <PropertyCollection
          properties={properties}
          segmentLabelsOverride={{
            first: brand.homeSegmentFirstLabel || 'Primeiro imóvel',
            medium: brand.homeSegmentMediumLabel || 'Médio padrão',
            high: brand.homeSegmentHighLabel || 'Alto padrão',
          }}
          emptyState={{
            title: brand.homeCollectionEmptyTitle || undefined,
            text: brand.homeCollectionEmptyText || undefined,
            linkLabel: brand.homeCollectionEmptyLinkLabel || undefined,
          }}
        />
        <div className="mt-10 flex items-center justify-between gap-6 border-t border-line pt-6">
          <p className="max-w-lg text-[10px] leading-6 text-muted">
            {brand.homeCollectionFooterText ||
              'Para cada momento de vida, um jeito de morar. Descubra o que faz sentido para o seu.'}
          </p>
          <span className="hidden shrink-0 font-display text-[25px] italic text-gold-dark sm:block">
            {brand.homeCollectionFooterEmphasis || 'O essencial é pessoal.'}
          </span>
        </div>
      </section>
      <section className="grid bg-navy text-white lg:grid-cols-2">
        <div className="relative min-h-[380px] overflow-hidden lg:min-h-[620px]">
          <div className="absolute inset-0" data-parallax>
            <MediaImage media={brand.consultingImage} sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent" />
          <div className="absolute right-7 bottom-7 border border-white/50 p-5 text-right md:right-10 md:bottom-10">
            <p className="text-[8px] uppercase tracking-[.22em] text-white/75">
              {brand.consultingImageEyebrow || 'Nosso ponto de vista'}
            </p>
            <p className="mt-2 font-display text-3xl italic">
              {brand.consultingImageCaption || 'O valor está no olhar.'}
            </p>
          </div>
        </div>
        <div className="reveal flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-[13%] lg:py-20">
          <Eyebrow light className="mb-7">
            {brand.consultingEyebrow || 'A perspectiva de Marcio Rogério'}
          </Eyebrow>
          <h2 className="font-display text-[44px] leading-[1.07] tracking-[-.02em] md:text-[54px]">
            {brand.consultingTitle || 'Não é sobre encontrar um imóvel.'}
            <br />
            <em className="font-normal text-champagne-light">
              {brand.consultingTitleEmphasis || 'É sobre reconhecer o seu lugar.'}
            </em>
          </h2>
          <p className="mt-6 max-w-sm text-[12px] leading-7 font-light text-white/65">
            {brand.consultingText ||
              'Entendemos que uma decisão imobiliária envolve muito mais do que metros quadrados. Envolve planos, patrimônio e o jeito como você quer viver.'}
          </p>
          <p className="mt-4 max-w-sm text-[12px] leading-7 font-light text-white/65">
            {brand.consultingSecondaryText ||
              'Por isso, combinamos escuta, curadoria e visão de mercado para acompanhar cada escolha com a atenção que ela merece.'}
          </p>
          <TextLink href="/sobre" light className="mt-7 self-start">
            {brand.consultingLinkLabel || 'Conheça o nosso olhar'}
          </TextLink>
        </div>
      </section>
      <section className={`${container} py-20 md:py-24`}>
        <div className="reveal mb-12 grid items-end gap-7 md:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow className="mb-5">Diferentes caminhos. Um mesmo cuidado.</Eyebrow>
            <h2 className="font-display text-[43px] leading-[1.1] md:text-[52px]">
              Qual é o seu
              <br />
              <em>próximo movimento?</em>
            </h2>
          </div>
          <p className="max-w-sm text-[12px] leading-7 text-muted md:justify-self-end">
            Da primeira chave à construção de patrimônio. Uma consultoria que acompanha as
            diferentes etapas da sua história.
          </p>
        </div>
        <div className="grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            ['01', 'Comprar', 'O imóvel que encontra o seu momento.', '/comprar'],
            ['02', 'Investir', 'Estratégia para olhar mais longe.', '/investir'],
            ['03', 'Empreendimentos', 'Projetos para novos modos de viver.', '/empreendimentos'],
            ['04', 'Vender', 'Uma estratégia à altura do seu imóvel.', '/vender'],
            ['05', 'Conteúdo', 'Conhecimento que abre perspectivas.', '/conteudo'],
            ['06', 'Sobre', 'O olhar por trás de cada escolha.', '/sobre'],
          ].map(([number, title, text, href]) => (
            <Link
              href={href}
              key={href}
              className="reveal group flex items-start justify-between gap-6 border-t border-line py-7 md:py-9"
            >
              <div className="flex gap-5">
                <span className="pt-1 text-[9px] text-gold-dark">{number}</span>
                <div>
                  <h3 className="font-display text-[30px] leading-tight transition-colors group-hover:text-gold-dark">
                    {title}
                  </h3>
                  <p className="mt-2 text-[10px] leading-6 text-muted">{text}</p>
                </div>
              </div>
              <Icon
                name="diagonal"
                className="mt-2 size-4 shrink-0 text-gold-dark transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="border-y border-line bg-paper py-20 md:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="Conhecimento imobiliário que transforma"
            title={
              <>
                Um olhar além
                <br />
                <em>do metro quadrado.</em>
              </>
            }
            link={{ href: '/conteudo', label: 'Explore todas as perspectivas' }}
          />
          {editorial[0] ? (
            <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
              <div className="reveal">
                <ArticleCard article={editorial[0]} featured />
              </div>
              <div className="reveal">
                {editorial.slice(1).map((article) => (
                  <ArticleCard key={article.id} article={article} small />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">Novas perspectivas editoriais em preparação.</p>
          )}
        </div>
      </section>
      <Newsletter compact />
      <ContactCTA />
    </main>
  )
}
