# Botão glass e sequência mobile — 08/10

Pedido explícito do usuário: aplicar liquid glass a “Começar projeto” e fazer o mobile usar a mesma troca de palavras por scroll do desktop. Este refinamento autoriza a alteração da variante mobile de Why Side, preservando conteúdo, marca e coreografia do desktop.

## Resultado

O CTA mantém um link nativo para `/contato` ou `/en/contact`, com o mesmo material óptico do formulário e das redes: borda cônica, reflexão diagonal, transparência, sombra vazada, hover e press. O contraste do texto escuro é preservado sobre o fundo roxo/branco; medidas e espaço do botão permanecem iguais. A sombra recebe um respiro menor para não criar overflow nos 320px.

Why Side usa o mesmo timeline central em todas as larguras quando não há preferência por movimento reduzido. Um stage sticky de uma viewport permanece no lugar enquanto o scroll passa por Agilidade → Precisão → Suporte → Excelência → Side. Um único “Você +” fica nítido e a palavra seguinte muda por blur/fade, com as descrições correspondentes. A tipografia mobile é dimensionada para manter a composição em uma linha; não há mais cinco blocos independentes na variante mobile animada.

## Estabilidade e aproximação do card — feedback seguinte

O teste anterior verificava estados já parados, sem variar a altura da viewport. O usuário relatou tremor durante scroll no mobile. Um novo repro de altura variável (`node artifacts/cta-12/mobile-stability-check.cjs stability-before`) registrou oscilação vertical de 24px ao variar a viewport de 844 a 796px, além de um inset de 182px até o card e 549px entre a descrição final e o card. Com a viewport fixa, a rolagem contínua não alterou as coordenadas verticais. A alteração da altura do stage foi a hipótese confirmada nesse cenário controlado; blur e movimento horizontal não precisaram de mudança.

O palco e a distância de scroll agora usam a mesma altura medida em pixels no mobile/touch. Essa altura permanece estável nas variações verticais do navegador e é recalculada ao mudar a largura/orientação. O desktop continua dimensionado por CSS. Nenhum controle global de scroll ou normalização foi adicionado. A documentação de [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) descreve as limitações de sincronização do scroll e [configuração](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config%28%29/) descreve refreshes disparados por resize; a versão local já ignora pequenas mudanças verticais em touch por padrão, por isso apenas ativar essa opção não resolveria o reposicionamento do próprio layout CSS.

No mobile, o CTA não força mais uma viewport inteira nem centraliza verticalmente o card. O espaço de entrada é 24px (20px em telas baixas). Quando o encerramento segue Why Side, recuperamos 25% do espaço vazio final do palco sem alterar a altura do palco ou a duração da troca de palavras. A descrição permanece acima do card, sem sobreposição. [Transição mobile](mobile-words/handoff-mobile.png).

[Antes](mobile-words/stability-before.json) → [depois](mobile-words/stability-after.json), mesmo comando e cenário: oscilação 24px→0, inset 182px→24px, distância descrição/card 549px→181px. O artefato intermediário `stability-stage.json` mostra a correção da altura isoladamente antes de alterar o espaçamento. A emulação verifica a variação da viewport; Safari/iPhone físico não foi usado nesta validação.

ESLint, typecheck e diff-check passaram para esta correção. As sete viewports do CTA e cinco cenários da sequência foram repetidos e passaram. A rotação 390×844 → 844×390 → 390×844 recalcula corretamente o palco; uma alteração somente vertical para 390×796 mantém os 844px medidos. Não foi necessário mudar o blur nem adicionar promoção de camadas ou interceptar a rolagem nativa.

Reduced motion preserva a alternativa linear, sem blur. Todos os cinco títulos e descrições semânticos continuam disponíveis a leitores de tela. As condições de mídia e os recursos GSAP são revertidos ao desmontar ou mudar a preferência.

## Verificação

- ESLint, typecheck, build e diff-check passaram.
- [CTA: sete viewports](compact-cta/checks.json), desktop/laptop/EN/mobile320/390/reduced: tudo cabe na viewport, sem overflow ou erros; gradiente e blur de entrada preservados.
- [Palavras: desktop e mobile](mobile-words/checks.json): cinco cenários, incluindo 320px, mobile EN e paisagem. Verificados cinco estados, scroll reverso, uma palavra pintada de cada vez, prefixo na mesma altura, centralização, ausência de cortes, fallback reduced e retorno à variante central.
- [Mobile](mobile-words/mobile-0.png), [Excelência](mobile-words/mobile-3.png), [marca final](mobile-words/mobile-4.png).

Prévia: http://localhost:3012/review/final-cta. Somente local; revisão visual continua pendente antes de Contact Flow e push/PR.
