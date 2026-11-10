import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const mediaID = (media: any): number | undefined => {
  if (typeof media === 'number') return media
  if (media && typeof media === 'object' && typeof media.id === 'number') return media.id
  return undefined
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "pages_blocks_contact_form" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "text" varchar,
      "block_name" varchar
    );
    CREATE TABLE "_pages_v_blocks_contact_form" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "text" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
    CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
    CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
    CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
    CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
    CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
    ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  `)

  const brand = (await payload.findGlobal({ slug: 'brand', depth: 2, overrideAccess: true, req })) as any
  const heroImage = mediaID(brand.heroSlides?.find((slide: any) => slide.mediaType === 'image')?.image)
  const consultingImage = mediaID(brand.consultingImage)
  const sellImage = mediaID(brand.sellImage)
  const aboutImage = mediaID(brand.aboutImage)

  const pages = [
    {
      title: 'Início — rascunho visual', path: '/', sections: [
        { blockType: 'hero', eyebrow: 'Marcio Rogério | Corretor de Imóveis', title: 'Pessoas, patrimônio e possibilidades.', emphasis: 'Uma boa escolha começa com atenção.', image: heroImage, tone: 'navy' },
        { blockType: 'listing', source: 'properties', eyebrow: 'Uma seleção, não apenas uma busca', title: 'Imóveis com identidade. Escolhas com significado.', limit: 3 },
        { blockType: 'imageText', image: consultingImage, imagePosition: 'left', eyebrow: brand.consultingEyebrow || 'Consultoria imobiliária', title: brand.consultingTitle || 'Não é sobre encontrar um imóvel.', text: [brand.consultingText, brand.consultingSecondaryText].filter(Boolean).join('\n\n') || 'Uma decisão imobiliária envolve planos, patrimônio e o jeito como você quer viver.', linkLabel: brand.consultingLinkLabel || 'Conheça o nosso olhar', linkUrl: '/sobre' },
        { blockType: 'listing', source: 'articles', eyebrow: 'Conhecimento imobiliário que transforma', title: 'Um olhar além do metro quadrado.', limit: 4 },
        { blockType: 'newsletter', title: 'Inteligência imobiliária para decisões mais estratégicas.', text: 'Receba análises, guias e perspectivas de mercado.' },
      ],
    },
    {
      title: 'Comprar — rascunho visual', path: '/comprar', sections: [
        { blockType: 'hero', eyebrow: 'Comprar | um olhar para o seu momento', title: 'Seu lugar no mundo.', emphasis: 'Do seu jeito.', text: 'Uma seleção que vai além das características do imóvel. Descubra espaços alinhados à sua rotina, aos seus planos e à sua maneira de viver.', tone: 'ivory' },
        { blockType: 'listing', source: 'properties', eyebrow: 'Curadoria imobiliária', title: 'Imóveis selecionados para o seu momento.', limit: 9 },
        { blockType: 'cta', eyebrow: 'Sua busca é única', title: 'A próxima chave começa com uma boa escolha.', text: 'Conte o que você procura e receba atendimento personalizado.', linkLabel: 'Conte o que você procura', linkUrl: '/contato?objetivo=comprar', tone: 'navy' },
      ],
    },
    {
      title: 'Investir — rascunho visual', path: '/investir', sections: [
        { blockType: 'hero', eyebrow: 'Investimentos imobiliários', title: 'Patrimônio com estratégia.', emphasis: 'Decisões com visão de longo prazo.', text: 'Análise de mercado, potencial de valorização e escolhas conectadas aos seus objetivos.', image: sellImage, tone: 'navy' },
        { blockType: 'editorial', eyebrow: 'Uma visão patrimonial', title: 'Investir começa com boas perguntas.', text: 'Cada oportunidade merece contexto: localização, liquidez, horizonte e aderência ao seu planejamento.', alignment: 'left', tone: 'paper' },
        { blockType: 'listing', source: 'articles', eyebrow: 'Inteligência imobiliária', title: 'Análises para decidir com mais clareza.', limit: 4 },
        { blockType: 'cta', title: 'Vamos conversar sobre seus próximos movimentos?', linkLabel: 'Solicitar uma conversa', linkUrl: '/contato?objetivo=investir', tone: 'navy' },
      ],
    },
    {
      title: 'Empreendimentos — rascunho visual', path: '/empreendimentos', sections: [
        { blockType: 'hero', eyebrow: 'Projetos selecionados', title: 'Novas formas de viver.', emphasis: 'Projetos escolhidos com critério.', text: 'Conheça empreendimentos e lançamentos com arquitetura, localização e proposta que fazem sentido.', tone: 'ivory' },
        { blockType: 'listing', source: 'developments', eyebrow: 'Curadoria de empreendimentos', title: 'Projetos para novos modos de viver.', limit: 8 },
        { blockType: 'cta', title: 'Quer conhecer um projeto em detalhe?', linkLabel: 'Fale com Marcio Rogério', linkUrl: '/contato', tone: 'navy' },
      ],
    },
    {
      title: 'Vender — rascunho visual', path: '/vender', sections: [
        { blockType: 'hero', eyebrow: 'Vender | estratégia e posicionamento', title: 'Seu imóvel merece', emphasis: 'uma estratégia à altura.', text: 'Avaliação, apresentação profissional e acompanhamento personalizado.', image: sellImage, tone: 'navy' },
        { blockType: 'editorial', eyebrow: 'Uma venda bem conduzida', title: 'Valor percebido começa na preparação.', text: 'Organizamos posicionamento, apresentação e estratégia para conectar seu imóvel às pessoas certas.', alignment: 'left', tone: 'paper' },
        { blockType: 'cta', title: 'Vamos conversar sobre o seu imóvel?', linkLabel: 'Solicitar avaliação', linkUrl: '/contato?objetivo=vender', tone: 'navy' },
      ],
    },
    {
      title: 'Conteúdo — rascunho visual', path: '/conteudo', sections: [
        { blockType: 'hero', eyebrow: 'Conteúdo imobiliário | Marcio Rogério', title: 'Um olhar além', emphasis: 'do metro quadrado.', text: 'Análises de mercado, guias para compradores, estratégias de investimento e tendências de arquitetura.', tone: 'ivory' },
        { blockType: 'listing', source: 'articles', eyebrow: 'Artigos, guias e estudos', title: 'Conhecimento para escolhas mais estratégicas.', limit: 12 },
        { blockType: 'newsletter', title: 'Inteligência imobiliária para decisões mais estratégicas.', text: 'Receba materiais e análises diretamente no seu e-mail.' },
      ],
    },
    {
      title: 'Sobre — rascunho visual', path: '/sobre', sections: [
        { blockType: 'hero', eyebrow: 'Sobre Marcio Rogério', title: 'O ponto de partida', emphasis: 'é entender você.', text: 'Uma consultoria imobiliária que conecta pessoas, patrimônio e possibilidades.', image: aboutImage, tone: 'navy' },
        { blockType: 'imageText', image: aboutImage, imagePosition: 'left', eyebrow: 'Trajetória e propósito', title: brand.profileName || 'Marcio Rogério', text: brand.biography || 'Uma atuação pautada pela escuta, pela curadoria e por uma visão cuidadosa do mercado imobiliário.' },
        { blockType: 'editorial', eyebrow: 'Filosofia de trabalho', title: 'Cada escolha merece atenção.', text: brand.philosophy || 'Acompanhar cada decisão com clareza, contexto e respeito ao momento de cada pessoa.', alignment: 'left', tone: 'paper' },
        { blockType: 'cta', title: 'Conheça uma consultoria feita para o seu momento.', linkLabel: 'Vamos conversar', linkUrl: '/contato', tone: 'navy' },
      ],
    },
    {
      title: 'Contato — rascunho visual', path: '/contato', sections: [
        { blockType: 'hero', eyebrow: 'Vamos conversar', title: 'Seu próximo passo', emphasis: 'começa por uma conversa.', text: 'Conte seus planos para comprar, investir ou vender um imóvel.', tone: 'ivory' },
        { blockType: 'contactForm', title: 'Como posso ajudar?', text: 'Preencha seus dados e explique brevemente o que procura. Retornarei assim que possível.' },
      ],
    },
  ]

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { path: { equals: page.path } },
      depth: 0,
      limit: 1,
      draft: true,
      overrideAccess: true,
      req,
    })
    if (existing.docs.length > 0) continue
    await payload.create({
      collection: 'pages',
      data: page as any,
      draft: true,
      overrideAccess: true,
      context: { skipSitePageRevalidation: true },
      req,
    })
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_contact_form" DROP CONSTRAINT "pages_blocks_contact_form_parent_id_fk";
    ALTER TABLE "_pages_v_blocks_contact_form" DROP CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk";
    DROP TABLE "pages_blocks_contact_form";
    DROP TABLE "_pages_v_blocks_contact_form";
  `)
}
