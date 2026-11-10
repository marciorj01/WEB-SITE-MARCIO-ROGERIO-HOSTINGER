import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "brand" ADD COLUMN "home_collection_eyebrow" varchar DEFAULT 'Uma seleção, não apenas uma busca';
  ALTER TABLE "brand" ADD COLUMN "home_collection_title" varchar DEFAULT 'Imóveis com identidade.';
  ALTER TABLE "brand" ADD COLUMN "home_collection_title_emphasis" varchar DEFAULT 'Escolhas com significado.';
  ALTER TABLE "brand" ADD COLUMN "home_collection_link_label" varchar DEFAULT 'Conheça a curadoria completa';
  ALTER TABLE "brand" ADD COLUMN "home_collection_empty_title" varchar DEFAULT 'Uma nova seleção está sendo preparada.';
  ALTER TABLE "brand" ADD COLUMN "home_collection_empty_text" varchar DEFAULT 'Converse com nossa consultoria para encontrar referências alinhadas ao seu momento.';
  ALTER TABLE "brand" ADD COLUMN "home_collection_empty_link_label" varchar DEFAULT 'Solicitar atendimento';
  ALTER TABLE "brand" ADD COLUMN "home_collection_footer_text" varchar DEFAULT 'Para cada momento de vida, um jeito de morar. Descubra o que faz sentido para o seu.';
  ALTER TABLE "brand" ADD COLUMN "home_collection_footer_emphasis" varchar DEFAULT 'O essencial é pessoal.';
  ALTER TABLE "brand" ADD COLUMN "home_segment_first_label" varchar DEFAULT 'Primeiro imóvel';
  ALTER TABLE "brand" ADD COLUMN "home_segment_medium_label" varchar DEFAULT 'Médio padrão';
  ALTER TABLE "brand" ADD COLUMN "home_segment_high_label" varchar DEFAULT 'Alto padrão';
  ALTER TABLE "brand" ADD COLUMN "consulting_eyebrow" varchar DEFAULT 'A perspectiva Vértice';
  ALTER TABLE "brand" ADD COLUMN "consulting_image_eyebrow" varchar DEFAULT 'Nosso ponto de vista';
  ALTER TABLE "brand" ADD COLUMN "consulting_image_caption" varchar DEFAULT 'O valor está no olhar.';
  ALTER TABLE "brand" ADD COLUMN "consulting_title" varchar DEFAULT 'Não é sobre encontrar um imóvel.';
  ALTER TABLE "brand" ADD COLUMN "consulting_title_emphasis" varchar DEFAULT 'É sobre reconhecer o seu lugar.';
  ALTER TABLE "brand" ADD COLUMN "consulting_text" varchar DEFAULT 'Entendemos que uma decisão imobiliária envolve muito mais do que metros quadrados. Envolve planos, patrimônio e o jeito como você quer viver.';
  ALTER TABLE "brand" ADD COLUMN "consulting_secondary_text" varchar DEFAULT 'Por isso, combinamos escuta, curadoria e visão de mercado para acompanhar cada escolha com a atenção que ela merece.';
  ALTER TABLE "brand" ADD COLUMN "consulting_link_label" varchar DEFAULT 'Conheça o nosso olhar';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_collection_eyebrow" varchar DEFAULT 'Uma seleção, não apenas uma busca';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_collection_title" varchar DEFAULT 'Imóveis com identidade.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_collection_title_emphasis" varchar DEFAULT 'Escolhas com significado.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_collection_link_label" varchar DEFAULT 'Conheça a curadoria completa';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_collection_empty_title" varchar DEFAULT 'Uma nova seleção está sendo preparada.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_collection_empty_text" varchar DEFAULT 'Converse com nossa consultoria para encontrar referências alinhadas ao seu momento.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_collection_empty_link_label" varchar DEFAULT 'Solicitar atendimento';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_collection_footer_text" varchar DEFAULT 'Para cada momento de vida, um jeito de morar. Descubra o que faz sentido para o seu.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_collection_footer_emphasis" varchar DEFAULT 'O essencial é pessoal.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_segment_first_label" varchar DEFAULT 'Primeiro imóvel';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_segment_medium_label" varchar DEFAULT 'Médio padrão';
  ALTER TABLE "_brand_v" ADD COLUMN "version_home_segment_high_label" varchar DEFAULT 'Alto padrão';
  ALTER TABLE "_brand_v" ADD COLUMN "version_consulting_eyebrow" varchar DEFAULT 'A perspectiva Vértice';
  ALTER TABLE "_brand_v" ADD COLUMN "version_consulting_image_eyebrow" varchar DEFAULT 'Nosso ponto de vista';
  ALTER TABLE "_brand_v" ADD COLUMN "version_consulting_image_caption" varchar DEFAULT 'O valor está no olhar.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_consulting_title" varchar DEFAULT 'Não é sobre encontrar um imóvel.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_consulting_title_emphasis" varchar DEFAULT 'É sobre reconhecer o seu lugar.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_consulting_text" varchar DEFAULT 'Entendemos que uma decisão imobiliária envolve muito mais do que metros quadrados. Envolve planos, patrimônio e o jeito como você quer viver.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_consulting_secondary_text" varchar DEFAULT 'Por isso, combinamos escuta, curadoria e visão de mercado para acompanhar cada escolha com a atenção que ela merece.';
  ALTER TABLE "_brand_v" ADD COLUMN "version_consulting_link_label" varchar DEFAULT 'Conheça o nosso olhar';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "brand" DROP COLUMN "home_collection_eyebrow";
  ALTER TABLE "brand" DROP COLUMN "home_collection_title";
  ALTER TABLE "brand" DROP COLUMN "home_collection_title_emphasis";
  ALTER TABLE "brand" DROP COLUMN "home_collection_link_label";
  ALTER TABLE "brand" DROP COLUMN "home_collection_empty_title";
  ALTER TABLE "brand" DROP COLUMN "home_collection_empty_text";
  ALTER TABLE "brand" DROP COLUMN "home_collection_empty_link_label";
  ALTER TABLE "brand" DROP COLUMN "home_collection_footer_text";
  ALTER TABLE "brand" DROP COLUMN "home_collection_footer_emphasis";
  ALTER TABLE "brand" DROP COLUMN "home_segment_first_label";
  ALTER TABLE "brand" DROP COLUMN "home_segment_medium_label";
  ALTER TABLE "brand" DROP COLUMN "home_segment_high_label";
  ALTER TABLE "brand" DROP COLUMN "consulting_eyebrow";
  ALTER TABLE "brand" DROP COLUMN "consulting_image_eyebrow";
  ALTER TABLE "brand" DROP COLUMN "consulting_image_caption";
  ALTER TABLE "brand" DROP COLUMN "consulting_title";
  ALTER TABLE "brand" DROP COLUMN "consulting_title_emphasis";
  ALTER TABLE "brand" DROP COLUMN "consulting_text";
  ALTER TABLE "brand" DROP COLUMN "consulting_secondary_text";
  ALTER TABLE "brand" DROP COLUMN "consulting_link_label";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_collection_eyebrow";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_collection_title";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_collection_title_emphasis";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_collection_link_label";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_collection_empty_title";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_collection_empty_text";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_collection_empty_link_label";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_collection_footer_text";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_collection_footer_emphasis";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_segment_first_label";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_segment_medium_label";
  ALTER TABLE "_brand_v" DROP COLUMN "version_home_segment_high_label";
  ALTER TABLE "_brand_v" DROP COLUMN "version_consulting_eyebrow";
  ALTER TABLE "_brand_v" DROP COLUMN "version_consulting_image_eyebrow";
  ALTER TABLE "_brand_v" DROP COLUMN "version_consulting_image_caption";
  ALTER TABLE "_brand_v" DROP COLUMN "version_consulting_title";
  ALTER TABLE "_brand_v" DROP COLUMN "version_consulting_title_emphasis";
  ALTER TABLE "_brand_v" DROP COLUMN "version_consulting_text";
  ALTER TABLE "_brand_v" DROP COLUMN "version_consulting_secondary_text";
  ALTER TABLE "_brand_v" DROP COLUMN "version_consulting_link_label";`)
}
