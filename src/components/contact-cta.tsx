import { ButtonLink, Eyebrow, container } from './ui'

export function ContactCTA({
  eyebrow = 'Cada história tem um próximo capítulo',
  title = (
    <>
      O seu próximo passo
      <br />
      merece uma <em>boa conversa.</em>
    </>
  ),
  text = 'Conte o que você busca. Vamos olhar juntos para as possibilidades e encontrar o caminho que faz sentido para você.',
  href = '/contato',
  label = 'Vamos conversar',
}: {
  eyebrow?: string
  title?: React.ReactNode
  text?: string
  href?: string
  label?: string
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white md:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-9 font-display text-[520px] leading-none text-white/[.025]"
      >
        V
      </span>
      <div
        className={`${container} reveal relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-24`}
      >
        <div>
          <Eyebrow light className="mb-6">
            {eyebrow}
          </Eyebrow>
          <h2 className="font-display text-[43px] leading-[1.1] tracking-[-.02em] md:text-[57px] [&_em]:font-normal [&_em]:text-champagne-light">
            {title}
          </h2>
        </div>
        <div>
          <p className="max-w-sm text-[12px] leading-7 font-light text-white/65">{text}</p>
          <ButtonLink href={href} variant="gold" className="mt-7">
            {label}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
