'use client'

import { useState } from 'react'
import type { Development } from '@/payload-types'
import { MediaImage, ButtonLink } from './ui'
import { Icon } from './icons'
import { navigateTabs } from './tab-keyboard'

export function Typologies({ items }: { items: Development['typologies'] }) {
  const [active, setActive] = useState(0)
  if (!items?.length)
    return (
      <p className="text-sm text-muted">Solicite as tipologias e plantas disponíveis à equipe.</p>
    )
  const selected = items[active]
  return (
    <div>
      <div
        role="tablist"
        onKeyDown={navigateTabs}
        aria-label="Tipologias disponíveis"
        className="mb-7 flex flex-wrap gap-3"
      >
        {items.map((item, i) => (
          <button
            role="tab"
            id={`typology-tab-${i}`}
            aria-selected={i === active}
            aria-controls="typology-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            key={item.id || i}
            className={`min-h-11 border px-5 py-3 text-[11px] ${i === active ? 'border-navy bg-navy text-white' : 'border-line text-muted'}`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div
        id="typology-panel"
        role="tabpanel"
        aria-labelledby={`typology-tab-${active}`}
        className="grid gap-8 border border-line p-7 md:grid-cols-2 md:p-10"
      >
        <div>
          <p className="text-[9px] uppercase tracking-widest text-gold-dark">
            A configuração do seu próximo capítulo
          </p>
          <h3 className="mt-5 font-display text-4xl">{selected.name}</h3>
          <p className="mt-6 flex items-center gap-3 text-sm">
            <Icon name="area" className="size-4 text-gold-dark" />
            {selected.area || 'Área sob consulta'}
          </p>
          <p className="mt-4 flex items-center gap-3 text-sm">
            <Icon name="bed" className="size-4 text-gold-dark" />
            {selected.bedrooms || 'Configuração sob consulta'}
          </p>
          <p className="mt-6 text-[10px] leading-6 text-muted">
            Informações ilustrativas. Tipologias, disponibilidade e condições devem ser confirmadas
            na apresentação do projeto real.
          </p>
          <ButtonLink href="#informacoes" variant="outline" className="mt-6">
            Solicitar apresentação
          </ButtonLink>
        </div>
        <div className="relative min-h-64 bg-sand">
          {selected.plan ? (
            <MediaImage media={selected.plan} className="object-contain p-4" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
              <Icon name="layers" className="mb-5 size-9 text-champagne" />
              <h4 className="font-display text-2xl">Cada detalhe, no seu tempo.</h4>
              <p className="mt-4 max-w-xs text-[11px] leading-6 text-muted">
                A planta técnica será apresentada quando o empreendimento real for cadastrado.
                Nenhuma planta fictícia é exibida.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
