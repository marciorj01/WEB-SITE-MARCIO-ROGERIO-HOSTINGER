import type { CollectionConfig } from 'payload'
import { adminOnly, publishedOnly } from '@/access'
import { editorialHooks } from '@/hooks/revalidate'

export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: { singular: 'Imóvel', plural: 'Imóveis selecionados' },
  admin: {
    useAsTitle: 'title',
    group: 'Curadoria imobiliária',
    defaultColumns: ['title', 'segment', 'referenceOnly', '_status'],
  },
  access: { read: publishedOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  versions: { drafts: true },
  hooks: editorialHooks('properties'),
  fields: [
    { name: 'title', label: 'Nome', type: 'text', required: true },
    { name: 'slug', type: 'slug', useAsSlug: 'title' },
    { name: 'subtitle', label: 'Conceito', type: 'text' },
    { name: 'description', label: 'Apresentação', type: 'textarea', required: true },
    {
      name: 'image',
      label: 'Fotografia principal',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      label: 'Galeria',
      type: 'array',
      fields: [
        { name: 'image', label: 'Fotografia', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', label: 'Legenda', type: 'text' },
      ],
    },
    {
      name: 'tour360Url',
      label: 'Link do Tour Virtual 360° (Matterport, Kuula, Banib, etc.)',
      type: 'text',
      admin: {
        description: 'Insira o link do tour virtual interativo 360° (ex: https://my.matterport.com/show/?m=... ou Kuula).',
      },
    },
    {
      name: 'videoUrl',
      label: 'Link do Vídeo do Imóvel (YouTube, Vimeo ou MP4)',
      type: 'text',
      admin: {
        description: 'Insira o link de visualização do vídeo do imóvel.',
      },
    },
    {
      name: 'segment',
      label: 'Segmento',
      type: 'select',
      required: true,
      options: [
        { label: 'Primeiro imóvel', value: 'first' },
        { label: 'Médio padrão', value: 'medium' },
        { label: 'Alto padrão', value: 'high' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      options: ['Casa', 'Apartamento', 'Studio', 'Cobertura'],
      defaultValue: 'Casa',
      admin: { position: 'sidebar' },
    },
    { name: 'location', label: 'Localização / descrição da referência', type: 'text' },
    { name: 'area', label: 'Área privativa (m²)', type: 'number', min: 0 },
    { name: 'bedrooms', label: 'Dormitórios', type: 'number', min: 0 },
    { name: 'suites', label: 'Suítes', type: 'number', min: 0 },
    { name: 'parking', label: 'Vagas', type: 'number', min: 0 },
    { name: 'price', label: 'Valor de venda (R$)', type: 'number', min: 0 },
    {
      name: 'features',
      label: 'Diferenciais',
      type: 'array',
      fields: [{ name: 'text', label: 'Diferencial', type: 'text', required: true }],
    },
    {
      name: 'investment',
      label: 'Potencial de uso para investimento',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'referenceOnly',
      label: 'Referência ilustrativa, não é oferta de venda',
      type: 'checkbox',
      defaultValue: true,
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
      label: 'Ordem',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
