import { renderVisualPage } from '@/components/visual-page'
import type { Metadata } from 'next'
import { getDevelopments } from '@/lib/content'
import { DevelopmentCard } from '@/components/cards'
import { ContactCTA } from '@/components/contact-cta'
import { ButtonLink, EmptyState, Eyebrow, MediaImage, container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Empreendimentos | Projetos selecionados Marcio Rogério',
  description: 'Uma seleção de projetos com arquitetura, contexto e novas perspectivas para viver.',
}
export default async function DevelopmentsPage() {
  const visualPage = await renderVisualPage('/empreendimentos')
  if (visualPage) return visualPage
  const developments = await getDevelopments()
  return (
    <main id="main-content">
      <section className="relative isolate flex min-h-[540px] items-center overflow-hidden bg-navy py-20 text-white md:min-h-[610px]">
        <div className="absolute inset-0 -z-20" data-parallax>
          <MediaImage media={developments[0]?.image} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/20" />
        <div className={container}>
          <Eyebrow light className="mb-7">
            Empreendimentos / projetos com propósito
          </Eyebrow>
          <h1 className="max-w-3xl font-display text-[57px] leading-[1.02] tracking-[-.03em] md:text-[78px]">
            Novos projetos.
            <br />
            <em className="text-champagne-light">Outras formas de viver.</em>
          </h1>
          <p className="mt-7 max-w-sm text-[12px] leading-7 text-white/75">
            Arquitetura, entorno e uma visão de futuro. Projetos selecionados pelo que acrescentam à
            cidade e à sua vida.
          </p>
          <ButtonLink variant="gold" href="#projetos" className="mt-8">
            Explore os projetos
          </ButtonLink>
        </div>
      </section>
      <section id="projetos" className={`${container} py-20 md:py-24`}>
        <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow className="mb-5">Uma apresentação, não uma vitrine</Eyebrow>
            <h2 className="font-display text-[46px] leading-tight">
              Projetos <em>selecionados.</em>
            </h2>
          </div>
          <p className="max-w-sm text-[11px] leading-7 text-muted">
            Cada empreendimento tem uma história, uma proposta e um lugar. Conheça o que faz de cada
            projeto uma escolha singular.
          </p>
        </div>
        {developments.length ? (
          developments.map((development, i) => (
            <DevelopmentCard development={development} index={i} key={development.id} />
          ))
        ) : (
          <EmptyState title="Novos projetos em perspectiva." />
        )}
        <p className="mt-7 text-[10px] leading-6 text-muted">
          Os projetos de demonstração são referências conceituais, sem vínculo com incorporadoras ou
          oferta comercial. Parcerias e empreendimentos reais poderão ser cadastrados pela equipe.
        </p>
      </section>
      <ContactCTA
        eyebrow="Arquitetura para o seu próximo capítulo"
        title={
          <>
            Um novo projeto.
            <br />
            <em>A sua próxima perspectiva.</em>
          </>
        }
        href="/contato?objetivo=empreendimento"
        label="Solicitar uma apresentação"
      />
    </main>
  )
}
