import { defineField, defineType } from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Imóvel',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Imóvel',
      type: 'string',
      description: 'Nome principal do imóvel (ex: Residência Parque Ibirapuera)',
      validation: (rule) => rule.required().error('O título do imóvel é obrigatório'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL amigável)',
      type: 'slug',
      description: 'Clique em "Generate" para criar a URL automaticamente a partir do título',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('O slug é obrigatório para acessar o imóvel no site'),
    }),
    defineField({
      name: 'headline',
      title: 'Chamada curta / Subtítulo',
      type: 'string',
      description: 'Ex: Mansão contemporânea com vista panorâmica e acabamento refinado',
    }),
    defineField({
      name: 'price',
      title: 'Preço de Venda (R$)',
      type: 'number',
      description: 'Valor numérico em Reais. Ex: 4500000',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Disponível', value: 'Disponível' },
          { title: 'Reservado', value: 'Reservado' },
          { title: 'Vendido', value: 'Vendido' },
          { title: 'Em negociação', value: 'Em negociação' },
        ],
        layout: 'radio',
      },
      initialValue: 'Disponível',
    }),
    defineField({
      name: 'propertyType',
      title: 'Tipo de Imóvel',
      type: 'string',
      options: {
        list: [
          { title: 'Apartamento', value: 'Apartamento' },
          { title: 'Cobertura', value: 'Cobertura' },
          { title: 'Casa', value: 'Casa' },
          { title: 'Casa de Condomínio', value: 'Casa de Condomínio' },
          { title: 'Terreno', value: 'Terreno' },
          { title: 'Comercial', value: 'Comercial' },
        ],
      },
      initialValue: 'Apartamento',
    }),
    defineField({
      name: 'location',
      title: 'Bairro / Região',
      type: 'string',
      description: 'Ex: Jardins, Vila Nova Conceição, Leblon',
    }),
    defineField({
      name: 'city',
      title: 'Cidade',
      type: 'string',
      initialValue: 'São Paulo',
    }),
    defineField({
      name: 'area',
      title: 'Área Privativa (m²)',
      type: 'number',
      description: 'Ex: 320',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Quartos',
      type: 'number',
      initialValue: 3,
    }),
    defineField({
      name: 'suites',
      title: 'Suítes',
      type: 'number',
      initialValue: 3,
    }),
    defineField({
      name: 'bathrooms',
      title: 'Banheiros',
      type: 'number',
      initialValue: 4,
    }),
    defineField({
      name: 'parkingSpots',
      title: 'Vagas de Garagem',
      type: 'number',
      initialValue: 3,
    }),
    defineField({
      name: 'featured',
      title: 'Destaque na Página Inicial?',
      type: 'boolean',
      description: 'Se marcado, o imóvel aparecerá na vitrine da Home',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Foto Principal de Capa',
      type: 'image',
      description: 'Imagem de destaque do imóvel',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo (Alt)',
          type: 'string',
          initialValue: 'Fotografia do imóvel',
        }),
      ],
      validation: (rule) => rule.required().error('A foto principal é obrigatória'),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Fotos',
      type: 'array',
      description: 'Fotos adicionais do imóvel (ambientes, fachada, detalhes)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto Alternativo (Alt)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Link do Vídeo / Tour Virtual',
      type: 'url',
      description: 'Link do YouTube, Vimeo ou Tour 360 (ex: https://www.youtube.com/watch?v=...)',
    }),
    defineField({
      name: 'description',
      title: 'Descrição Completa',
      type: 'text',
      rows: 6,
      description: 'Texto detalhado apresentando o imóvel, os acabamentos e a proposta de viver.',
    }),
    defineField({
      name: 'features',
      title: 'Diferenciais / Características',
      type: 'array',
      description: 'Ex: Vista definitiva, Piscina aquecida, Automação completa, Adega climatizada',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'mainImage',
      price: 'price',
    },
    prepare({ title, subtitle, media, price }) {
      const formattedPrice = price
        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
        : 'Sob consulta'
      return {
        title: title || 'Sem título',
        subtitle: `${subtitle || 'Sem localização'} — ${formattedPrice}`,
        media,
      }
    },
  },
})
