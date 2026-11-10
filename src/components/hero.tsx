'use client'

import { useState } from 'react'
import type { Brand } from '@/payload-types'
import { ButtonLink, Eyebrow, MediaImage, container } from './ui'
import { Icon } from './icons'

type VideoSource = { kind: 'file'; url: string } | { kind: 'youtube'; url: string }

function getMediaUrl(media: unknown, fallbackUrl?: string | null): string | null {
  if (fallbackUrl) return fallbackUrl
  if (media && typeof media === 'object' && 'url' in media && typeof (media as { url: string }).url === 'string') {
    return (media as { url: string }).url
  }
  return null
}

function getVideoSource(media: unknown, fallbackUrl?: string | null): VideoSource | null {
  const url = getMediaUrl(media, fallbackUrl)
  if (!url) return null

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase()
    let videoId: string | null = null

    if (host === 'youtu.be') {
      videoId = parsed.pathname.split('/').filter(Boolean)[0] ?? null
    } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      videoId =
        parsed.searchParams.get('v') ??
        parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ??
        null
    }

    if (videoId && /^[\w-]{11}$/.test(videoId)) {
      const embed = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`)
      embed.search = new URLSearchParams({
        autoplay: '1',
        controls: '0',
        loop: '1',
        modestbranding: '1',
        mute: '1',
        playlist: videoId,
        playsinline: '1',
        rel: '0',
      }).toString()
      return { kind: 'youtube', url: embed.toString() }
    }
  } catch {
    // Keep the original source for direct MP4/WebM URLs that lack a full origin.
  }

  return { kind: 'file', url }
}

function YouTubeBackground({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      src={src}
      title={title}
      aria-hidden="true"
      tabIndex={-1}
      allow="autoplay; encrypted-media; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
    />
  )
}

export function HomeHero({
  slides,
  video,
  videoUrl,
}: {
  slides?: Brand['heroSlides'] | any
  video?: any
  videoUrl?: string | null
}) {
  const [active, setActive] = useState(0)
  const items = slides ?? []
  const mainVideo = getVideoSource(video, videoUrl)

  return (
    <section
      className="relative isolate min-h-[670px] overflow-hidden bg-navy-deep text-white lg:h-[min(690px,calc(100svh-88px))] lg:min-h-[640px] lg:max-h-[820px]"
      aria-label="Marcio Rogério — novas perspectivas"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden" data-parallax>
        {mainVideo ? (
          mainVideo.kind === 'youtube' ? (
            <YouTubeBackground src={mainVideo.url} title="Vídeo principal do banner" />
          ) : (
            <video
              src={mainVideo.url}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          )
        ) : items.length ? (
          items.map((slide: any, i: number) => {
            const isVideo =
              slide.mediaType === 'video' ||
              Boolean(slide.videoUrl) ||
              Boolean(slide.video && typeof slide.video === 'object')
            const slideVideo = isVideo ? getVideoSource(slide.video, slide.videoUrl) : null

            return (
              <div
                key={slide.id || i}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition-opacity duration-[1400ms] ${i === active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              >
                {isVideo && slideVideo?.kind === 'youtube' ? (
                  <YouTubeBackground
                    src={slideVideo.url}
                    title={slide.caption || `Vídeo do banner ${i + 1}`}
                  />
                ) : isVideo && slideVideo ? (
                  <video
                    src={slideVideo.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <MediaImage
                    media={slide.image}
                    priority={i === 0}
                    sizes="100vw"
                    className="object-[60%_center] lg:object-center"
                  />
                )}
              </div>
            )
          })
        ) : (
          <div className="h-full bg-navy" />
        )}
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,28,42,.88)_0%,rgba(10,28,42,.68)_32%,rgba(10,28,42,.15)_72%,rgba(10,28,42,.06)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-navy/30 bg-gradient-to-t from-navy-deep/75 via-transparent to-navy-deep/10 lg:bg-transparent" />

      <div
        className={`${container} flex min-h-[670px] flex-col justify-center pt-16 pb-36 lg:h-full lg:min-h-0 lg:pt-5 lg:pb-20`}
      >
        <div className="hero-entrance max-w-[850px]">
          <Eyebrow light className="mb-8">
            Imóveis singulares. Escolhas conscientes.
          </Eyebrow>
          <h1 className="font-display text-[54px] leading-[1.02] font-normal tracking-[-.03em] sm:text-[70px] lg:text-[82px] xl:text-[90px]">
            Mais do que imóveis.
            <br />
            <em className="font-normal text-champagne-light">Novas perspectivas.</em>
          </h1>
          <p className="mt-7 max-w-[380px] text-[12px] leading-[1.9] font-light text-white/80 sm:text-[13px]">
            Curadoria, conhecimento e um olhar atento ao que importa.
            <br className="hidden sm:block" /> Conectamos o seu momento ao imóvel certo.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/comprar" variant="gold">
              Explore nossa curadoria
            </ButtonLink>
            <ButtonLink href="/sobre" variant="light" arrow={false}>
              Conheça a consultoria
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        className={`${container} absolute right-0 bottom-0 left-0 flex items-end justify-between gap-6 pb-9 sm:pb-10`}
      >
        <a
          href="#curadoria"
          className="group flex items-center gap-4 text-[9px] uppercase tracking-[.18em] text-white/75"
        >
          <span className="flex h-10 w-6 items-center justify-center rounded-full border border-white/40">
            <span className="h-2 w-px bg-champagne-light transition-transform group-hover:translate-y-1" />
          </span>
          Novos caminhos, logo abaixo
        </a>

        {!mainVideo && items.length > 0 && (
          <div className="hidden items-center gap-5 md:flex">
            <span
              className="mr-6 text-right text-[9px] leading-5 tracking-[.07em] text-white/70"
              aria-live="polite"
            >
              {items[active]?.caption || 'Arquitetura que transforma o viver.'}
              <br />
              <span className="text-[8px] uppercase tracking-[.17em] text-champagne-light">
                {items[active]?.mediaType === 'video' ? 'Vídeo do empreendimento' : 'Fotografia de referência'}
              </span>
            </span>
            <span className="text-[10px]">0{active + 1}</span>
            <span className="h-px w-20 bg-white/25">
              <span
                className={`block h-px bg-champagne-light transition-all ${active === 0 ? 'w-1/3' : active === 1 ? 'w-2/3' : 'w-full'}`}
              />
            </span>
            <span className="text-[10px] text-white/50">0{items.length || 1}</span>
          </div>
        )}

        {!mainVideo && items.length > 1 && (
          <div className="flex gap-2">
            <button
              aria-label="Slide anterior"
              className="flex size-10 items-center justify-center rounded-full border border-white/35 transition-colors hover:bg-white/15"
              onClick={() => setActive((active - 1 + items.length) % items.length)}
            >
              <Icon name="left" className="size-4" />
            </button>
            <button
              aria-label="Próximo slide"
              className="flex size-10 items-center justify-center rounded-full border border-white/35 transition-colors hover:bg-white/15"
              onClick={() => setActive((active + 1) % items.length)}
            >
              <Icon name="arrow" className="size-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
