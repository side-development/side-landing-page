# Services — checkpoint 2 / terminal

Issue [#8](https://github.com/side-development/side-landing-page/issues/8). Base `main` `e3077a2`, branch local `feat/issue-8-services`. Revisão: 05/10/2026.

## Status

**Partial. Checkpoint do terminal aprovado para avançar.** Após os refinamentos, o usuário autorizou a próxima fase em 05/10/2026. Experiência de sites ainda isolada, aguardando revisão antes da integração. Sem push/PR; issue aberta.

## Prévia

- pt-BR: http://localhost:3000/review/services/terminal
- EN: http://localhost:3000/en/review/services/terminal
- Scroll dispara automaticamente a sequência; replay na prévia funciona com mouse e teclado.
- Rotas exclusivas de desenvolvimento, bloqueadas com `notFound()` em produção. Home e dashboard aprovado preservados.

## Direção final desta revisão

O usuário corrigiu a referência de abertura: `docs/references/services/terminal-claude-mcp.png` substitui o exemplo com lettering gigante. Pediu copiar a composição completa, traduzir, usar “desenvolvedor” na saudação e somente “side mcp” como servidor. A caixa coral criada em `MCP servers` foi rejeitada e removida. As instruções mais recentes substituem a narrativa/lista inicial e a frase final originalmente propostas na #8.

Reprodução em HTML/CSS/SVG: titlebar com traffic lights, pasta e título central; linha de login e comando `claude`; painel coral com versão, boas-vindas, mascote, ambiente, dicas e atividade; comando `/mcp`; separador lavanda, contagem de um servidor, configuração do usuário, Side MCP conectado, endereço de ajuda e legenda de teclas. Sem screenshots como interface, lettering antigo, Figma ou GitHub. Por instrução posterior do usuário, todo o terminal permanece em inglês nos dois locales, com “Welcome back, developer!” e `/Users/developer`. A copy de Services, descrição acessível e controles externos continuam localizados.

`IntegrationTerminalDemo.tsx`, `ClaudeCodeWelcome.tsx`, `terminalData.ts`, `useTerminalMotion.ts` e CSS Module próprios. Wrapper/rota de review separados. Nenhuma dependência npm adicional. JetBrains Mono Regular local: 92.380 bytes, licença OFL incluída em `public/fonts/jetbrains-mono/`.

Janela central com largura `min(78vw, 1240px)` e altura `clamp(440px, 70svh, 760px)`: 1123,2×630px em 1440×900, 1065,5×537,6px em 1366×768 e 1240×756px em 1920×1080. Mantém espaço preto externo. O aumento para 70vh substitui o intervalo inicial de 54–64vh por pedido explícito do usuário nesta revisão. A referência é mais alta; a composição adapta o espaçamento à janela da entrega. Titlebar de 40px, controls de 14px, corpo `#262a33`, cantos de 15px, borda fina e sombra externa. Fonte de 12–17px desktop, 13,5px em telas baixas; mascote/painel ligeiramente maiores.

Mobile: largura `100vw - 32px`, altura 552px, titlebar de 36px e fonte de 12px. Dicas/atividade auxiliares ficam ocultas visualmente para preservar legibilidade; transcript mantém o conteúdo completo. Identidade/mascote e MCP permanecem protagonistas. Linha de login tem ellipsis; mensagens e ajuda quebram naturalmente. Painel de boas-vindas reduz para 150px abaixo de 380px, preservando margem do rodapé. Sem overflow horizontal ou recortes internos.

Sequência local: janela → `claude` digitado → painel Claude → `/mcp` digitado em 640ms → bloco MCP inteiro, incluindo ajuda e legenda de teclas. A saída aparece de uma vez após concluir `/mcp` e uma pausa breve, sem stagger ou fade por linha. Conclui em 4s, sem cursor de texto ou qualquer animação recorrente. Timeline pausa fora da viewport/aba oculta. Reduced motion: interface completa com fade de 350ms, sem typing. Cleanup remove timeline, trigger, observer e listener. Locale/replay durante typing restauram os comandos corretamente.

Área MCP com mais espaço após o comando, heading, configuração e ajuda. A legenda usa três grupos de teclas separados por espaços maiores, com quebra entre grupos em mobile. Ajuste do painel de boas-vindas em desktops baixos preserva a altura da janela e evita cortes no rodapé.

Refinamento do rodapé: padding inferior de 32px no corpo, em desktop e mobile. O painel de boas-vindas pode ajustar sua altura para reservar esse espaço sem alterar o tamanho da janela ou comprimir as mensagens MCP. QA mede a distância entre a legenda e a borda inferior em todos os nove cenários.

Transcript completo disponível semanticamente desde o início; apresentação visual `aria-hidden`, sem anúncios caractere a caractere. Texto selecionável com cursor nativo dentro da janela; Side cursor no restante do review. Controles macOS e legenda de teclas fazem parte da representação visual; replay é o controle efetivo da demonstração. Não há processo Claude Code, autenticação ou conexão MCP real. Versão/login são conteúdo editorial da referência; Opus 5.5 atende à instrução mais recente do usuário, não identificação do ambiente da Side. A descrição acessível e o comentário de implementação registram essa distinção.

## Validações

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | pass, zero warnings |
| `npm run typecheck` | pass |
| `npm run build` | pass |
| Console / hydration | pass, nove cenários sem erros/warnings |
| Desktop 1440×900 / 1366×768 / 1920×1080 | pass, janela central e espaço externo |
| Mobile 390×844 / 320×568 / tablet 768×1024 | pass, sem overflow ou recorte interno |
| pt-BR / EN | pass, terminal em inglês em ambos, um servidor |
| Saída MCP completa após typing | pass, bloco e rodapé revelados juntos |
| Reduced motion desktop/mobile | pass, sem typing ou cursor de texto |
| Replay por Enter / typing finito | pass |
| Pausa fora da viewport / retomada | pass |
| Cursor nativo na janela / texto selecionável | pass |
| Transcript estático sem `aria-live` | pass |
| Cinco desmontagens React StrictMode | pass, zero instâncias locais remanescentes |
| Locale/replay durante typing | pass |
| Troca dinâmica para reduced motion | pass |
| Gates review em produção / Home preservada | pass |

QA em Edge/Chromium com Playwright/esbuild temporários fora das dependências do produto. Scripts em `artifacts/services-8/`, ignorado pelo Git. Sem suíte persistente. Resultados: `services/terminal-results.json`, `terminal-cleanup.json` e `terminal-production.json`. Sem teste em aparelhos físicos/Safari/Firefox.

## Evidências

- `services/terminal-comparison.png`: implementação versus referência correta e referência CLI;
- `terminal-desktop.png`, `terminal-laptop.png`, `terminal-wide.png`, `terminal-en.png`;
- `terminal-mobile.png`, `terminal-small-mobile.png`, `terminal-tablet.png`, `terminal-mobile-reduced.png`;
- `terminal-{desktop,en,mobile,reduced}-window.png`: janela isolada;
- `terminal-{desktop,en,mobile,reduced}.mp4`: entrada, typing e replay.

## Critérios e pendências

- [x] Dashboard aprovado no checkpoint 1.
- [x] Referência corrigida pelo usuário analisada e documentada.
- [x] Janela central, composição macOS, HTML/CSS/SVG e espaço negativo.
- [x] Painel nativo, mascote, saudação “developer” e somente Side MCP.
- [x] Typing automático finito, sem neon/lettering antigo.
- [x] pt-BR/EN, teclado, mobile/reduced motion e cleanup.
- [x] Hero/Selected Work/dashboard aprovados preservados.
- [x] Autorização do usuário para avançar após o checkpoint do terminal.
- [ ] Experiência original de sites — checkpoint 3.
- [ ] Integração/transições 01→02 / 02→03 — checkpoint 4.
- [ ] Validação integrada e aprovação final antes de push/PR.

Esta prévia não demonstra a transição dashboard → terminal. Replay/navegação de revisão não são UX final da Home.

Revisões adicionais: remoção completa do caret, janela maior, modelo Opus 5.5, conteúdo do terminal em inglês nos dois locales e saída MCP instantânea completa. QA verifica `/mcp` parcialmente digitado com saída ainda invisível, ausência de caret/animações CSS, idioma semântico `en`, textos em inglês e rodapé dentro da janela.
