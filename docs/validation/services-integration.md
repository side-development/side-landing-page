# Issue #8 — checkpoint 4 / integração

Status: **Ready for review** deste checkpoint; aprovação final da issue pendente. Entrega local, sem push/PR ou fechamento.

## Implementado

- Services após Selected Work, com headline e três serviços na ordem/copy da #8.
- Experiência editorial aprovada, abertura pelo scroll, texto preto e gradiente roxo→vermelho, com dissolução para o produto.
- Dashboard aprovado em tamanho de uma página; período, hover verde sem scale, charts interativos, modal e dados ilustrativos preservados.
- Pausa dos charts/construção ao abandonar o capítulo; a dissolução funciona também após trocar o período.
- Mudança gradual do fundo inteiro para charcoal antes do terminal, sem panel cobrindo o dashboard.
- Terminal aprovado centralizado, com espaço externo, typing finito e bloco MCP de uma vez; interface interna em inglês nos dois locales.
- Navbar transparente preservada; contraste claro e asset branco oficial no trecho escuro, mantendo o ponto roxo.
- Prévia integrada em PT/EN, mantendo as três prévias isoladas/replays para revisão.
- Mobile sem sticky/cursor; reduced motion com fluxo natural, fades curtos, dados estáticos e transcript final sem typing intenso.
- Refinamento de 06/10: título/subtítulo próximos, entrada no centro da viewport e subida pelo scroll natural, com gatilho compartilhado e fade/blur principal de 1,8 s nas três partes.
- Scrollbar adaptada gradualmente ao trecho escuro; seleção global roxa `#3919BD` com letras brancas.
- Replay no fluxo da Hero, abaixo da copy; headline Services com o mesmo tamanho responsivo de Selected Work.
- Última revisão: toda a primeira demonstração percorre o fluxo natural, sem sticky ou espaço artificial. A troca de copy/cor e abertura das linhas acontecem durante essa passagem.
- Mobile até 800 px: gráfico final de conversão oculto/pausado, mantendo KPIs, receita, origem e controles; desktop conserva sua composição completa.

## Validação técnica e de navegador

- `npm run lint`: pass.
- `npm run typecheck`: pass.
- `npm run build`: pass.
- Não existe suite npm de testes neste repositório. Validação dirigida por Playwright/Edge headless, com dependências de QA temporárias fora do projeto; nenhuma dependência adicionada ao package.json.
- Oito configurações: 1440×900 PT, 1920×1080 EN, 1366×768 PT, 390×844 PT touch, 320×568 EN touch, 768×1024 PT touch, reduced desktop PT e reduced mobile EN.
- Copy/ordem, abertura/reversão, pausa/retomada dos charts, hover sem mudança de tamanho, dropdown, modal dentro da viewport, cursor/fallback, janela central e overflow horizontal: pass. Console/hydration da sequência isolada: sem erros/warnings capturados.
- Home PT/EN, mobile e reduced: estrutura aprovada Hero/Work, entrada Services, troca para 7 dias por teclado, modal/foco/Escape, dissolução após trocar dados, navbar fixa/transparente, reversão e replay desmontando demos: pass.
- Primeira visita com intro completa e visita repetida na sessão: pass.
- React Strict Mode: cinco desmontagens durante animação, sem timelines/ScrollTriggers/listeners locais remanescentes; Services inativo sem demo DOM/timelines; reduced motion dinâmico, resize e retorno: pass.
- Produção local: Home PT/EN com Services, terminal e navbar corretos; rotas de review retornam 404. Sem erros/hydration capturados.
- Inspeção visual dos frames desktop/mobile e dos estados finais realizada. Dispositivos físicos, Safari/Firefox e julgamento criativo final ainda não foram validados.
- Refinamento: quatro configurações (desktop PT, desktop EN, mobile PT, reduced PT) confirmam título entrando a até 30 px do centro, subida contínua de 240 px durante wheel, subtítulo a 16–20 px, recuperação do fundo/scrollbar e seleção branca sobre roxo. A duração comum preserva a cadência interna das demonstrações.
- A Home em desenvolvimento emitiu um aviso LCP do Next para `/work/owl/owl-still.webp` em alguns saltos rápidos de QA. Está registrado separadamente nos JSONs; não é erro de console/hydration e não aparece na produção local. O carregamento da mídia da seção aprovada Selected Work não foi alterado neste refinamento.
- A checagem dinâmica de reduced motion teve resultados intermitentes com espera fixa de 1,6 s sob execuções concorrentes. O harness passou a aguardar o estado final real (limite de 5 s), sem alterar a animação para satisfazer o teste. Cleanup, retorno e restauração das propriedades da scrollbar foram revalidados.

## Evidências

Gravações completas, browser-only, H.264/yuv420p, sem áudio, faststart:

- [Desktop PT](services/sequence-desktop.mp4).
- [EN](services/sequence-en.mp4).
- [Mobile PT](services/sequence-mobile.mp4).
- [Reduced motion PT](services/sequence-reduced.mp4).

Screenshots por configuração: `services/sequence-*-experience.png`, `sequence-*-dashboard.png`, `sequence-*-terminal.png`. Home: `sequence-home-*-hero.png`, `sequence-home-*-handoff.png`, `sequence-home-*-terminal.png`.

Resultados estruturados: [sequência](services/sequence-results.json), [Home](services/sequence-home.json), [cleanup](services/sequence-cleanup.json) e [produção](services/sequence-production.json). Esses arquivos registram estados/limites da execução, sem substituir a aprovação visual humana.

Novas entradas: [medições](services/entrance-refinement.json), [título no centro](services/entrance-desktop-2-center.png), [título após subir](services/entrance-desktop-2-risen.png), [mobile](services/entrance-mobile-2-risen.png) e [seleção](services/entrance-desktop-selection.png). Frames equivalentes das três partes, EN e reduced estão em `services/entrance-*.png`.

Fluidez: [repro inicial da saída](services/scroll-sticky-regression.json), nova medição da transformação inteira [antes](services/experience-continuity-before.json)/[depois](services/experience-continuity-after.json) e [fluxos completos](services/flow-refinement.json). O repro completo passa de nove trechos retidos a zero, com frames regulares nesta amostra de Edge headless. Esses valores não são um benchmark de todos os dispositivos. Desktop PT/EN, mobile PT, mobile EN 320×568 e reduced desktop verificam wheel após a primeira demonstração, retorno entre capítulos, ausência de replay sobre Services, posição abaixo da copy e tamanho igual dos títulos. A rolagem do modal permanece local, sem mover a Home. Frames da Hero após reposicionar o replay: `services/flow-*-hero.png`.

Mobile compacto: [resultados](services/compact-mobile.json) e frames `services/compact-*.png`. Em 390×844 PT, o dashboard passa de 1476 para 1184 px; em 320×568 EN, de 1502 para 1195 px. A medição anterior restaura temporariamente os estilos mobile do gráfico removido, sem alterar o produto. Gráfico oculto não roda nem oferece seu slider; período/modal, overflow e reduced motion passam. A definição de “última parte” como gráfico de conversão foi comunicada como interpretação, ainda pendente da revisão do usuário.

## Blast radius e pendências

Código novo restrito a Services/review e montagem na Home, com scrollbar/seleção em CSS global conforme o pedido de revisão. Os demos recebem pequenos pontos de integração e lifecycle. A alteração na Hero é restrita ao reposicionamento do replay explicitamente solicitado; Selected Work, cursor e smooth scroll preservam seus arquivos. Navbar recebe somente adaptação de contraste no CSS da Home. Não há novas dependências, backend, MCP real ou seção posterior.

Pendências: revisão visual explícita do checkpoint 4; refinamentos que surgirem; fase 5 de auditoria/revisão final mobile/reduced motion; aprovação final antes de push/PR. A alteração preexistente do usuário em `dashboardData.ts` permanece separada e não foi revertida.
