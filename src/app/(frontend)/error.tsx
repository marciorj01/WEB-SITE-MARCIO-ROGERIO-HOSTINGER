'use client'

import { ButtonLink, Eyebrow, container } from '@/components/ui'
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      id="main-content"
      className={`${container} flex min-h-[65vh] flex-col items-center justify-center py-20 text-center`}
    >
      <Eyebrow>Uma breve pausa</Eyebrow>
      <h1 className="mt-6 font-display text-5xl">
        Vamos retomar
        <br />
        <em>essa perspectiva.</em>
      </h1>
      <p className="mt-6 max-w-sm text-xs leading-7 text-muted">
        Não foi possível carregar esta página agora. Seus dados não foram enviados novamente.
      </p>
      <div className="mt-8 flex gap-4">
        <button onClick={reset} className="border border-navy bg-navy px-6 py-3 text-xs text-white">
          Tentar novamente
        </button>
        <ButtonLink href="/" variant="outline" arrow={false}>
          Voltar ao início
        </ButtonLink>
      </div>
    </main>
  )
}
