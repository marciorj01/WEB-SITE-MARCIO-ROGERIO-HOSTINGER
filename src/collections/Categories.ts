import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access'
import { revalidateShared, revalidateSharedDelete } from '@/hooks/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Categoria editorial', plural: 'Categorias editoriais' },
  admin: { useAsTitle: 'name', group: 'Conteúdo editorial' },
  access: { read: () => true, create: adminOnly, update: adminOnly, delete: adminOnly },
  hooks: { afterChange: [revalidateShared], afterDelete: [revalidateSharedDelete] },
  fields: [
    { name: 'name', label: 'Nome', type: 'text', required: true },
    { name: 'slug', type: 'slug', useAsSlug: 'name' },
    { name: 'description', label: 'Apresentação', type: 'textarea' },
    {
      name: 'tone',
      label: 'Identidade',
      type: 'select',
      defaultValue: 'navy',
      options: ['navy', 'olive', 'sand', 'slate', 'terracotta', 'sage', 'gold'],
    },
    { name: 'order', label: 'Ordem', type: 'number', defaultValue: 0 },
  ],
}
