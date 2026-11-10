# 📖 Manual do Painel de Controle (CMS) — Marcio Rogério

Este guia prático foi criado para orientar você no uso diário do painel administrativo do seu site imobiliário (**Payload CMS**). Aqui você aprenderá como adicionar fotos, vídeos de empreendimentos, cadastrar novos imóveis e gerenciar seus contatos.

---

## 🚀 1. Como Acessar o Painel

* **Endereço Local:** [http://localhost:3000/admin](http://localhost:3000/admin)
* **Login:** Utilize o seu e-mail e senha cadastrados no primeiro acesso.
* **Idioma:** O painel está totalmente em Português (PT-BR).

---

## 🧩 2. Editor visual das páginas

Em **Construtor visual > Páginas visuais**, há rascunhos iniciais para Início, Comprar, Investir, Empreendimentos, Vender, Conteúdo, Sobre, Contato e Privacidade. Abra um rascunho para editar textos, imagens e seções; arraste os blocos para mudar a ordem. A prévia ao vivo mostra as alterações antes da publicação; use os botões de celular, tablet e computador para conferir os tamanhos.

Seções disponíveis: abertura/banner, texto, imagem com texto, galeria, vitrine de imóveis/empreendimentos/artigos, chamada para contato, newsletter e formulário de contato. Os campos de título e texto da newsletter aparecem no site. Ao publicar uma página, ela passa a ocupar o endereço escolhido. Enquanto estiver em rascunho, a página atual continua no ar. A página de Privacidade é um rascunho e deve ser revisada e completada pelo responsável antes de ser publicada.

Imóveis, empreendimentos e artigos continuam sendo cadastrados nas áreas próprias do CMS; o bloco **Vitrine de conteúdo** apenas escolhe qual coleção mostrar e quantos itens aparecem.

---

## 🎬 3. Banner Principal: Fotos e Vídeos de Empreendimentos

O banner do topo da página inicial agora permite exibir **fotos em alta resolução** ou **vídeos cinematográficos dos empreendimentos em loop**.

### Onde fica:
No menu lateral esquerdo, role até o final e clique em:  
👉 **Institucional > Identidade e contato**

### Opção A — Vídeo de Fundo Principal (Efeito Cinematográfico em Loop)
Se você tem um vídeo geral de apresentação ou drone de empreendimentos:
1. Localize o campo **"Vídeo principal do Banner (opcional)"**;
2. Faça o upload do arquivo em formato **`.mp4`** ou **`.webm`**;
3. *(Ou se o vídeo estiver hospedado na nuvem, cole o link direto no campo "Ou URL externa do vídeo")*;
4. Clique em **Salvar alterações** no topo direito. O vídeo rodará automaticamente no fundo da página inicial sem áudio e em loop suave!

### Opção B — Carrossel de Slides (Alternando Fotos e Vídeos)
Você pode cadastrar até 6 slides que o visitante pode navegar pelas setas:
1. No campo **"Slides de abertura (Fotos ou Vídeos de Empreendimentos)"**, clique em **Adicionar** (ou no símbolo **`+`**);
2. Escolha o **Tipo de mídia**:
   * **Fotografia:** Faça o upload da imagem de fachada ou interior;
   * **Vídeo (MP4):** Faça o upload do clipe de vídeo do empreendimento;
3. Preencha o campo **"Legenda / Nome do Empreendimento"** (ex: *"Residencial Lumina — Barra da Tijuca"*);
4. Clique em **Salvar alterações**.

---

## 📸 4. Central de Mídia (`Media`)

O menu **Media** (segundo item no topo do menu lateral) funciona como a sua biblioteca geral de arquivos:
* **Para subir arquivos em lote:** Clique em **Media** > botão azul **Criar Novo**;
* Você pode subir imagens (JPG, PNG, WEBP) e vídeos (MP4);
* Ao enviar, preencha o campo **Alt** com uma breve descrição (ex: *"Fachada Edifício Horizonte"*);
* Uma vez na biblioteca, você pode reutilizar a mesma foto ou vídeo em qualquer imóvel, banner ou artigo sem precisar subir de novo.

---

## 🏡 5. Cadastrar Imóveis e Empreendimentos

Para adicionar imóveis à sua curadoria ou novos lançamentos na planta:

1. No menu lateral, acerte a seção **Curadoria Imobiliária**:
   * Clique em **Imóveis selecionados** (imóveis prontos, revendas, coberturas, casas);
   * Ou em **Empreendimentos** (lançamentos, projetos em obras ou na planta);
2. Clique no botão azul **Criar Novo**;
3. Preencha as informações principais:
   * **Título:** (ex: *"Apartamento com Vista Mar na Vieira Souto"*);
   * **Slug:** Gerado automaticamente a partir do título (ex: `apartamento-vista-mar`);
   * **Preço:** Valor de venda (ou deixe em branco se for sob consulta);
   * **Bairro / Cidade:** Localização do imóvel;
   * **Área Privativa:** Metragem em m²;
   * **Quartos, Suítes e Vagas:** Quantidades numéricas;
   * **Fotografia Principal:** Foto de capa do card;
   * **Galeria de Fotos:** Todas as fotos internas do imóvel;
   * **Tour Virtual 360°:** Cole o link do tour imersivo (Matterport, Kuula, Banib, etc.). Um botão especial *"Tour Virtual 360°"* com visualizador embutido aparecerá na página do imóvel!
   * **Vídeo do Imóvel:** Cole o link do vídeo (YouTube, Vimeo ou MP4). Um botão *"Vídeo do Imóvel"* aparecerá na página;
   * **Destaques / Tags:** Diferenciais (ex: *"Piscina privativa"*, *"Varanda gourmet"*);
4. **Publicação:**
   * No canto superior direito, certifique-se de que o status esteja marcado como **Publicado**;
   * Clique em **Salvar**;
5. O imóvel entrará automaticamente no ar na página **/comprar** ou **/empreendimentos**!

---

## 👤 5. Sua Biografia e Foto de Perfil (Página "Sobre")

Para que seus clientes conheçam sua experiência e credenciais:
1. Vá em **Institucional > Identidade e contato**;
2. Role até:
   * **Retrato profissional / imagem institucional:** Envie sua melhor foto de terno/apresentação de perfil;
   * **Trajetória profissional:** Escreva sobre seus anos de mercado, especialidades e conquistas;
   * **Filosofia de trabalho:** Sua abordagem ética, discrição e atendimento consultivo;
3. Clique em **Salvar alterações**.

---

## 📬 6. Onde chegam os Contatos e Leads dos Clientes

Quando um cliente preenche os formulários do site (*"Vamos conversar"*, proposta de compra, solicitação de avaliação para venda de imóvel ou download de material):
1. O formulário não é público: nenhum concorrente ou visitante vê os dados;
2. Os dados caem diretamente no painel em:
   👉 **Relacionamento > Solicitações de atendimento**;
3. Lá você verá:
   * Nome do cliente;
   * WhatsApp e E-mail;
   * Tipo de interesse (compra, venda, investimento);
   * Mensagem e data do contato;
4. Em **Assinantes da newsletter**, você tem a lista de e-mails de quem pediu para receber as novidades da sua consultoria.

---

## 💡 Dicas de Boas Práticas

1. **Fotos com Boa Iluminação:** Fotos horizontais com luz natural valorizam muito o padrão dos imóveis.
2. **Vídeos Curtos para o Banner:** Para vídeos de fundo no banner, clipes de **10 a 30 segundos** em resolução 1080p (Full HD) compactados em MP4 são ideais para carregar rápido até no 4G/5G do celular.
3. **WhatsApp Sempre com DDD:** Em *Identidade e contato*, certifique-se de preencher apenas números (ex: `5521999999999`), para que os links de conversa direta funcionem em qualquer celular.

