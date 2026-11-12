import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Página Institucional',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
      description: 'Ex: Sobre Nós, Venda Conosco, Consultoria de Investimento',
      validation: (rule) => rule.required().error('O título da página é obrigatório'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Endereço da Página)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('O slug é obrigatório'),
    }),
    defineField({
      name: 'headline',
      title: 'Chamada Principal / Subtítulo',
      type: 'string',
      description: 'Frase de impacto que abre a página',
    }),
    defineField({
      name: 'coverImage',
      title: 'Foto de Capa / Destaque',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Texto Principal',
      type: 'text',
      rows: 8,
      description: 'Conteúdo principal da página',
    }),
    defineField({
      name: 'highlights',
      title: 'Diferenciais / Tópicos em Destaque',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Tópicos com ícone de confirmação para reforçar a mensagem da página',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
      media: 'coverImage',
    },
  },
})
