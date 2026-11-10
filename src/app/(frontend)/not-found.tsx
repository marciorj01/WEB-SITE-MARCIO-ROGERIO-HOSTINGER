import { ButtonLink, Eyebrow, container } from '@/components/ui'

export default function NotFound() {
  return (
    <main
      id="main-content"
      className={`${container} flex min-h-[65vh] flex-col items-center justify-center py-20 text-center`}
    >
      <Eyebrow>404 / Um novo caminho</Eyebrow>
      <h1 className="mt-7 font-display text-5xl leading-tight md:text-7xl">
        Esta perspectiva
        <br />
        <em>ainda não está aqui.</em>
      </h1>
      <p className="mt-6 max-w-sm text-xs leading-7 text-muted">
        A página pode ter mudado, ou esta seleção não está mais publicada. Que tal descobrir outro
        caminho?
      </p>
      <ButtonLink href="/" className="mt-8">
        Voltar ao início
      </ButtonLink>
    </main>
  )
}
