'use client'

import { useEffect, useRef, useState } from 'react'
import type { Media } from '@/payload-types'
import { MediaImage } from './ui'
import { Icon } from './icons'

export type GalleryItem = { image: string | number | Media; caption?: string | null; id?: string | null }
export function Gallery({ images, title }: { images: GalleryItem[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    const keys = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setActive((value) => (value + 1) % images.length)
      if (event.key === 'ArrowLeft')
        setActive((value) => (value - 1 + images.length) % images.length)
    }
    const close = () => {
      document.body.style.overflow = ''
    }
    element.addEventListener('keydown', keys)
    element.addEventListener('close', close)
    return () => {
      element.removeEventListener('keydown', keys)
      element.removeEventListener('close', close)
      close()
    }
  }, [images.length])
  if (!images.length) return null
  const open = (index: number) => {
    setActive(index)
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((item, index) => (
          <button
            key={item.id || index}
            onClick={() => open(index)}
            aria-label={`Ampliar imagem ${index + 1} de ${title}`}
            className={`group relative overflow-hidden ${index === 0 ? 'col-span-2 aspect-[1.6] md:row-span-2 md:aspect-auto' : 'aspect-[1.35]'}`}
          >
            <MediaImage
              media={item.image}
              className="transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute right-4 bottom-4 flex size-8 items-center justify-center rounded-full border border-white/60 bg-navy/20 text-white">
              <Icon name="plus" className="size-4" />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-label={`Galeria de ${title}`}
        className="fixed inset-0 m-auto h-[90dvh] max-h-[100dvh] w-[96vw] max-w-[1400px] overflow-hidden bg-navy-deep p-4 text-white md:p-8"
      >
        <div className="flex items-center justify-between pb-4">
          <p className="text-[10px] uppercase tracking-widest">
            {title} · {active + 1} / {images.length}
          </p>
          <button
            autoFocus
            aria-label="Fechar galeria"
            className="flex size-10 items-center justify-center"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="relative h-[calc(100%_-_110px)] min-h-[200px]">
          <MediaImage media={images[active]?.image} sizes="95vw" className="object-contain" />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[10px] text-white/70">
            {images[active]?.caption || 'Fotografia de referência.'}
          </p>
          <div className="flex gap-3">
            <button
              aria-label="Imagem anterior"
              onClick={() => setActive((active - 1 + images.length) % images.length)}
              className="flex size-10 items-center justify-center border border-white/40"
            >
              <Icon name="left" className="size-4" />
            </button>
            <button
              aria-label="Próxima imagem"
              onClick={() => setActive((active + 1) % images.length)}
              className="flex size-10 items-center justify-center border border-white/40"
            >
              <Icon name="arrow" className="size-4" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
