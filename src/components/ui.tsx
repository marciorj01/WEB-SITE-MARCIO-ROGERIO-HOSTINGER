import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import type { Media } from '@/payload-types'
import { Icon } from './icons'

export const container = 'mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[7%]'

export function Eyebrow({
  children,
  light = false,
  className = '',
}: {
  children: ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.22em] ${light ? 'text-champagne-light' : 'text-gold-dark'} ${className}`}
    >
      <span className="h-px w-7 shrink-0 bg-current opacity-70" />
      {children}
    </p>
  )
}

export function ButtonLink({
  children,
  href,
  variant = 'navy',
  className = '',
  arrow = true,
}: {
  children: ReactNode
  href: string
  variant?: 'navy' | 'gold' | 'outline' | 'light' | 'white'
  className?: string
  arrow?: boolean
}) {
  const variants = {
    navy: 'border-navy bg-navy text-white hover:border-navy-light hover:bg-navy-light',
    gold: 'border-champagne bg-champagne text-navy hover:border-champagne-light hover:bg-champagne-light',
    outline:
      'border-navy/25 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white',
    light: 'border-white/40 text-white hover:border-white hover:bg-white/10',
    white: 'border-ivory bg-ivory text-navy hover:bg-white',
  }
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-7 border px-6 py-3.5 text-[11px] font-semibold tracking-[.025em] transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <Icon
          name="arrow"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Link>
  )
}

export function TextLink({
  children,
  href,
  light = false,
  className = '',
}: {
  children: ReactNode
  href: string
  light?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-7 border-b pb-1 text-[11px] font-semibold transition-colors ${light ? 'border-white/30 text-white hover:border-champagne hover:text-champagne-light' : 'border-navy/30 text-navy hover:border-gold-dark hover:text-gold-dark'} ${className}`}
    >
      {children}
      <Icon
        name="diagonal"
        className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  )
}

export function MediaImage({
  media,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  alt,
}: {
  media?: Media | string | number | null
  className?: string
  priority?: boolean
  sizes?: string
  alt?: string
}) {
  if (!media || typeof media !== 'object' || !media.url)
    return (
      <div
        role="img"
        aria-label={alt || 'Fotografia em preparação'}
        className={`absolute inset-0 flex items-center justify-center bg-stone-200 ${className}`}
      >
        <span className="font-display text-4xl text-navy/30">MR</span>
      </div>
    )
  return (
    <Image
      src={media.url}
      alt={alt ?? media.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  light = false,
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  link?: { href: string; label: string }
  light?: boolean
}) {
  return (
    <div className="reveal mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
      <div>
        <Eyebrow light={light} className="mb-5">
          {eyebrow}
        </Eyebrow>
        <h2
          className={`font-display text-[42px] leading-[1.08] tracking-[-.025em] md:text-[52px] ${light ? 'text-white' : 'text-navy'}`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-4 max-w-lg text-[13px] leading-7 ${light ? 'text-white/65' : 'text-muted'}`}
          >
            {description}
          </p>
        )}
      </div>
      {link && (
        <TextLink light={light} href={link.href} className="self-start md:self-auto">
          {link.label}
        </TextLink>
      )}
    </div>
  )
}

export function EmptyState({
  title = 'Uma nova seleção está sendo preparada.',
  text = 'Converse com nossa consultoria para encontrar referências alinhadas ao seu momento.',
  linkLabel = 'Solicitar atendimento',
}: {
  title?: string
  text?: string
  linkLabel?: string
}) {
  return (
    <div className="border-y border-line py-16 text-center">
      <h3 className="font-display text-3xl">{title}</h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted">{text}</p>
      <TextLink href="/contato" className="mt-5">
        {linkLabel}
      </TextLink>
    </div>
  )
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav
      aria-label="Caminho de navegação"
      className="flex flex-wrap items-center gap-3 text-[10px] text-muted"
    >
      <Link className="transition-colors hover:text-gold-dark" href="/">
        Início
      </Link>
      {items.map((item, i) => (
        <span className="flex items-center gap-3" key={i}>
          <span className="text-champagne">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-navy">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export function ReferenceNotice({ project = false }: { project?: boolean }) {
  return (
    <div className="flex items-start gap-3 border-l-2 border-champagne bg-sand/70 px-5 py-4 text-[11px] leading-6 text-muted">
      <Icon name="compass" className="mt-1 size-4 shrink-0 text-gold-dark" />
      <p>
        {project ? 'Projeto conceitual de demonstração.' : 'Imóvel ilustrativo de curadoria.'}{' '}
        Fotografias, localização e características são referências editáveis, não uma oferta
        comercial. Consulte a equipe sobre opções reais.
      </p>
    </div>
  )
}
