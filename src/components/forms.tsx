'use client'

import Link from 'next/link'
import { useActionState, useEffect, useId, useRef, useState, type FormEvent } from 'react'
import type { Lead } from '@/payload-types'
import { subscribeNewsletter, submitContact } from '@/app/(frontend)/actions'
import { initialFormState } from '@/lib/form-state'
import { Icon } from './icons'
import { Eyebrow, container } from './ui'

const inputClass =
  'w-full border-0 border-b border-navy/45 bg-transparent px-0 py-3.5 text-[12px] text-navy outline-none transition-colors focus:border-gold-dark focus:outline-none'
const labelClass = 'block text-[10px] font-medium tracking-wide text-navy'

// Success replaces the form; an action returning validation errors must not reset its values.
const preserveFormValues = (event: FormEvent<HTMLFormElement>) => event.preventDefault()

export function ContactForm({
  intent: initialIntent = 'contact',
  property,
  development,
  label = 'Solicitar atendimento',
}: {
  intent?: Lead['intent']
  property?: string | number
  development?: string | number
  label?: string
}) {
  const [state, action, pending] = useActionState(submitContact, initialFormState)
  const [intent, setIntent] = useState(initialIntent)
  const [propertyType, setPropertyType] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const id = useId()
  useEffect(() => {
    if (initialIntent !== 'contact') return
    const goal = new URLSearchParams(window.location.search).get('objetivo')
    const map: Record<string, Lead['intent']> = {
      comprar: 'buy',
      investir: 'invest',
      vender: 'sell',
      empreendimento: 'development',
    }
    if (goal && map[goal]) setIntent(map[goal])
  }, [initialIntent])
  useEffect(() => {
    if (state.errors) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  }, [state.errors])
  const error = (field: string) =>
    state.errors?.[field] ? (
      <p id={`${id}-${field}-error`} className="mt-2 text-[10px] text-red-700" role="alert">
        {state.errors[field]}
      </p>
    ) : null
  const fieldProps = (field: string) => ({
    'aria-invalid': !!state.errors?.[field],
    'aria-describedby': state.errors?.[field] ? `${id}-${field}-error` : undefined,
    ...(!['consent', 'intent', 'propertyType'].includes(field)
      ? { defaultValue: state.values?.[field] }
      : {}),
  })
  if (state.success)
    return (
      <div
        role="status"
        className="flex min-h-[380px] flex-col items-start justify-center border-t border-champagne py-10"
      >
        <span className="mb-7 flex size-12 items-center justify-center rounded-full border border-champagne text-gold-dark">
          <Icon name="check" className="size-6" />
        </span>
        <h3 className="font-display text-4xl">Toda boa escolha começa assim.</h3>
        <p className="mt-5 max-w-lg text-sm leading-7 text-muted">{state.message}</p>
        <Link className="mt-7 border-b border-navy/30 pb-2 text-xs" href="/comprar">
          Voltar à curadoria
        </Link>
      </div>
    )
  return (
    <form
      action={action}
      onReset={preserveFormValues}
      ref={formRef}
      className="grid gap-x-7 gap-y-6 sm:grid-cols-2"
      aria-label="Solicitação de atendimento"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" autoComplete="off" tabIndex={-1} />
      </div>
      <input type="hidden" name="intent" value={intent} />
      {property && <input type="hidden" name="property" value={property} />}
      {development && <input type="hidden" name="development" value={development} />}
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`${id}-name`}>
          Seu nome *
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          placeholder="Como podemos chamar você?"
          className={inputClass}
          required
          minLength={2}
          maxLength={100}
          {...fieldProps('name')}
        />
        {error('name')}
      </div>
      <div>
        <label className={labelClass} htmlFor={`${id}-whatsapp`}>
          WhatsApp com DDD *
        </label>
        <input
          id={`${id}-whatsapp`}
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          className={inputClass}
          required
          maxLength={24}
          {...fieldProps('whatsapp')}
        />
        {error('whatsapp')}
      </div>
      <div>
        <label className={labelClass} htmlFor={`${id}-email`}>
          E-mail *
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          className={inputClass}
          required
          maxLength={180}
          {...fieldProps('email')}
        />
        {error('email')}
      </div>
      {initialIntent === 'contact' && (
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor={`${id}-goal`}>
            Sobre o que vamos conversar? *
          </label>
          <select
            id={`${id}-goal`}
            value={intent}
            onChange={(event) => setIntent(event.target.value as Lead['intent'])}
            className={inputClass}
            {...fieldProps('intent')}
          >
            <option value="contact">Atendimento personalizado</option>
            <option value="buy">Quero comprar um imóvel</option>
            <option value="invest">Quero investir</option>
            <option value="sell">Quero vender meu imóvel</option>
            <option value="development">Quero conhecer um empreendimento</option>
          </select>
          {error('intent')}
        </div>
      )}
      {(intent === 'sell' || intent === 'buy') && (
        <>
          <div>
            <label className={labelClass} htmlFor={`${id}-type`}>
              Tipo de imóvel {intent === 'sell' ? '*' : ''}
            </label>
            <select
              id={`${id}-type`}
              name="propertyType"
              className={inputClass}
              required={intent === 'sell'}
              value={propertyType}
              onChange={(event) => setPropertyType(event.target.value)}
              {...fieldProps('propertyType')}
            >
              <option value="" disabled>
                Selecione o tipo
              </option>
              {['Casa', 'Apartamento', 'Studio', 'Cobertura', 'Terreno', 'Outro'].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            {error('propertyType')}
          </div>
          <div>
            <label className={labelClass} htmlFor={`${id}-location`}>
              Cidade e bairro {intent === 'sell' ? '*' : ''}
            </label>
            <input
              id={`${id}-location`}
              name="location"
              className={inputClass}
              placeholder="Onde está o imóvel?"
              maxLength={160}
              required={intent === 'sell'}
              {...fieldProps('location')}
            />
            {error('location')}
          </div>
        </>
      )}
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`${id}-message`}>
          {intent === 'sell'
            ? 'Conte um pouco sobre seu imóvel'
            : 'Conte um pouco sobre o seu momento'}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          className={`${inputClass} min-h-24 resize-y`}
          placeholder="Seus objetivos, preferências ou informações adicionais."
          rows={3}
          maxLength={3000}
          {...fieldProps('message')}
        />
        {error('message')}
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[10px] leading-5 text-muted">
          <input
            name="consent"
            type="checkbox"
            defaultChecked={state.values?.consent === 'on'}
            required
            className="mt-1 size-3.5 shrink-0 accent-navy"
            {...fieldProps('consent')}
          />
          <span>
            Autorizo o contato sobre minha solicitação e li a{' '}
            <Link
              href="/privacidade"
              target="_blank"
              className="text-navy underline underline-offset-2"
            >
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        {error('consent')}
      </div>
      {state.message && (
        <p
          role="alert"
          className="border-l border-red-400 px-4 text-xs leading-6 text-red-700 sm:col-span-2"
        >
          {state.message}
          {state.errors?.form ? ` ${state.errors.form}` : ''}
        </p>
      )}
      <button
        disabled={pending}
        type="submit"
        className="group flex min-h-13 items-center justify-between gap-6 border border-navy bg-navy px-6 py-4 text-[11px] font-semibold text-white transition-colors hover:bg-navy-light disabled:cursor-wait disabled:opacity-60 sm:col-span-2"
      >
        {pending ? 'Enviando sua solicitação...' : label}
        <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="text-[9px] leading-5 text-muted sm:col-span-2">
        Seus dados são privados e utilizados para atender à sua solicitação. Campos com * são
        obrigatórios.
      </p>
    </form>
  )
}

export function Newsletter({
  compact = false,
  title,
  text,
}: {
  compact?: boolean
  title?: string
  text?: string
}) {
  const [state, action, pending] = useActionState(subscribeNewsletter, initialFormState)
  const id = useId()
  return (
    <section
      id="newsletter"
      className={`scroll-mt-28 border-t border-line bg-sand/70 ${compact ? 'py-14' : 'py-20'}`}
    >
      <div className={`${container} reveal grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20`}>
        <div>
          <Eyebrow className="mb-5">Carta imobiliária de Marcio Rogério</Eyebrow>
          <h2 className="font-display text-[37px] leading-[1.13] md:text-[43px]">
            {title || (
              <>
                Um novo olhar.
                <br />
                <em>Direto na sua caixa de entrada.</em>
              </>
            )}
          </h2>
          <p className="mt-5 max-w-sm text-[11px] leading-6 text-muted">
            {text ||
              'Inteligência imobiliária para decisões mais estratégicas. Mercado, arquitetura e patrimônio, com a curadoria de Marcio Rogério.'}
          </p>
        </div>
        <div className="self-center">
          {state.success ? (
            <div role="status" className="border-l border-champagne py-3 pl-6">
              <Icon name="check" className="mb-4 size-6 text-gold-dark" />
              <h3 className="font-display text-3xl">Você faz parte da conversa.</h3>
              <p className="mt-3 text-xs leading-6 text-muted">{state.message}</p>
            </div>
          ) : (
            <form
              action={action}
              onReset={preserveFormValues}
              aria-label="Assinar a newsletter"
              className="grid gap-x-6 gap-y-5 sm:grid-cols-[1fr_1.25fr_auto]"
            >
              <div className="hidden" aria-hidden="true">
                <input name="website" autoComplete="off" tabIndex={-1} aria-label="Website" />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${id}-name`}>
                  Seu nome
                </label>
                <input
                  id={`${id}-name`}
                  name="name"
                  defaultValue={state.values?.name}
                  placeholder="Como você se chama?"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="given-name"
                  className={inputClass}
                  aria-invalid={!!state.errors?.name}
                />
                {state.errors?.name && (
                  <p className="mt-2 text-[10px] text-red-700">{state.errors.name}</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor={`${id}-email`}>
                  Seu e-mail
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  defaultValue={state.values?.email}
                  type="email"
                  placeholder="Seu melhor e-mail"
                  required
                  maxLength={180}
                  autoComplete="email"
                  className={inputClass}
                  aria-invalid={!!state.errors?.email}
                />
                {state.errors?.email && (
                  <p className="mt-2 text-[10px] text-red-700">{state.errors.email}</p>
                )}
              </div>
              <button
                type="submit"
                aria-label="Assinar a newsletter"
                disabled={pending}
                className="flex min-h-12 items-center justify-center gap-4 self-end bg-navy px-5 py-3 text-[11px] text-white transition-colors hover:bg-navy-light disabled:opacity-50 sm:size-12 sm:p-0"
              >
                <span className="sm:hidden">{pending ? 'Registrando...' : 'Quero receber'}</span>
                <Icon name="arrow" className="size-4" />
              </button>
              <label className="flex items-start gap-2.5 text-[9px] leading-5 text-muted sm:col-span-3">
                <input
                  type="checkbox"
                  name="consent"
                  defaultChecked={state.values?.consent === 'on'}
                  required
                  className="mt-1 size-3 shrink-0 accent-navy"
                />
                <span>
                  Quero receber conteúdos de Marcio Rogério e concordo com a{' '}
                  <Link href="/privacidade" className="underline underline-offset-2">
                    Política de Privacidade
                  </Link>
                  . Posso solicitar a exclusão dos meus dados a qualquer momento.
                </span>
              </label>
              {state.message && (
                <p className="text-[10px] leading-5 text-red-700 sm:col-span-3" role="alert">
                  {state.message} {state.errors?.consent}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
