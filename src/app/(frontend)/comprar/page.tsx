import { renderVisualPage } from '@/components/visual-page'
import type { Metadata } from 'next'
import { getProperties } from '@/lib/content'
import { PropertyCollection } from '@/components/collections'
import { ContactCTA } from '@/components/contact-cta'
import { Breadcrumbs, Eyebrow, container } from '@/components/ui'
import { Icon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Comprar | Imóveis | Marcio Rogério',
  description:
    'Primeiro imóvel, médio e alto padrão. Encontre uma seleção que respeita seu momento de vida.',
}

export default async function BuyPage() {
  const visualPage = await renderVisualPage('/comprar')
  if (visualPage) return visualPage
  const properties = await getProperties()
  return (
    <main id="main-content">
      <section className={`${container} pt-8 pb-14 md:pt-10 md:pb-16`}>
        <Breadcrumbs items={[{ label: 'Comprar' }]} />
        <div className="mt-14 grid items-end gap-8 md:mt-16 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow className="mb-6">Comprar / um olhar para o seu momento</Eyebrow>
            <h1 className="font-display text-[55px] leading-[1.02] tracking-[-.03em] md:text-[73px]">
              Seu lugar no mundo.
              <br />
              <em className="text-gold-dark">Do seu jeito.</em>
            </h1>
          </div>
          <p className="max-w-sm text-[12px] leading-7 text-muted lg:mb-2 lg:justify-self-end">
            Uma seleção que vai além das características do imóvel. Descubra espaços que conversam
            com a sua rotina, seus planos e a sua maneira de viver.
          </p>
        </div>
      </section>
      <section className={`${container} pb-20 md:pb-24`}>
        <PropertyCollection properties={properties} detailed />
      </section>
      <section className="border-t border-line bg-sand/60 py-16">
        <div className={`${container} grid gap-9 md:grid-cols-3`}>
          {[
            [
              'compass',
              'Antes de buscar, entender.',
              'Escutamos suas prioridades e organizamos uma seleção alinhada ao que você precisa.',
            ],
            [
              'layers',
              'Mais contexto. Menos ruído.',
              'Apresentamos características, custos e pontos de atenção para uma escolha consciente.',
            ],
            [
              'shield',
              'Ao seu lado, em cada etapa.',
              'Da primeira conversa à análise documental e à negociação, com transparência.',
            ],
          ].map(([icon, title, text]) => (
            <div key={title} className="reveal">
              <Icon
                name={icon as 'compass' | 'layers' | 'shield'}
                className="mb-5 size-6 text-gold-dark"
              />
              <h2 className="font-display text-3xl">{title}</h2>
              <p className="mt-3 max-w-sm text-[11px] leading-7 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <ContactCTA
        eyebrow="Sua busca é única"
        title={
          <>
            A próxima chave começa
            <br />
            com uma <em>boa escolha.</em>
          </>
        }
        href="/contato?objetivo=comprar"
        label="Conte o que você procura"
      />
    </main>
  )
}
