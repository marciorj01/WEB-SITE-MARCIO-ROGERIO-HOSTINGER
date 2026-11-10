import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { findBySlug } from '@/lib/payload'
import { getArticles } from '@/lib/content'
import { ArticleCard, ArticleMeta, CategoryLabel, categoryOf } from '@/components/cards'
import { ArticleTools } from '@/components/article-tools'
import { Newsletter } from '@/components/forms'
import { ContactCTA } from '@/components/contact-cta'
import { Breadcrumbs, MediaImage, SectionHeading, container } from '@/components/ui'
import { Icon } from '@/components/icons'

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    return (await getArticles()).map((article) => ({ slug: article.slug }))
  } catch {
    return []
  }
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const article = await findBySlug('articles', (await params).slug)
  if (!article) return { title: 'Artigo não encontrado | Marcio Rogério' }
  const cover = typeof article.cover === 'object' ? article.cover : null
  return {
    title: `${article.title} | Conteúdo imobiliário | Marcio Rogério`,
    description: article.subtitle,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.subtitle,
      publishedTime: article.publishedAt,
      ...(cover?.url ? { images: [{ url: cover.url, alt: cover.alt }] } : {}),
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await findBySlug('articles', (await params).slug)
  if (!article) notFound()
  const all = await getArticles()
  const category = categoryOf(article)
  const related = all
    .filter((item) => item.id !== article.id)
    .sort(
      (a, b) =>
        Number(categoryOf(b)?.id === category?.id) - Number(categoryOf(a)?.id === category?.id),
    )
    .slice(0, 3)
  const author = typeof article.author === 'object' ? article.author : null
  return (
    <main id="main-content">
      <article>
        <header className={`${container} pt-8 pb-10 md:pt-10 md:pb-14`}>
          <div className="no-print">
            <Breadcrumbs
              items={[
                { label: 'Perspectivas', href: '/conteudo' },
                { label: category?.name || 'Leitura' },
              ]}
            />
          </div>
          <div className="mx-auto mt-12 max-w-[960px] md:mt-16">
            <CategoryLabel article={article} />
            <h1 className="mt-6 font-display text-[48px] leading-[1.05] tracking-[-.03em] md:text-[68px] lg:text-[76px]">
              {article.title}
            </h1>
            <p className="mt-7 max-w-3xl text-[14px] leading-8 text-muted md:text-[16px]">
              {article.subtitle}
            </p>
            <div className="mt-8 flex flex-col justify-between gap-6 border-t border-line pt-6 sm:flex-row sm:items-center">
              <div>
                <p className="mb-3 text-[10px] text-navy">
                  Por {author?.name || 'Redação Marcio Rogério'}
                </p>
                <ArticleMeta article={article} />
              </div>
              <ArticleTools
                title={article.title}
                printable={article.format === 'guide' || article.format === 'report'}
              />
            </div>
          </div>
        </header>
        <div className={`${container}`}>
          <figure>
            <div className="relative aspect-[1.15] overflow-hidden md:aspect-[2.05]">
              <MediaImage media={article.cover} priority sizes="90vw" />
            </div>
            <figcaption className="mt-3 text-[9px] leading-5 text-muted">
              Fotografia de referência ·{' '}
              {typeof article.cover === 'object'
                ? article.cover.alt
                : 'Arquitetura e novas perspectivas.'}
            </figcaption>
          </figure>
        </div>
        <div className={`${container} pt-12 md:pt-16`}>
          <div className="mx-auto grid max-w-[1020px] gap-10 lg:grid-cols-[150px_1fr] lg:gap-16">
            <aside className="no-print hidden lg:block">
              <div className="sticky top-32 border-t border-line pt-5">
                <p className="text-[8px] uppercase tracking-[.18em] text-gold-dark">
                  Uma pausa para ler
                </p>
                <p className="mt-4 font-display text-2xl leading-tight">
                  Conhecimento
                  <br />
                  também é<br />
                  <em>patrimônio.</em>
                </p>
                <p className="mt-5 text-[9px] leading-6 text-muted">
                  {article.readingTime} minutos para ampliar o seu olhar.
                </p>
                <Link href="/conteudo" className="mt-6 inline-flex items-center gap-3 text-[9px]">
                  <Icon name="left" className="size-3" />
                  Voltar à revista
                </Link>
              </div>
            </aside>
            <div>
              <RichText data={article.content} className="article-prose" />
              {article.pullquote && (
                <blockquote className="my-12 border-y border-champagne/55 py-9 font-display text-[35px] leading-[1.2] italic text-navy md:-ml-5 md:text-[43px]">
                  “{article.pullquote}”
                </blockquote>
              )}
              {article.inlineImage && (
                <figure className="my-12">
                  <div className="relative aspect-[1.45] overflow-hidden">
                    <MediaImage
                      media={article.inlineImage}
                      sizes="(max-width: 1024px) 90vw, 760px"
                    />
                  </div>
                  <figcaption className="mt-3 text-[9px] text-muted">
                    Uma perspectiva em imagem · fotografia de referência.
                  </figcaption>
                </figure>
              )}
              {article.conclusion && (
                <RichText data={article.conclusion} className="article-prose" />
              )}
              <div className="mt-12 border-t border-line pt-7">
                <p className="text-[10px] leading-6 text-muted">
                  Conteúdo editorial informativo. Não substitui uma análise individual do imóvel nem
                  aconselhamento jurídico, tributário ou financeiro.
                </p>
              </div>
              <div className="mt-9 flex items-start gap-5 bg-sand/60 p-6 md:p-8">
                <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy font-display text-3xl text-champagne-light">
                  {author?.portrait ? <MediaImage media={author.portrait} sizes="56px" /> : 'MR'}
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[.17em] text-gold-dark">
                    Quem escreve
                  </p>
                  <h2 className="mt-2 font-display text-[27px]">
                    {author?.name || 'Redação Marcio Rogério'}
                  </h2>
                  <p className="mt-3 text-[11px] leading-7 text-muted">
                    {author?.bio ||
                      'Uma perspectiva editorial sobre arquitetura, mercado imobiliário e decisões patrimoniais conscientes.'}
                  </p>
                </div>
              </div>
              <div className="no-print mt-8">
                <ArticleTools
                  title={article.title}
                  printable={article.format === 'guide' || article.format === 'report'}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className={`${container} no-print py-20 md:py-24`}>
          <SectionHeading
            eyebrow="Continue a leitura"
            title={
              <>
                Uma ideia leva
                <br />
                <em>a outra perspectiva.</em>
              </>
            }
            link={{ href: '/conteudo', label: 'Voltar à revista' }}
          />
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard article={item} key={item.id} />
            ))}
          </div>
        </section>
      )}
      <div className="no-print">
        <Newsletter compact />
        <ContactCTA
          eyebrow="Do conhecimento à conversa"
          title={
            <>
              Uma nova perspectiva
              <br />
              <em>para os seus planos.</em>
            </>
          }
          text={
            article.contactPrompt ||
            'Quer entender como esse tema se conecta ao seu momento? Converse com a consultoria sobre seus objetivos.'
          }
        />
      </div>
    </main>
  )
}
