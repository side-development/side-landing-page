# Hero — círculo roxo / símbolo sem salto lateral

Correção solicitada pelo usuário durante a revisão final da #10. Prévia com intro forçada em [PT](http://localhost:3000/?intro=replay). Mudança local; issue aberta, sem push/PR.

## Causa e correção

O círculo usava um SVG com viewBox calculado a partir de `window.innerWidth`, que inclui o espaço reservado da scrollbar. Em desktop 1440px, a área fixa da animação renderiza em1430px. O SVG comprimia horizontalmente as coordenadas do círculo, enquanto o ponto da marca usava coordenadas da área real: deslocamento de5,403px na troca entre eles.

A largura do body permaneceu em1430px durante `overflow: hidden` e depois de liberar o scroll. Não houve aparecimento súbito de scrollbar nessa passagem. Um probe que corrigia apenas a largura do viewBox eliminou o desencontro, confirmando a causa.

`src/features/hero/timeline.ts` agora lê width/height de `stage.getBoundingClientRect()`. Círculo, viewBox e posição da marca compartilham a área efetivamente renderizada. O timing, a curva de raio, a identidade e a coreografia da Hero foram preservados. Essa alteração pontual foi explicitamente pedida pelo usuário; substitui a declaração histórica de que Hero não tinha alterações na entrega integrada.

## Repro e validação

- Captura inicial quadro a quadro; replay da trace reproduziu a falha de alinhamento acima de1px.
- `node artifacts/issue-10/hero-handoff-repro.cjs`: reproduz a Home real e verifica drift do centro do círculo e alinhamento ao ponto no fim do collapse. A comparação usa o ponto durante o handoff, antes da expansão intencional do wordmark.
- Probe com `--match-svg`: desencontro reduzido a0,075px. Após a correção, o mesmo comando sem probe passou com0,075px e drift zero.
- [Resultados adicionais](hero-handoff/results.json): desktop1920×1080 com replay completo, mobile390×844 e EN reduced motion1440×900. SVG e viewBox têm a mesma largura; ponto/círculo alinhados, overflow restaurado após a intro, scrollbar-gutter estável, Home ativada e sem overflow horizontal/erros de console ou hidratação.
- `npm run lint`, `npm run typecheck`, `npm run build` e `git diff --check` passaram.
- [Gravação de primeira entrada e replay](hero-handoff/hero-replay.mp4); capturas finais [desktop](hero-handoff/desktop-final.png), [mobile](hero-handoff/mobile-final.png) e [EN reduced](hero-handoff/reduced-en-final.png).

Harneses/probes estão em artefatos locais ignorados; não há instrumentação no código de produção. Testes em Chromium emulado, sem medição de FPS/GPU em hardware real.
