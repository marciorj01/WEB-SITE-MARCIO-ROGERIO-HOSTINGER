import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site & Textos da Home',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Corretor / Marca',
      type: 'string',
      initialValue: 'Marcio Rogério',
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan / Tagline',
      type: 'string',
      initialValue: 'Corretor de Imóveis',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Número do WhatsApp (apenas números com DDD)',
      type: 'string',
      description: 'Ex: 5511999999999',
    }),
    defineField({
      name: 'email',
      title: 'E-mail de Contato',
      type: 'string',
    }),
    defineField({
      name: 'professionalRegistration',
      title: 'Registro Profissional / CRECI',
      type: 'string',
      initialValue: 'CRECI F-59.138-F',
    }),

    // --- Banner Principal (Hero da Home) ---
    defineField({
      name: 'heroVideoUrl',
      title: 'Vídeo do Banner Principal (YouTube, Vimeo ou link MP4 direto)',
      type: 'url',
      description: 'Se preenchido, o banner da home exibirá este vídeo de fundo.',
    }),
    defineField({
      name: 'heroSlides',
      title: 'Fotos do Banner Principal (Carrossel)',
      type: 'array',
      description: 'Adicione imagens e frases de impacto para o banner do topo',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Foto do Slide',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'caption',
              title: 'Legenda / Frase de Impacto',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    // --- Seção da Vitrine de Imóveis ---
    defineField({
      name: 'homeCollectionEyebrow',
      title: 'Vitrine: Antetítulo / Chamada Curta',
      type: 'string',
      initialValue: 'Uma seleção, não apenas uma busca',
    }),
    defineField({
      name: 'homeCollectionTitle',
      title: 'Vitrine: Título Principal',
      type: 'string',
      initialValue: 'Imóveis com identidade.',
    }),
    defineField({
      name: 'homeCollectionTitleEmphasis',
      title: 'Vitrine: Título em Destaque (Itálico)',
      type: 'string',
      initialValue: 'Escolhas com significado.',
    }),
    defineField({
      name: 'homeCollectionLinkLabel',
      title: 'Vitrine: Texto do Botão/Link',
      type: 'string',
      initialValue: 'Conheça a curadoria completa',
    }),
    defineField({
      name: 'homeCollectionFooterText',
      title: 'Vitrine: Texto Informativo de Rodapé',
      type: 'text',
      rows: 2,
      initialValue:
        'Para cada momento de vida, um jeito de morar. Descubra o que faz sentido para o seu.',
    }),
    defineField({
      name: 'homeCollectionFooterEmphasis',
      title: 'Vitrine: Frase de Efeito no Rodapé',
      type: 'string',
      initialValue: 'O essencial é pessoal.',
    }),

    // --- Seção de Consultoria (O Nosso Ponto de Vista) ---
    defineField({
      name: 'consultingEyebrow',
      title: 'Consultoria: Antetítulo',
      type: 'string',
      initialValue: 'A perspectiva de Marcio Rogério',
    }),
    defineField({
      name: 'consultingTitle',
      title: 'Consultoria: Título Principal',
      type: 'string',
      initialValue: 'Não é sobre encontrar um imóvel.',
    }),
    defineField({
      name: 'consultingTitleEmphasis',
      title: 'Consultoria: Título em Destaque (Itálico)',
      type: 'string',
      initialValue: 'É sobre reconhecer o seu lugar.',
    }),
    defineField({
      name: 'consultingText',
      title: 'Consultoria: Parágrafo 1',
      type: 'text',
      rows: 3,
      initialValue:
        'Entendemos que uma decisão imobiliária envolve muito mais do que metros quadrados. Envolve planos, patrimônio e o jeito como você quer viver.',
    }),
    defineField({
      name: 'consultingSecondaryText',
      title: 'Consultoria: Parágrafo 2',
      type: 'text',
      rows: 3,
      initialValue:
        'Por isso, combinamos escuta, curadoria e visão de mercado para acompanhar cada escolha com a atenção que ela merece.',
    }),
    defineField({
      name: 'consultingLinkLabel',
      title: 'Consultoria: Texto do Link/Botão',
      type: 'string',
      initialValue: 'Conheça o nosso olhar',
    }),
    defineField({
      name: 'consultingImage',
      title: 'Consultoria: Foto de Destaque',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'consultingImageEyebrow',
      title: 'Consultoria: Texto sobre a Foto',
      type: 'string',
      initialValue: 'Nosso ponto de vista',
    }),
    defineField({
      name: 'consultingImageCaption',
      title: 'Consultoria: Frase sobre a Foto',
      type: 'string',
      initialValue: 'O valor está no olhar.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Configurações do Site',
        subtitle: subtitle || 'Textos e Banners da Home',
      }
    },
  },
})
