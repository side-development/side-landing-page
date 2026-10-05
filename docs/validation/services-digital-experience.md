# Services — checkpoint 3 / experiência digital

Issue [#8](https://github.com/side-development/side-landing-page/issues/8). Branch local `feat/issue-8-services`, base `main` `e3077a2`. Revisão: 05/10/2026.

## Status

**Ready for review: checkpoint 3 isolado. Issue #8 ainda Partial.** A correção atual mantém textos pretos e substitui o botão de perspectiva pela transformação ligada ao scroll. Aprovação visual pendente. Sem push/PR, issue aberta. A integração continua no próximo checkpoint.

## Prévia

- pt-BR: http://localhost:3000/review/services/experience
- EN: http://localhost:3000/en/review/services/experience
- Scroll revela a peça, desfaz fitas, muda a paleta da arte e troca título/apoio progressivamente; voltar o scroll restaura o estado inicial.
- Botão de perspectiva removido. Replay exclusivo da revisão retorna o scroll antes da transformação.
- Rota exclusivamente de desenvolvimento; produção retorna 404.

## Implementação

`DigitalExperienceDemo.tsx` é a peça isolada; `DigitalExperienceArtwork.tsx` contém a arte SVG autoral; `useDigitalExperienceMotion.ts` isola reveal, reflow, pointer e composição. Copy, CSS Module e wrapper de review separados. Não existe controlador global da Home ou nova dependência.

Composição branca editorial sem linhas divisórias, rótulos internos, ponto decorativo, indicação de scroll ou botão de perspectiva. Tipografia grande com máscaras e forma abstrata dominante. Título, apoio e legenda permanecem pretos durante toda a transformação. Desktop responde ao ponteiro com deslocamentos limitados; teclado usa scroll nativo e controles de revisão com foco visível. Mobile empilha tipografia/arte/apoio, reduz layers e não usa cursor customizado.

No scroll, os paths SVG interpolam de uma forma emaranhada para fitas separadas. As junções abertas são curvas cúbicas com tangentes contínuas. A arte passa à esquerda e a nova frase à direita no desktop; mobile preserva a composição vertical. Voltar o scroll restaura forma, frase e paleta. Geometrias compatíveis permitem interpolação no GSAP existente sem novo plugin/dependência. Progressão entre topo da peça em 20% e 4% da viewport, com scrub de 1s e sem pinning; estado final permanece visível.

O segundo estado mostra “Da experiência / à ação.” e “Clareza, direção e resultado.”; EN “From experience / to action.” e “Clarity, direction and results.”. Apoio troca de lado, com posições recalculadas ao redimensionar. Somente arte/gradientes/sombra passam para vermelho; textos pretos conforme a correção do usuário. Camadas visuais crossfade sem duplicar anúncios acessíveis ou alterar a altura da composição. Reduced motion mantém fades/cor por scroll, trocando geometrias/alinhamentos diretamente na dissolução. Hero, Selected Work, cursor e navegação externa preservados.

Scroll controla toda a transformação. Não há screenshot, iframe, laptop, glitch, RGB, animação recorrente ou pinning. Timelines, ScrollTriggers e quickTo estão no contexto local GSAP, com cleanup de listeners/tweens. Trigger de entrada estável durante mudanças de preferência preserva o scroll. Arte decorativa `aria-hidden`; headings/copy semanticamente disponíveis e sincronizados. Wrapper isolado de review inclui espaço inferior para percorrer a experiência sem a próxima seção; não é o espaçamento final da Home.

Referências e decisões: `docs/references/services/digital-experience.md`.

## Remoção dos rótulos solicitada pelo usuário

- Removidos “Demo data” do header, modal e rodapé do dashboard, “Demo funnel” e sufixos nos gráficos.
- Identificação discreta dos números fictícios somente no rodapé: “Dados ilustrativos / Illustrative data”. Texto acessível continua informando que não são resultados da Side/clientes.
- Terminal não tinha rótulo visual Demo; descrição acessível pt-BR passa a “Representação editorial”. Interface interna continua em inglês.
- Componentes e atributos técnicos existentes com nome `Demo` permanecem internos; não aparecem para o visitante.
- Dashboard/terminal aprovados preservados além dessa mudança de copy. Hero/Selected Work/Home intactos.

## Validações

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | pass |
| `npm run typecheck` | pass |
| `npm run build` | pass |
| Desktop 1440×900 / 1366×768 / 1920×1080 | pass |
| Mobile 390×844 / 320×568 / tablet 768×1024 | pass |
| pt-BR / EN | pass |
| Reduced motion desktop/mobile | pass |
| Scroll automático, retorno, nova frase/paleta e apoio | pass |
| Textos pretos antes/durante/depois e ausência de botão | pass |
| Teclado Home/PageDown e replay | pass |
| Pointer/cursor desktop e ausência em touch/reduced | validado anteriormente, comportamento preservado |
| Replay e ausência de overflow horizontal | pass |
| Console/hydration | pass, sem erros/warnings nos cenários |
| Cinco desmontagens React StrictMode durante scroll/hover | pass, zero timelines/triggers/listeners locais remanescentes |
| Troca dinâmica para reduced motion | pass |
| Rótulos removidos do dashboard/modal/terminal pt-BR/EN | validado anteriormente, sem alteração nesta revisão |
| Gate de produção e Home aprovada | validado anteriormente, sem alteração nesta revisão |

QA com Playwright/esbuild temporários fora das dependências do produto. Scripts em `artifacts/services-8/`, ignorado pelo Git. Não há suite persistente nova. Sem teste em aparelhos físicos ou Safari/Firefox. Resultados: `services/digital-results.json`, `digital-cleanup.json`, `digital-production.json`.

## Evidências

- `services/digital-{desktop,laptop,wide,en,mobile,small-mobile,tablet,reduced,mobile-reduced}.png`;
- `services/digital-{desktop,en,mobile,reduced}.mp4`: entrada, transformação por scroll, retorno, hover e replay.
- `services/digital-{desktop,laptop,wide,en,mobile,small-mobile,tablet,reduced,mobile-reduced}-open.png`: fitas desfeitas, nova frase, apoio reposicionado e paleta vermelha.

Screenshots e quatro MP4 foram atualizados nesta revisão e mostram os dois estados atuais.

## Critérios e pendências

- [x] Experiência original em DOM/CSS/SVG, com copy comercial aprovada.
- [x] Tipografia, máscaras, transformação por scroll e reação ao cursor.
- [x] Base branca, composição editorial, sem cards/glitch/mockup.
- [x] pt-BR/EN, teclado, mobile/reduced motion e cleanup no checkpoint isolado.
- [x] Remoção dos textos “Demo” solicitada pelo usuário.
- [x] Remoção das divisórias e rótulos internos da peça.
- [x] Scroll desfaz as fitas e muda o lado do texto; botão removido.
- [x] Nova frase “Da experiência à ação”, gradiente vermelho na arte e textos sempre pretos.
- [x] Curvas mais fluidas, sem junções retas no estado aberto.
- [x] Remoção do ponto e da indicação de scroll.
- [x] Apoio muda para “Clareza, direção e resultado” e troca de posição.
- [ ] Aprovação visual da experiência de sites.
- [ ] Integração da seção contínua, headline `O que construímos. / What we build.` e ordem 01→02→03.
- [ ] Transições por reorganização/dissolução e escurecimento gradual.
- [ ] Validação integrada e aprovação final antes de push/PR.

Replay/navegação de revisão não representam a UX final da Home.
