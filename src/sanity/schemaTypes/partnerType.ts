import { defineField, defineType } from 'sanity'

export const partnerType = defineType({
  name: 'partner',
  title: 'Parceiro Estratégico',
  type: 'document',
  icon: () => '🤝',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Parceiro',
      type: 'string',
      description: 'Ex: QuintoAndar, Loft, EmCasa, Zap Imóveis, etc.',
      validation: (rule) => rule.required().error('O nome do parceiro é obrigatório'),
    }),
    defineField({
      name: 'logo',
      title: 'Logomarca do Parceiro',
      type: 'image',
      description: 'Logo com fundo transparente (PNG ou SVG recomendado)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          initialValue: 'Logomarca do parceiro',
        }),
      ],
    }),
    defineField({
      name: 'url',
      title: 'Link de Destino / Parceria',
      type: 'url',
      description: 'Link do parceiro ou link direto da sua vitrine/perfil na plataforma',
    }),
    defineField({
      name: 'description',
      title: 'Descrição Curta / Tipo de Parceria',
      type: 'string',
      description: 'Ex: Portal imobiliário homologado, Parceria de co-corretagem, etc.',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Número para ordenar na tela (1 para primeiro, 2 para segundo, etc.)',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'logo',
    },
  },
})
