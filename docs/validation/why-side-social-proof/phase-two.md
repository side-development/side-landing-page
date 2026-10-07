# Issue #10 — fase 2 / Social Proof isolado

Registro histórico da primeira proposta com placeholders. **Substituído pela [revisão da roleta com seis copies editoriais, autoplay e cursor local](reel-revision.md)**, após atualização da issue #10 e revisão do usuário. Os parâmetros e pendências abaixo descrevem a proposta anterior, não a prévia atual.

Status: **Ready for review**. Esta fase usa cinco placeholders explícitos, sem depoimentos ou contextos de clientes inventados. Aguarda revisão visual de profundidade, blur lateral, deslocamento horizontal, drag e snap. A issue permanece aberta, sem push ou PR.

## Prévia funcional local

- PT: http://localhost:3000/review/social-proof
- EN: http://localhost:3000/en/review/social-proof
- Why Side desacelerado: http://localhost:3000/review/why-side
- Rotas de revisão apenas em desenvolvimento, com `noindex`.

## Decisões

- Faixa horizontal finita, sem bordas, fundos de cards, empilhamento ou rotação circular. Começa no segundo placeholder para permitir revisar ambos os vizinhos.
- Desktop: slide de 40vw, limitado a 680px, com espaço entre entradas; vizinhos continuam dentro do campo visual. Texto central em foco, laterais com até 20px de blur, opacidade 0,30 e escala 0,92 para sugerir profundidade.
- A distância ao centro controla blur, opacidade e escala durante o deslocamento. Ao concluir o snap, o centro fica completamente nítido; tolerância de 1,5px resolve arredondamento de scroll em diferentes densidades de tela.
- Navegação por botões ou teclado usa GSAP por 0,9s, com `power2.inOut`; o conteúdo inteiro se desloca na mesma esteira. Drag de mouse é direto, seguido do mesmo snap suave. Nada entra por cima do feedback anterior.
- Mobile/tablet até 800px: slide de 86vw, swipe e inércia nativos com CSS scroll snap. Um feedback central legível por vez.
- Wheel horizontal nativo disponível; nenhum listener intercepta wheel, especialmente o scroll vertical. Não há autoplay.
- Setas esquerda/direita, Home e End no trilho; botões anterior/próximo com nomes localizados e área de 44px. Limites finitos ficam desabilitados.
- Lista semântica; apenas a entrada central é exposta à leitura assistiva após ativação da interação. Sem `aria-live`. Instrução acessível acompanha o trilho focável.
- Reduced motion: sem blur ou escala e sem tween de navegação, mantendo todas as entradas navegáveis. Alterar a preferência com a página aberta interrompe a animação.
- Cinco entradas permanecem no DOM para manter scroll e snap nativos; só o centro e os dois vizinhos são pintados. Atualizações visuais são agendadas apenas durante scroll; observer suspende atualizações fora da viewport. Não há ticker de autoplay.
- Cleanup remove listeners, observers, requestAnimationFrame pendente, tween ativo, atributos e propriedades adicionados pelo hook.
- Cursor Side existente reutilizado com uma seta lateral discreta no trilho, sem alterar o componente aprovado. Navegação por Tab devolve o cursor nativo; em touch e reduced motion a affordance customizada fica desligada pelo comportamento existente.
- Sem JavaScript, a lista continua disponível no trilho nativo, sem blur. Botões/contagem são aprimoramentos de JavaScript.
- Modelo de dados distingue explicitamente placeholder de feedback real. Tema e contexto permanecem `[TEMA · CONTEXTO]`; a nota de confidencialidade só aparece com feedback real.

## Validação

- `npm run lint`, `npm run typecheck`, `npm run build`.
- Edge/Chromium via Playwright instalado fora do projeto, sem nova dependência.
- Desktop PT/EN 1440×900, resize para 1000px; mobile PT 390×844; tablet EN 768×1024; EN pequeno 320×667; reduced motion PT desktop.
- Centro com erro inferior a 1,5px, filtro nítido no centro, blur lateral de 20px, três entradas pintadas, sem overflow de página e sem `aria-live`.
- Botões, limites anterior/próximo, teclado com setas/Home/End, drag e snap desktop; swipe nativo via eventos touch em mobile/tablet.
- Wheel horizontal nativo e wheel vertical livre. Reduced motion alterado com a página aberta; navegação repetida PT ↔ EN e fallback sem JavaScript.
- Sem erros de console ou hidratação. Cleanup também revisado no código.
- Limites: emulação Chromium; hardware iOS/Safari, leitores de tela reais e desempenho com os textos finais ainda precisam ser avaliados nas fases seguintes. Nenhuma medição de FPS/GPU em hardware real é afirmada.

Evidências: [viewports e interações](phase-two/results.json), [troca de preferência, idioma e fallback](phase-two/interaction.json), [desktop com centro e laterais](phase-two/desktop-pt-central.png), [transição](phase-two/desktop-transition.png), [mobile](phase-two/mobile-pt-central.png), gravações [desktop](phase-two/social-proof-desktop.mp4), [mobile](phase-two/social-proof-mobile.mp4) e [EN reduced motion](phase-two/social-proof-en-reduced.mp4).

## Escopo e próximos passos

- Apenas novos arquivos em `src/features/why-side/`, rotas de revisão e documentação. Sem alterações em Hero, Work, Services, Home, cursor, scroll global, manifests ou lockfile.
- Referências registradas em [README](../../references/why-side-social-proof/README.md).
- Revisar esta fase antes da fase 3, que depende de 4 a 6 feedbacks reais fornecidos pelo usuário. Não inserir frases plausíveis, nomes pessoais ou descrições fictícias.
- Integração Why Side → Social Proof na Home permanece para a fase 4; Final CTA não integra a issue.
- Push/PR/fechamento só após aprovação visual final, conforme #10 e `AGENTS.md`.
