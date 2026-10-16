# Services — referência e direção (#17)

15/10/2026. Fontes lidas: issues #17 e #1 (incluindo comentários), AGENTS.md, cinco serviços da Home e Work em `origin/main` (`1f17d85`, PR #16). As duas referências externas foram abertas e vistas no Edge/Chromium; capturas locais em `%TEMP%/side-services-page/`.

## A — [Editorial Service List / Redesignee](https://redesignee.com/items/Editorial-Service-List/1219)

- **Usar para:** hierarquia baseada em tipografia, linhas numeradas e separadores finos; deslocamento curto no hover. O preview foi inspecionado, incluindo o iframe `public/demo/animating-links.html`.
- **Não copiar:** fonte, composição exata, código do widget ou plataforma de customização.
- **Adaptação Side:** cinco categorias reais, linguagem da Work e seleção explícita. Conteúdo comercial permanece disponível por clique e teclado; hover é apenas feedback.

## B — [Services / Outline2Design — Awwwards](https://www.awwwards.com/inspiration/services-outline2design-1)

- **Usar para:** escala das linhas, indicação do serviço ativo e sensação de exploração. Página e vídeo de referência inspecionados no browser (o leitor textual externo retornou timeout).
- **Não copiar:** fundo preto, amarelo, imagens flutuantes, navegação e arte. Nenhuma mídia externa incorporada.
- **Adaptação Side:** painel editorial sem caixa ao lado do índice no desktop. Texto e entregas ocupam o lugar de uma demonstração. Roxo apenas no estado ativo e ações.

## C — Home, Work e encerramento da Side

- **Usar para:** Arial, tracking fechado, títulos grandes, ponto roxo, navbar e sublinhados desenhados, cursor Side e rodapé aprovado.
- **Não copiar:** intro cinematográfica, demos da Home e galerias da Work.
- **Adaptação Side:** navegação Work existente recebe apenas a identificação da página atual; rodapé reutilizado com destinos de idioma explícitos. CTA editorial usa as camadas glass existentes e leva ao mesmo Contact Flow.

## Decisões de implementação

- Uma página editorial no fluxo de páginas internas existente. Dois slugs localizados, metadados e redirects seguem o padrão Contact/Work. Sem dependências novas. Após o refinamento pedido em 15/10, a intro reutiliza diretamente o CSS de Work: um único texto alinhado à direita. Intro e corpo recebem chegada GSAP de 750ms, blur14/y16, com intervalo de120ms e reversão imediata se reduced motion for ativado.
- Um serviço aberto inicialmente. Seleção exclusiva com botão, `aria-expanded`, `aria-controls`, região nomeada e `inert` nos detalhes fechados. No desktop o detalhe está à direita; no mobile fica imediatamente abaixo do respectivo título. Mesmo conteúdo e mesma árvore DOM.
- Transições CSS curtas de opacidade/6px e expansão local. Reduced motion mostra os estados diretamente. Sem scroll hijacking ou novo demo. Cinco composições SVG locais referenciam os materiais da Home: janela de site e escultura geométrica; marca oficial, paleta e tipografia; produto com gráfico; fragmento de conversa e handoff; encaixe de peças sob medida. Pequena chegada de camadas e traçados, sem loops. Painéis fechados não animam.
- IA: fundo sólido lavanda; balões de430×84 no mesmo tamanho e texto17px na escala do desenho. Cliente aparece primeiro, resposta depois, fluxo por último. Sequência reinicia ao reabrir e reduced motion mostra tudo imediatamente, sem alterar a geometria.
- Integrações: o usuário rejeitou a direção de hub/nós como genérica. A composição final explora fabricação e encaixe sob medida: três peças com recortes próprios, preto/porcelana/roxo, linhas de referência e marca Side na peça de adaptação. Sem diagrama de rede ou cartões de API; montagem curta ao selecionar, sem repetição.
- Textos separados e cinco itens tipados por idioma. Os nomes e territórios da Home foram preservados; a introdução de integrações foi abreviada, mantendo o escopo nas entregas e no problema.
- Na revisão de 15/10, o usuário retirou processo, mini-CTA, cabeçalho do índice, contador, links por serviço e nota/link de encerramento. O contato continua acessível na navbar e no rodapé aprovado. Sem números comerciais, SLA, prazo ou preço inventado. IA apresentada como possibilidade de serviço, sem transformar a demonstração fictícia em case.
- Integração mínima: navegação Home/Work/Serviços e rodapé. A página atual mantém `aria-current` sem sublinhado persistente ou hover que o prenda após a seleção. O usuário também pediu o rodapé na Work; o componente existente é reutilizado com slugs de idioma corretos e oculta a navbar quando ocupa a viewport. O case Computer Vision recebeu três imagens fornecidas e texto revisto, documentado em `docs/validation/computer-vision-update.md`.
- Aprovação visual explícita e autorização de envio recebidas em15/10 após os refinamentos. A observação sobre o primeiro scroll foi reproduzida em Work e corrigida para revelar o primeiro projeto na montagem. Histórico dividido por responsabilidade; revisão e integração via PR, sem merge automático.
