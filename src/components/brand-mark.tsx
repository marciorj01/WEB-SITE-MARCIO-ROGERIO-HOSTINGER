import Image from 'next/image'
import Link from 'next/link'

export function BrandMark({
  name = 'Marcio Rogério',
  tagline = 'Corretor de Imóveis',
  light = false,
  compact = false,
}: {
  name?: string | null
  tagline?: string | null
  light?: boolean
  compact?: boolean
}) {
  const displayName = name || 'Marcio Rogério'
  const displayTagline = tagline || 'Corretor de Imóveis'

  return (
    <Link
      href="/"
      aria-label={`${displayName} — início`}
      className={`inline-flex shrink-0 items-center gap-3.5 ${light ? 'text-ivory' : 'text-navy'}`}
    >
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
        <Image
          src="/logo-mr.png"
          alt="MR Monograma"
          width={44}
          height={44}
          className={`h-full w-auto object-contain ${light ? 'brightness-0 invert opacity-95' : 'opacity-90'}`}
          priority
        />
      </div>
      <span>
        <span className="block text-[20px] leading-none font-medium uppercase tracking-[.18em]">
          {displayName}
        </span>
        {!compact && (
          <span
            className={`mt-2 block text-[7px] uppercase tracking-[.24em] ${light ? 'text-champagne-light' : 'text-muted'}`}
          >
            {displayTagline}
          </span>
        )}
      </span>
    </Link>
  )
}
