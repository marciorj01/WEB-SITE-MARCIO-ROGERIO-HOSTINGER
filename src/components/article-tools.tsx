'use client'

import { useState } from 'react'
import { Icon } from './icons'

export function ArticleTools({ title, printable = false }: { title: string; printable?: boolean }) {
  const [feedback, setFeedback] = useState('')
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title, url: window.location.href })
      else {
        await navigator.clipboard.writeText(window.location.href)
        setFeedback('Link copiado.')
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      setFeedback('Copie o endereço desta página para compartilhar.')
    }
  }
  return (
    <div className="no-print flex flex-wrap items-center gap-4">
      <button
        onClick={share}
        className="flex min-h-10 items-center gap-2 border border-line px-3 text-[9px] transition-colors hover:border-navy"
      >
        <Icon name="share" className="size-3.5" />
        Compartilhar
      </button>
      {printable && (
        <button
          onClick={() => window.print()}
          className="flex min-h-10 items-center gap-2 border border-line px-3 text-[9px] transition-colors hover:border-navy"
        >
          <Icon name="print" className="size-3.5" />
          Imprimir / salvar PDF
        </button>
      )}
      <p role="status" className="text-[10px] text-gold-dark">
        {feedback}
      </p>
    </div>
  )
}
