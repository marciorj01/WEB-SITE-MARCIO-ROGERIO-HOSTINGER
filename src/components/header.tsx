'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { BrandMark } from './brand-mark'
import { Icon } from './icons'

export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/comprar', label: 'Comprar' },
  { href: '/investir', label: 'Investir' },
  { href: '/empreendimentos', label: 'Empreendimentos' },
  { href: '/vender', label: 'Vender' },
  { href: '/conteudo', label: 'Conteúdo' },
  { href: '/sobre', label: 'Sobre' },
]

export function Header({ name, tagline }: { name?: string | null; tagline?: string | null }) {
  const path = usePathname()
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    dialog.current?.close()
  }, [path])
  useEffect(() => {
    const element = dialog.current
    const unlock = () => {
      document.body.style.overflow = ''
    }
    element?.addEventListener('close', unlock)
    return () => {
      element?.removeEventListener('close', unlock)
      unlock()
    }
  }, [])
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-navy/8 bg-ivory/97 backdrop-blur-xl">
        <div className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between gap-8 px-6 sm:px-10 lg:px-[5%]">
          <BrandMark name={name} tagline={tagline} />
          <nav
            aria-label="Navegação principal"
            className="hidden h-full items-center gap-6 xl:gap-8 lg:flex"
          >
            {navigation.map((item) => {
              const isActive = item.href === '/' ? path === '/' : path.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex h-full items-center text-[11px] font-medium transition-colors after:absolute after:right-0 after:bottom-[24px] after:left-0 after:h-px after:origin-left after:bg-champagne after:transition-transform hover:text-gold-dark ${isActive ? 'text-gold-dark after:scale-x-100' : 'text-navy after:scale-x-0 hover:after:scale-x-100'}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <Link
            href="/contato"
            className="group hidden min-h-10 items-center gap-3 border border-navy/25 px-4 py-2.5 text-[10px] font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white sm:inline-flex"
          >
            <Icon name="whatsapp" className="size-4" />
            Vamos conversar
            <Icon name="diagonal" className="ml-2 size-3" />
          </Link>
          <button
            aria-label="Abrir menu"
            onClick={() => {
              dialog.current?.showModal()
              document.body.style.overflow = 'hidden'
            }}
            className="-mr-2 flex size-11 items-center justify-center text-navy lg:hidden"
          >
            <Icon name="menu" className="size-6" />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        aria-label="Navegação"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-ivory p-6 text-navy backdrop:bg-navy/70 sm:ml-auto sm:max-w-lg sm:p-10"
      >
        <div className="flex items-center justify-between">
          <BrandMark name={name} tagline={tagline} />
          <button
            autoFocus
            aria-label="Fechar menu"
            className="flex size-11 items-center justify-center"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" className="size-6" />
          </button>
        </div>
        <p className="mt-14 text-[9px] uppercase tracking-[.25em] text-gold-dark">
          Novas perspectivas, boas escolhas.
        </p>
        <nav aria-label="Navegação mobile" className="mt-7">
          {navigation.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => dialog.current?.close()}
              className="flex items-center justify-between border-b border-line py-3 font-display text-[35px]"
            >
              <span>
                <span className="mr-5 font-sans text-[9px] text-gold-dark">0{i + 1}</span>
                {item.label}
              </span>
              <Icon name="diagonal" className="size-4" />
            </Link>
          ))}
        </nav>
        <Link
          href="/contato"
          onClick={() => dialog.current?.close()}
          className="mt-9 flex items-center justify-between bg-navy px-6 py-5 text-xs text-white"
        >
          Converse sobre seus objetivos
          <Icon name="arrow" className="size-4" />
        </Link>
      </dialog>
    </>
  )
}
