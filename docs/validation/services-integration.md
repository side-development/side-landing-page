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

## Validação técnica e de navegador

- `npm run lint`: pass.
- `npm run typecheck`: pass.
- `npm run build`: pass.
- Não existe suite npm de testes neste repositório. Validação dirigida por Playwright/Edge headless, com dependências de QA temporárias fora do projeto; nenhuma dependência adicionada ao package.json.
- Oito configurações: 1440×900 PT, 1920×1080 EN, 1366×768 PT, 390×844 PT touch, 320×568 EN touch, 768×1024 PT touch, reduced desktop PT e reduced mobile EN.
- Copy/ordem, abertura/reversão, pausa/retomada dos charts, hover sem mudança de tamanho, dropdown, modal dentro da viewport, cursor/fallback, janela central e overflow horizontal: pass. Console/hydration: sem erros/warnings capturados.
- Home PT/EN, mobile e reduced: estrutura aprovada Hero/Work, entrada Services, troca para 7 dias por teclado, modal/foco/Escape, dissolução após trocar dados, navbar fixa/transparente, reversão e replay desmontando demos: pass.
- Primeira visita com intro completa e visita repetida na sessão: pass.
- React Strict Mode: cinco desmontagens durante animação, sem timelines/ScrollTriggers/listeners locais remanescentes; Services inativo sem demo DOM/timelines; reduced motion dinâmico, resize e retorno: pass.
- Produção local: Home PT/EN com Services, terminal e navbar corretos; rotas de review retornam 404. Sem erros/hydration capturados.
- Inspeção visual dos frames desktop/mobile e dos estados finais realizada. Dispositivos físicos, Safari/Firefox e julgamento criativo final ainda não foram validados.

## Evidências

Gravações completas, browser-only, H.264/yuv420p, sem áudio, faststart:

- [Desktop PT](services/sequence-desktop.mp4).
- [EN](services/sequence-en.mp4).
- [Mobile PT](services/sequence-mobile.mp4).
- [Reduced motion PT](services/sequence-reduced.mp4).

Screenshots por configuração: `services/sequence-*-experience.png`, `sequence-*-dashboard.png`, `sequence-*-terminal.png`. Home: `sequence-home-*-hero.png`, `sequence-home-*-handoff.png`, `sequence-home-*-terminal.png`.

Resultados estruturados: [sequência](services/sequence-results.json), [Home](services/sequence-home.json), [cleanup](services/sequence-cleanup.json) e [produção](services/sequence-production.json). Esses arquivos registram estados/limites da execução, sem substituir a aprovação visual humana.

## Blast radius e pendências

Código novo restrito a Services/review e montagem na Home. Os demos recebem pequenos pontos de integração e lifecycle; nenhum arquivo de Hero, Selected Work, cursor ou smooth scroll foi alterado. Navbar recebe somente adaptação de contraste no CSS da Home. Não há novas dependências, backend, MCP real ou seção posterior.

Pendências: revisão visual explícita do checkpoint 4; refinamentos que surgirem; fase 5 de auditoria/revisão final mobile/reduced motion; aprovação final antes de push/PR. A alteração preexistente do usuário em `dashboardData.ts` permanece separada e não foi revertida.
