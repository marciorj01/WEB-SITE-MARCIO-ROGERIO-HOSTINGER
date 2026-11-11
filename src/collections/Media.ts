import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

import { createFolderField, createTagField } from 'payload'
import { adminOnly } from '@/access'
import { revalidateShared, revalidateSharedDelete } from '@/hooks/revalidate'

const ensureAlt: CollectionBeforeValidateHook = ({ data, req }) => {
  if (!data || typeof data !== 'object') return data
  const record = data as { alt?: unknown; filename?: unknown }
  const current = typeof record.alt === 'string' ? record.alt.trim() : ''
  if (current) {
    record.alt = current
    return data
  }

  const uploaded = req.file as { name?: string; filename?: string } | undefined
  const rawName =
    uploaded?.name ||
    uploaded?.filename ||
    (typeof record.filename === 'string' ? record.filename : '')
  const label = rawName.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
  record.alt = label || 'Imagem'
  return data
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Mídia', plural: 'Mídia' },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [ensureAlt],
    afterChange: [revalidateShared],
    afterDelete: [revalidateSharedDelete],
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      admin: {
        description:
          'Pode ficar em branco. Se vazio, o nome do arquivo é usado, para a foto conseguir ser salva e colocada no imóvel.',
      },
    },
    createFolderField({ relationTo: 'folders' }),
    createTagField({ relationTo: 'tags' }),
  ],
  upload: {
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600')
      return headers
    },
  },
}
