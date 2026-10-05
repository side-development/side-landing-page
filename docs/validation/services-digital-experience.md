# Services — checkpoint 3 / experiência digital

Issue [#8](https://github.com/side-development/side-landing-page/issues/8). Branch local `feat/issue-8-services`, base `main` `e3077a2`. Revisão: 05/10/2026.

## Status

**Ready for review: checkpoint 3 isolado. Issue #8 ainda Partial.** O usuário definiu a frase e a paleta do segundo estado. Os cinco refinamentos desta revisão estão implementados e validados localmente; aprovação visual pendente. Sem push/PR, issue aberta. A integração continua no próximo checkpoint.

## Prévia

- pt-BR: http://localhost:3000/review/services/experience
- EN: http://localhost:3000/en/review/services/experience
- Scroll revela a peça e modifica gradualmente a orientação da arte.
- CTA real alterna a perspectiva; replay disponível na revisão.
- Rota exclusivamente de desenvolvimento; produção retorna 404.

## Implementação

`DigitalExperienceDemo.tsx` é a peça isolada; `DigitalExperienceArtwork.tsx` contém a arte SVG autoral; `useDigitalExperienceMotion.ts` isola reveal, reflow, pointer e composição. Copy, CSS Module e wrapper de review separados. Não existe controlador global da Home ou nova dependência.

Composição branca editorial sem linhas divisórias ou rótulos “Side / 01” e “Composição livre”, tipografia grande com máscaras, forma abstrata dominante e CTA com ação real. Ponto decorativo e indicação de scroll removidos. Desktop responde ao ponteiro com deslocamentos limitados; keyboard usa o mesmo CTA, com foco visível e `aria-pressed`. Layout EN considera o maior comprimento do texto. Mobile empilha tipografia/arte/ação e reduz layers; não usa cursor customizado. Reduced motion tem fade curto e mudanças imediatas de perspectiva.

No CTA, os paths SVG interpolam de uma forma emaranhada para fitas separadas em 1,8s. As junções abertas são curvas cúbicas com tangentes contínuas, sem os segmentos retos que causavam aparência travada. A arte passa à esquerda e a nova frase à direita no desktop; mobile preserva a composição vertical. O segundo clique restaura forma, frase e paleta. Geometrias usam os mesmos tipos e quantidades de comandos SVG, permitindo interpolação no GSAP existente sem novo plugin/dependência.

O segundo estado mostra “Da experiência / à ação.” e “Clareza, direção e resultado.”; EN “From experience / to action.” e “Clarity, direction and results.”. Apoio e CTA trocam de lado; posições recalculadas ao redimensionar. Gradientes, título, apoio, CTA, borda, sombra e legenda passam gradualmente à família vermelha. Camadas visuais crossfade sem duplicar anúncios acessíveis ou alterar a altura da composição. Branco continua como base. A mudança de paleta/copy foi solicitada explicitamente pelo usuário; Hero, Selected Work, cursor e navegação externa permanecem aprovados.

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
| CTA por Enter, retorno, nova frase/paleta, apoio e foco visível | pass |
| Cliques rápidos com reversão durante a abertura | pass |
| Pointer/cursor desktop e ausência em touch/reduced | pass |
| Replay e ausência de overflow horizontal | pass |
| Estado vermelho após resize 800/390/320/1920 e replay | pass, apoio/CTA sem sobreposição |
| Console/hydration | pass, sem erros/warnings nos cenários |
| Cinco desmontagens React StrictMode após CTA/hover | pass, zero timelines/triggers/listeners locais remanescentes |
| Troca dinâmica para reduced motion | pass |
| Rótulos removidos do dashboard/modal/terminal pt-BR/EN | pass |
| Gate de produção e Home aprovada | pass |

QA com Playwright/esbuild temporários fora das dependências do produto. Scripts em `artifacts/services-8/`, ignorado pelo Git. Não há suite persistente nova. Sem teste em aparelhos físicos ou Safari/Firefox. Resultados: `services/digital-results.json`, `digital-cleanup.json`, `digital-production.json`.

## Evidências

- `services/digital-{desktop,laptop,wide,en,mobile,small-mobile,tablet,reduced,mobile-reduced}.png`;
- `services/digital-{desktop,en,mobile,reduced}.mp4`: entrada, scroll, hover/CTA e replay.
- `services/digital-{desktop,laptop,wide,en,mobile,small-mobile,tablet,reduced,mobile-reduced}-open.png`: fitas desfeitas, nova frase, apoio reposicionado e paleta vermelha.

Screenshots e quatro MP4 foram atualizados nesta revisão e mostram os dois estados atuais.

## Critérios e pendências

- [x] Experiência original em DOM/CSS/SVG, com copy comercial aprovada.
- [x] Tipografia, máscaras, CTA real, reflow e reação ao cursor.
- [x] Base branca, composição editorial, sem cards/glitch/mockup.
- [x] pt-BR/EN, teclado, mobile/reduced motion e cleanup no checkpoint isolado.
- [x] Remoção dos textos “Demo” solicitada pelo usuário.
- [x] Remoção das divisórias e rótulos internos da peça.
- [x] CTA desfaz as fitas e muda o lado do texto.
- [x] Nova frase “Da experiência à ação” e gradiente vermelho no CTA, incluindo detalhes da peça.
- [x] Curvas mais fluidas, sem junções retas no estado aberto.
- [x] Remoção do ponto e da indicação de scroll.
- [x] Apoio muda para “Clareza, direção e resultado” e troca de posição.
- [ ] Aprovação visual da experiência de sites.
- [ ] Integração da seção contínua, headline `O que construímos. / What we build.` e ordem 01→02→03.
- [ ] Transições por reorganização/dissolução e escurecimento gradual.
- [ ] Validação integrada e aprovação final antes de push/PR.

Replay/navegação de revisão não representam a UX final da Home.
