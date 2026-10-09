# Card líquido — revisão de 08/10

## Variante atual: roxo e branco

Teste solicitado pelo usuário: substituir preto por branco, mantendo os parâmetros de movimento contínuo e deformação discreta do mouse. Superfície branca com áreas de lavanda/roxo claro, texto escuro e frase com gradiente animado violeta/magenta. O botão, inicialmente roxo escuro, recebeu liquid glass no [refinamento seguinte](mobile-words.md). O fallback CSS usa a mesma paleta clara. Mockup transparente preservado. As capturas de repouso/rastro/dissipação abaixo mostram esta variante; movimento sem mouse, geometria fixa e reduced motion conferidos novamente.

### Acabamento glass do card — refinamento seguinte

A pedido do usuário, o próprio card recebeu acabamento liquid glass, preservando o shader, a paleta, o mouse sutil e o conteúdo aprovado. A superfície tem uma camada óptica sobre o canvas, reflexo diagonal branco transparente e bevel interno, borda cônica mascarada e um segundo contorno fino. Sombra externa dá espessura à peça.

Refinamento de visibilidade solicitado em seguida: reflexão principal passa de 28% a 70% de opacidade, com faixa diagonal mais definida; uma segunda camada translúcida cria profundidade lilás na base. Blur 3px, saturação 125% e contraste 108% tornam o fundo mais perceptível sem modificar a intensidade da deformação. Reflexos internos das bordas também recebem maior espessura. Essas camadas ficam atrás do texto e mockup.

O reflexo acompanha o ponteiro com deslocamento máximo de 7.5% horizontal e 6% vertical, amortecido em .85s. Apenas a iluminação muda; card, texto, mockup e botão não se movem. Não há loop extra de animação: quickTo responde ao ponteiro, retorna ao centro ao sair e libera eventos/tweens ao trocar reduced motion ou desmontar. Touch/reduced mantêm o vidro estático e o fallback CSS. A borda muda de ângulo no hover com transição desativada em reduced motion; forced-colors remove as camadas decorativas.

## Histórico do movimento

Direção atual solicitada pelo usuário: superfície não homogênea, como líquido tocado pelo mouse, com rastro. Substitui o fundo lavanda uniforme e o foco circular anteriores.

O card tem uma superfície procedural preta/roxa em canvas WebGL, atrás de todos os componentes. Um campo de ruído deformado cria ondulações; até 24 amostras recentes do ponteiro perturbam esse campo e deixam rastros discretos que decaem por até dois segundos. Não é uma simulação física de fluidos. Card, texto, mockup e botão não seguem o mouse. Mockup com alpha real e cores preservadas; título claro e botão claro.

Refinamento solicitado: sensação líquida drasticamente reduzida. Coeficiente de deformação 2.8 → 0.24, rotação 1.8 → 0.5, brilho do rastro 0.26 → 0.04, deslocamento limitado e movimento de fundo aproximadamente três vezes mais lento. Contraste da superfície suavizado para preto/roxo profundo. A frase voltou a ter maior variação cromática: lilás, rosa e pêssego claro, com ciclo contínuo de quatro segundos. Capturas de repouso/rastro/dissipação atualizadas; geometria e cleanup reduced motion revalidados.

Sem dependências novas. Renderização limitada a aproximadamente 30fps e 960px de largura interna, suspensa fora da viewport ou com aba oculta. Touch, reduced motion e ausência/perda de WebGL usam fundo CSS estático. Eventos, observadores, frames e recursos GPU são liberados ao desmontar ou mudar a preferência de movimento.

Último ajuste: deformação do mouse reduzida novamente (0.24 → 0.07), brilho do rastro 0.04 → 0.012 e deslocamento máximo 0.025 → 0.008. Movimento ambiente independente do mouse: deriva contínua com ondulação lenta, sem pausas. Gradiente da frase preservado. Comparação de pixels do canvas, com cursor parado, confirma evolução do fundo em 1.5s; geometry e reduced motion revalidados.

## Validação local

- ESLint dos arquivos alterados, typecheck e diff-check passaram.
- Sete cenários de viewport PT/EN/reduced passaram; sem overflow ou erros de página.
- WebGL renderizado, geometria de card/título/imagem/link idêntica antes/depois do movimento e limpeza ao ativar reduced motion confirmadas.
- [Repouso](compact-cta/liquid-idle.png), [rastro do mouse](compact-cta/liquid-trail.png), [após dissipação](compact-cta/liquid-settled.png), [resultados](compact-cta/liquid-checks.json).

Prévia: http://localhost:3012/review/final-cta. Somente local, aguardando revisão visual do CTA + footer antes de Contact Flow. Desempenho em hardware móvel real e Safari ainda não medido.
