# Expansão de “O que construímos.” — estudo de design

11/10/2026. Pesquisa de referências para duas cenas dentro da seção existente: **identidade visual de marca** e **IA no WhatsApp com atendimento, gestão de equipe e CRM**. Após esta pesquisa, o usuário definiu logo SIDE no grid animado e conversa WhatsApp no mockup de celular fornecido. A implementação local e suas verificações estão em [services-expansion.md](../../validation/services-expansion.md); a aprovação visual para publicação segue pendente.

## O que a landing page já comunica

A Home apresenta uma sequência: introdução de falso erro e revelação da marca; trabalhos selecionados; demonstrações de serviços; confiança e razões para escolher a Side; convite final e contato. Os serviços aparecem somente após a fase final da Hero. A estrutura está em [HomeExperience.tsx](../../../src/features/home/HomeExperience.tsx) e [Services.tsx](../../../src/features/services/Services.tsx); a leitura integral do código e a inspeção visual desktop/mobile foram realizadas pelo agente principal nesta sessão.

O valor da seção atual está em mostrar uma capacidade por meio de uma peça própria: sites usam uma composição editorial com fita SVG e transformação de mensagem; produto usa uma interface demonstrativa com controles reais; integrações usam um terminal editorial. A [documentação de integração](integration.md) registra a aprovação anterior dessa sequência e a decisão de manter scroll natural, dissoluções locais e alternativas para reduced motion. Essas aprovações históricas não aprovam esta expansão.

**Inferência de design:** os novos serviços precisam de evidências visuais distintas e legíveis. Repetir o dashboard para IA ou apresentar identidade somente como um logotipo reduziria a diferença entre capacidades. O visitante deve reconhecer o que a Side entrega antes de precisar explorar controles.

## Referências primárias e o que elas sustentam

| Referência | Fato verificável | Aplicação proposta à Side |
| --- | --- | --- |
| [Studio Dumbar — Instagram](https://studiodumbar.com/work/instagram) | O case descreve um sistema de movimento coerente e flexível, com regras de física, aplicação aos elementos de marca e guidelines/templates. | Demonstrar identidade como um sistema: símbolo, tipo, cor e aplicações compartilham regras, inclusive no movimento. |
| [Unseen Studio](https://unseen.co/) | O estúdio se apresenta com brand, digital e motion. A página inclui entrada, opção sem áudio e exploração de um mundo. | Usar presença autoral e transições como referência de ambição visual; desenvolver a cena diretamente no fluxo da Side. |
| [Turn.io](https://www.turn.io/) | A Home atual se posiciona em saúde pelo WhatsApp e apresenta inbox compartilhado, automações de IA, jornadas e insights. | Mostrar atendimento e operação relacionados, com passagem compreensível entre conversa, equipe e acompanhamento. |
| [Linear](https://linear.app/) | A seção de intake descreve transformar conversas e feedback em itens acionáveis, encaminhados, rotulados e priorizados; a demonstração expõe status e responsável. | Usar poucos estados explícitos para evidenciar que uma conversa gera trabalho organizado. |

As quatro páginas oficiais acima foram verificadas com a ferramenta web nesta pesquisa. São referências de princípio e linguagem visual; suas soluções, identidade e textos não são propostas de reprodução literal.

O agente principal também verificou no navegador as páginas oficiais do Awwwards: [Turn.io](https://www.awwwards.com/sites/turn-io), Site of the Day em 07/06/2025, nota 7,32; [Unseen Studio](https://www.awwwards.com/sites/unseen-studio), Site of the Day em 06/02/2023, nota 7,99. A página de Unseen destaca galeria, transições, storytelling e 3D. Nesta rodada, a ferramenta web retornou timeout para ambas: a confirmação dos prêmios vem da consulta direta no navegador do agente principal. O site atual pode diferir da versão premiada. As notas não comprovam conversão, acessibilidade ou performance; não foram medidos tempos de animação, carregamento ou frames dessas referências.

## Três abordagens possíveis

| Abordagem | Força | Custo para esta Home |
| --- | --- | --- |
| **Composição editorial com demonstração funcional pequena — recomendada** | Combina impacto visual e evidência do serviço; a leitura principal funciona sem interação. | Exige escolher uma única história por cena e construir detalhes com cuidado. |
| Pôster cinematográfico com motion | Produz uma imagem marcante e permite continuidade visual. | Explica menos a gestão de atendimento, equipe e CRM; pode virar ornamentação. |
| Playground completo | Permite explorar regras e fluxos em profundidade. | Amplia a atenção e o comprimento exigidos em uma Home já narrativa; controles podem competir com o scroll. |

A recomendação é aplicar a primeira abordagem com linguagens distintas: identidade como peça editorial; IA como interface que demonstra uma consequência operacional.

## Cena de identidade visual: uma marca que vira sistema

**Direção definida pelo usuário:** usar a logo oficial da SIDE no centro de um grid de linhas animadas, acompanhada de paleta e tipografia. A proposta inicial de marca fictícia foi substituída por essa direção.

A cena começa com linhas de construção, eixo e círculos ao redor do símbolo SIDE. Na mesma composição, entram os quatro tons da paleta e a tipografia. O resultado final permite reconhecer os elementos de um mesmo sistema visual.

O movimento deve mostrar relação: uma forma gera alinhamentos, a cor conecta superfícies, a tipografia conserva sua hierarquia. Isso é uma adaptação proposta do princípio de coerência descrito pelo Studio Dumbar, não uma reprodução do case. Um único gesto opcional pode alternar aplicações ou uma variação expressiva; o núcleo se revela naturalmente durante a passagem pela cena.

Copy de trabalho: **“Identidade visual de marca.”** / **“Uma marca reconhecível. Em cada ponto de contato.”** O texto deve vender a entrega completa; os elementos visuais comprovam essa promessa. A composição final deve ter contraste e personalidade suficientes para continuar funcionando como imagem estática.

## Cena de IA: da conversa à operação

**Direção definida pelo usuário:** interface escura inspirada nas referências do WhatsApp fornecidas, com mensagens aparecendo dentro do mockup iPhone Air clay. Um resultado operacional sincronizado aparece ao lado. Verde sinaliza o canal; roxo SIDE, tipografia e superfícies seguem a linguagem da Home.

Uma pessoa pede atendimento. A IA identifica o assunto e responde a uma pergunta simples; a mesma pessoa aparece como contato no CRM, com etapa e próxima ação. Ao precisar de atendimento humano, a conversa recebe um responsável da equipe e um resumo contextual. O estado final mantém visíveis **conversa + etapa do CRM + responsável/próxima ação**. Assim, o serviço confirmado se manifesta em uma cadeia única: atendimento, organização comercial e gestão de equipe.

Desktop usa texto editorial à esquerda, celular central e três estados operacionais à direita: intenção, equipe e CRM. No mobile, essa composição vira uma sequência vertical com estados em três colunas abaixo do aparelho. Pausa e replay permitem rever o roteiro. A história é compreendida sem clique.

Copy de trabalho: **“Atendimento com IA. Gestão em sintonia.”** / **“WhatsApp, equipe e CRM conectados para dar continuidade a cada conversa.”** A identificação de IA e a passagem para uma pessoa devem ser claras. A demonstração pode usar roteiro e dados fictícios locais: não precisa de IA ao vivo nem coleta de dados. Esse é um limite de proposta, não uma alegação de implementação existente.

## Ordem, transições e adaptação

**Ordem recomendada, sujeita à validação:** Sites → Identidade visual → Produtos/software → Atendimento IA e gestão → Integrações. Mantém a entrada conhecida, conserva a precedência entre os três serviços atuais, coloca identidade perto da experiência digital e gestão perto do produto. A alternância entre composição e interface dá variedade, enquanto o terminal continua sendo o encerramento escuro antes de Social Proof.

Essa ordem exige redesenhar as transições locais entre os capítulos. A mudança para charcoal deve acontecer depois da cena de IA, na chegada às integrações. A entrada posterior de confiança precisa ser conferida com a sequência completa. Colocar identidade antes de sites também é possível, mas altera a entrada já aprovada e oferece menos preservação do ritmo atual; não é a recomendação desta etapa.

No mobile, identidade seleciona aplicações em escala legível e reorganiza a composição; IA apresenta a conversa e seu resultado em uma sequência vertical curta. Recortes podem priorizar conteúdo, mas o status final precisa permanecer compreensível. Não reduzir uma tela desktop inteira até transformar texto e controles em miniaturas. Reduced motion deve entregar um estado final significativo; cenas fora da viewport ou com aba oculta devem pausar. Interação por ponteiro complementa a leitura, e controles precisam funcionar por toque e teclado.

## Pontos concretos para uma implementação futura

- [Services.tsx](../../../src/features/services/Services.tsx) liga as três cópias e demos aos índices 0/1/2. A expansão requer identificar cada serviço por sua função e renumerar sua apresentação.
- [services.module.css](../../../src/features/services/services.module.css) associa o capítulo literal `3` ao tema escuro. Substituir essa dependência por identificador/tema evita escurecer produto quando a ordem mudar.
- [useServicesMotion.ts](../../../src/features/services/useServicesMotion.ts) pressupõe dashboard e atmosfera logo após produto. Preservar os controles e a pausa existentes, mas posicionar a passagem de atmosfera no novo final claro. É uma integração localizada, não uma refatoração geral.
- [home.module.css](../../../src/features/home/home.module.css) usa os sinais de contraste de Services e TrustChapter para a navbar. Conferir avanço e retorno do scroll na ordem proposta.
- [contact-content.ts](../../../src/features/contact/contact-content.ts) oferece `website`, `product`, `automation` e `unsure`. O [endpoint de contato](../../../src/app/api/contact/route.ts) reutiliza a validação e as escolhas para enviar o email. A entrada dos serviços deve ser acompanhada por opções PT/EN coerentes e valores aceitos em todo o fluxo.

Antes de escrever código de produto, consultar os guias relevantes da versão instalada em `node_modules/next/dist/docs/`, conforme [AGENTS.md](../../../AGENTS.md). A futura prévia deve permitir avaliar as duas cenas individualmente e a Home completa em desktop/mobile, PT/EN e reduced motion. Aprovação visual explícita continua necessária para push ou PR de mudanças visuais; manter a issue visual aberta enquanto aguarda. Este estudo não autoriza publicação.

## Evidência disponível e limites

O agente principal fez uma verificação pontual da Home atual em Edge/Chromium headless: desktop PT 1440×1000, mobile EN 390×844 e desktop PT com reduced motion. Nesses cenários não observou erros de página nem overflow horizontal; confirmou alternância de 30 para 7 dias, tabela com 7 linhas e fechamento por Escape. No contato, preencher nome e avançar por Enter levou à segunda pergunta; fechar retornou à âncora de contato. Nenhum formulário foi enviado nem chamada real de envio testada. Registro local: `C:/Users/vitol/AppData/Local/Temp/side-design-study/audit.json`.

Essa amostra estabelece contexto do estado atual, não valida cenas que ainda não existem nem substitui a matriz de revisão futura. Mobile foi emulado; Safari e aparelhos físicos não foram examinados. Performance e métricas de conversão não foram medidas. Os tempos e efeitos finais das novas cenas dependem de uma prévia funcional e revisão visual.
