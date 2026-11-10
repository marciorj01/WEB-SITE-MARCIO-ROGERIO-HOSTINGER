import Link from 'next/link'
import type { Brand } from '@/payload-types'
import { BrandMark } from './brand-mark'
import { Icon } from './icons'
import { container } from './ui'

export function Footer({ brand }: { brand: Brand }) {
  return (
    <footer className="border-t border-white/10 bg-navy-deep pt-16 pb-7 text-white/70">
      <div className={container}>
        <div className="grid gap-12 pb-14 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <BrandMark name={brand.name} tagline={brand.tagline} light />
            <p className="mt-6 max-w-[230px] text-[11px] leading-6 text-white/65">
              Pessoas, patrimônio e possibilidades.
              <br />
              Uma nova perspectiva sobre o seu próximo imóvel.
            </p>
          </div>
          <div>
            <p className="mb-5 text-[9px] uppercase tracking-[.2em] text-champagne-light">
              Seu próximo passo
            </p>
            <div className="flex flex-col items-start gap-3 text-[11px]">
              {[
                ['Comprar', '/comprar'],
                ['Investir', '/investir'],
                ['Empreendimentos', '/empreendimentos'],
                ['Vender meu imóvel', '/vender'],
              ].map(([label, href]) => (
                <Link
                  className="transition-colors hover:text-champagne-light"
                  key={href}
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5 text-[9px] uppercase tracking-[.2em] text-champagne-light">
              Conteúdo e perspectivas
            </p>
            <div className="flex flex-col items-start gap-3 text-[11px]">
              <Link href="/conteudo" className="hover:text-champagne-light">
                Revista & perspectivas
              </Link>
              <Link href="/conteudo#materiais" className="hover:text-champagne-light">
                Guias e materiais
              </Link>
              <Link href="/sobre" className="hover:text-champagne-light">
                A consultoria
              </Link>
              <Link href="/conteudo#newsletter" className="hover:text-champagne-light">
                Nossa newsletter
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-5 text-[9px] uppercase tracking-[.2em] text-champagne-light">
              Vamos conversar
            </p>
            <Link
              href="/contato"
              className="group flex items-center gap-4 font-display text-2xl text-white"
            >
              Seu objetivo, nossa conversa.
              <Icon name="diagonal" className="size-4 text-champagne" />
            </Link>
            {brand.email && (
              <a
                className="mt-4 block text-[11px] hover:text-champagne-light"
                href={`mailto:${brand.email}`}
              >
                {brand.email}
              </a>
            )}
            {brand.serviceLocation && <p className="mt-3 text-[10px]">{brand.serviceLocation}</p>}
            {brand.professionalRegistration && (
              <p className="mt-3 text-[10px]">{brand.professionalRegistration}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[9px] text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name || 'Marcio Rogério'}. Todos os direitos reservados.
          </p>
          <p>Curadoria. Conhecimento. Conexão.</p>
          <Link href="/privacidade" className="hover:text-white">
            Privacidade e proteção de dados
          </Link>
        </div>
        {brand.demoNotice && (
          <p className="mt-5 max-w-4xl text-[9px] leading-5 text-white/60">{brand.demoNotice}</p>
        )}
      </div>
    </footer>
  )
}

export function FloatingContact({ whatsapp }: { whatsapp?: string | null }) {
  return (
    <a
      data-contact-float
      href={
        whatsapp
          ? `https://wa.me/${whatsapp}?text=${encodeURIComponent('Olá! Gostaria de conversar sobre meus objetivos imobiliários.')}`
          : '/contato'
      }
      target={whatsapp ? '_blank' : undefined}
      rel={whatsapp ? 'noopener noreferrer' : undefined}
      aria-label={whatsapp ? 'Conversar no WhatsApp' : 'Solicitar atendimento personalizado'}
      className="group fixed right-5 bottom-5 z-30 flex size-12 items-center justify-center rounded-full border border-white/25 bg-navy text-champagne-light shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-navy-light sm:right-7 sm:bottom-7"
    >
      <Icon name="whatsapp" className="size-6" />
      <span className="pointer-events-none absolute right-15 hidden whitespace-nowrap rounded-sm bg-navy px-4 py-2 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        Uma boa conversa muda perspectivas.
      </span>
    </a>
  )
}
