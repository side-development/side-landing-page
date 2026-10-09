# CTA compacto — gradiente no título e entrada com blur

O tratamento de fundo descrito abaixo foi substituído pela [revisão líquida preta/roxa](liquid-card.md). Proporções e entrada permanecem.

Pedido do usuário: diminuir a composição para caber inteira na tela, adicionar cor em gradiente que se move constantemente sem ser muito lento e acrescentar animação de chegada com blur.

Revisão seguinte: composição inserida em um card mais largo e um pouco mais alto. Título e mockup ampliados, preservando a composição inteira na viewport.

Revisão final de 08/10: cor lavanda uniforme em todo o card, sem círculo ou foco radial. O mouse controla matiz e luminosidade da superfície inteira, suavizados em 700ms. Posição e tamanho do card, título, mockup e botão permanecem iguais. Ao sair, a cor volta ao estado inicial. Touch e reduced motion usam fundo estático. O mockup agora tem alpha real e blend normal, preservando as cores das telas acima do fundo; texto de apoio com contraste mais forte.

Validação da interação: [mouse à esquerda](compact-cta/pointer-left.png), [mouse à direita](compact-cta/pointer-right.png) e [medições](compact-cta/pointer-checks.json). Geometria estável, retorno ao sair e reduced motion confirmados. Os sete cenários de viewport passaram novamente. A gravação abaixo documenta a composição anterior ao fundo reativo.

## Resultado

- CTA organizado em uma viewport, com card branco de até 1640px, borda sutil, sombra leve e cantos de 28px. Título e mockup levam em conta a altura da tela, além da largura.
- Segunda linha do título em gradiente roxo/violeta, ciclo linear contínuo de 4s. A primeira linha preta preserva a hierarquia. Movimento pausa fora da viewport e com a aba oculta.
- Entrada de blur 14px para 0, opacidade 0 para 1 e deslocamento vertical de 12px para 0, em 950ms com stagger de 100ms entre título, mockup e convite. Sem efeito sobre Você + Side.
- Reduced motion mantém gradiente estático e conteúdo diretamente visível. Forced colors remove o preenchimento transparente do texto.

## Verificação

Lint, typecheck e diff-check passaram. [Sete cenários](compact-cta/checks.json): 1440×900, 1366×768, 1920×900, EN 1280×720, mobile 390×844, mobile 320×568 e reduced motion. Em todos, altura da seção igual à viewport, título/mockup/botão inteiros na tela e sem overflow horizontal ou pageerrors. Blur medido durante a entrada e zerado ao final. Movimento do gradiente confirmado com scroll parado; reduced motion sem blur e sem movimento.

[Desktop](compact-cta/desktop.png), [laptop](compact-cta/laptop.png), [mobile pequeno](compact-cta/small-mobile.png), [reduced motion](compact-cta/reduced.png), [gravação](compact-cta/closing.mp4).

Prévia local: [CTA](http://localhost:3012/review/final-cta), botão **Ver encerramento ↓**. Segue aguardando revisão visual antes do footer, sem push/PR. As telas ilustrativas ainda usam PT na rota EN, conforme pendência registrada no checkpoint anterior.
