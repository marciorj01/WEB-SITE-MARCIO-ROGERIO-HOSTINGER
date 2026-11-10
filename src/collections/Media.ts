import type { CollectionConfig } from 'payload'

import { createFolderField, createTagField } from 'payload'
import { adminOnly } from '@/access'
import { revalidateShared, revalidateSharedDelete } from '@/hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          const parts = req.file.name.split('.')
          const ext = parts.length > 1 ? `.${parts.pop()}` : ''
          const name = parts.join('.')
          const cleanName = name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
          req.file.name = `${cleanName || 'arquivo'}${ext.toLowerCase()}`
        }
      },
    ],
    afterChange: [revalidateShared],
    afterDelete: [revalidateSharedDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    createFolderField({ relationTo: 'folders' }),
    createTagField({ relationTo: 'tags' }),
  ],
  upload: {
    staticDir: 'public/media',
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600')
      return headers
    },
  },
}
