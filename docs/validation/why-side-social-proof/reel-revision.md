# Issue #10 — revisão da roleta / copies editoriais

Status: **Prévia isolada aprovada em 07/10**. O usuário aprovou a roleta e autorizou a integração, com avaliações antes de Why Side. Prévia isolada em [PT](http://localhost:3000/review/social-proof) e [EN](http://localhost:3000/en/review/social-proof). Esta revisão substitui a primeira proposta com placeholders. O estado da entrega integrada está em [integration.md](integration.md); mudanças locais, sem push/PR, issue aberta.

## Fonte de verdade e conteúdo

Issue #10 relida integralmente após o usuário informar a atualização. Novo título: “O que mais valorizam ao trabalhar com a Side.” / “What people value most about working with Side.”

As seis frases principais em cada idioma e respectivos temas/contextos foram inseridos literalmente. São copies editoriais aprovadas; não são depoimentos atribuídos. Usa-se parágrafo, com aspas gráficas solicitadas na revisão, sem blockquote, assinatura, identidade oculta, nomes, logos ou nota de confidencialidade. Não foram usadas as versões curtas opcionais. Palavras-chave escolhidas nas próprias frases recebem semibold 600 e roxo #3919BD nos dois idiomas; os textos não foram reescritos.

## Revisão visual solicitada

- Esteira horizontal contínua com entrada anterior e seguinte presentes ao fundo. Laterais: blur de 24px, opacidade 0,44, escala 0,82 e deslocamento de 16px para reforçar profundidade. Centro: blur zero, opacidade 1 e escala 1.
- Último pedido: movimento lento e constante. Autoplay começa imediatamente, sem hold/delay, com velocidade linear equivalente a 12s por frase. A zona central permanece nítida durante a passagem (28% do espaçamento de cada lado), permitindo leitura enquanto a faixa se move. Distância fora dessa zona controla foco, contraste e profundidade.
- Cópias nas extremidades mantêm os vizinhos durante o retorno ao primeiro item. Seis conteúdos únicos, dez posições físicas; três camadas próximas, chegando a quatro durante o fade de entrada/saída dos vizinhos. Sem sobreposição ou rotação circular.
- Revisão de fluidez: blur, escala e profundidade usam curva quintic smootherstep, com derivadas suaves nas extremidades da zona nítida. Os vizinhos saem por fade entre 1 e 1,6 espaçamentos do centro, em vez de desaparecerem ao trocar o índice ativo. Somente camadas próximas recebem atualizações; `will-change` é aplicado nelas e removido ao ocultar/cleanup.
- Mouse pode arrastar diretamente, seguido de snap em 1,2s. Mobile preserva swipe, inércia e snap nativos. Wheel horizontal participa nativamente; wheel vertical continua livre.
- Conforme o último pedido de rotação constante, hover não bloqueia autoplay e interação manual não o desliga permanentemente. Movimento pausa durante drag/swipe e retoma após o snap/inércia; foco, pausa explícita, viewport/aba oculta e reduced motion continuam impedindo autoplay. Essa revisão substitui a proposta anterior de pausa em hover e parada após interação.
- Setas e quantidades visíveis removidas. Trilho focável aceita esquerda/direita/Home/End; botões textuais anterior/próximo/pausa permanecem acessíveis e aparecem somente em foco de teclado.
- Na última revisão, o usuário pediu a restauração do cursor anterior. A bolinha Side original de 9px voltou, com o pequeno indicador de 34×24px ao lado, sem texto Arraste/Drag. Apenas o ícone foi substituído por máscara SVG de 24×14px, com traço nítido de 1,6px. CSS aplica o ícone somente durante hover do trilho; o componente compartilhado SideCursor permanece intacto. Em teclado/touch/reduced motion, continua o comportamento aprovado do cursor existente.
- Os seis textos e contextos estão sempre disponíveis numa lista semântica. A esteira visual é decorativa para evitar duplicar as cópias de extremidade na leitura assistiva. Sem `aria-live`.
- Resize recentraliza o conteúdo ativo. Cleanup mata o tween, cancela timers/frames e remove observers/listeners e estilos locais. Não há delayedCall de leitura.

## Validação

- Lint, typecheck e build passaram.
- Desktop PT/EN 1440×900, resize desktop para 1000px, mobile PT 390×844, tablet EN 768×1024, EN pequeno 320×667 e reduced motion PT desktop.
- Cada texto semântico comparado literalmente com o corpo da issue atual, nos dois idiomas.
- Centro nítido, erro de alinhamento inferior a 1,5px, máximo de quatro entradas pintadas durante a passagem e ausência de overflow horizontal/`aria-live`.
- Navegação por teclado, controles revelados em foco, drag, swipe, limites cíclicos último → primeiro e primeiro → último, resize e wheel vertical livre.
- Repro da parada: `node artifacts/issue-10/constant-repro.cjs` falhou com avanço de 0px em 750ms; após o ajuste, avanço de 53px em idle e 47px com hover. Delay de 6,5s, bloqueio por hover da seção inteira e ease que desacelerava a zero foram substituídos por movimento imediato linear. Harness mantido em artefatos locais ignorados como regressão do sintoma.
- Testes de movimento constante: amostras sucessivas avançam em velocidade semelhante, inclusive com hover; foco pausa, navegação por teclado preserva ordem e ciclo, saída de foco retoma, wrap automático continua, fora da viewport/reduced motion suspende. Evidência atual: [constant-motion.json](reel-revision/constant-motion.json). `autoplay.json` documenta a coreografia anterior com holds e pausa em hover.
- Repro de fluidez (`blur-repro.cjs`): vizinho saltava de opacidade efetiva 0,44 para zero ao passar de 49% para 51% do intervalo. Após o ajuste, varia gradualmente de 0,0198 para 0,0115. [blur-fluidity.json](reel-revision/blur-fluidity.json) valida curva suave junto à zona nítida, saída progressiva, máximo de quatro camadas e reduced motion em desktop 1920×1080, mobile EN e reduced PT. Gravações atualizadas. Não se trata de uma medição de FPS em hardware real.
- Bolinha original de 9px e indicador compacto de 34px confirmados, ícone SVG carregado e fora dos filtros dos textos. Capturas atualizadas com aspas, palavras-chave e cursor restaurado.
- Sem erros de console ou hidratação. Cleanup e pausa em aba oculta revisados no código.
- Limites: testes em Edge/Chromium emulado; hardware iOS/Safari, leitores de tela reais e FPS/GPU em dispositivos reais não foram medidos. Integração e transição da Home continuam para a fase 4.

Evidências: [viewports e interações](reel-revision/results.json), [autoplay e pausas](reel-revision/autoplay.json), [centro e laterais](reel-revision/desktop-pt-central.png), [cursor](reel-revision/desktop-pt-cursor.png), [chegada automática](reel-revision/autoplay-arriving.png), [mobile](reel-revision/mobile-pt-central.png), vídeos [desktop](reel-revision/reel-desktop.mp4), [mobile](reel-revision/reel-mobile.mp4) e [EN reduced motion](reel-revision/reel-en-reduced.mp4).

## Blast radius

Somente arquivos novos da feature Why Side/Social Proof, rotas de revisão e documentação. Nenhuma alteração em Hero, Work, Services, Why Side aprovado nesta rodada, Home, cursor compartilhado, scroll global, manifesto ou lockfile. Sem nova dependência. Push, PR e fechamento permanecem condicionados à aprovação visual final da entrega, conforme #10 e AGENTS.md.
