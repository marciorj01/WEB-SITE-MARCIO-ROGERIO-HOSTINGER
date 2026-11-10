# Marcio Rogério — consultoria imobiliária

Identidade editorial e visual do site de Marcio Rogério, editável no Payload.

## Plano de entrega

- [x] Conexão do backend e inspeção do template.
- [x] Modelos de conteúdo, mídia, imóveis, empreendimentos e captação.
- [x] Identidade visual e componentes compartilhados.
- [x] Início, Comprar, Investir, Empreendimentos, Vender, Conteúdo e Sobre.
- [x] Páginas internas, materiais, contato e privacidade.
- [x] Construtor visual de páginas com seções reordenáveis e prévia ao vivo.
- [ ] Testes de navegação, filtros, formulários, acessibilidade e responsividade.
- [ ] **Verify production delivery**: verificar build e tabela de rotas com
      `figma make verify-deploy`, visitar todas as páginas públicas em produção,
      conferir imagens e comprovar atualização de conteúdo publicado.

## Ciclo de conteúdo

As páginas institucionais mantêm a apresentação atual até que a versão visual
em rascunho seja publicada no CMS. As consultas públicas compartilhadas e as listas/detalhes editoriais utilizam `unstable_cache`.
Artigos, imóveis e empreendimentos têm rascunho/publicação.
Alterações e exclusões invalidam a lista, o slug anterior e o atual.
Alterações em mídia, autoria, categorias e identidade também invalidam os
consumidores. As submissões são privadas e não usam fluxo editorial.

## Organização

- `src/components`: identidade, navegação, formulários, cards e interações.
- `src/collections`: modelos de domínio e permissões.
- `src/globals/Brand.ts`: marca, imagens institucionais e contatos.
- `src/lib/content.ts`: consultas públicas em cache.
- `src/hooks/revalidate.ts`: invalidação após alterações.
- `src/app/(frontend)`: páginas e modelos internos.
- `src/app/(frontend)/styles.css`: tokens, tipografia e estilos globais.

O código usa componentes React reutilizáveis; não gera um arquivo nativo de
Design do Figma nem um tema WordPress/Elementor. Os tokens e componentes
documentados podem orientar uma futura implementação nessas plataformas.

## Sistema visual

Azul institucional `#142C3D`, azul profundo `#102333`, off-white `#F7F5F0`,
champagne `#B8A181`, dourado de texto `#806648`, cinza de leitura `#606B72`.
Títulos em Cormorant Garamond; interface e leitura em Manrope.
Fontes variáveis hospedadas localmente, com suas licenças OFL em `public/fonts`.
Grid editorial de 12 colunas, container de 1280px, espaçamento de 8px.
Estados: repouso, hover, foco visível, pendente, sucesso e erro.
Animações respeitam `prefers-reduced-motion`.

## Antes de publicar comercialmente

Substituir identidade provisória, trajetória, retrato e referências de imóveis;
preencher contato real, WhatsApp e registro profissional; revisar privacidade.
A newsletter registra consentimento, mas não envia campanhas automaticamente.
Não há promessas de retorno financeiro.
