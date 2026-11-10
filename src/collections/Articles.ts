import type { CollectionConfig } from 'payload'
import { adminOnly, publishedOnly } from '@/access'
import { editorialHooks } from '@/hooks/revalidate'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Artigo', plural: 'Artigos e materiais' },
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo editorial',
    defaultColumns: ['title', 'category', 'format', '_status'],
  },
  access: { read: publishedOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  versions: { drafts: true },
  hooks: editorialHooks('articles'),
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'slug', type: 'slug', useAsSlug: 'title' },
    { name: 'subtitle', label: 'Subtítulo', type: 'textarea', required: true },
    { name: 'cover', label: 'Capa', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'videoUrl',
      label: 'Vídeo da Matéria (YouTube / Vimeo / MP4 opcional)',
      type: 'text',
      admin: {
        description: 'Insira o link de um vídeo complementar à matéria, se houver.',
      },
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      label: 'Autor',
      type: 'relationship',
      relationTo: 'authors',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      label: 'Publicação',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'readingTime',
      label: 'Minutos de leitura',
      type: 'number',
      min: 1,
      defaultValue: 5,
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      label: 'Destaque',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      label: 'Ordem editorial',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'format',
      label: 'Formato',
      type: 'select',
      defaultValue: 'article',
      options: [
        { label: 'Artigo', value: 'article' },
        { label: 'Guia exclusivo', value: 'guide' },
        { label: 'Relatório', value: 'report' },
        { label: 'Conteúdo patrocinado', value: 'sponsored' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'sponsor',
      label: 'Identificação do patrocinador',
      type: 'text',
      admin: { condition: (data) => data.format === 'sponsored' },
    },
    { name: 'content', label: 'Conteúdo', type: 'richText', required: true },
    { name: 'pullquote', label: 'Citação em destaque', type: 'textarea' },
    { name: 'inlineImage', label: 'Fotografia no artigo', type: 'upload', relationTo: 'media' },
    { name: 'conclusion', label: 'Conclusão', type: 'richText' },
    { name: 'contactPrompt', label: 'Chamada contextual', type: 'textarea' },
  ],
}
