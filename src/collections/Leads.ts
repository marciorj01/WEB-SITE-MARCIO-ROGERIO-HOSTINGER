import { APIError, type CollectionConfig } from 'payload'
import { adminOnly, adminField } from '@/access'

const intents = ['contact', 'buy', 'sell', 'invest', 'development', 'material']

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Solicitação', plural: 'Solicitações de atendimento' },
  admin: {
    useAsTitle: 'name',
    group: 'Relacionamento',
    defaultColumns: ['name', 'intent', 'status', 'createdAt'],
  },
  access: {
    create: ({ data }) => data?.consent === true && intents.includes(data?.intent),
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (!data) return data
        for (const key of ['name', 'email', 'whatsapp', 'location', 'message']) {
          if (typeof data[key] === 'string') data[key] = data[key].trim()
        }
        if (typeof data.email === 'string') data.email = data.email.toLowerCase()
        if (operation === 'create' && (data.consent !== true || !intents.includes(data.intent))) {
          throw new APIError('É necessário informar o objetivo e autorizar o contato.', 400)
        }
        if (
          operation === 'create' &&
          data.intent === 'sell' &&
          (!data.propertyType || typeof data.location !== 'string' || data.location.length < 3)
        ) {
          throw new APIError('Informe o tipo de imóvel, a cidade e o bairro.', 400)
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        if (operation === 'create' && req.user?.collection !== 'admins') data.status = 'new'
        const current = { ...originalDoc, ...data }
        if (current.property && current.development)
          throw new APIError('Informe somente uma referência de interesse.', 400)
        if (
          (current.property && current.intent !== 'buy') ||
          (current.development && current.intent !== 'development')
        ) {
          throw new APIError('A referência deve corresponder ao objetivo do atendimento.', 400)
        }
        for (const [field, collection] of [
          ['property', 'properties'],
          ['development', 'developments'],
        ] as const) {
          if (!data[field]) continue
          const id = typeof data[field] === 'object' ? data[field].id : data[field]
          const previousID =
            typeof originalDoc?.[field] === 'object' ? originalDoc[field]?.id : originalDoc?.[field]
          if (operation === 'update' && id === previousID) continue
          const record = await req.payload.findByID({
            collection,
            id,
            depth: 0,
            overrideAccess: false,
            user: req.user,
            req,
          })
          if (!record || record._status !== 'published')
            throw new APIError('Esta referência não está disponível para contato.', 400)
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', label: 'Nome', type: 'text', required: true, minLength: 2, maxLength: 100 },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      required: true,
      validate: (value: string | null | undefined) =>
        (typeof value === 'string' &&
          value.length <= 180 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ||
        'Informe um e-mail válido.',
    },
    {
      name: 'whatsapp',
      label: 'WhatsApp',
      type: 'text',
      required: true,
      maxLength: 24,
      validate: (value: string | null | undefined) =>
        (typeof value === 'string' &&
          /^\+?[\d\s().-]{8,24}$/.test(value) &&
          value.replace(/\D/g, '').length >= 10) ||
        'Informe um telefone com DDD.',
    },
    {
      name: 'intent',
      label: 'Objetivo',
      type: 'select',
      required: true,
      options: [
        { label: 'Atendimento', value: 'contact' },
        { label: 'Comprar', value: 'buy' },
        { label: 'Vender', value: 'sell' },
        { label: 'Investir', value: 'invest' },
        { label: 'Empreendimento', value: 'development' },
        { label: 'Material editorial', value: 'material' },
      ],
    },
    {
      name: 'propertyType',
      label: 'Tipo de imóvel',
      type: 'select',
      options: ['Casa', 'Apartamento', 'Studio', 'Cobertura', 'Terreno', 'Outro'],
    },
    { name: 'location', label: 'Cidade e bairro', type: 'text', maxLength: 160 },
    { name: 'message', label: 'Informações adicionais', type: 'textarea', maxLength: 3000 },
    {
      name: 'property',
      label: 'Imóvel de interesse',
      type: 'relationship',
      relationTo: 'properties',
    },
    {
      name: 'development',
      label: 'Empreendimento de interesse',
      type: 'relationship',
      relationTo: 'developments',
    },
    {
      name: 'consent',
      label: 'Autorizou contato',
      type: 'checkbox',
      required: true,
      validate: (value) => value === true || 'Autorize o contato para continuar.',
    },
    {
      name: 'status',
      label: 'Acompanhamento',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Novo', value: 'new' },
        { label: 'Em atendimento', value: 'contacted' },
        { label: 'Concluído', value: 'completed' },
      ],
      access: { create: adminField, update: adminField },
    },
  ],
}
