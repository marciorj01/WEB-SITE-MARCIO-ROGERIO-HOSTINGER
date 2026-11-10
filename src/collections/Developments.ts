import type { CollectionConfig } from 'payload'
import { adminOnly, publishedOnly } from '@/access'
import { editorialHooks } from '@/hooks/revalidate'

export const Developments: CollectionConfig = {
  slug: 'developments',
  labels: { singular: 'Empreendimento', plural: 'Empreendimentos' },
  admin: { useAsTitle: 'title', group: 'Curadoria imobiliária' },
  access: { read: publishedOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  versions: { drafts: true },
  hooks: editorialHooks('developments'),
  fields: [
    { name: 'title', label: 'Nome', type: 'text', required: true },
    { name: 'slug', type: 'slug', useAsSlug: 'title' },
    { name: 'subtitle', label: 'Conceito', type: 'text' },
    { name: 'description', label: 'Apresentação', type: 'textarea', required: true },
    { name: 'image', label: 'Capa', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'gallery',
      label: 'Galeria',
      type: 'array',
      fields: [
        { name: 'image', label: 'Imagem', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', label: 'Legenda', type: 'text' },
      ],
    },
    {
      name: 'tour360Url',
      label: 'Link do Tour Virtual 360° / Decorado Virtual (Matterport, Kuula, etc.)',
      type: 'text',
      admin: {
        description: 'Link do tour 360 interativo do decorado ou empreendimento.',
      },
    },
    {
      name: 'videoUrl',
      label: 'Link do Vídeo do Empreendimento (YouTube, Vimeo ou MP4)',
      type: 'text',
      admin: {
        description: 'Link do vídeo de apresentação ou imagens de drone.',
      },
    },
    { name: 'location', label: 'Localização', type: 'text' },
    { name: 'architecture', label: 'Arquitetura', type: 'textarea' },
    {
      name: 'launchStage',
      label: 'Estágio',
      type: 'select',
      defaultValue: 'reference',
      options: [
        { label: 'Projeto de referência', value: 'reference' },
        { label: 'Pré-lançamento', value: 'prelaunch' },
        { label: 'Lançamento', value: 'launch' },
        { label: 'Em obras', value: 'construction' },
        { label: 'Pronto para morar', value: 'ready' },
      ],
    },
    {
      name: 'typologies',
      label: 'Tipologias e plantas',
      type: 'array',
      fields: [
        { name: 'name', label: 'Tipologia', type: 'text', required: true },
        { name: 'area', label: 'Área', type: 'text' },
        { name: 'bedrooms', label: 'Configuração', type: 'text' },
        { name: 'plan', label: 'Planta', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'features',
      label: 'Diferenciais',
      type: 'array',
      fields: [{ name: 'text', label: 'Diferencial', type: 'text', required: true }],
    },
    {
      name: 'referenceOnly',
      label: 'Projeto conceitual, não é oferta comercial',
      type: 'checkbox',
      defaultValue: true,
    },
    { name: 'order', label: 'Ordem', type: 'number', defaultValue: 0 },
  ],
}
