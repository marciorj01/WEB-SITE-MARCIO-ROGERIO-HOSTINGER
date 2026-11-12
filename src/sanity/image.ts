import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './env'

// Inicia o builder de URLs de imagem do Sanity
const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'u7l3uk5g',
  dataset: dataset || 'production',
})

/**
 * Utilitário para gerar URLs de imagens hospedadas no Sanity CDN
 * Exemplo de uso: urlFor(imovel.mainImage).width(800).auto('format').url()
 */
export function urlFor(source: any) {
  return imageBuilder.image(source)
}

