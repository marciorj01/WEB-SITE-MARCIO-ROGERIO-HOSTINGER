import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findBySlug } from '@/lib/payload'
import { getDevelopments } from '@/lib/content'
import { stageLabels } from '@/components/cards'
import { Gallery } from '@/components/gallery'
import { Typologies } from '@/components/typologies'
import { ContactForm } from '@/components/forms'
import { PropertyMediaActions } from '@/components/media-viewers'
import { Icon } from '@/components/icons'
import {
  Breadcrumbs,
  ButtonLink,
  Eyebrow,
  MediaImage,
  ReferenceNotice,
  SectionHeading,
  container,
} from '@/components/ui'

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    return (await getDevelopments()).map((development) => ({ slug: development.slug }))
  } catch {
    return []
  }
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const development = await findBySlug('developments', (await params).slug)
  return {
    title: development
      ? `${development.title} | Empreendimentos | Marcio Rogério`
      : 'Projeto não encontrado | Marcio Rogério',
    description: development?.description,
  }
}
export default async function DevelopmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = await findBySlug('developments', (await params).slug)
  if (!project) notFound()
  return (
    <main id="main-content">
      <div className={`${container} py-7`}>
        <Breadcrumbs
          items={[{ label: 'Empreendimentos', href: '/empreendimentos' }, { label: project.title }]}
        />
      </div>
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-20" data-parallax>
          <MediaImage media={project.image} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/95 via-navy/35 to-navy/10" />
        <div className={`${container} py-14`}>
          <Eyebrow light className="mb-6">
            {stageLabels[project.launchStage || 'reference']}
          </Eyebrow>
          <h1 className="font-display text-[66px] leading-none tracking-[-.035em] md:text-[90px]">
            {project.title}
          </h1>
          <div className="mt-6 flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <p className="font-display text-3xl italic text-champagne-light">{project.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4">
              <PropertyMediaActions
                tour360Url={(project as any).tour360Url}
                videoUrl={(project as any).videoUrl}
                title={project.title}
              />
              <ButtonLink href="#informacoes" variant="gold">
                Solicitar informações
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className={`${container} py-16 md:py-20`}>
        {project.referenceOnly && (
          <div className="mb-12">
            <ReferenceNotice project />
          </div>
        )}
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.2fr] lg:gap-24">
          <div>
            <Eyebrow className="mb-6">O conceito</Eyebrow>
            <h2 className="font-display text-[46px] leading-tight">
              Uma nova relação
              <br />
              <em>com o espaço.</em>
            </h2>
          </div>
          <div>
            <p className="text-[14px] leading-8 text-muted">{project.description}</p>
            {project.architecture && (
              <p className="mt-5 text-[12px] leading-8 text-muted">{project.architecture}</p>
            )}
            <div className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
              {(project.features ?? []).map((item) => (
                <p key={item.id} className="flex items-start gap-3 text-[11px] leading-6">
                  <Icon name="check" className="mt-1 size-3.5 shrink-0 text-gold-dark" />
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      {(project.gallery ?? []).length > 0 && (
        <section className={`${container} pb-20`}>
          <SectionHeading
            eyebrow="Arquitetura em imagens"
            title={
              <>
                Explore cada
                <br />
                <em>perspectiva.</em>
              </>
            }
          />
          <Gallery
            title={project.title}
            images={[
              { image: project.image, caption: project.subtitle },
              ...(project.gallery ?? []),
            ]}
          />
        </section>
      )}
      <section className="border-y border-line bg-paper py-20">
        <div className={container}>
          <SectionHeading
            eyebrow="Tipologias e plantas"
            title={
              <>
                O espaço que faz
                <br />
                <em>sentido para você.</em>
              </>
            }
          />
          <Typologies items={project.typologies} />
        </div>
      </section>
      <section className={`${container} grid gap-10 py-20 md:grid-cols-2 md:gap-20`}>
        <div>
          <Eyebrow className="mb-6">Localização e contexto</Eyebrow>
          <h2 className="font-display text-[43px] leading-tight">
            O entorno também
            <br />
            <em>faz parte do projeto.</em>
          </h2>
        </div>
        <div>
          <p className="flex items-center gap-3 text-sm">
            <Icon name="pin" className="size-5 text-gold-dark" />
            {project.location || 'Localização a confirmar'}
          </p>
          <p className="mt-5 text-xs leading-7 text-muted">
            {project.referenceOnly
              ? 'A localização deste projeto é uma referência conceitual. Ao cadastrar um empreendimento real, a equipe poderá apresentar o endereço, a infraestrutura do bairro e os serviços do entorno com informações verificadas.'
              : 'Conheça o endereço, a mobilidade e os serviços do bairro em uma apresentação personalizada com nossa equipe.'}
          </p>
          {!project.referenceOnly && project.location && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
              className="mt-5 inline-flex items-center gap-4 border-b border-line py-2 text-[11px]"
            >
              Explorar localização
              <Icon name="diagonal" className="size-3.5" />
            </a>
          )}
        </div>
      </section>
      <section id="informacoes" className="bg-sand/60 py-20">
        <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24`}>
          <div>
            <Eyebrow className="mb-6">Vamos apresentar as possibilidades</Eyebrow>
            <h2 className="font-display text-[46px] leading-tight">
              Uma conversa sobre
              <br />
              <em>o seu novo horizonte.</em>
            </h2>
            <p className="mt-6 max-w-sm text-xs leading-7 text-muted">
              Registre seu interesse na proposta de {project.title}. A equipe poderá conversar sobre
              projetos reais, características e disponibilidade.
            </p>
          </div>
          <ContactForm
            intent="development"
            development={project.id}
            label="Quero conhecer projetos com este perfil"
          />
        </div>
      </section>
    </main>
  )
}
