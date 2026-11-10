'use client'

import { useEffect, useState } from 'react'
import type { Property } from '@/payload-types'
import { PropertyCard, segmentLabels } from './cards'
import { ButtonLink, EmptyState, Eyebrow, MediaImage } from './ui'
import { Icon } from './icons'
import { navigateTabs } from './tab-keyboard'

const segments = [
  {
    key: 'first',
    title: (
      <>
        O primeiro imóvel.
        <br />
        <em>Um grande começo.</em>
      </>
    ),
    text: 'Para quem está construindo uma nova etapa, orientação faz toda a diferença. Uma seleção com atenção à localização, ao planejamento financeiro e à sua rotina.',
    profile: 'Para quem busca independência e uma compra bem planejada.',
    benefits: [
      'Clareza sobre custos e documentação',
      'Imóveis que acompanham o seu momento',
      'Orientação em cada etapa da compra',
    ],
  },
  {
    key: 'medium',
    title: (
      <>
        Mais espaço para viver.
        <br />
        <em>Mais sentido para escolher.</em>
      </>
    ),
    text: 'Seu novo imóvel precisa estar à altura das suas novas prioridades. Conforto, boa arquitetura e bairros que tornam o cotidiano mais interessante.',
    profile: 'Para famílias e profissionais que desejam evoluir com equilíbrio.',
    benefits: [
      'Equilíbrio entre localização e conforto',
      'Plantas funcionais e infraestrutura',
      'Análise de adequação ao seu orçamento',
    ],
  },
  {
    key: 'high',
    title: (
      <>
        O extraordinário está
        <br />
        <em>nos detalhes.</em>
      </>
    ),
    text: 'Uma curadoria para quem valoriza arquitetura autoral, privacidade e experiências singulares. Imóveis escolhidos pelo que os torna verdadeiramente especiais.',
    profile: 'Para quem procura exclusividade, identidade e qualidade de vida.',
    benefits: [
      'Arquitetura e localizações singulares',
      'Discrição e atendimento individual',
      'Um olhar além da metragem',
    ],
  },
] as const

export function PropertyCollection({
  properties,
  detailed = false,
  segmentLabelsOverride,
  emptyState,
}: {
  properties: Property[]
  detailed?: boolean
  segmentLabelsOverride?: Partial<typeof segmentLabels>
  emptyState?: { title?: string; text?: string; linkLabel?: string }
}) {
  const labels = { ...segmentLabels, ...segmentLabelsOverride }
  const [active, setActive] = useState(detailed ? 'high' : 'all')
  useEffect(() => {
    if (!detailed) return
    const selected = new URLSearchParams(window.location.search).get('segmento')
    if (selected && ['first', 'medium', 'high'].includes(selected)) setActive(selected)
  }, [detailed])
  const selected = properties.filter((property) => active === 'all' || property.segment === active)
  const segment = segments.find((segment) => segment.key === active)
  return (
    <div>
      <div
        role="tablist"
        onKeyDown={navigateTabs}
        aria-label="Segmentos de imóveis"
        className="mb-9 flex flex-wrap gap-x-8 gap-y-2 border-b border-line md:gap-x-11"
      >
        {[
          ...(!detailed ? [{ key: 'all', label: 'Todos os imóveis' }] : []),
          ...Object.entries(labels).map(([key, label]) => ({ key, label })),
        ].map((tab) => (
          <button
            key={tab.key}
            id={`property-tab-${tab.key}`}
            role="tab"
            type="button"
            aria-selected={active === tab.key}
            aria-controls="property-results"
            tabIndex={active === tab.key ? 0 : -1}
            onClick={() => setActive(tab.key)}
            className={`relative min-h-12 border-b py-3 text-[11px] transition-colors ${active === tab.key ? 'border-gold-dark font-semibold text-navy' : 'border-transparent text-muted hover:text-navy'}`}
          >
            {tab.label}
            <span className="ml-2 text-[8px] text-gold-dark">
              {properties
                .filter((property) => tab.key === 'all' || property.segment === tab.key)
                .length.toString()
                .padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>
      <div id="property-results" role="tabpanel" aria-labelledby={`property-tab-${active}`}>
        {detailed && segment && (
          <div className="mb-16 grid gap-9 bg-sand/50 lg:grid-cols-2">
            <div className="relative min-h-[330px] lg:min-h-[470px]">
              <MediaImage media={selected[0]?.image} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 lg:pr-12">
              <Eyebrow className="mb-5">{labels[segment.key]}</Eyebrow>
              <h2 className="font-display text-[42px] leading-[1.05] [&_em]:font-normal [&_em]:text-gold-dark">
                {segment.title}
              </h2>
              <p className="mt-5 text-xs leading-7 text-muted">{segment.text}</p>
              <p className="mt-4 border-l border-champagne pl-4 text-[11px] leading-6 text-navy">
                {segment.profile}
              </p>
              <ul className="mt-5 space-y-3">
                {segment.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-[10px] text-muted">
                    <Icon name="check" className="size-3.5 text-gold-dark" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/contato?objetivo=comprar"
                variant="outline"
                className="mt-7 self-start"
              >
                Atendimento personalizado
              </ButtonLink>
            </div>
          </div>
        )}
        {selected.length ? (
          <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {(detailed ? selected : selected.slice(0, 3)).map((property) => (
              <PropertyCard key={property.id} property={property} segmentLabelsOverride={labels} />
            ))}
          </div>
        ) : (
          <EmptyState {...emptyState} />
        )}
      </div>
    </div>
  )
}
