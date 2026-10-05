# Services — checkpoint 2 / terminal

Issue [#8](https://github.com/side-development/side-landing-page/issues/8). Base `main` `e3077a2`, branch local `feat/issue-8-services`. Revisão: 05/10/2026.

## Status

**Partial. Terminal isolado: Ready for review.** Dashboard aprovado explicitamente pelo usuário. A aprovação deste terminal precede experiência de sites e integração. Sem push/PR; issue aberta.

## Prévia

- pt-BR: http://localhost:3000/review/services/terminal
- EN: http://localhost:3000/en/review/services/terminal
- Scroll mostra o terminal e dispara a narrativa; replay na prévia pode repetir a sequência com mouse ou teclado.
- Rota de desenvolvimento, bloqueada com `notFound()` em produção. Home e rotas de produto intactas.

## Implementação

`IntegrationTerminalDemo.tsx`, `terminalData.ts`, `useTerminalMotion.ts` e CSS Module próprios. Wrapper `TerminalReview.tsx`/CSS e rota dev separados. Nenhuma dependência nova. Terminal é HTML/CSS; somente o pequeno ícone de pasta da titlebar é SVG. Imagens de referência não são usadas como interface.

Janela central no stage: largura `min(76vw, 1180px)`, altura `clamp(400px, 60svh, 680px)`. Em 1440×900 mede 1094,4×540px; em 1366×768, 1038,2×460,8px; em 1920×1080, 1180×648px. Espaço escuro em volta. Mobile: largura `100vw - 32px`, altura mínima 400px, quebra natural da mensagem final e fonte legível de 12px. Sem fullscreen ou pinning.

Titlebar charcoal de 43px, traffic lights de 12px, pasta/título central, hairline clara e sombra externa controlada. Monospace 14–18px desktop, 16px em telas baixas. Texto neutro, prompts cianos contidos e status verdes suaves. Sem neon ou ASCII gigante.

Sequência: janela/nitidez → `$ claude` → pausa → `> /mcp` → `MCP servers` com side/github/figma → três status → mensagem final localizada → prompt em espera. Typing conclui em aproximadamente 6,5–6,8s; somente cursor CSS pisca ao final. Digitação/cursor pausam fora da viewport ou em aba oculta. Cleanup remove timeline, ScrollTrigger, observer e listener da demonstração.

Transcript completo disponível semanticamente desde o início. A renderização animada é `aria-hidden`, sem anúncio caractere a caractere e sem controles macOS falsamente interativos. Texto permanece selecionável: cursor nativo dentro da janela; Side cursor no restante do review. Reduced motion mostra texto final com fade de 350ms e cursor estático. Replay e troca de locale durante typing restauram o conteúdo correto.

`claude` e `/mcp` conferidos nas documentações oficiais, registradas em `docs/references/services/README.md`. Os servidores/saída são representação editorial Side, com `Demo` discreto e descrição acessível; não há Claude Code/MCP real. Copies de serviço seguem a #8.

## Validações

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | pass, zero warnings |
| `npm run typecheck` | pass |
| `npm run build` | pass |
| Console / hydration | pass, nove cenários sem erros/warnings |
| Desktop 1440×900 / 1366×768 / 1920×1080 | pass, janela central e espaço externo |
| Mobile 390×844 / 320×568 / tablet 768×1024 | pass, sem overflow ou recorte de texto |
| pt-BR / EN | pass, copy e mensagem final |
| Reduced motion desktop/mobile | pass, texto completo sem typing/cursor piscante |
| Replay por Enter / typing finito | pass |
| Pausa fora da viewport e retomada | pass |
| Transcript estático sem `aria-live` | pass |
| Cinco desmontagens React StrictMode | pass, zero timelines/triggers/observers/listeners locais remanescentes |
| Locale/replay durante typing | pass |
| Troca dinâmica para reduced motion | pass |
| Gates review em produção / Home preservada | pass |

QA em Edge/Chromium, com Playwright temporário fora das dependências do produto. Scripts em `artifacts/services-8/`, ignorado pelo Git. Sem suíte persistente no repositório. Resultados: `services/terminal-results.json`, `terminal-cleanup.json` e `terminal-production.json`. Globais do plugin ScrollTrigger são distinguidos das instâncias locais no harness de cleanup. Sem teste em dispositivos físicos/Safari/Firefox.

## Evidências

- `services/terminal-comparison.png`: implementação lado a lado com as duas referências;
- `terminal-desktop.png`, `terminal-laptop.png`, `terminal-wide.png`, `terminal-en.png`: janela no stage;
- `terminal-mobile.png`, `terminal-small-mobile.png`, `terminal-tablet.png`, `terminal-mobile-reduced.png`: composição responsiva;
- `terminal-{desktop,en,mobile,reduced}-window.png`: janela isolada;
- `terminal-{desktop,en,mobile,reduced}.mp4`: entrada, typing e replay.

## Critérios e pendências

- [x] Dashboard aprovado no checkpoint 1.
- [x] Referências reais analisadas, documentadas e comparação preparada.
- [x] Janela central, macOS convincente, HTML/CSS e espaço negativo.
- [x] Comandos plausíveis, `MCP side connected`, typing finito e sem neon.
- [x] pt-BR/EN, teclado, mobile/reduced motion e cleanup.
- [x] Hero/Selected Work/dashboard aprovados preservados.
- [ ] Aprovação visual do terminal pelo usuário.
- [ ] Experiência original de sites — checkpoint 3.
- [ ] Integração e transições 01→02 / 02→03 — checkpoint 4.
- [ ] Validação da seção integrada e aprovação final antes de push/PR.

Esta prévia isola o terminal em atmosfera escura. Não demonstra a transição do dashboard para o terminal; essa coreografia permanece para integração. O replay e a navegação de revisão não são UX final da Home.
