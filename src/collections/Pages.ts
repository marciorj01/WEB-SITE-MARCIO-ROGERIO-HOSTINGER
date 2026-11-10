import type { CollectionConfig } from 'payload'
import { adminOnly, publishedOnly } from '@/access'
import { revalidateSitePage, revalidateSitePageDelete } from '@/hooks/revalidate'

const imageField = () => ({ name: 'image', label: 'Imagem', type: 'upload' as const, relationTo: 'media' as const })
const linkFields = [
  { name: 'linkLabel', label: 'Texto do botão', type: 'text' as const },
  { name: 'linkUrl', label: 'Endereço do botão', type: 'text' as const },
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página visual', plural: 'Páginas visuais' },
  admin: {
    useAsTitle: 'title',
    group: 'Construtor visual',
    defaultColumns: ['title', 'path', '_status', 'updatedAt'],
    description: 'Monte páginas por seções, altere a ordem e veja a prévia antes de publicar.',
  },
  access: { read: publishedOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  versions: { drafts: true },
  hooks: { afterChange: [revalidateSitePage], afterDelete: [revalidateSitePageDelete] },
  fields: [
    { name: 'title', label: 'Nome interno', type: 'text', required: true },
    {
      name: 'path', label: 'Endereço da página', type: 'select', required: true, unique: true,
      options: [
        { label: 'Página inicial', value: '/' }, { label: 'Comprar imóveis', value: '/comprar' },
        { label: 'Investir', value: '/investir' }, { label: 'Empreendimentos', value: '/empreendimentos' },
        { label: 'Vender', value: '/vender' }, { label: 'Conteúdo', value: '/conteudo' },
        { label: 'Sobre', value: '/sobre' }, { label: 'Contato', value: '/contato' },
        { label: 'Privacidade', value: '/privacidade' },
      ],
      admin: { description: 'Selecione a página pública que este conteúdo substituirá.' },
    },
    {
      name: 'sections', label: 'Seções da página', type: 'blocks', minRows: 1,
      admin: { description: 'Arraste as seções para reordenar. Cada bloco pode ser editado sem mexer em código.' },
      blocks: [
        {
          slug: 'hero', labels: { singular: 'Abertura / banner', plural: 'Aberturas e banners' },
          fields: [
            { name: 'eyebrow', label: 'Chamada pequena', type: 'text' },
            { name: 'title', label: 'Título', type: 'text', required: true },
            { name: 'emphasis', label: 'Título em destaque', type: 'text' },
            { name: 'text', label: 'Texto', type: 'textarea' }, imageField(), ...linkFields,
            { name: 'tone', label: 'Fundo', type: 'select', defaultValue: 'ivory', options: [{ label: 'Claro', value: 'ivory' }, { label: 'Azul escuro', value: 'navy' }, { label: 'Neutro', value: 'paper' }] },
          ],
        },
        {
          slug: 'editorial', labels: { singular: 'Texto / conteúdo', plural: 'Textos e conteúdos' },
          fields: [
            { name: 'eyebrow', label: 'Chamada pequena', type: 'text' },
            { name: 'title', label: 'Título', type: 'text' },
            { name: 'text', label: 'Texto', type: 'textarea', required: true },
            { name: 'alignment', label: 'Alinhamento', type: 'select', defaultValue: 'left', options: [{ label: 'Esquerda', value: 'left' }, { label: 'Centralizado', value: 'center' }] },
            { name: 'tone', label: 'Fundo', type: 'select', defaultValue: 'ivory', options: [{ label: 'Claro', value: 'ivory' }, { label: 'Azul escuro', value: 'navy' }, { label: 'Neutro', value: 'paper' }] },
          ],
        },
        {
          slug: 'imageText', labels: { singular: 'Imagem + texto', plural: 'Imagens + textos' },
          fields: [imageField(),
            { name: 'imagePosition', label: 'Posição da imagem', type: 'select', defaultValue: 'left', options: [{ label: 'Esquerda', value: 'left' }, { label: 'Direita', value: 'right' }] },
            { name: 'eyebrow', label: 'Chamada pequena', type: 'text' }, { name: 'title', label: 'Título', type: 'text', required: true },
            { name: 'text', label: 'Texto', type: 'textarea', required: true }, ...linkFields,
          ],
        },
        {
          slug: 'gallery', labels: { singular: 'Galeria de imagens', plural: 'Galerias de imagens' },
          fields: [
            { name: 'title', label: 'Título da seção', type: 'text' },
            { name: 'images', label: 'Fotos', type: 'array', minRows: 1, fields: [imageField(), { name: 'caption', label: 'Legenda', type: 'text' }] },
          ],
        },
        {
          slug: 'listing', labels: { singular: 'Vitrine de conteúdo', plural: 'Vitrines de conteúdo' },
          fields: [
            { name: 'source', label: 'Mostrar', type: 'select', required: true, options: [{ label: 'Imóveis', value: 'properties' }, { label: 'Empreendimentos', value: 'developments' }, { label: 'Artigos', value: 'articles' }] },
            { name: 'eyebrow', label: 'Chamada pequena', type: 'text' }, { name: 'title', label: 'Título', type: 'text' },
            { name: 'limit', label: 'Quantidade', type: 'number', defaultValue: 3, min: 1, max: 12 },
          ],
        },
        {
          slug: 'cta', labels: { singular: 'Chamada para ação', plural: 'Chamadas para ação' },
          fields: [
            { name: 'eyebrow', label: 'Chamada pequena', type: 'text' }, { name: 'title', label: 'Título', type: 'text', required: true },
            { name: 'text', label: 'Texto', type: 'textarea' }, ...linkFields,
            { name: 'tone', label: 'Fundo', type: 'select', defaultValue: 'navy', options: [{ label: 'Claro', value: 'ivory' }, { label: 'Azul escuro', value: 'navy' }, { label: 'Neutro', value: 'paper' }] },
          ],
        },
        {
          slug: 'newsletter', labels: { singular: 'Inscrição na newsletter', plural: 'Inscrições na newsletter' },
          fields: [{ name: 'title', label: 'Título', type: 'text' }, { name: 'text', label: 'Texto', type: 'textarea' }],
        },
        {
          slug: 'contactForm', labels: { singular: 'Formulário de contato', plural: 'Formulários de contato' },
          fields: [
            { name: 'title', label: 'Título da seção', type: 'text' },
            { name: 'text', label: 'Texto de apresentação', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
