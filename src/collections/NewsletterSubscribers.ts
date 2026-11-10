import { APIError, type CollectionConfig } from 'payload'
import { adminOnly } from '@/access'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: { singular: 'Assinante', plural: 'Assinantes da newsletter' },
  admin: {
    useAsTitle: 'email',
    group: 'Relacionamento',
    defaultColumns: ['name', 'email', 'consent', 'createdAt'],
  },
  access: {
    create: ({ data }) => data?.consent === true,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (!data) return data
        if (typeof data.email === 'string') data.email = data.email.trim().toLowerCase()
        if (typeof data.name === 'string') data.name = data.name.trim()
        if (operation === 'create' && data.consent !== true)
          throw new APIError('Confirme sua autorização para continuar.', 400)
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
      unique: true,
      validate: (value: string | null | undefined) =>
        (typeof value === 'string' &&
          value.length <= 180 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ||
        'Informe um e-mail válido.',
    },
    {
      name: 'consent',
      label: 'Autorização para conteúdo',
      type: 'checkbox',
      required: true,
      validate: (value) => value === true || 'É necessário consentimento.',
    },
  ],
}
