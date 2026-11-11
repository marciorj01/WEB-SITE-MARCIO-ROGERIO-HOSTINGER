import type {
  CollectionBeforeOperationHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
} from 'payload'

import { createFolderField, createTagField } from 'payload'
import { adminOnly } from '@/access'
import { revalidateShared, revalidateSharedDelete } from '@/hooks/revalidate'

function sanitizeFilename(filename: string): string {
  const extIndex = filename.lastIndexOf('.')
  const ext = extIndex !== -1 ? filename.slice(extIndex).toLowerCase() : ''
  const baseName = extIndex !== -1 ? filename.slice(0, extIndex) : filename

  const cleanBase = baseName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()

  return `${cleanBase || 'arquivo'}${ext}`
}

const sanitizeUploadedFile: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    const file = req.file as { name?: string; filename?: string } | undefined
    if (file?.name) {
      file.name = sanitizeFilename(file.name)
    }
    if (file?.filename) {
      file.filename = sanitizeFilename(file.filename)
    }
  }
  return args
}

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

  if (typeof record.filename === 'string') {
    record.filename = sanitizeFilename(record.filename)
  }

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
    beforeOperation: [sanitizeUploadedFile],
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
