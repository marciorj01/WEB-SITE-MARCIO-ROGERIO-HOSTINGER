import type { Metadata } from 'next'
import { getBrand } from '@/lib/content'
import { ContactForm } from '@/components/forms'
import { ButtonLink, Eyebrow, MediaImage, SectionHeading, container } from '@/components/ui'
import { Icon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Vender | Uma estratégia à altura do seu imóvel',
  description:
    'Avaliação, posicionamento, apresentação profissional e acompanhamento personalizado para vender seu imóvel.',
}
export default async function SellPage() {
  const brand = await getBrand()
  return (
    <main id="main-content">
      <section className="grid lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:min-h-[640px] lg:pl-[13.4%] lg:pr-[11%]">
          <Eyebrow className="mb-7">Vender / o valor de uma boa estratégia</Eyebrow>
          <h1 className="font-display text-[53px] leading-[1.04] tracking-[-.03em] md:text-[65px]">
            Seu imóvel merece
            <br />
            uma estratégia
            <br />
            <em className="text-gold-dark">à altura do seu valor.</em>
          </h1>
          <p className="mt-7 max-w-md text-[12px] leading-7 text-muted">
            Cada imóvel tem uma história. Nosso trabalho é entendê-la, posicioná-la e apresentá-la
            às pessoas certas, com cuidado do primeiro contato à negociação.
          </p>
          <ButtonLink href="#apresentar-imovel" className="mt-8 self-start">
            Quero apresentar meu imóvel
          </ButtonLink>
        </div>
        <div className="relative min-h-[380px] overflow-hidden">
          <div className="absolute inset-0" data-parallax>
            <MediaImage media={brand.sellImage} priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>
      <section className={`${container} py-20 md:py-24`}>
        <SectionHeading
          eyebrow="O que faz a diferença"
          title={
            <>
              Não apenas anunciar.
              <br />
              <em>Apresentar com inteligência.</em>
            </>
          }
        />
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {[
            [
              'Avaliação e posicionamento',
              'Analisamos características, contexto e referências de mercado para construir um posicionamento consistente.',
            ],
            [
              'Uma estratégia para o seu imóvel',
              'Definimos uma abordagem de apresentação e canais alinhados ao perfil do imóvel e ao público desejado.',
            ],
            [
              'Fotografia e apresentação',
              'Valorizamos arquitetura, luz e espaços com uma apresentação profissional, fiel ao que o imóvel oferece.',
            ],
            [
              'Divulgação qualificada',
              'Mais relevância, menos ruído. Comunicação direcionada a quem busca as características do seu imóvel.',
            ],
            [
              'Atendimento personalizado',
              'Escuta, organização de visitas e retorno claro para que você acompanhe cada movimento.',
            ],
            [
              'Acompanhamento da negociação',
              'Uma condução cuidadosa de propostas, alinhamentos e documentação, respeitando suas decisões.',
            ],
          ].map(([title, text], i) => (
            <div key={title} className="reveal border-t border-line pt-6">
              <span className="text-[9px] text-gold-dark">0{i + 1} /</span>
              <h3 className="mt-4 font-display text-[29px]">{title}</h3>
              <p className="mt-3 text-[11px] leading-7 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-navy py-20 text-white">
        <div className={container}>
          <SectionHeading
            light
            eyebrow="Um processo claro, do começo ao fim"
            title={
              <>
                Seu próximo capítulo.
                <br />
                <em className="text-champagne-light">Passo a passo.</em>
              </>
            }
          />
          <div className="grid gap-8 md:grid-cols-4">
            {[
              [
                'Uma boa conversa',
                'Você apresenta seu imóvel e conta seus objetivos. Nós escutamos.',
              ],
              [
                'Análise e proposta',
                'Estudamos o contexto e alinhamos uma estratégia de comercialização.',
              ],
              [
                'Apresentação ao mercado',
                'Preparamos a comunicação e conduzimos os contatos qualificados.',
              ],
              [
                'Negociação acompanhada',
                'Organizamos propostas e acompanhamos as etapas até a conclusão.',
              ],
            ].map(([title, text], i) => (
              <div className="reveal border-t border-white/20 pt-6" key={title}>
                <span className="font-display text-[42px] text-champagne-light">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-[11px] leading-7 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="apresentar-imovel"
        className={`${container} grid gap-12 py-20 md:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-24`}
      >
        <div>
          <Eyebrow className="mb-6">Vamos conhecer o seu imóvel</Eyebrow>
          <h2 className="font-display text-[46px] leading-[1.05] md:text-[54px]">
            O primeiro passo
            <br />
            <em>é apresentar.</em>
          </h2>
          <p className="mt-6 max-w-sm text-[12px] leading-7 text-muted">
            Compartilhe algumas informações. A partir delas, podemos entender seu momento e
            conversar sobre uma estratégia para seu imóvel.
          </p>
          <div className="mt-9 flex items-start gap-4 border-t border-line pt-6">
            <Icon name="shield" className="size-5 shrink-0 text-gold-dark" />
            <p className="max-w-xs text-[10px] leading-6 text-muted">
              Suas informações são tratadas de forma reservada. O envio não gera obrigação ou
              contrato de exclusividade.
            </p>
          </div>
        </div>
        <ContactForm intent="sell" label="Quero apresentar meu imóvel" />
      </section>
    </main>
  )
}
