import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findBySlug } from '@/lib/payload'
import { getProperties } from '@/lib/content'
import { PropertyCard, segmentLabels } from '@/components/cards'
import { Gallery } from '@/components/gallery'
import { ContactForm } from '@/components/forms'
import { PropertyMediaActions } from '@/components/media-viewers'
import { Icon } from '@/components/icons'
import {
  Breadcrumbs,
  ButtonLink,
  Eyebrow,
  ReferenceNotice,
  SectionHeading,
  container,
} from '@/components/ui'

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    return (await getProperties()).map((property) => ({ slug: property.slug }))
  } catch {
    return []
  }
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const property = await findBySlug('properties', (await params).slug)
  return {
    title: property ? `${property.title} | Curadoria de Marcio Rogério` : 'Imóvel não encontrado | Marcio Rogério',
    description: property?.description,
  }
}
export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const property = await findBySlug('properties', (await params).slug)
  if (!property) notFound()
  const others = (await getProperties()).filter((item) => item.id !== property.id).slice(0, 3)
  const gallery = [
    { image: property.image, caption: property.subtitle },
    ...(property.gallery ?? []),
  ]
  return (
    <main id="main-content">
      <section className={`${container} pt-8 pb-10 md:pt-10`}>
        <Breadcrumbs items={[{ label: 'Comprar', href: '/comprar' }, { label: property.title }]} />
        <div className="mt-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <Eyebrow className="mb-5">
              {segmentLabels[property.segment]} / {property.type || 'Curadoria'}
            </Eyebrow>
            <h1 className="font-display text-[57px] leading-tight tracking-[-.03em] md:text-[76px]">
              {property.title}
            </h1>
            <p className="mt-3 font-display text-2xl italic text-gold-dark">{property.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <PropertyMediaActions
              tour360Url={(property as any).tour360Url}
              videoUrl={(property as any).videoUrl}
              title={property.title}
            />
            <ButtonLink href="#interesse" variant="outline">
              {property.referenceOnly ? 'Quero encontrar um imóvel assim' : 'Solicitar detalhes'}
            </ButtonLink>
          </div>
        </div>
        <p className="mt-7 flex items-center gap-2 text-[10px] text-muted">
          <Icon name="pin" className="size-4 text-gold-dark" />
          {property.location || 'Consulte a localização com a equipe'}
        </p>
      </section>
      <div className={container}>
        {property.referenceOnly && (
          <div className="mb-7">
            <ReferenceNotice />
          </div>
        )}
        <Gallery title={property.title} images={gallery} />
      </div>
      <section className={`${container} grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20`}>
        <div>
          <Eyebrow className="mb-5">O olhar da curadoria</Eyebrow>
          <h2 className="font-display text-[41px] leading-tight">
            Arquitetura para
            <br />
            <em>viver a sua história.</em>
          </h2>
          <p className="mt-6 whitespace-pre-line text-[13px] leading-8 text-muted">
            {property.description}
          </p>
          <h3 className="mt-10 font-display text-3xl">O que torna esta referência singular</h3>
          <ul className="mt-6 grid gap-x-5 gap-y-4 sm:grid-cols-2">
            {(property.features ?? []).map((feature) => (
              <li
                key={feature.id}
                className="flex items-start gap-3 text-[11px] leading-6 text-muted"
              >
                <Icon name="check" className="mt-1 size-3.5 shrink-0 text-gold-dark" />
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit border border-line bg-paper p-7 md:p-9">
          <p className="text-[9px] uppercase tracking-[.18em] text-gold-dark">
            {property.referenceOnly ? 'Características ilustrativas' : 'O imóvel em detalhes'}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-7">
            {[
              [property.area ? `${property.area} m²` : 'Sob consulta', 'Área privativa'],
              [String(property.bedrooms || '—'), 'Dormitórios'],
              [String(property.suites || '—'), 'Suítes'],
              [String(property.parking || '—'), 'Vagas'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-4xl">{value}</p>
                <p className="mt-2 text-[9px] text-muted">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-line pt-6">
            <p className="font-display text-2xl">
              {property.referenceOnly
                ? 'Uma referência para inspirar.'
                : property.price
                  ? new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    }).format(property.price)
                  : 'Valor sob consulta'}
            </p>
            <p className="mt-3 text-[10px] leading-6 text-muted">
              {property.referenceOnly
                ? 'Não disponível para comercialização. Conte o que gostou nesta proposta e vamos conversar sobre imóveis reais com este perfil.'
                : 'Disponibilidade, encargos, documentação e condições devem ser confirmados com a equipe.'}
            </p>
          </div>
          <ButtonLink href="#interesse" className="mt-6 w-full">
            Conversar sobre este perfil
          </ButtonLink>
        </aside>
      </section>
      <section id="interesse" className="border-y border-line bg-sand/50 py-20">
        <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24`}>
          <div>
            <Eyebrow className="mb-6">Do olhar à próxima escolha</Eyebrow>
            <h2 className="font-display text-[46px] leading-tight">
              Este jeito de viver
              <br />
              <em>conversa com você?</em>
            </h2>
            <p className="mt-6 max-w-sm text-[12px] leading-7 text-muted">
              Conte o que chamou sua atenção em {property.title}. Vamos entender suas prioridades e
              conversar sobre possibilidades alinhadas ao seu momento.
            </p>
          </div>
          <ContactForm
            intent="buy"
            property={property.id}
            label={
              property.referenceOnly
                ? 'Quero um imóvel com este perfil'
                : 'Solicitar informações do imóvel'
            }
          />
        </div>
      </section>
      <section className={`${container} py-20 md:py-24`}>
        <SectionHeading
          eyebrow="Outros modos de viver"
          title={
            <>
              Amplie o seu
              <br />
              <em>olhar.</em>
            </>
          }
          link={{ href: '/comprar', label: 'Voltar à curadoria' }}
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <PropertyCard property={item} key={item.id} />
          ))}
        </div>
      </section>
    </main>
  )
}
