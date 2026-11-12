import type { Metadata } from 'next'
import { getBrand } from '@/lib/content'
import { ContactForm } from '@/components/forms'
import { Breadcrumbs, Eyebrow, container } from '@/components/ui'
import { Icon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Contato | Uma boa conversa, novas perspectivas',
  description:
    'Conte seus planos. Solicite atendimento para comprar, investir, vender ou conhecer projetos selecionados.',
}
export default async function ContactPage() {
  const brand = await getBrand()
  return (
    <main id="main-content" className={`${container} pt-8 pb-20 md:pt-10 md:pb-24`}>
      <Breadcrumbs items={[{ label: 'Vamos conversar' }]} />
      <div className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div>
          <Eyebrow className="mb-7">Um encontro de perspectivas</Eyebrow>
          <h1 className="font-display text-[57px] leading-[1.03] tracking-[-.03em] md:text-[72px]">
            O seu próximo passo
            <br />
            começa com uma
            <br />
            <em className="text-gold-dark">boa conversa.</em>
          </h1>
          <p className="mt-7 max-w-sm text-[12px] leading-7 text-muted">
            Comprar, investir, vender ou simplesmente entender melhor suas possibilidades. Conte com
            uma escuta atenta ao que importa para você.
          </p>
          <div className="mt-10 space-y-6 border-t border-line pt-7">
            {brand.whatsapp ? (
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-sm"
              >
                <Icon name="whatsapp" className="size-5 text-gold-dark" />
                Conversar pelo WhatsApp
                <Icon name="diagonal" className="size-3" />
              </a>
            ) : (
              <div className="flex items-start gap-4">
                <Icon name="whatsapp" className="mt-1 size-5 shrink-0 text-gold-dark" />
                <div>
                  <p className="text-[11px] font-semibold">Atendimento personalizado</p>
                  <p className="mt-2 max-w-xs text-[10px] leading-6 text-muted">
                    O número oficial de WhatsApp ainda não foi informado. Por enquanto, registre seu
                    interesse pelo formulário ao lado.
                  </p>
                </div>
              </div>
            )}
            {brand.email && (
              <a href={`mailto:${brand.email}`} className="flex items-center gap-4 text-xs">
                <Icon name="mail" className="size-5 text-gold-dark" />
                {brand.email}
              </a>
            )}
            {brand.serviceLocation && (
              <p className="flex items-center gap-4 text-xs">
                <Icon name="pin" className="size-5 text-gold-dark" />
                {brand.serviceLocation}
              </p>
            )}
          </div>
        </div>
        <div className="bg-paper p-6 sm:p-9 lg:p-10">
          <h2 className="mb-2 font-display text-3xl">Vamos conhecer seus planos.</h2>
          <p className="mb-8 text-[10px] leading-6 text-muted">
            Preencha os dados abaixo para registrar sua solicitação.
          </p>
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
