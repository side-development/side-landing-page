# Issue #10 — integração / fases 4 e 5

Registro histórico das fases 4/5. **Envio aprovado em 07/10 com “pode subir”.** Consulte a [entrega final e suas evidências atuais](final.md), que substitui o status e as decisões intermediárias de título/entrada descritas abaixo.

Correção pontual posterior, explicitamente solicitada pelo usuário: [alinhamento do círculo roxo com o ponto da marca na intro da Hero](hero-handoff.md). O blast radius atual também inclui a medida de viewport em `src/features/hero/timeline.ts`; o design e timing aprovados da Hero permanecem iguais.

Revisão posterior de 07/10: título das avaliações alinhado ao padrão de Trabalhos selecionados e transição do preto para o branco antes de revelar conteúdo. [Validação e gravações atuais dessa entrada](entrance-revision.md) substituem a entrada abrupta das primeiras gravações abaixo.

## Ordem e decisões de revisão

O usuário pediu “primeiro vem as avaliações depois o jogo de palavras”, preparando um CTA futuro. Essa instrução substitui a ordem original da issue: **Hero → Selected Work → Services → Social Proof → Why Side**. O CTA permanece fora do escopo.

A roleta usa as seis copies editoriais PT/EN fornecidas na issue, sem atribuição, reescrita ou depoimentos inventados. Aspas e palavras-chave semibold roxas preservam a revisão aprovada. Autoplay linear de 12s por frase, drag/swipe, snap suave e curva gradual de blur permanecem iguais à prévia aprovada. Hover continua permitindo movimento, conforme pedido posterior de rotação constante; foco, pausa explícita, aba oculta, viewport e reduced motion suspendem autoplay.

Why Side mantém Você/You bold nítido, termos title case bold roxos, cinco estados na ordem original e wordmark Side original preta com ponto roxo. O percurso lento, a centralização pela palavra ativa e o whitespace foram preservados. No desktop, sticky de 100svh com 500svh de percurso; mobile/tablet e reduced motion usam fluxo natural. A marca final prepara a próxima entrega sem acrescentar CTA.

## Integração e blast radius

- Novo `TrustChapter` organiza Social Proof e Why Side localmente, ativados após a intro finalizar. Um trecho vazio de 100svh permite clarear o fundo pelo scroll antes de revelar as avaliações. Não há estado global de animação novo.
- `HomeExperience.tsx` adiciona esse capítulo depois de Services.
- `home.module.css` limita o tema escuro existente ao trecho anterior ao capítulo branco. Logo, navegação e menu mobile retomam o tema claro quando o novo capítulo alcança a navegação fixa; a reversão mantém o tema de Services.
- Variáveis de scrollbar são restauradas por CSS local ao capítulo branco. Isso é necessário porque Services anima essas variáveis inline e conserva o fundo escuro ao terminar.
- O limite de tema tem ScrollTrigger independente dos contexts de matchMedia dos filhos, com cleanup explícito. Repro de resize encontrou seu atributo removido após refresh de um contexto filho; `context.ignore` evita esse vínculo e replay mata o trigger.
- Hero, Selected Work, Services, cursor compartilhado, scroll global, manifestos e lockfile permanecem intactos. Nenhuma dependência adicionada. Rotas isoladas continuam apenas em desenvolvimento e noindex.

## Validação

`npm run lint`, `npm run typecheck` e `npm run build` passaram na versão integrada. `git diff --check` passou.

[Resultados de oito cenários](integration/results.json): desktop PT/EN 1440×900; mobile PT 390×844; tablet EN 768×1024; EN pequeno 320×667; landscape EN 844×390; reduced PT desktop; reduced EN mobile. Em todos: ordem dos capítulos, seis textos semânticos, cinco estados legíveis, pesos bold, centralização, ausência de overflow horizontal e erros de console/hidratação. Navegação entre estados por teclado, ciclo nos limites, drag/swipe, autoplay e pausa fora da viewport; wheel vertical livre nos cenários desktop. Reduced motion preserva todos os estados, sem blur e sem autoplay.

[Lifecycle adicional](integration/lifecycle.json): primeira visita com intro real, cursor Side original de 9px com indicador de 34px e ícone SVG nítido no trilho, preferência reduced motion alterada em runtime, resize desktop → mobile → desktop, menu mobile claro e fechamento por Escape, replay/cleanup e reinicialização, navegação PT → EN. No replay, os atributos e estilos dos novos capítulos são removidos. Sem erros de console/hidratação. O repro do tema falhou antes e passou após a correção.

Performance: até quatro camadas próximas durante o fade dos vizinhos, atributos/estilos atualizados localmente, promoção `will-change` removida ao ocultar/cleanup, tween pausado fora da viewport/aba oculta. Não foram medidos FPS/GPU em hardware real. Validação em Chromium 153 com viewports/touch emulados; Safari/iOS e leitores de tela reais não foram executados.

## Evidências para revisão e futuro PR

- [Why Side desktop](integration/desktop-pt-agility.png) e [estado final Side](integration/desktop-pt-side.png).
- [Feedback central e laterais bluradas](integration/desktop-pt-social-proof.png) e [cursor](integration/home-cursor.png).
- [Mobile avaliações](integration/mobile-pt-social-proof.png), [mobile Side](integration/mobile-pt-side.png) e [menu claro](integration/mobile-menu-light.png).
- [EN](integration/desktop-en-agility.png), [reduced motion desktop](integration/reduced-pt-side.png) e [reduced motion mobile EN](integration/reduced-mobile-en-side.png).
- Gravações da Home integrada: [desktop PT](integration/home-desktop.mp4), [mobile PT](integration/home-mobile.mp4), [EN reduced motion](integration/home-en-reduced.mp4). Incluem entrada depois de Services, roleta e os cinco estados.
- Gravações isoladas para inspecionar motion: [Why Side desktop](phase-one/why-side-desktop.mp4) e [roleta contínua com drag](reel-revision/reel-desktop.mp4).
- [Estudo das referências](../../references/why-side-social-proof/README.md) e [decisões anteriores da roleta](reel-revision.md).

O workflow de revisão foi concluído; a aprovação de envio e a versão final estão registradas em [final.md](final.md).
