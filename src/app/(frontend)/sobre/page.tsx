import { renderVisualPage } from '@/components/visual-page'
import type { Metadata } from 'next'
import { getBrand } from '@/lib/content'
import { ContactCTA } from '@/components/contact-cta'
import { Breadcrumbs, Eyebrow, MediaImage, container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Sobre | O olhar de Marcio Rogério',
  description:
    'Uma consultoria que conecta pessoas, patrimônio e possibilidades com escuta, curadoria e perspectiva.',
}
export default async function AboutPage() {
  const visualPage = await renderVisualPage('/sobre')
  if (visualPage) return visualPage
  const brand = await getBrand()
  return (
    <main id="main-content">
      <section className={`${container} pt-8 pb-16 md:pt-10 md:pb-20`}>
        <Breadcrumbs items={[{ label: 'Sobre a consultoria' }]} />
        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow className="mb-6">Sobre / o olhar por trás da escolha</Eyebrow>
            <h1 className="font-display text-[57px] leading-[1.03] tracking-[-.03em] md:text-[74px]">
              O ponto de partida
              <br />é sempre
              <br />
              <em className="text-gold-dark">uma pessoa.</em>
            </h1>
            <p className="mt-7 max-w-md text-[13px] leading-8 text-muted">
              Antes de falar sobre imóveis, queremos falar sobre você. Seus planos, o que está
              mudando e o que você deseja construir daqui para frente.
            </p>
            <p className="mt-5 max-w-md text-[12px] leading-7 text-muted">
              É desse encontro entre escuta e perspectiva que nasce a consultoria imobiliária de
              Marcio Rogério: uma
              consultoria imobiliária com um olhar atento às pessoas, à arquitetura e ao patrimônio.
            </p>
          </div>
          <div className="relative min-h-[440px] overflow-hidden lg:mt-8">
            <div className="absolute inset-0" data-parallax>
              <MediaImage
                media={brand.aboutImage}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="absolute right-5 bottom-5 left-5 bg-navy/80 px-4 py-3 text-[9px] leading-5 text-white/80 backdrop-blur-sm">
              Imagem institucional de referência. Substitua pelo seu retrato profissional no painel
              de conteúdo.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-sand/70 py-20">
        <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-24`}>
          <div>
            <Eyebrow className="mb-5">Uma trajetória para compartilhar</Eyebrow>
            <h2 className="font-display text-[45px] leading-tight">
              {brand.profileName || 'Seu nome, sua história.'}
            </h2>
            <p className="mt-4 text-[10px] uppercase tracking-[.16em] text-gold-dark">
              {brand.profileRole || 'Apresentação profissional em construção'}
            </p>
          </div>
          <div className="border-l border-champagne pl-7">
            <p className="mb-3 text-[8px] uppercase tracking-[.18em] text-gold-dark">
              Conteúdo provisório · editável no painel
            </p>
            <p className="whitespace-pre-line text-[13px] leading-8 text-muted">
              {brand.biography ||
                'Este espaço receberá sua trajetória profissional: formação, experiências, regiões de atuação e sua relação com o mercado imobiliário. Nenhuma credencial ou conquista foi presumida.'}
            </p>
          </div>
        </div>
      </section>
      <section className={`${container} py-20 md:py-24`}>
        <div className="reveal mx-auto max-w-4xl text-center">
          <Eyebrow className="mb-7 justify-center">A filosofia do nosso trabalho</Eyebrow>
          <h2 className="font-display text-[40px] leading-[1.2] md:text-[58px]">
            “Um imóvel faz parte do patrimônio.
            <br />
            <em className="text-gold-dark">Uma boa escolha faz parte da vida.”</em>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[12px] leading-8 text-muted">
            {brand.philosophy ||
              'Escutar com atenção. Olhar com critério. Orientar com transparência. Acreditamos em relações construídas com tempo e em decisões que fazem sentido para a história de cada cliente.'}
          </p>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {[
            [
              'Escuta antes de tudo',
              'O atendimento começa pelas perguntas certas e pelo respeito ao momento de cada pessoa.',
            ],
            [
              'Um olhar criterioso',
              'Atenção à arquitetura, ao entorno e ao papel que um imóvel pode ocupar na vida e no patrimônio.',
            ],
            [
              'Confiança, não urgência',
              'Informação clara, postura transparente e liberdade para decidir no seu tempo.',
            ],
          ].map(([title, text], i) => (
            <div key={title} className="reveal border-t border-line pt-6">
              <span className="text-[9px] text-gold-dark">0{i + 1}</span>
              <h3 className="mt-4 font-display text-3xl">{title}</h3>
              <p className="mt-4 text-[11px] leading-7 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <ContactCTA
        eyebrow="Pessoas antes de propriedades"
        title={
          <>
            Antes do próximo imóvel,
            <br />
            <em>vamos nos conhecer?</em>
          </>
        }
        text="Conte sua história e seus planos. Uma boa conversa é o melhor começo para uma relação de confiança."
        label="Começar uma conversa"
      />
    </main>
  )
}
