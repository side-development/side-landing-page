# Why Side + Social Proof — estudo para a issue #10

Fonte de verdade: [issue #10](https://github.com/side-development/side-landing-page/issues/10). Stack: [issue #1](https://github.com/side-development/side-landing-page/issues/1).

Envio aprovado em 07/10/2026 com “pode subir”. A [entrega final](../../validation/why-side-social-proof/final.md) registra as decisões que substituem as propostas iniciais abaixo: Social Proof antes de Why Side, autoplay contínuo, título central original e entrada de 40svh com blur de 22px → 0.

Referências inspecionadas no navegador em 06/10/2026, antes da implementação. Vídeos consultados por amostragem de frames; capturas e arquivos de estudo locais em `artifacts/issue-10/` (ignorados pelo Git). Os timings abaixo são decisões iniciais da Side, sujeitas à revisão visual; não são timings medidos das referências.

## Workflow — Carousel / Testimonials

[Referência registrada](https://www.awwwards.com/inspiration/carousel-workflow)

Usar para:
- Hierarquia entre conteúdo, contexto e navegação lateral.
- Consulta da estrutura de carousel e das referências relacionadas de testimonials/social proof.

Não copiar:
- Layout de produto, interface de revisão, abas, avatares, nomes e identidade Workflow.
- A captura principal observada é uma interface de aprovação de trabalho; ela não estabelece a direção de blur solicitada pela Side.

Adaptação Side:
- Na fase 2, faixa de texto horizontal, sem bordas, painéis ou cards de produto.
- Feedback central nítido; contexto discreto; anterior e próximo presentes com profundidade e blur.

## Lemontree — Testimonials

[Referência registrada](https://www.awwwards.com/inspiration/testimonials-lemontree-studio)

Usar para:
- Separação clara entre headline e vozes dos clientes.
- Leitura do feedback antes de avançar; cadência do social proof durante o scroll.

Não copiar:
- Cards amarelos sobre preto, empilhamento vertical, avatares e nomes pessoais observados no vídeo.
- A orientação vertical dessa referência: a issue exige uma faixa horizontal.

Adaptação Side:
- Conservar espaço para uma fala por vez, com tipografia maior e metadados de tema/contexto.
- Usar exclusivamente as seis copies editoriais fornecidas e aprovadas pelo usuário na issue #10 atualizada, sem apresentá-las como testemunhos atribuídos.

## Oaksun — Silky Smooth Marquee Scroll

[Referência registrada](https://www.awwwards.com/inspiration/silky-smooth-marquee-scroll-oaksun-studio)

Usar para:
- Continuidade lateral, drag/swipe e desaceleração curta.
- Sensação de uma faixa que atravessa a área visível sem sobreposição vertical.

Não copiar:
- Marquee infinito, enorme texto contínuo, imagens intercaladas e identidade do estúdio.
- Movimento permanente enquanto o usuário tenta ler.

Adaptação Side:
- Faixa finita com snap e controles equivalentes por teclado; sem autoplay na proposta inicial.
- Não converter wheel vertical em navegação de depoimentos; preservar o scroll da página.
- Animar apenas o item central e vizinhos relevantes.
- Fase 2: navegação e snap de mouse em 0,9s com `power2.inOut`; swipe/inércia e scroll snap nativos em touch. Desktop usa largura de 40vw (máximo 680px) para conservar os vizinhos no campo visual.
- A distância horizontal ao centro reduz o blur de 20px para zero, aumenta a opacidade de 0,30 para 1 e a escala de 0,92 para 1. Estes parâmetros vêm da direção Side e da revisão local, não de medições da referência.
- Três entradas pintadas no máximo; atualizações apenas durante scroll, suspensas fora da viewport. Sem nova biblioteca de carousel ou animação.

Revisão do usuário após a fase 2:
- Reforçar o movimento de roleta horizontal: seis copies principais com dois vizinhos desfocados e retorno contínuo ao primeiro estado. Cópias nas duas extremidades permitem a continuidade; no máximo três camadas são pintadas. Sem rotação circular ou conteúdo por cima do anterior.
- Última revisão do autoplay: rotação lenta e constante, linear (`none`), equivalente a 12s por item e sem hold/delay. Hover mantém movimento; drag/swipe interrompe temporariamente e retoma após snap/inércia. Foco, pausa explícita, viewport/aba oculta e reduced motion suspendem movimento. Substitui a proposta anterior de hold 6,5s + deslocamento 5s e pausa em hover.
- Zona central nítida de 28% do espaçamento para cada lado: a leitura ocorre durante a passagem, sem parar a esteira. Fora dela, os vizinhos voltam gradualmente a 24px de blur e profundidade.
- Revisão de fluidez: curva quintic smootherstep para transitar sem quebra de velocidade visual do filtro na borda da zona nítida. Vizinhos fazem fade até 1,6 espaçamentos do centro; máximo de quatro camadas pintadas durante essa passagem, sem sumir de uma vez na troca de item ativo. Mantida a velocidade linear da esteira.
- Laterais: blur de 24px, opacidade de 0,44, escala de 0,82 e deslocamento vertical sutil de 16px. O deslocamento protagonista segue horizontal; profundidade vem de escala, contraste e blur.
- Removidas setas/contagem da composição. Teclado e controles acessíveis revelados em foco mantêm navegação e pausa equivalentes.
- Última revisão: aspas gráficas e palavras-chave semibold 600 roxas, sem alterar os textos editoriais aprovados. Bolinha original restaurada; indicador compacto com ícone vetorial claro substitui apenas o glifo do cursor ao passar no trilho. Cursor aprovado das demais seções preservado.

## WKNDHRS — Services Layout / Scroll Text Animation

[Referência registrada](https://www.awwwards.com/inspiration/services-layout-wkndhrs) · [Scroll Text Animation relacionado](https://www.awwwards.com/inspiration/scroll-text-animation-wkndhrs)

Usar para:
- Hierarquia tipográfica e relação entre posição no scroll e presença do texto.
- Observar entrada, leitura e saída como momentos diferentes.

Não copiar:
- Layout editorial em colunas, imagens, textos de serviços e identidade WKNDHRS.
- Deslocamento como efeito protagonista. O blur/foco da Side é uma escolha da issue.

Adaptação Side:
- Centro único no desktop; apenas um valor visível por vez.
- Revisão visual solicitada em 06/10: prefixo persistente `Você +` / `You +`, primeira palavra em bold; somente o termo variável recebe blur. Microcopy acompanha por fade.
- Segunda revisão: valores com inicial maiúscula e bold, em roxo `#3919BD`. A composição inteira fica centralizada pela largura real do estado visível; o prefixo continua nítido e se reposiciona suavemente durante a entrada do próximo termo.
- Sem reserva da largura de Excelência/Excellence: a composição final não herda espaço vazio dos termos maiores. Marca original Side preta, apenas o ponto roxo, alinhada à baseline do texto.
- Ciclo inicial: 42% foco gradual, 28% leitura nítida, 26% desfoco de saída, 4% respiro.
- No quinto estado, os 58% finais são hold: a marca permanece legível até a saída natural do stage. Em 07/10, o usuário inverteu os capítulos: Social Proof passa a anteceder Why Side, cujo estado final prepara o futuro CTA, fora do escopo desta issue.
- Desktop: percurso de 500svh para cinco estados em um stage sticky de 100svh, sem interceptar wheel. Revisão “deixe mais lento e aprove!” ampliou o percurso anterior de 360svh e o scrub de 0,65s para 0,9s.
- Mobile/tablet até 800px e telas baixas: cinco trechos naturais de 96svh, sem sticky/pin; blur menor e hold amplo. Scrub ampliado de 0,4s para 0,55s, sem prolongar pinning.
- Reduced motion: cinco estados no fluxo normal, apenas opacidade, sem blur ou pinning.
- Estado final usa a geometria original do componente `BrandWordmark`, sem aproximar a marca com uma fonte.

## Base aprovada / escopo da fase 1

- `main` sincronizada com `origin/main`: `24b6d3e0336078acfd2fcda136620222466aa7ca`, após Services.
- Revisados os componentes, hooks e estilos de Hero, Selected Work, Services, cursor e scroll, além da Home no navegador.
- Guias locais do Next 16.3.8 consultados: Layouts and Pages (incluindo `params` assíncronos), Server and Client Components e CSS Modules.
- Implementação nova isolada em `src/features/why-side/` e rota de revisão em desenvolvimento; Home permanece na versão aprovada durante esta fase.
- Nenhuma dependência adicionada. Nenhum push/PR antes da aprovação visual explícita. Issue permanece aberta.

## Integração aprovada para execução em 07/10

- Ordem solicitada pelo usuário: Hero → Selected Work → Services → Social Proof → Why Side.
- A roleta mantém o movimento contínuo lento e as laterais desfocadas aprovados. Depois dela, a primeira frase de Why Side ganha foco pelo scroll natural, sem page transition.
- Why Side conserva os cinco estados, o prefixo nítido, as palavras bold roxas e a marca original preta com ponto roxo. “Você + Side” encerra esta entrega e prepara o CTA futuro.
- A composição da Home recebe apenas o novo capítulo e a condição que restaura navegação/logo/scrollbar no fundo branco. Os componentes Hero, Work e Services permanecem intactos.
- Evidências da Home completa: [integração e validação](../../validation/why-side-social-proof/integration.md).

## Revisão da entrada do capítulo em 07/10

- Título de Social Proof lateralizado pelo padrão já aprovado de Trabalhos selecionados: margens, escala tipográfica, tracking e entrelinha iguais, sem alterar Work.
- Pedido posterior do usuário acrescenta uma transição de fundo preto → branco antes do conteúdo. Um trecho vazio de 100svh no fluxo natural controla a cor; 68% para clarear, respiro até76%, 24% finais para revelar título e faixa por opacity.
- O timing mantém uma ideia por vez e o caráter calmo registrado nas referências. Sem objetos, overlay ou pin novo. A roleta conserva o autoplay e o blur aprovados.
- [Evidências atuais da entrada](../../validation/why-side-social-proof/entrance-revision.md).
