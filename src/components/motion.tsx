'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Motion() {
  const path = usePathname()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px 30px 0px' },
    )
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el))
    document.documentElement.classList.add('motion-ready')
    let scheduled = false
    const animate = () => {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const parent = el.parentElement
        if (!parent) return
        const rect = parent.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        const offset = Math.max(-28, Math.min(28, rect.top * -0.055))
        el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.055)`
      })
      scheduled = false
    }
    const onScroll = () => {
      if (!scheduled) {
        scheduled = true
        requestAnimationFrame(animate)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    animate()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [path])
  return null
}
