import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: 'pages',
    where: { path: { equals: '/privacidade' } },
    depth: 0,
    limit: 1,
    draft: true,
    overrideAccess: true,
    req,
  })

  if (existing.docs.length > 0) return

  await payload.create({
    collection: 'pages',
    draft: true,
    overrideAccess: true,
    context: { skipSitePageRevalidation: true },
    req,
    data: {
      title: 'Privacidade — rascunho visual',
      path: '/privacidade',
      sections: [
        {
          blockType: 'hero',
          eyebrow: 'Transparência também é cuidado',
          title: 'Privacidade e',
          emphasis: 'proteção de dados.',
          text: 'Rascunho para revisão do responsável antes da publicação. Confira e complete os dados de identificação, contato, serviços e prazos aplicáveis.',
          tone: 'ivory',
        },
        {
          blockType: 'editorial',
          title: 'O que registramos',
          text: 'Nos formulários de atendimento, são registrados os dados que você informar: nome, e-mail, telefone, objetivo do contato e informações opcionais sobre o imóvel. Na newsletter, registramos nome, e-mail e sua autorização para receber conteúdo.',
          alignment: 'left',
          tone: 'paper',
        },
        {
          blockType: 'editorial',
          title: 'Para que utilizamos os dados',
          text: 'As solicitações são utilizadas para compreender seu interesse e permitir que a equipe dê continuidade ao atendimento. O consentimento da newsletter é específico para conteúdo editorial. O envio de uma solicitação não equivale à assinatura de uma newsletter.',
          alignment: 'left',
          tone: 'ivory',
        },
        {
          blockType: 'editorial',
          title: 'Quem pode acessar',
          text: 'Solicitações e assinaturas não ficam disponíveis publicamente. O acesso é restrito aos responsáveis autorizados no painel de gestão. Antes da publicação, informe com precisão os fornecedores e serviços que processam dados neste site.',
          alignment: 'left',
          tone: 'paper',
        },
        {
          blockType: 'editorial',
          title: 'Seu controle sobre os dados',
          text: 'Você pode solicitar informações, correção, exclusão ou revogação do consentimento. Use o formulário de atendimento com o assunto “Privacidade” para registrar uma solicitação. Complete esta seção com o canal e os procedimentos oficiais antes da publicação.',
          alignment: 'left',
          tone: 'ivory',
        },
        {
          blockType: 'editorial',
          title: 'Newsletter e comunicações',
          text: 'A inscrição registra a intenção de receber conteúdos. O envio de campanhas depende da configuração de um serviço de comunicação e de procedimentos de descadastro. Atualize esta política se esses serviços forem ativados.',
          alignment: 'left',
          tone: 'paper',
        },
        {
          blockType: 'editorial',
          title: 'Cookies, retenção e segurança',
          text: 'Os formulários públicos não exigem criação de conta. Se forem ativadas ferramentas de análise, publicidade ou outros serviços externos, revise esta política e os controles correspondentes. Defina também os prazos de retenção e a revisão de acessos antes da operação comercial.',
          alignment: 'left',
          tone: 'ivory',
        },
        {
          blockType: 'cta',
          title: 'Ficou com alguma dúvida?',
          text: 'Entre em contato para tratar de uma solicitação relacionada aos seus dados.',
          linkLabel: 'Ir para contato',
          linkUrl: '/contato',
          tone: 'navy',
        },
      ],
    } as any,
  })
}

// The seeded draft may be edited after deployment, so rollback intentionally preserves it.
export async function down(_args: MigrateDownArgs): Promise<void> {}
