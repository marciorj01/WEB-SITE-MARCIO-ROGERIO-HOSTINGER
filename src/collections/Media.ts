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
    disableLocalStorage: true,
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600')
      return headers
    },
  },
}
