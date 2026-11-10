'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Article, Development, Property } from '@/payload-types'
import { ArticleCard, DevelopmentCard, PropertyCard } from '@/components/cards'
import { ContactForm, Newsletter } from '@/components/forms'
import { ButtonLink, Eyebrow, MediaImage, container } from '@/components/ui'
import type { VisualPage, VisualSection } from './visual-page'

type Listings = { properties: Property[]; articles: Article[]; developments: Development[] }

const toneClass: Record<string, string> = {
  ivory: 'bg-ivory text-navy', paper: 'bg-paper text-navy', navy: 'bg-navy text-white',
}

function PageLink({ label, url, light = false }: { label?: string; url?: string; light?: boolean }) {
  if (!label || !url) return null
  return <ButtonLink href={url} variant={light ? 'light' : 'navy'} className="mt-7">{label}</ButtonLink>
}

export function VisualPageClient({
  page: initialPage,
  serverURL,
  listings,
}: {
  page: VisualPage
  serverURL: string
  listings: Listings
}) {
  const { data } = useLivePreview<VisualPage>({ initialData: initialPage, serverURL, depth: 2 })
  return (
    <main id="main-content">
      {(data.sections ?? []).map((section: VisualSection, index: number) => {
        const key = section.id || `${section.blockType}-${index}`
        const tone = toneClass[section.tone] || toneClass.ivory
        if (section.blockType === 'hero') return (
          <section key={key} className={`relative isolate flex min-h-[68vh] items-center overflow-hidden ${tone}`}>
            {section.image && <div className="absolute inset-0 -z-10"><MediaImage media={section.image} priority sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/35 to-transparent" /></div>}
            <div className={`${container} py-24 ${section.image ? 'text-white' : ''}`}>
              {section.eyebrow && <Eyebrow light={Boolean(section.image) || section.tone === 'navy'} className="mb-6">{section.eyebrow}</Eyebrow>}
              <h1 className="max-w-4xl font-display text-5xl leading-[1.04] md:text-7xl">{section.title}{section.emphasis && <><br /><em className="font-normal text-champagne-light">{section.emphasis}</em></>}</h1>
              {section.text && <p className="mt-6 max-w-xl text-sm leading-7 opacity-80">{section.text}</p>}
              <PageLink label={section.linkLabel} url={section.linkUrl} light={Boolean(section.image) || section.tone === 'navy'} />
            </div>
          </section>
        )
        if (section.blockType === 'editorial') return (
          <section key={key} className={`${tone} py-20 md:py-28`}>
            <div className={`${container} ${section.alignment === 'center' ? 'mx-auto text-center' : ''}`}>
              {section.eyebrow && <Eyebrow light={section.tone === 'navy'} className="mb-5">{section.eyebrow}</Eyebrow>}
              {section.title && <h2 className="max-w-4xl font-display text-4xl leading-tight md:text-6xl">{section.title}</h2>}
              <p className="mt-6 max-w-3xl whitespace-pre-line text-sm leading-8 opacity-75">{section.text}</p>
            </div>
          </section>
        )
        if (section.blockType === 'imageText') {
          const imageFirst = section.imagePosition !== 'right'
          return (
            <section key={key} className="grid bg-navy text-white lg:min-h-[580px] lg:grid-cols-2">
              <div className={`relative min-h-[340px] ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}><MediaImage media={section.image} sizes="(max-width: 1024px) 100vw, 50vw" /></div>
              <div className={`flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-[13%] ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                {section.eyebrow && <Eyebrow light className="mb-6">{section.eyebrow}</Eyebrow>}
                <h2 className="font-display text-4xl leading-tight md:text-5xl">{section.title}</h2>
                <p className="mt-6 whitespace-pre-line text-sm leading-8 text-white/70">{section.text}</p>
                <PageLink label={section.linkLabel} url={section.linkUrl} light />
              </div>
            </section>
          )
        }
        if (section.blockType === 'gallery') return (
          <section key={key} className={`${container} py-16 md:py-20`}>
            {section.title && <h2 className="mb-8 font-display text-4xl">{section.title}</h2>}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{(section.images ?? []).map((item: any, i: number) => <figure key={item.id || i}><div className="relative aspect-[4/3]"><MediaImage media={item.image} sizes="(max-width: 768px) 100vw, 33vw" /></div>{item.caption && <figcaption className="pt-2 text-xs text-muted">{item.caption}</figcaption>}</figure>)}</div>
          </section>
        )
        if (section.blockType === 'listing') {
          const limit = Math.min(12, Math.max(1, Number(section.limit) || 3))
          return (
            <section key={key} className={`${container} py-16 md:py-20`}>
              {section.eyebrow && <Eyebrow className="mb-5">{section.eyebrow}</Eyebrow>}
              {section.title && <h2 className="mb-9 font-display text-4xl md:text-5xl">{section.title}</h2>}
              {section.source === 'properties' && <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{listings.properties.slice(0, limit).map((item) => <PropertyCard key={item.id} property={item} />)}</div>}
              {section.source === 'developments' && <div className="grid gap-8 md:grid-cols-2">{listings.developments.slice(0, limit).map((item, i) => <DevelopmentCard key={item.id} development={item} index={i} />)}</div>}
              {section.source === 'articles' && <div className="grid gap-8 md:grid-cols-2">{listings.articles.slice(0, limit).map((item) => <ArticleCard key={item.id} article={item} />)}</div>}
            </section>
          )
        }
        if (section.blockType === 'newsletter')
          return (
            <div key={key}>
              <Newsletter title={section.title} text={section.text} />
            </div>
          )
        if (section.blockType === 'contactForm') return (
          <section key={key} className={`${container} grid gap-10 py-16 md:grid-cols-2 md:py-24`}>
            <div>
              {section.title && <h2 className="max-w-xl font-display text-4xl leading-tight md:text-5xl">{section.title}</h2>}
              {section.text && <p className="mt-5 max-w-md text-sm leading-7 text-muted">{section.text}</p>}
            </div>
            <ContactForm />
          </section>
        )
        if (section.blockType === 'cta') return (
          <section key={key} className={`${tone} py-16 md:py-24`}>
            <div className={`${container} text-center`}>
              {section.eyebrow && <Eyebrow light={section.tone === 'navy'} className="mb-5 justify-center">{section.eyebrow}</Eyebrow>}
              <h2 className="mx-auto max-w-4xl font-display text-4xl leading-tight md:text-6xl">{section.title}</h2>
              {section.text && <p className="mx-auto mt-5 max-w-xl text-sm leading-7 opacity-75">{section.text}</p>}
              <div className="flex justify-center"><PageLink label={section.linkLabel} url={section.linkUrl} light={section.tone === 'navy'} /></div>
            </div>
          </section>
        )
        return <div key={key} />
      })}
    </main>
  )
}
