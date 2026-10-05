# Selected Work — issue #6

Status: **Completed — aprovado visualmente**. Aprovação explícita para publicar recebida em 2026-10-05, condicionada ao último ajuste: início automático da intro de 4 s para 2 s. Esse ajuste mantém o botão Recarregar e a sequência existente.

Base: `main` em `932d795`, merge do PR #5. Issue #6 e #1 lidas integralmente; AGENTS.md e os dois documentos do pacote v2 respeitados. Falso erro e narrativa da Hero preservados; navbar passa a acompanhar o scroll conforme revisão explícita do usuário. Nenhuma dependência adicionada.

## Prévia

- Experiência pt-BR: http://localhost:3106/?intro=replay
- Experiência EN: http://localhost:3106/en?intro=replay
- Gravações, reels e evidências: http://localhost:3206/

A intro começa automaticamente após 2 s e mantém o botão Recarregar. Após o reveal, role naturalmente até a seção. O cursor aparece no campo roxo, inclusive se o ponteiro já estiver parado ali. Na sessão concluída, Home abre na Hero final. Replay continua disponível em review.

## Implementado

Revisão solicitada pelo usuário em 02/10/2026: substituir a apresentação anterior pela gravação `161550.mp4`. Entrada editorial com whitespace, título/contador em fade de 1,65 s e deslocamento suave de 24 px. “Trabalhos selecionados / Selected work” e o CTA final usam caixa normal; CTA final de 18 px com underline discreto. Cada projeto apresenta exatamente duas folhas em perspectiva: um print real atrás e um reel real em loop na frente. Copy lateral no desktop; copy abaixo no mobile. Os nomes tipográficos em bold foram substituídos pelas wordmarks SVG reais fornecidas pelo usuário; categoria, ano e teaser preservados. A mídia é o único link individual e abre a LP real em outra guia; não há CTA textual separado de projeto. O cursor mostra “ver trabalho” / “view work”.

No desktop com espaço suficiente, o palco ocupa 88 svh e fica parado durante a troca. A sequência tem 208 svh; o avanço de 120 svh controla a subida do par Route e a chegada do par OWL, de baixo, com scrub de 700 ms. O final do trigger acompanha o limite de 88% da viewport. A copy troca junto das folhas. Voltar o scroll reverte o mesmo movimento. Não há espera pelo final do vídeo. Os prints também são mídia real; não há glitch, blur, HUD ou produto reconstruído.

Última revisão de espaçamento e escala: título com margem inferior de 24–40 px (28 px no mobile); CTA com padding superior de 28 px (40 px no mobile). Palco e CTA compartilham largura máxima de 2200 px, limitada a 165 svh no desktop com handoff. Título e contador usam os cantos da seção, alinhados às margens da Hero: 40 px no desktop, 24 px no mobile e 16 px abaixo de 359 px. No mobile, o título quebra em linhas e o contador permanece à direita. Folhas e copy crescem com a composição: wordmark OWL até 88 px de altura e Route até 132 px, acomodando o lettering Security; teaser até 28 px, com largura de texto de até 520 px. O palco permite overflow visível nos dois eixos, preservando as folhas e sombras durante a chegada/saída.

Navbar acompanhando o scroll: o mesmo header da Hero fica fixo a 24 px do topo, com fundo transparente, após o reveal final. Não há listener de scroll, troca de navegação ou nova coreografia. As linhas da grid da wordmark e dos textos de apoio ficam explícitas para preservar a composição aprovada quando o header sai do fluxo. Menu mobile mantém painel, animação e teclado existentes; offsets preservam a abertura a 82 px do topo. A navbar fica oculta/inert durante falso erro e intro e volta no estado final, inclusive na visita repetida da sessão.

Refinamento adicional solicitado pelo usuário: folhas mais lateralizadas, radius de 14 px e abertura do par no hover. A folha de trás recua 18 px à esquerda, a da frente avança 18 px à direita; ângulos opostos abrem suavemente em 800–900 ms. A pose permanece estável enquanto o mouse se move dentro da mídia e retorna ao sair. O hover não acompanha a posição do ponteiro. O projeto fora de leitura fica inert. Tab da mídia Route revela/foca a mídia OWL, e Shift+Tab faz o caminho inverso; a mudança de posição ocorre apenas para tornar o item focado visível. A Hero só informa os marcos idle/roxo/final a um shell local; Work, hover e cursor possuem hooks/cleanup próprios.

Mobile/tablet e viewports baixos mantêm as duas folhas por projeto em fluxo linear, sem retenção de scroll, com tipografia/metadata reposicionadas e entrada curta de OWL. Reduced motion usa fluxo direto e posters estáticos, sem autoplay, hover 3D ou scrub. Nenhum cursor customizado em touch/mobile ou reduced motion.

Cursor Side: ponto de 9 px em `#3919BD`, quickTo de 220 ms / power3.out para movimento mais suave, sem trail; links aumentam discretamente e mídia ganha label contextual. Contextos editáveis, teclado, saída da viewport, mudança de preferência e desmontagem restauram cursor nativo. A regra que oculta o cursor nativo depende da presença efetiva do cursor visual no DOM.

Vídeos em loop contínuo enquanto visíveis, sem interrupção no hover e sem botão/estado manual de pausa, conforme decisão do usuário. Carregamento no viewport, pausa fora da viewport/aba ou quando o projeto sai de leitura, `muted`, `playsInline`, `preload="none"` e posters. Resolução tardia de `play()` também respeita viewport e cleanup. A Hero não solicita MP4s no primeiro paint.

Refinamento das bordas: removida a máscara do conjunto que cortava as folhas. O recorte vertical do palco também foi removido após reproduzir o corte relatado durante a subida da OWL: a folha aparecia dentro da viewport, mas era ocultada no limite interno de 88 svh. Ambas têm borda de 1 px, radius de 14 px e sombras reforçadas; o fundo claro da Route fica distinguível do branco. O fade inferior atua somente nos últimos 10% da mídia, com opacidade final de 85%, preservando bordas e sombras completas. Margens mobile ajustadas para manter as folhas dentro da viewport.

Scrollbar nativa personalizada: 10 px, thumb cinza quase branco `#e9e9e9` arredondado, fundo branco, sem botões/setas; hover `#dcdcdc`. Firefox usa as propriedades padronizadas de cor/largura. Scroll programático suave em motion normal, instantâneo em reduced motion, inclusive após mudança dinâmica da preferência.

O usuário autorizou nesta revisão suavizar o scroll de toda a página, ampliando explicitamente esse ponto do escopo original. A roda recebe suavização GSAP de 600 ms após a Hero final, somente em desktop com ponteiro preciso e sem reduced motion. Usa a posição real do documento, sem wrappers transformados, scroller proxy ou nova dependência. Acumula eventos rápidos e responde à inversão de direção. Clique, foco, teclado, touch, resize e blur cancelam o movimento; campos editáveis, áreas com scroll próprio e gestos de zoom permanecem nativos. Touch/mobile, reduced motion e arraste da scrollbar mantêm comportamento nativo. Cleanup remove listeners e tween, inclusive ao rever a intro.

Decisão do usuário durante execução: manter `/trabalhos` e `/en/work` como destinos mesmo com as páginas indisponíveis; serão implementadas depois. Não foram criados placeholders.

## Mídia

| Reel | Duração | Bytes | Master |
| --- | --- | --- | --- |
| Route | 6,83 s | 880.401 | 1440 × 900 / H.264 / 30 fps |
| OWL | 6,93 s | 1.634.919 | 1440 × 900 / H.264 / 30 fps |

Ambos: yuv420p, BT.709 / limited range, sem áudio e faststart. Posters WebP de frames reais. CRF 18 preserva a qualidade da versão para aprovação; não foi aplicada uma etapa adicional de compressão de peso.

[Fontes e adaptações](../references/work/README.md), [proveniência, especificações e hashes](../references/work/capture-manifest.json). Foram visitadas e capturadas as LPs públicas Route e OWL, com frames renderizados de fato no navegador. Os pontos/geolimits/violação no vídeo OWL pertencem à LP original. Não há texto Side queimado nos assets públicos.

## Validações realizadas

- `npm run lint`: pass, zero warnings.
- `npm run typecheck`: pass.
- `npm run build`: pass.
- Ajuste final de início automático: ~2 s medidos em produção, desktop pt-BR/EN, mobile e reduced motion; Recarregar continua imediato. [Resultado](selected-work/auto-start-two-seconds.json).
- Testes existentes relacionados: not applicable; não havia suíte no repositório. Verificação funcional via scripts temporários Playwright/esbuild, fora das dependências do projeto.
- Nove combinações de viewport/locale/motion mais intro/sessão/replay: pass. Desktop 1440 × 900; mobile 390 × 844 e 320 × 568; tablet 768 × 1024; desktop baixo 1280 × 600; pt-BR/EN e reduced motion.
- Console e hidratação sem erros ou warnings nos cenários executados em produção.
- Bordas e sombra: pass em 1440 × 900, mínimo desktop 1000 × 680 e mobile 320 × 568; folhas dentro da viewport com hover aberto, sem clipping horizontal do palco ou overflow. Entrada do título medida após 220 ms e ao final, confirmando o fade mais lento.
- Cursor: ativação com ponteiro parado durante campo roxo, cor exata, estados, saída imediata do contexto, teclado, campo editável, limite direito e fallback se o DOM visual for removido: pass.
- Vídeos/posters, pausa/reprodução, entrada/saída de viewport, mudança dinâmica de reduced motion: pass. MP4s não solicitados na Hero; reduced motion usa posters sem controles ou carregamento automático de MP4.
- Tab/Shift+Tab atravessam mídia de cada projeto e fazem a troca quando necessário; sem controles de reprodução ou links individuais duplicados. A revisão mantém a narrativa e composição da Hero, com navbar fixa autorizada.
- Cinco desmontagens StrictMode, incluindo scroll suavizado ativo: nenhum timer, listener próprio, ScrollTrigger ou animação da aplicação restante. GSAP retém seu cache interno pausado `_refreshAll`, identificado no relatório; não há animação ativa ali.
- Scroll com roda real: pass em dez grupos, incluindo amostras de movimento contínuo, acúmulo, inversão de direção, cancelamento por clique/teclado, scroll interno, reduced motion dinâmico, touch e falso erro sem interceptação.
- Espaçamento e escala em 1440, 1920, 2560, 3440 e 1000 px: pass. Folhas dentro dos limites horizontais da viewport e sem overflow horizontal. Título/contador seguem agora as margens externas da Hero, enquanto palco/CTA preservam sua largura editorial.
- Navbar/alinhamento: cinco cenários em produção, desktop 1920 px, EN 1440 px, mobile 390/320 px e reduced motion. Header permanece a 24 px do topo com fundo transparente; margens de título/contador conferidas; contato clicável sobre a mídia, foco visível e menu mobile funcional, incluindo Escape.
- Intro, visita repetida e replay: navbar oculta até o reveal final, fixa após conclusão, direta na visita repetida e oculta novamente no replay. Console/hidratação sem erros.
- Wordmarks: seis cenários desktop/ultrawide, EN, mobile 390/320 px e reduced motion. SVGs carregam, mantêm proporções e cores, headings preservam nomes acessíveis e não há overflow. Arquivos idênticos aos enviados pelo usuário, com hashes registrados.
- Corte na chegada da OWL: reproduzido em produção e corrigido. Hit test em ponto da folha abaixo do limite do palco, ainda dentro da viewport, passa em 1440 e 1846 px. Screenshots confirmam a ausência da linha de corte durante a entrada.
- Hero/falso erro: fontes e motion aprovados preservados nesta revisão. As alterações globais autorizadas são scrollbar, suavização do scroll e navbar fixa transparente. A comparação de pixels registrada na implementação inicial precede essas alterações globais. A geometria da wordmark e dos textos de apoio foi comparada novamente antes/depois da fixação do header.
- Gravações atualizadas desktop, mobile, EN e reduced motion, além de demonstração com a roda real. Intro/cursor e reels originais mantidos na página de revisão; oito vídeos com playback validado.
- Zero MP4 no primeiro paint, confirmado novamente. A observação de LCP da implementação inicial não foi reutilizada como benchmark desta revisão.

Resultados atuais: [revisão funcional, teclado e scrollbar](selected-work/revision-results.json), [entrada da OWL sem corte](selected-work/arrival-clip-results.json), [espaçamento e telas grandes](selected-work/spacing-results.json), [scroll com roda real](selected-work/smooth-scroll-results.json), [cleanup da revisão](selected-work/revision-cleanup-results.json), [gravações](selected-work/revision-recordings.json), [playback da revisão](selected-work/revision-review-playback.json). A verificação anterior de [bordas, sombras e timing do título](selected-work/refinement-edges.json) permanece como histórico, assim como os relatórios da primeira implementação.

Última revisão: [navbar/alinhamento](selected-work/navigation-results.json), [intro/sessão/replay](selected-work/navigation-intro-results.json), [wordmarks](selected-work/wordmark-results.json). A nova composição usa as margens da Hero para título/contador; o relatório anterior de espaçamento precede essa mudança. Screenshots `wordmark-*` e gravações `revision-*.mp4` mostram os assets finais; screenshots anteriores com nomes tipográficos permanecem como histórico.

Limites: Edge/Chromium, mobile/touch emulados. Não houve teste em aparelho físico, Safari ou Firefox.

## Evidências

- [Desktop / Route](selected-work/revision-desktop-pt-route.png), [OWL](selected-work/revision-desktop-pt-owl.png), [entrada editorial](selected-work/revision-desktop-pt-chapter.png).
- [Mobile pt-BR](selected-work/revision-mobile-pt-route.png), [mobile EN](selected-work/revision-mobile-en-route.png), [desktop EN](selected-work/revision-desktop-en-route.png).
- [Troca das folhas](selected-work/revision-desktop-pt-handoff.png), [hover em perspectiva](selected-work/revision-desktop-pt-hover.png), [cursor no campo roxo original](selected-work/cursor-purple.png).
- [Desktop MP4](selected-work/revision-desktop.mp4), [mobile MP4](selected-work/revision-mobile.mp4), [EN MP4](selected-work/revision-en.mp4), [reduced motion MP4](selected-work/revision-reduced.mp4), [intro/cursor preservados](selected-work/intro-cursor.mp4).
- [Scroll global com a roda real](selected-work/revision-scroll.mp4), [composição em 1920 px](selected-work/spacing-1920-route.png), [entrada em 2560 px](selected-work/spacing-2560-chapter.png), [CTA mais próximo](selected-work/spacing-1440-exit.png).
- [Chegada da OWL sem corte em 1440 px](selected-work/owl-arrival-1440.png), [1846 px](selected-work/owl-arrival-1846.png).
- [Navbar e cantos desktop](selected-work/navigation-desktop-chapter.png), [mobile](selected-work/navigation-mobile-chapter.png), [menu mobile durante scroll](selected-work/navigation-mobile-menu.png), [EN](selected-work/navigation-en-chapter.png).
- [Wordmark Route desktop](selected-work/wordmark-desktop-route.png), [OWL desktop](selected-work/wordmark-desktop-owl.png), [Route mobile](selected-work/wordmark-mobile-route.png), [OWL mobile](selected-work/wordmark-mobile-owl.png), [EN](selected-work/wordmark-en-route.png).

## Critérios de aceite

### Cursor

- [x] Nasce durante/ao final do campo roxo da Hero.
- [x] Usa `#3919BD`.
- [x] Desktop apenas quando apropriado.
- [x] Touch/mobile preserva comportamento nativo.
- [x] Hover discreto, sem bolha grande ou trail.
- [x] Fallback acessível e funcional.

### Selected Work

- [x] Somente Route e OWL.
- [x] Sem grid/cards SaaS.
- [x] Um reel + metadata + teaser + CTA por projeto.
- [x] Route baseada apenas na LP real.
- [x] OWL baseada apenas na LP real.
- [x] Nenhuma feature fictícia acrescentada.

### Transição

- [x] Route → OWL sem glitch.
- [x] Sem HUD/radar/tracking sintético.
- [x] Handoff transforma as folhas com mídia real, conforme revisão autorizada: print atrás, vídeo na frente.
- [x] Motion-match não foi forçado; variante opcional não utilizada.

### Conteúdo

- [x] pt-BR e EN.
- [x] CTA pt-BR `/trabalhos`, conforme decisão explícita de manter destino futuro.
- [x] CTA EN `/en/work`, conforme a mesma decisão.
- [x] Home não antecipa cases.

### Responsividade / a11y

- [x] Desktop aprovado visualmente pelo usuário em 2026-10-05.
- [x] Mobile aprovado visualmente pelo usuário na mesma autorização final de publicação.
- [x] Reduced motion próprio.
- [x] Sem overflow horizontal nos viewports testados.
- [x] Teclado funcional.

### Técnica

- [x] Lint.
- [x] Typecheck.
- [x] Build.
- [x] Console/hidratação.
- [x] Cleanup de timelines/listeners.
- [x] Posters, muted e playsInline.
- [x] Mídia não carrega desnecessariamente na Hero; geometria aprovada preservada.

## Pendências

Nenhuma pendência de implementação ou validação. Revisão visual aprovada pelo usuário, com publicação autorizada após reduzir o início automático para 2 s. Reels finais somam cerca de 2,5 MB; não foi necessária compressão adicional que comprometa a qualidade aprovada. Integração via PR conforme fluxo do repositório; encerramento da issue somente após merge.
