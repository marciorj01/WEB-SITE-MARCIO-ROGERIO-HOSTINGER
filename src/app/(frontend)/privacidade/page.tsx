import { renderVisualPage } from '@/components/visual-page'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs, Eyebrow, container } from '@/components/ui'

export const metadata: Metadata = { title: 'Privacidade e proteção de dados | Marcio Rogério' }
export default async function PrivacyPage() {
  const visualPage = await renderVisualPage('/privacidade')
  if (visualPage) return visualPage
  return (
    <main id="main-content" className={`${container} pt-9 pb-24`}>
      <Breadcrumbs items={[{ label: 'Privacidade' }]} />
      <article className="mx-auto mt-14 max-w-3xl">
        <Eyebrow className="mb-6">Transparência também é cuidado</Eyebrow>
        <h1 className="font-display text-[48px] leading-tight md:text-[62px]">
          Privacidade e<br />
          <em>proteção de dados.</em>
        </h1>
        <p className="mt-7 border-l-2 border-champagne bg-sand p-5 text-xs leading-7 text-muted">
          Texto provisório para este projeto de demonstração. A identificação do controlador, o
          canal de atendimento de direitos e as regras definitivas devem ser revisados e preenchidos
          pelo responsável antes do uso comercial.
        </p>
        <div className="article-prose mt-10">
          <h2>O que registramos</h2>
          <p>
            Nos formulários de atendimento, são registrados os dados que você informar: nome,
            e-mail, telefone, objetivo do contato e informações opcionais sobre o imóvel. Na
            newsletter, registramos nome, e-mail e a sua autorização para receber conteúdo.
          </p>
          <h2>Para que utilizamos os dados</h2>
          <p>
            As solicitações são utilizadas para compreender seu interesse e permitir que a equipe dê
            continuidade ao atendimento. O consentimento da newsletter é específico para conteúdo
            editorial. O envio de uma solicitação não equivale à assinatura de uma newsletter.
          </p>
          <h2>Quem pode acessar</h2>
          <p>
            Solicitações e assinaturas não ficam disponíveis publicamente. O acesso é restrito aos
            responsáveis autorizados no painel de gestão. O serviço utiliza a infraestrutura do
            Figma Make e do Payload para armazenamento e operação.
          </p>
          <h2>Seu controle sobre os dados</h2>
          <p>
            Você pode solicitar informações, correção, exclusão ou revogação do consentimento.
            Enquanto o contato oficial não estiver configurado, utilize o{' '}
            <Link href="/contato">formulário de atendimento</Link> com o assunto “Privacidade” para
            registrar a solicitação.
          </p>
          <h2>Newsletter e comunicações</h2>
          <p>
            Este projeto registra a intenção de receber conteúdos. O envio de campanhas não é
            automático: dependerá da configuração de um serviço de comunicação e da revisão dos
            procedimentos de descadastro antes do lançamento comercial.
          </p>
          <h2>Cookies e serviços externos</h2>
          <p>
            Os formulários públicos não exigem criação de conta. A tipografia é servida pelo próprio
            site, sem conexão com serviços externos de fontes. Se o responsável ativar ferramentas
            de análise ou publicidade, esta política e os controles de consentimento deverão ser
            atualizados conforme a legislação aplicável.
          </p>
          <h2>Retenção e segurança</h2>
          <p>
            Os dados devem ser mantidos pelo tempo necessário às finalidades informadas e às
            obrigações legais aplicáveis. Cabe ao responsável definir e executar prazos de retenção
            e revisão de acessos antes da operação comercial.
          </p>
        </div>
      </article>
    </main>
  )
}
