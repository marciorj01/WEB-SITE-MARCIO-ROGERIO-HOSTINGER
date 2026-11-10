import { renderVisualPage } from '@/components/visual-page'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles, getBrand, getProperties } from '@/lib/content'
import { ArticleCard, PropertyCard } from '@/components/cards'
import { ContactCTA } from '@/components/contact-cta'
import { Icon } from '@/components/icons'
import { ButtonLink, Eyebrow, MediaImage, SectionHeading, container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Investir | Estratégia patrimonial | Marcio Rogério',
  description:
    'Investir em imóveis com visão de longo prazo, análise e uma estratégia alinhada ao seu perfil.',
}
export default async function InvestPage() {
  const visualPage = await renderVisualPage('/investir')
  if (visualPage) return visualPage
  const [brand, properties, articles] = await Promise.all([
    getBrand(),
    getProperties(),
    getArticles(),
  ])
  const selected = properties.filter((property) => property.investment).slice(0, 3)
  const reading = articles
    .filter(
      (article) =>
        typeof article.category === 'object' &&
        article.category?.slug === 'investimentos-e-patrimonio',
    )
    .slice(0, 2)
  return (
    <main id="main-content">
      <section className="grid bg-navy text-white lg:min-h-[620px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:py-24 lg:pl-[14%] lg:pr-[12%]">
          <Eyebrow light className="mb-7">
            Investir / visão de longo prazo
          </Eyebrow>
          <h1 className="font-display text-[55px] leading-[1.03] tracking-[-.03em] md:text-[70px]">
            O próximo imóvel.
            <br />
            <em className="text-champagne-light">O próximo horizonte.</em>
          </h1>
          <p className="mt-7 max-w-md text-[12px] leading-7 text-white/65">
            Patrimônio se constrói com perspectiva. Conectamos análise de mercado, contexto e seus
            objetivos para orientar decisões imobiliárias com mais clareza.
          </p>
          <ButtonLink href="/contato?objetivo=investir" variant="gold" className="mt-8 self-start">
            Converse sobre investimentos
          </ButtonLink>
        </div>
        <div className="relative min-h-[370px] overflow-hidden lg:min-h-[620px]">
          <div className="absolute inset-0" data-parallax>
            <MediaImage
              media={brand.investImage}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          <p className="absolute bottom-8 left-8 text-[9px] uppercase tracking-[.2em] text-white/80">
            Um olhar para as possibilidades da cidade.
          </p>
        </div>
      </section>
      <section className={`${container} py-20 md:py-24`}>
        <SectionHeading
          eyebrow="Estratégia antes da oportunidade"
          title={
            <>
              Investir com estratégia.
              <br />
              <em>Não apenas por impulso.</em>
            </>
          }
          description="Cada imóvel participa de uma estratégia diferente. O ponto de partida é entender qual papel ele deve ocupar no seu patrimônio."
        />
        <div className="grid gap-10 md:grid-cols-3">
          {[
            [
              '01',
              'Seu momento',
              'Objetivos, horizonte de tempo, necessidade de liquidez e tolerância ao risco. Antes do imóvel, entendemos o investidor.',
            ],
            [
              '02',
              'O contexto',
              'Localização, oferta, demanda, custos de manutenção e liquidez potencial. Uma análise que considera o conjunto.',
            ],
            [
              '03',
              'Uma escolha consciente',
              'Cenários, documentação e pontos de atenção apresentados com transparência, sem promessas de resultado.',
            ],
          ].map(([number, title, text]) => (
            <div className="reveal border-t border-line pt-6" key={number}>
              <span className="text-[10px] text-gold-dark">{number} /</span>
              <h3 className="mt-5 font-display text-3xl">{title}</h3>
              <p className="mt-4 text-[12px] leading-7 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-sand/60 py-20">
        <div className={container}>
          <SectionHeading
            eyebrow="Diferentes teses, diferentes caminhos"
            title={
              <>
                Onde você quer
                <br />
                <em>construir valor?</em>
              </>
            }
          />
          <div className="grid gap-x-14 md:grid-cols-2">
            {[
              [
                'Studios',
                'Unidades compactas, vida urbana e atenção à demanda local. Avaliamos localização, público e custos de operação.',
              ],
              [
                'Imóveis para geração de renda',
                'A renda locatícia começa com uma análise realista de vacância, despesas e gestão, não apenas do aluguel anunciado.',
              ],
              [
                'Investimentos patrimoniais',
                'Imóveis que podem compor uma estratégia de preservação e diversificação, respeitando seu horizonte de longo prazo.',
              ],
              [
                'Oportunidades imobiliárias',
                'Uma leitura criteriosa de preço, contexto e documentação. Oportunidade é adequação, não urgência.',
              ],
            ].map(([title, text], i) => (
              <Link
                href="/contato?objetivo=investir"
                key={title}
                className="reveal group border-t border-navy/15 py-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-[31px]">{title}</h3>
                  <Icon
                    name="diagonal"
                    className="size-4 text-gold-dark transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <p className="mt-4 max-w-md text-[11px] leading-7 text-muted">{text}</p>
                <span className="mt-5 block text-[8px] uppercase tracking-widest text-gold-dark">
                  Perspectiva 0{i + 1}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {selected.length > 0 && (
        <section className={`${container} py-20`}>
          <SectionHeading
            eyebrow="Referências para ampliar o olhar"
            title={
              <>
                Imóveis, diferentes
                <br />
                <em>possibilidades.</em>
              </>
            }
            description="Seleção ilustrativa de tipologias. Não representa recomendação de investimento ou oferta de venda."
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {selected.map((property) => (
              <PropertyCard property={property} key={property.id} />
            ))}
          </div>
        </section>
      )}
      {reading.length > 0 && (
        <section className={`${container} border-t border-line py-20`}>
          <SectionHeading
            eyebrow="Análises de mercado e patrimônio"
            title={
              <>
                Conhecimento também
                <br />
                <em>é patrimônio.</em>
              </>
            }
            link={{ href: '/conteudo', label: 'Leia nossos conteúdos imobiliários' }}
          />
          <div className="grid gap-10 md:grid-cols-2">
            {reading.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
      <div className={`${container} pb-14`}>
        <p className="border-l border-champagne pl-5 text-[10px] leading-6 text-muted">
          Conteúdo informativo. Valorização e rentabilidade não são garantidas. Imóveis envolvem
          riscos, despesas, tributação e possibilidade de vacância. Análises devem considerar seu
          perfil e, quando necessário, orientação jurídica, contábil e financeira independente.
        </p>
      </div>
      <ContactCTA
        eyebrow="Patrimônio com perspectiva"
        title={
          <>
            Vamos olhar para
            <br />
            <em>o seu próximo horizonte?</em>
          </>
        }
        text="Compartilhe seus objetivos. A partir deles, podemos conversar sobre critérios, cenários e possibilidades imobiliárias."
        href="/contato?objetivo=investir"
        label="Conversar sobre oportunidades"
      />
    </main>
  )
}
