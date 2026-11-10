import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'
import { revalidateShared, revalidateSharedDelete } from '@/hooks/revalidate'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'Autor', plural: 'Autores' },
  admin: { useAsTitle: 'name', group: 'Conteúdo editorial' },
  access: { read: () => true, create: adminOnly, update: adminOnly, delete: adminOnly },
  hooks: { afterChange: [revalidateShared], afterDelete: [revalidateSharedDelete] },
  fields: [
    { name: 'name', label: 'Nome', type: 'text', required: true },
    { name: 'bio', label: 'Apresentação', type: 'textarea' },
    { name: 'portrait', label: 'Retrato', type: 'upload', relationTo: 'media' },
  ],
}
