# Why Side — pesquisa e cena-assinatura (#19)

> Pesquisa e decisões da primeira etapa. A cena revisada foi aprovada em 16/10/2026. A página completa está registrada em [validação final](../../validation/why-side-page/final.md).

Protótipo local em `prototype/19-why-side-manifesto`, baseado em `origin/main` (`73de4a8`, árvore idêntica à branch local aprovada de Services). Escopo desta entrega: abertura; manifesto e publicação aguardam aprovação visual. As rotas canônicas serão integradas na etapa seguinte.

## Referências estudadas

As quatro páginas foram abertas em Chromium/Edge. Nas três referências de Awwwards, o vídeo incorporado foi identificado e foram capturados momentos em 2, 6 e 11 segundos. Studio Freight foi inspecionado no topo e após scroll. Capturas de pesquisa em `%TEMP%/side-why-references/`; não são assets do site.

### [Noomo — Our Story](https://www.awwwards.com/inspiration/our-story-page-noomo-agency)

- **Usar para:** continuidade de uma composição enquanto o conteúdo muda; relação entre texto monumental, pausas e mudança de capítulo. Na gravação, a abertura tipográfica dá lugar a explicações menores sem perder o universo visual.
- **Não copiar:** ambiente 3D, personagem, cartões de vidro, paleta e tipografia próprias.
- **Adaptação Side:** um único palco contínuo, com a transformação dos próprios campos como ligação entre a tese negativa e a afirmativa. A identidade persiste durante a transição.

### [Wanted for Nothing — About and Team](https://www.awwwards.com/inspiration/about-and-team-page)

- **Usar para:** alternância de escala, tipografia como matéria da composição e mudança de comportamento entre afirmações e conteúdo. O momento com grandes frases e elementos móveis não depende de um grid de valores.
- **Não copiar:** fotografias de equipe, marca, cartões inclinados, efeitos específicos de clique e direção gráfica.
- **Adaptação Side:** retirar decoração e deixar dois campos, palavras e uma linha articularem a mudança de posição.

### [Studio Freight — Info](https://studiofreight.com/info)

- **Usar para:** uma voz institucional direta, princípios escritos como ações e ritmo entre grandes afirmações e explicação. Página textual e comportamento no browser inspecionados.
- **Não copiar:** texto, família tipográfica, ilustrações, lista de princípios, conteúdo de equipe e estrutura editorial exata.
- **Adaptação Side:** uma tese curta que tem consequência espacial. A profundidade editorial, na fase posterior à aprovação, virá de entender, executar e cuidar, sem inventar história ou resultados.

### [Serhii Churilov — Home / Scroll](https://www.awwwards.com/inspiration/home-page-scroll-serhii-churilov)

- **Usar para:** coragem de alterar a relação entre plano, tipografia e viewport; transformação contínua com começo e fim reconhecíveis.
- **Não copiar:** WebGL, loader, vermelho, formas 3D, universo de portfólio ou coreografia.
- **Adaptação Side:** mudança geométrica com quatro vértices por campo, DOM e GSAP, sem fonte ou biblioteca nova.

## Referências internas

- `hero/timeline.ts`, `BrandWordmark`: escala da marca, ponto roxo e composição medida na viewport. Não repetir fragmentação, glitch ou reconstrução de letras.
- `why-side/useWhySideMotion.ts`: controle reversível por scroll e tratamento separado de mobile. Não repetir “VOCÊ + X”.
- `WorkNav`, Work e Services: navegação flutuante, Arial/Segoe UI, respiro e sublinhados oficiais. O protótipo reutiliza os assets e o desenho de sublinhados; não modifica as páginas aprovadas.
- `SideCursor`: componente reutilizado sem alterações.
- CTA e footer: estudados para futura continuidade; não incluídos antes da aprovação da cena.

## Duas direções

1. **A dobra:** dois planos opostos viram como folhas e encontram uma direção comum. Boa presença espacial, mas a abertura de um livro seria uma leitura concorrente; perspectiva excessiva também prejudicaria a legibilidade em tela estreita.
2. **O eixo comum — escolhida:** dois campos ocupam lados opostos de uma divisão. A separação ganha espaço e, em um movimento contínuo, os campos passam a ser faixas paralelas. “OUTRO” sai pela própria janela tipográfica e “DO MESMO” toma sua posição.

A escolha dá uma função nova ao mesmo elemento: a linha que separava passa a sustentar uma direção comum. O ápice é um cartaz monumental em dois planos paralelos, com o ponto da Side fechando a frase.

### Refinamento visual solicitado pelo usuário

Após ver a primeira versão, o usuário pediu inverter branco e roxo para eliminar os cortes de cor na junção com a navbar e com o fim da cena (capturas `224756` e `224805`). O exterior agora continua o branco da página; a faixa principal passa a roxo com texto claro. Os dois pontos móveis foram removidos do DOM e da timeline, mantendo o ponto tipográfico da marca. A composição, o movimento e o checkpoint de aprovação foram preservados. O pedido também incluiu trilho de scrollbar transparente em todas as páginas; apenas as regras relacionadas ao scrollbar foram ajustadas fora do protótipo.

## Protótipo e limites

- PT: `/review/why-side-manifesto`; EN: `/en/review/why-side-manifesto`. As rotas existem apenas em desenvolvimento e têm `noindex`.
- `npm run dev -- --port 3019` e abrir uma das rotas. Reprodução de 15 segundos, pausa, início e ápice no controle de revisão; scroll nativo continua disponível e interrompe a demonstração. Não há captura de wheel ou bloqueio da página.
- Desktop: oposição esquerda/direita, seguida de duas linhas largas. Mobile: oposição cima/baixo; composição final em três linhas, com a primeira faixa contendo “DO / MESMO”. Não é uma simples redução do desktop.
- Reduced motion e HTML sem animação mantêm uma composição final estática e o heading semântico completo. A mesma leitura está presente independentemente do progresso visual.
- Next.js, CSS Modules, GSAP, ScrollTrigger e `@gsap/react` existentes. Sem dependências, fontes, vídeo de fundo, imagens de stock, WebGL ou scripts externos adicionados.
- A interface de reprodução e a nota após o palco são ferramentas de avaliação, não capítulos da página final. O código é identificado como protótipo e requer aprovação e integração posteriores.

O texto e os links de pesquisa acima documentam decisões de direção; não representam uma aprovação visual do usuário.
