import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access'
import { revalidateBrand } from '@/hooks/revalidate'

export const Brand: GlobalConfig = {
  slug: 'brand',
  label: 'Identidade e contato',
  admin: { group: 'Institucional' },
  access: { read: () => true, update: adminOnly },
  hooks: { afterChange: [revalidateBrand] },
  fields: [
    { name: 'name', label: 'Marca', type: 'text', defaultValue: 'Marcio Rogério' },
    { name: 'tagline', label: 'Assinatura', type: 'text', defaultValue: 'Corretor de Imóveis' },
    { name: 'demoNotice', label: 'Aviso de demonstração', type: 'textarea' },
    {
      name: 'whatsapp',
      label: 'WhatsApp real (código do país + DDD + número)',
      type: 'text',
      admin: { description: 'Deixe vazio até informar um contato verdadeiro.' },
      validate: (value: string | null | undefined) =>
        !value || /^\d{10,15}$/.test(value) || 'Use somente números, incluindo país e DDD.',
    },
    { name: 'email', label: 'E-mail de contato real', type: 'email' },
    {
      name: 'professionalRegistration',
      label: 'Registro profissional real',
      type: 'text',
      defaultValue: 'CRECI F-59.138-F',
    },
    { name: 'serviceLocation', label: 'Área de atuação real', type: 'text' },
    {
      name: 'heroVideo',
      label: 'Vídeo principal do Banner (opcional)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Faça upload de um arquivo de vídeo (MP4 ou WebM) para rodar como fundo dinâmico do banner.',
      },
    },
    {
      name: 'heroVideoUrl',
      label: 'Ou link externo do vídeo (MP4 ou YouTube)',
      type: 'text',
      admin: {
        description:
          'Cole um link direto de MP4/WebM ou um link compartilhável do YouTube. Vídeos não listados podem ser incorporados se a incorporação estiver habilitada no YouTube.',
      },
    },
    {
      name: 'heroSlides',
      label: 'Slides de abertura (Fotos ou Vídeos de Empreendimentos)',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'mediaType',
          label: 'Tipo de mídia',
          type: 'select',
          defaultValue: 'image',
          options: [
            { label: 'Fotografia', value: 'image' },
            { label: 'Vídeo (MP4)', value: 'video' },
          ],
        },
        {
          name: 'image',
          label: 'Fotografia',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'video',
          label: 'Arquivo de Vídeo (MP4)',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'videoUrl',
          label: 'Ou link do vídeo (MP4 ou YouTube)',
          type: 'text',
          admin: {
            description:
              'Aceita link direto de MP4/WebM ou link compartilhável do YouTube; a incorporação precisa estar habilitada no YouTube.',
          },
        },
        { name: 'caption', label: 'Legenda / Nome do Empreendimento', type: 'text' },
      ],
    },
    {
      name: 'homeCollectionEyebrow',
      label: 'Curadoria na home — chamada superior',
      type: 'text',
      defaultValue: 'Uma seleção, não apenas uma busca',
    },
    {
      name: 'homeCollectionTitle',
      label: 'Curadoria na home — título',
      type: 'text',
      defaultValue: 'Imóveis com identidade.',
    },
    {
      name: 'homeCollectionTitleEmphasis',
      label: 'Curadoria na home — título em destaque',
      type: 'text',
      defaultValue: 'Escolhas com significado.',
    },
    {
      name: 'homeCollectionLinkLabel',
      label: 'Curadoria na home — texto do link',
      type: 'text',
      defaultValue: 'Conheça a curadoria completa',
    },
    {
      name: 'homeCollectionEmptyTitle',
      label: 'Curadoria na home — título sem imóveis',
      type: 'text',
      defaultValue: 'Uma nova seleção está sendo preparada.',
    },
    {
      name: 'homeCollectionEmptyText',
      label: 'Curadoria na home — mensagem sem imóveis',
      type: 'textarea',
      defaultValue: 'Converse com nossa consultoria para encontrar referências alinhadas ao seu momento.',
    },
    {
      name: 'homeCollectionEmptyLinkLabel',
      label: 'Curadoria na home — botão sem imóveis',
      type: 'text',
      defaultValue: 'Solicitar atendimento',
    },
    {
      name: 'homeCollectionFooterText',
      label: 'Curadoria na home — texto inferior',
      type: 'text',
      defaultValue: 'Para cada momento de vida, um jeito de morar. Descubra o que faz sentido para o seu.',
    },
    {
      name: 'homeCollectionFooterEmphasis',
      label: 'Curadoria na home — frase em destaque inferior',
      type: 'text',
      defaultValue: 'O essencial é pessoal.',
    },
    {
      name: 'homeSegmentFirstLabel',
      label: 'Curadoria na home — nome do segmento primeiro imóvel',
      type: 'text',
      defaultValue: 'Primeiro imóvel',
    },
    {
      name: 'homeSegmentMediumLabel',
      label: 'Curadoria na home — nome do segmento médio padrão',
      type: 'text',
      defaultValue: 'Médio padrão',
    },
    {
      name: 'homeSegmentHighLabel',
      label: 'Curadoria na home — nome do segmento alto padrão',
      type: 'text',
      defaultValue: 'Alto padrão',
    },
    {
      name: 'consultingEyebrow',
      label: 'Consultoria — chamada superior',
      type: 'text',
      defaultValue: 'A perspectiva de Marcio Rogério',
    },
    {
      name: 'consultingImageEyebrow',
      label: 'Consultoria — chamada sobre a foto',
      type: 'text',
      defaultValue: 'Nosso ponto de vista',
    },
    {
      name: 'consultingImageCaption',
      label: 'Consultoria — frase sobre a foto',
      type: 'text',
      defaultValue: 'O valor está no olhar.',
    },
    {
      name: 'consultingTitle',
      label: 'Consultoria — título',
      type: 'text',
      defaultValue: 'Não é sobre encontrar um imóvel.',
    },
    {
      name: 'consultingTitleEmphasis',
      label: 'Consultoria — título em destaque',
      type: 'text',
      defaultValue: 'É sobre reconhecer o seu lugar.',
    },
    {
      name: 'consultingText',
      label: 'Consultoria — primeiro parágrafo',
      type: 'textarea',
      defaultValue:
        'Entendemos que uma decisão imobiliária envolve muito mais do que metros quadrados. Envolve planos, patrimônio e o jeito como você quer viver.',
    },
    {
      name: 'consultingSecondaryText',
      label: 'Consultoria — segundo parágrafo',
      type: 'textarea',
      defaultValue:
        'Por isso, combinamos escuta, curadoria e visão de mercado para acompanhar cada escolha com a atenção que ela merece.',
    },
    {
      name: 'consultingLinkLabel',
      label: 'Consultoria — texto do link',
      type: 'text',
      defaultValue: 'Conheça o nosso olhar',
    },
    {
      name: 'consultingImage',
      label: 'Imagem da consultoria',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'investImage', label: 'Imagem de investimentos', type: 'upload', relationTo: 'media' },
    { name: 'sellImage', label: 'Imagem de venda', type: 'upload', relationTo: 'media' },
    {
      name: 'aboutImage',
      label: 'Retrato profissional / imagem institucional',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'profileName', label: 'Nome profissional', type: 'text', defaultValue: 'Marcio Rogério' },
    { name: 'profileRole', label: 'Posicionamento', type: 'text', defaultValue: 'Corretor de Imóveis' },
    { name: 'biography', label: 'Trajetória profissional', type: 'textarea' },
    { name: 'philosophy', label: 'Filosofia de trabalho', type: 'textarea' },
  ],
}
