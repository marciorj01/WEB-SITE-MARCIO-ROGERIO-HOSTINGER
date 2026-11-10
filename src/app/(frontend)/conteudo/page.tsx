import { renderVisualPage } from '@/components/visual-page'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles, getCategories } from '@/lib/content'
import { ArticleCard, ArticleMeta, CategoryLabel } from '@/components/cards'
import { EditorialFeed } from '@/components/editorial-feed'
import { Newsletter } from '@/components/forms'
import { ContactCTA } from '@/components/contact-cta'
import { Icon } from '@/components/icons'
import { ButtonLink, Eyebrow, MediaImage, SectionHeading, container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Conteúdo imobiliário | Marcio Rogério | Conhecimento e perspectivas',
  description:
    'Arquitetura, mercado, investimentos e patrimônio. Uma revista para escolher melhor e construir novas perspectivas.',
}
export default async function ContentPage() {
  const visualPage = await renderVisualPage('/conteudo')
  if (visualPage) return visualPage
  const [articles, categories] = await Promise.all([getArticles(), getCategories()])
  const feature = articles.find((article) => article.featured) || articles[0]
  const secondary = articles
    .filter((article) => article.id !== feature?.id && article.format === 'article')
    .slice(0, 3)
  const materials = articles.filter(
    (article) => article.format === 'guide' || article.format === 'report',
  )
  return (
    <main id="main-content">
      <section className={`${container} pt-12 pb-10 md:pt-16 md:pb-12`}>
        <div className="mb-8 flex items-center justify-between gap-6 border-b border-line pb-5">
          <p className="text-[9px] uppercase tracking-[.23em] text-gold-dark">
            O ponto de encontro entre imóveis e ideias
          </p>
          <p className="hidden text-[9px] uppercase tracking-[.2em] text-muted sm:block">
            Arquitetura · Mercado · Patrimônio
          </p>
        </div>
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <h1 className="font-display text-[66px] leading-none tracking-[-.04em] md:text-[96px]">
            Perspectivas<span className="text-gold-dark">.</span>
          </h1>
          <p className="max-w-[345px] text-[12px] leading-7 text-muted">
            Conhecimento para escolher melhor.
            <br />
            Inteligência para construir patrimônio.
            <br />
            <span className="text-navy">Conteúdo imobiliário de Marcio Rogério.</span>
          </p>
        </div>
      </section>
      {feature && (
        <section className={`${container} pb-16 md:pb-20`}>
          <Link
            href={`/conteudo/${feature.slug}`}
            className="group relative isolate flex min-h-[540px] items-end overflow-hidden bg-navy text-white md:min-h-[610px]"
          >
            <div className="absolute inset-0 -z-20">
              <MediaImage
                media={feature.cover}
                priority
                sizes="90vw"
                className="transition-transform duration-[1600ms] group-hover:scale-[1.025]"
              />
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/95 via-navy/35 to-navy/5" />
            <span className="absolute top-7 left-7 border border-white/50 px-3 py-2 text-[8px] uppercase tracking-[.2em] md:top-9 md:left-10">
              Leitura em destaque
            </span>
            <div className="w-full p-7 md:p-10 lg:p-12">
              <CategoryLabel article={feature} light />
              <h2 className="mt-5 max-w-[740px] font-display text-[42px] leading-[1.05] tracking-[-.02em] md:text-[60px]">
                {feature.title}
              </h2>
              <div className="mt-6 flex items-center justify-between gap-7">
                <div>
                  <p className="mb-5 hidden max-w-[520px] text-[12px] leading-7 text-white/70 sm:block">
                    {feature.subtitle}
                  </p>
                  <ArticleMeta article={feature} light />
                </div>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/60 transition-all group-hover:bg-champagne group-hover:text-navy">
                  <Icon name="diagonal" className="size-5" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}
      {secondary.length > 0 && (
        <section className={`${container} pb-20`}>
          <div className="mb-7 flex items-center justify-between border-t border-line pt-6">
            <Eyebrow>Outras perspectivas em destaque</Eyebrow>
            <span className="hidden text-[9px] text-muted sm:block">
              Uma pausa para ampliar o olhar.
            </span>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {secondary.map((article) => (
              <div className="reveal" key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </section>
      )}
      <section id="explorar" className="border-y border-line bg-paper py-20 md:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="Explore os assuntos que importam"
            title={
              <>
                Cada tema,
                <br />
                <em>uma nova perspectiva.</em>
              </>
            }
            description="Análises de mercado, guias para compradores, estratégias patrimoniais e a arquitetura que transforma o jeito de viver."
          />
          <EditorialFeed articles={articles} categories={categories} />
        </div>
      </section>
      <section id="materiais" className={`${container} py-20 md:py-24`}>
        <div className="reveal grid gap-10 lg:grid-cols-[.85fr_1.5fr] lg:gap-20">
          <div>
            <Eyebrow className="mb-6">Guias e materiais exclusivos</Eyebrow>
            <h2 className="font-display text-[43px] leading-[1.07] md:text-[49px]">
              Para ir além
              <br />
              <em>da primeira leitura.</em>
            </h2>
            <p className="mt-6 text-[12px] leading-7 text-muted">
              Guias, estudos e materiais aprofundados para transformar informação em decisões mais
              conscientes.
            </p>
            <p className="mt-5 text-[10px] leading-6 text-gold-dark">
              Acesso aberto. Conhecimento que se compartilha.
            </p>
          </div>
          <div>
            {materials.length ? (
              materials.map((material, index) => (
                <Link
                  href={`/conteudo/${material.slug}`}
                  className="group flex items-center justify-between gap-5 border-t border-line py-7"
                  key={material.id}
                >
                  <div className="flex items-start gap-5">
                    <span className="pt-2 font-display text-3xl text-gold-dark">0{index + 1}</span>
                    <div>
                      <p className="mb-2 text-[8px] uppercase tracking-[.18em] text-gold-dark">
                        {material.format === 'guide' ? 'Guia de consulta' : 'Estudo editorial'} ·{' '}
                        {material.readingTime} min
                      </p>
                      <h3 className="font-display text-[29px] leading-tight">{material.title}</h3>
                      <p className="mt-3 max-w-lg text-[10px] leading-6 text-muted">
                        {material.subtitle}
                      </p>
                    </div>
                  </div>
                  <Icon
                    name="diagonal"
                    className="size-4 shrink-0 text-gold-dark transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              ))
            ) : (
              <p className="border-t border-line py-8 text-xs leading-7 text-muted">
                Os próximos materiais estão em preparação. Assine nossa carta para acompanhar.
              </p>
            )}
          </div>
        </div>
      </section>
      <Newsletter />
      <ContactCTA
        eyebrow="Do conhecimento à sua próxima escolha"
        title={
          <>
            Quando uma ideia encontra
            <br />
            <em>o seu momento.</em>
          </>
        }
        text="Se uma leitura abriu novas possibilidades, a conversa pode ser o próximo passo. Conte o que você tem em mente."
        label="Converse com a consultoria"
      />
    </main>
  )
}
