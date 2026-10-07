# Issue #10 — entrega aprovada

Em 07/10/2026, o usuário aprovou o envio com **“pode subir”**, após revisar as prévias isoladas, a Home integrada e os últimos ajustes de entrada e Hero. Este documento reúne a versão final; os documentos das fases anteriores registram o processo de revisão.

Fonte: [issue #10](https://github.com/side-development/side-landing-page/issues/10), [fundação #1](https://github.com/side-development/side-landing-page/issues/1) e instruções posteriores explícitas do usuário.

## Resultado e decisões aprovadas

Ordem final: **Hero → Selected Work → Services → Social Proof → Why Side**. A inversão foi solicitada pelo usuário para que Você + Side introduza um CTA futuro, fora desta entrega.

- Why Side: Você/You permanece nítido em bold; só o segundo termo muda, em title case, bold e roxo. Cada composição é centralizada pela sua largura real. O último estado usa o asset Side original preto, com apenas o ponto roxo. Cinco estados e microcopies PT/EN preservados.
- Ritmo: desktop com 500svh de percurso e scrub de 0,9s; mobile/tablet em fluxo natural, 96svh por estado e scrub de 0,55s; reduced motion usa fades, sem blur animado e sem pinning longo.
- Social Proof: seis copies editoriais PT/EN fornecidas na issue, preservadas literalmente; aspas gráficas e destaques semibold roxos, metadata de tema/contexto, sem assinatura ou atribuição a clientes.
- Roleta horizontal: autoplay linear de 12s por frase, drag, swipe nativo e snap suave. Blur lateral de até 24px, zona central nítida e curva gradual de foco/fade. Até quatro camadas próximas são pintadas durante a passagem; as demais ficam ocultas.
- Movimento constante em hover foi uma solicitação explícita posterior do usuário. Foco, pausa acessível, aba oculta, saída da viewport e reduced motion suspendem o autoplay. Drag/swipe interrompem temporariamente e retomam após snap.
- Sem setas/contagem visíveis; teclado com setas/Home/End e controles anterior/pausa/próximo revelados ao receber foco. Sem anúncios automáticos por aria-live.
- Cursor mantém a bolinha original de 9px; indicador discreto de 34×24px com ícone SVG de 24×14px, aplicado apenas no trilho.
- Título restaurado ao centro, com tipografia e espaçamento originais, após o usuário rejeitar a alternativa lateral.
- Entrada preto → branco encurtada para 40svh, scrub de 0,25s. Fundo clareia nos primeiros 58%; conteúdo aparece nos últimos 38%, após um intervalo, com opacity e blur de 22px → 0. Reduced motion não anima blur.
- Hero: correção pontual solicitada pelo usuário mede `stage.getBoundingClientRect()` para alinhar o círculo ao ponto da marca. `innerWidth` incluía o gutter, causando 5,403px de desvio; o repro corrigido mede 0,075px, sem drift lateral durante o movimento. [Diagnóstico, replay e validação](hero-handoff.md).

## Escopo

`features/why-side` concentra componentes, copies, CSS e hooks GSAP locais. `HomeExperience` adiciona `TrustChapter` após Services; CSS da Home ajusta o limite de tema da navegação. O capítulo restaura o tema claro da scrollbar. A única mudança na Hero é a medida da área renderizada do stage; Selected Work, Services e o cursor compartilhado permanecem intactos.

Nenhuma dependência nova, estado global de animação, CTA, footer ou página institucional. Rotas isoladas de revisão são noindex e disponíveis apenas em desenvolvimento; [as quatro variantes PT/EN retornam 404 em produção](final/review-routes.json).

## Validação

`npm run lint`, `npm run typecheck`, `npm run build` e `git diff --check` passaram com o código final.

[Oito cenários executados novamente com `next start`](final/results.json): desktop PT/EN, mobile PT, tablet EN, EN 320px, landscape EN, reduced PT desktop e reduced EN mobile. Cobrem ordem, seis frases semânticas, cinco estados legíveis, bold, autoplay/pausa, teclado e ciclo nos limites, drag/swipe, wheel vertical livre, reversão do tema, ausência de overflow e erros de console/hidratação.

[Lifecycle](integration/lifecycle.json) cobre primeira visita, cursor, preferência reduced motion alterada em runtime, resize, menu mobile/Escape, replay/cleanup e navegação PT → EN. [Entrada final](entrance-revision/arrival-blur.json) confirma branco antes do conteúdo e blur/fade gradual; [Hero](hero-handoff/results.json) inclui desktop 1920px, replay, mobile e reduced EN.

Limites: Chromium 153, viewports e touch emulados. Safari/iOS, leitores de tela reais e FPS/GPU em hardware real não foram medidos. A reversão é simples, sem migração de dados. O risco de integração está no limite de tema e no lifecycle do scroll da Home, verificados nos cenários acima.

## Evidências atuais

- Why Side: [Agilidade](final/desktop-pt-agility.png), [Você + Side](final/desktop-pt-side.png), [mobile](final/mobile-pt-side.png), [EN](final/desktop-en-agility.png), [reduced motion](final/reduced-pt-side.png).
- Roleta: [central nítido e laterais bluradas](final/desktop-pt-social-proof.png), [mobile](final/mobile-pt-social-proof.png), [tablet EN](final/tablet-en-social-proof.png), [EN](final/desktop-en-social-proof.png).
- Gravações finais da Home, contendo entrada, roleta e cinco estados: [desktop PT](final/final-home-desktop.mp4), [mobile PT](final/final-home-mobile.mp4), [EN reduced motion](final/final-home-en-reduced.mp4).
- Detalhe de motion: [Why Side isolado](phase-one/why-side-desktop.mp4), [roleta contínua com drag](reel-revision/reel-desktop.mp4), [intro e replay corrigidos](hero-handoff/hero-replay.mp4).
- [Referências estudadas e adaptações Side](../../references/why-side-social-proof/README.md): Workflow Carousel, Lemontree, Oaksun e WKNDHRS, com “Usar para”, “Não copiar” e “Adaptação Side”.

As gravações e capturas em `final/` substituem as versões históricas da entrada e do título. As evidências anteriores preservam as decisões tomadas durante a revisão.
