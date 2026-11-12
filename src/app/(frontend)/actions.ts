'use server'

import type { FormState } from '@/lib/form-state'
import type { Lead } from '@/types/content'

const value = (data: FormData, key: string, max: number) => {
  const input = data.get(key)
  return typeof input === 'string' ? input.trim().slice(0, max + 1) : ''
}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const intents = ['contact', 'buy', 'sell', 'invest', 'development', 'material'] as const
const types = ['Casa', 'Apartamento', 'Studio', 'Cobertura', 'Terreno', 'Outro'] as const

export async function submitContact(_previous: FormState, formData: FormData): Promise<FormState> {
  const name = value(formData, 'name', 100)
  const email = value(formData, 'email', 180).toLowerCase()
  const whatsapp = value(formData, 'whatsapp', 24)
  const intentInput = value(formData, 'intent', 30)
  const propertyType = value(formData, 'propertyType', 30)
  const location = value(formData, 'location', 160)
  const message = value(formData, 'message', 3000)
  const property = value(formData, 'property', 200)
  const development = value(formData, 'development', 200)
  const consent = formData.get('consent') === 'on'

  const values = {
    name,
    email,
    whatsapp,
    propertyType,
    location,
    message,
    consent: consent ? 'on' : '',
  }

  const errors: Record<string, string> = {}
  if (name.length < 2 || name.length > 100)
    errors.name = 'Informe seu nome, entre 2 e 100 caracteres.'
  if (!emailPattern.test(email) || email.length > 180) errors.email = 'Informe um e-mail válido.'
  if (!/^\+?[\d\s().-]{8,24}$/.test(whatsapp) || whatsapp.replace(/\D/g, '').length < 10)
    errors.whatsapp = 'Informe seu WhatsApp com DDD.'
  if (!intents.includes(intentInput as (typeof intents)[number]))
    errors.intent = 'Selecione seu objetivo.'
  if (propertyType && !types.includes(propertyType as (typeof types)[number]))
    errors.propertyType = 'Selecione um tipo válido.'
  if (location.length > 160) errors.location = 'Use até 160 caracteres.'
  if (message.length > 3000) errors.message = 'Use até 3.000 caracteres.'
  if (property.length > 200 || development.length > 200) errors.form = 'Referência inválida.'
  if (!consent) errors.consent = 'Autorize o contato para continuar.'
  if (intentInput === 'sell') {
    if (!propertyType) errors.propertyType = 'Informe o tipo do imóvel.'
    if (location.length < 3) errors.location = 'Informe a cidade e o bairro.'
  }
  if (value(formData, 'website', 100))
    return {
      success: false,
      message: 'Solicitação não permitida. Recarregue a página e tente novamente.',
    }
  if (Object.keys(errors).length)
    return { success: false, message: 'Revise os campos abaixo.', errors, values }

  const leadData = {
    name,
    email,
    whatsapp,
    intent: intentInput as Lead['intent'],
    consent,
    ...(propertyType ? { propertyType: propertyType as Lead['propertyType'] } : {}),
    ...(location ? { location } : {}),
    ...(message ? { message } : {}),
    ...(property ? { property } : {}),
    ...(development ? { development } : {}),
  }

  try {
    console.log('[lead] Novo contato registrado:', leadData)

    return {
      success: true,
      message:
        'Sua solicitação foi recebida com sucesso. A equipe entrará em contato em breve.',
    }
  } catch (error: any) {
    console.error('[lead] Erro ao registrar contato:', error)
    return {
      success: false,
      message: 'Não foi possível registrar sua solicitação agora. Tente novamente em instantes.',
      values,
    }
  }
}

export async function subscribeNewsletter(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = value(formData, 'name', 100)
  const email = value(formData, 'email', 180).toLowerCase()
  const consent = formData.get('consent') === 'on'
  const values = { name, email, consent: consent ? 'on' : '' }
  const errors: Record<string, string> = {}
  if (name.length < 2 || name.length > 100) errors.name = 'Informe seu nome.'
  if (!emailPattern.test(email) || email.length > 180) errors.email = 'Informe um e-mail válido.'
  if (!consent) errors.consent = 'Confirme sua autorização.'
  if (value(formData, 'website', 100))
    return { success: false, message: 'Solicitação não permitida.' }
  if (Object.keys(errors).length)
    return { success: false, message: 'Confira seus dados para continuar.', errors, values }

  const subscriberData = { name, email, consent }

  try {
    console.log('[newsletter] Novo inscrito registrado:', subscriberData)

    return {
      success: true,
      message:
        'Inscrição recebida. Seu interesse e sua autorização estão registrados. Obrigado por fazer parte.',
    }
  } catch (error: any) {
    console.error('[newsletter] Erro ao registrar inscrição:', error)
    return {
      success: false,
      message: 'Não foi possível registrar sua inscrição agora. Tente novamente em instantes.',
      values,
    }
  }
}
