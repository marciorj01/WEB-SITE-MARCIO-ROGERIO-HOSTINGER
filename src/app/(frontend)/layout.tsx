import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { BodyCustomCode, renderHeadCustomCode } from '@/lib/make-custom-code'
import { makeSiteSettings, sanitizeHtmlAttribute } from '@/lib/make-site-settings'
import './styles.css'
import { getBrand } from '@/lib/content'
import { Header } from '@/components/header'
import { Footer, FloatingContact } from '@/components/footer'
import { Motion } from '@/components/motion'

const defaultTitle = 'Marcio Rogério | Corretor de Imóveis | CRECI F-59.138-F'
const title = makeSiteSettings.title ?? defaultTitle
const description =
  makeSiteSettings.description ??
  'Consultoria imobiliária de alto padrão, curadoria exclusiva e inteligência de mercado. Uma nova perspectiva para comprar, investir ou vender seu imóvel.'
const favicon = makeSiteSettings.icons?.icon ?? '/logo-mr.png'
const socialImage = makeSiteSettings.openGraph?.image
const googleAnalyticsId = sanitizeHtmlAttribute(makeSiteSettings.analytics?.googleAnalyticsId)

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.marciorjcorretor.com.br'),
  title,
  description,
  robots: makeSiteSettings.robots?.index === false ? { follow: false, index: false } : undefined,
  icons: favicon ? { icon: favicon } : undefined,
  openGraph: {
    title,
    description,
    images: socialImage ? [socialImage] : undefined,
  },
  twitter: socialImage
    ? {
        card: 'summary_large_image',
        images: [socialImage],
      }
    : undefined,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const language = sanitizeHtmlAttribute(makeSiteSettings.language) || 'pt-BR'
  const addBypassLinks = makeSiteSettings.accessibility?.addBypassLinks === true
  const customScripts = makeSiteSettings.customScripts
  const brand = await getBrand()

  return (
    <html lang={language}>
      <head>
        <link
          rel="preload"
          href="/fonts/cormorant-normal-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-normal-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {renderHeadCustomCode(customScripts?.headStart, 'head-start')}
        {renderHeadCustomCode(customScripts?.headEnd, 'head-end')}
      </head>
      <body className="min-h-screen bg-ivory text-navy antialiased">
        <BodyCustomCode html={customScripts?.bodyStart} />
        <a className="figma-bypass-link" href="#main-content">
          Pular para o conteúdo
        </a>
        {addBypassLinks && (
          <a className="figma-bypass-link" href="#root">
            Skip to content
          </a>
        )}
        <div id="root" tabIndex={-1}>
          <Header name={brand.name} tagline={brand.tagline} />
          {children}
          <Footer brand={brand} />
          <FloatingContact whatsapp={brand.whatsapp} />
          <Motion />
        </div>
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="figma-google-analytics" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(googleAnalyticsId)});
`}
            </Script>
          </>
        )}
        <BodyCustomCode html={customScripts?.bodyEnd} />
      </body>
    </html>
  )
}
