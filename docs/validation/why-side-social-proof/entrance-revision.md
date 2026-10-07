# Issue #10 — título lateral e entrada preto → branco

Status: **Ready for review**. [Home PT](http://localhost:3000) · [Home EN](http://localhost:3000/en). Mudanças locais, issue aberta, sem push/PR.

**Chegada atual com blur:** após o pedido de suavizar a entrada, título e textos próximos da faixa chegam com blur de **22px**, diminuindo progressivamente até zero junto ao fade. O percurso permanece em40svh e scrub0,25s; o fundo termina de clarear em58%, há respiro até62%, e o conteúdo ganha foco nos38% finais (antes24%). Reduced motion mantém apenas fade, com blur zero. O blur adicional usa uma variável local herdada pelas camadas de texto já limitadas aos vizinhos relevantes; não filtra a seção inteira nem os controles. [Amostras desktop/mobile/EN reduced](entrance-revision/arrival-blur.json), [desktop durante a entrada](entrance-revision/arrival-blur-1440.png) e [mobile](entrance-revision/arrival-blur-390.png). Esta revisão substitui os percentuais anteriores descritos abaixo.

**Timing atual:** após o usuário considerar a transição demorada, o trecho de entrada foi reduzido de 100svh para **40svh** (60% menos percurso), e o scrub de 0,6s para **0,25s**. O fundo ainda termina de clarear antes do reveal; reduced motion mantém scrub direto. [Inspeção da passagem mais curta](entrance-revision/shortened-transition.json) em desktop PT, mobile PT e EN reduced, incluindo reversão. As gravações de 100svh abaixo registram o timing anterior.

**Estado atual após a última revisão:** o usuário pediu para voltar ao título original, incluindo a fonte. Restaurados alinhamento central, max-width 900px, fonte desktop `clamp(32px, 4.2vw, 64px)`, entrelinha 1,15 e espaçamento original do título. Mobile volta a max-width 600px e `clamp(30px, 7.7vw, 44px)`. A transição de fundo permanece. [Inspeção atual](entrance-revision/heading-restored.json), [desktop PT](entrance-revision/heading-restored-1440.png), [desktop EN](entrance-revision/heading-restored-1920.png) e [mobile PT](entrance-revision/heading-restored-390.png). As propostas de título lateral/menor descritas abaixo são histórico de revisão, substituídas por essa restauração.

## Revisão solicitada em 07/10

O título “O que mais valorizam ao trabalhar com a Side.” agora segue o padrão de “Trabalhos selecionados”: alinhamento à esquerda, margens de 40px no desktop, 24px no mobile e 16px abaixo de 360px; mesma escala tipográfica, peso 400, tracking e entrelinha. A faixa de avaliações conserva a composição horizontal aprovada.

Refinamento seguinte: a pedido do usuário, a fonte foi reduzida de `clamp(32px, 3.5vw, 56px)` para `clamp(30px, 3.1vw, 48px)` no desktop e de `clamp(32px, 8.4vw, 54px)` para `clamp(28px, 7.6vw, 48px)` no mobile. A escala menor substitui a igualdade de tamanho com Work; margens, peso, tracking e entrelinha seguem o padrão lateral. [Medições atuais](entrance-revision/heading-size.json) e capturas em [1920px](entrance-revision/heading-size-1920.png) e [390px](entrance-revision/heading-size-390.png).

Depois de Services, o novo capítulo começa no mesmo preto `#101011`. Um trecho vazio de 100svh no fluxo natural dirige a transição pelo scroll. O fundo clareia com sine.inOut durante os primeiros 68% desse trecho; há um respiro até 76%; título e avaliações aparecem por opacity entre 76% e 100%. Assim, o conteúdo só ganha presença depois que o fundo está inteiramente branco. Não há overlay, objeto, pin ou interceptação de wheel. O scroll reverso desfaz a sequência.

Navegação e marca passam ao tema claro durante a mudança de luminosidade. Reduced motion usa scrub direto, sem atraso de interpolação; não há blur ou deslocamento novo no reveal. Alteração da preferência em runtime reconstrói somente essa timeline. Timeline e ScrollTrigger ficam independentes dos contexts dos filhos e são revertidos/mortos no replay e desmontagem.

## Validação e evidências

[Seis cenários](entrance-revision/results.json): desktop PT/EN, mobile PT, tablet EN, EN 320px e reduced PT. As margens e propriedades tipográficas foram comparadas às do título de Work no navegador; `start` e `left` são equivalentes nos idiomas LTR usados. Amostras confirmam preto no início, cor intermediária, branco com conteúdo ainda invisível, fade do conteúdo sobre branco e opacidade plena no fim. Reversão, teclado, autoplay/reduced motion, ausência de overflow e erros de console/hidratação passaram.

[Lifecycle da Home](integration/lifecycle.json) atualizado: intro real, cursor, resize, menu mobile, preferência de motion, replay/cleanup e reinicialização, navegação PT → EN. Após mudar o motion, a QA reposiciona o scroll nas avaliações para conferir o autoplay em viewport, pois os capítulos anteriores também alteram sua altura responsiva.

- [Preto inicial](entrance-revision/transition-0.png), [fundo intermediário](entrance-revision/transition-0.34.png), [branco antes do reveal](entrance-revision/transition-0.68.png), [reveal](entrance-revision/transition-0.82.png).
- [Desktop PT](entrance-revision/desktop-pt.png), [EN](entrance-revision/desktop-en.png), [mobile](entrance-revision/mobile-pt.png), [tablet](entrance-revision/tablet-en.png), [320px](entrance-revision/small-en.png), [reduced motion](entrance-revision/reduced-pt.png).
- Gravações: [desktop PT](entrance-revision/entrance-desktop.mp4), [mobile PT](entrance-revision/entrance-mobile.mp4), [EN reduced motion](entrance-revision/entrance-en-reduced.mp4).

`npm run lint`, `npm run typecheck`, `npm run build` e `git diff --check` passaram. Chromium com viewport/touch emulados; hardware real, Safari/iOS e FPS/GPU não foram medidos.

Blast radius desta revisão: `TrustChapter.tsx`, `trust-chapter.module.css`, `social-proof.module.css` e documentação. Hero, Work, Services, Why Side, cursor e interação da roleta permanecem como aprovados. Nenhuma dependência adicionada. A revisão substitui a entrada anterior do capítulo por corte direto preto/branco.
