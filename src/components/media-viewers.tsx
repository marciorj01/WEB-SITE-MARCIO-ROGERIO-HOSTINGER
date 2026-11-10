'use client'

import { useState } from 'react'
import { Icon } from './icons'

export function PropertyMediaActions({
  tour360Url,
  videoUrl,
  title,
}: {
  tour360Url?: string | null
  videoUrl?: string | null
  title?: string
}) {
  const [activeModal, setActiveModal] = useState<'tour' | 'video' | null>(null)

  if (!tour360Url && !videoUrl) return null

  // Converte link do YouTube para formato embed se necessário
  const getEmbedUrl = (url: string) => {
    if (!url) return ''
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/')
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${id}`
    }
    if (url.includes('vimeo.com/') && !url.includes('player.vimeo.com')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${id}`
    }
    return url
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {tour360Url && (
          <button
            onClick={() => setActiveModal('tour')}
            type="button"
            className="group inline-flex items-center gap-2.5 border border-champagne bg-champagne/15 px-5 py-3 text-[11px] font-semibold tracking-[.04em] text-navy transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-navy"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-navy text-[9px] font-bold text-white transition-colors group-hover:bg-navy-deep">
              360°
            </span>
            Tour Virtual 360°
            <Icon name="diagonal" className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}

        {videoUrl && (
          <button
            onClick={() => setActiveModal('video')}
            type="button"
            className="group inline-flex items-center gap-2.5 border border-navy/20 bg-white/70 px-5 py-3 text-[11px] font-semibold tracking-[.04em] text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white"
          >
            <span className="flex size-4 items-center justify-center text-gold-dark group-hover:text-champagne-light">
              ▶
            </span>
            Vídeo do Imóvel
          </button>
        )}
      </div>

      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/90 p-4 backdrop-blur-md sm:p-8"
        >
          <div className="relative flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-sm border border-white/15 bg-navy shadow-2xl">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-6 text-white">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[.2em] text-champagne-light">
                  {activeModal === 'tour' ? 'Experiência Imersiva' : 'Apresentação em Vídeo'}
                </span>
                <span className="h-3 w-px bg-white/20" />
                <span className="truncate text-xs font-medium text-white/85">{title}</span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Fechar visualização"
                className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                <Icon name="close" className="size-5" />
              </button>
            </div>

            <div className="relative flex-1 bg-black">
              {activeModal === 'tour' && tour360Url && (
                <iframe
                  src={tour360Url}
                  title={`Tour 360 - ${title}`}
                  className="h-full w-full border-0"
                  allow="fullscreen; vr; xr; xr-spatial-tracking; accelerometer; gyroscope"
                  allowFullScreen
                />
              )}

              {activeModal === 'video' && videoUrl && (
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title={`Vídeo - ${title}`}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
