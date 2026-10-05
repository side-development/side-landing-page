# Services — checkpoint 3 / experiência digital

Issue [#8](https://github.com/side-development/side-landing-page/issues/8). Branch local `feat/issue-8-services`, base `main` `e3077a2`. Revisão: 05/10/2026.

## Status

**Partial. Experiência de sites isolada: Ready for review.** O usuário autorizou avançar após o checkpoint do terminal. Esta prévia aguarda aprovação antes da integração/transições. Sem push/PR, issue aberta.

## Prévia

- pt-BR: http://localhost:3000/review/services/experience
- EN: http://localhost:3000/en/review/services/experience
- Scroll revela a peça e modifica gradualmente a orientação da arte.
- CTA real alterna a perspectiva; replay disponível na revisão.
- Rota exclusivamente de desenvolvimento; produção retorna 404.

## Implementação

`DigitalExperienceDemo.tsx` é a peça isolada; `DigitalExperienceArtwork.tsx` contém a arte SVG autoral; `useDigitalExperienceMotion.ts` isola reveal, reflow, pointer e composição. Copy, CSS Module e wrapper de review separados. Não existe controlador global da Home ou nova dependência.

Composição branca editorial, tipografia grande com máscaras, ponto roxo, forma abstrata dominante e CTA com ação real. Desktop responde ao ponteiro com deslocamentos limitados; keyboard usa o mesmo CTA, com foco visível e `aria-pressed`. Layout EN considera o maior comprimento do texto. Mobile empilha tipografia/arte/ação e reduz layers; não usa cursor customizado. Reduced motion tem fade curto e mudanças imediatas de perspectiva.

Scroll é o gatilho principal. Não há screenshot, iframe, laptop, glitch, RGB, animação recorrente ou pinning. Timelines, ScrollTriggers, callbacks do CTA e quickTo estão no contexto local GSAP, com cleanup de listeners e tweens. Arte decorativa `aria-hidden`; headings e copy permanecem semanticamente disponíveis.

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
| CTA por Enter, retorno e foco visível | pass |
| Pointer/cursor desktop e ausência em touch/reduced | pass |
| Replay e ausência de overflow horizontal | pass |
| Console/hydration | pass, sem erros/warnings nos cenários |
| Cinco desmontagens React StrictMode após CTA/hover | pass, zero timelines/triggers/listeners locais remanescentes |
| Troca dinâmica para reduced motion | pass |
| Rótulos removidos do dashboard/modal/terminal pt-BR/EN | pass |
| Gate de produção e Home aprovada | pass |

QA com Playwright/esbuild temporários fora das dependências do produto. Scripts em `artifacts/services-8/`, ignorado pelo Git. Não há suite persistente nova. Sem teste em aparelhos físicos ou Safari/Firefox. Resultados: `services/digital-results.json`, `digital-cleanup.json`, `digital-production.json`.

## Evidências

- `services/digital-{desktop,laptop,wide,en,mobile,small-mobile,tablet,reduced,mobile-reduced}.png`;
- `services/digital-{desktop,en,mobile,reduced}.mp4`: entrada, scroll, hover/CTA e replay.

## Critérios e pendências

- [x] Experiência original em DOM/CSS/SVG, com copy comercial aprovada.
- [x] Tipografia, máscaras, CTA real, reflow e reação ao cursor.
- [x] Base branca, composição editorial, sem cards/glitch/mockup.
- [x] pt-BR/EN, teclado, mobile/reduced motion e cleanup no checkpoint isolado.
- [x] Remoção dos textos “Demo” solicitada pelo usuário.
- [ ] Aprovação visual da experiência de sites.
- [ ] Integração da seção contínua, headline `O que construímos. / What we build.` e ordem 01→02→03.
- [ ] Transições por reorganização/dissolução e escurecimento gradual.
- [ ] Validação integrada e aprovação final antes de push/PR.

Replay/navegação de revisão não representam a UX final da Home.
