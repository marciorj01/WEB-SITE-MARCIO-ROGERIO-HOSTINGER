import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './src/sanity/schemaTypes'
import { projectId, dataset } from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Marcio Rogério — Gestão de Imóveis',
  projectId,
  dataset,
  plugins: [
    presentationTool({
      title: 'Visual (Ao Vivo)',
      previewUrl: {
        preview: '/',
      },
    }),
    structureTool({
      title: 'Formulários',
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
