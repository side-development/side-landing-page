# Selected Work — issue #6

Status: **Ready for review**. Implementação e evidências locais, aguardando aprovação visual explícita. Sem push, PR ou fechamento da issue.

Base: `main` em `932d795`, merge do PR #5. Issue #6 e #1 lidas integralmente; AGENTS.md e os dois documentos do pacote v2 respeitados. Hero e falso erro preservados. Nenhuma dependência adicionada.

## Prévia

- Experiência pt-BR: http://localhost:3106/?intro=replay
- Experiência EN: http://localhost:3106/en?intro=replay
- Gravações, reels e evidências: http://localhost:3206/

A intro mantém o início automático de 4 s e o botão Recarregar. Após o reveal, role naturalmente até a seção. O cursor aparece no campo roxo, inclusive se o ponteiro já estiver parado ali. Na sessão concluída, Home abre na Hero final. Replay continua disponível em review.

## Implementado

Revisão solicitada pelo usuário em 02/10/2026: substituir a apresentação anterior pela gravação `161550.mp4`. Entrada editorial com whitespace, título/contador em fade de 1,65 s e deslocamento suave de 24 px. “Trabalhos selecionados / Selected work” e o CTA final usam caixa normal; CTA final de 18 px com underline discreto. Cada projeto apresenta exatamente duas folhas em perspectiva: um print real atrás e um reel real em loop na frente. Copy lateral no desktop; copy abaixo no mobile. Nomes Route Security e OWL em bold; categoria, ano e teaser preservados. A mídia é o único link individual e abre a LP real em outra guia; não há CTA textual separado de projeto. O cursor mostra “ver trabalho” / “view work”.

No desktop com espaço suficiente, o palco ocupa uma viewport e fica parado durante a troca. A sequência tem 220 svh; o avanço de 120 svh controla a subida do par Route e a chegada do par OWL, de baixo, com scrub de 700 ms. A copy troca junto das folhas. Voltar o scroll reverte o mesmo movimento. Não há espera pelo final do vídeo ou correção/interceptação de roda do mouse. Os prints também são mídia real; não há glitch, blur, HUD ou produto reconstruído.

Refinamento adicional solicitado pelo usuário: folhas mais lateralizadas, radius de 14 px e abertura do par no hover. A folha de trás recua 18 px à esquerda, a da frente avança 18 px à direita; ângulos opostos abrem suavemente em 800–900 ms. A pose permanece estável enquanto o mouse se move dentro da mídia e retorna ao sair. O hover não acompanha a posição do ponteiro. O projeto fora de leitura fica inert. Tab da mídia Route revela/foca a mídia OWL, e Shift+Tab faz o caminho inverso; a mudança de posição ocorre apenas para tornar o item focado visível. A Hero só informa os marcos idle/roxo/final a um shell local; Work, hover e cursor possuem hooks/cleanup próprios.

Mobile/tablet e viewports baixos mantêm as duas folhas por projeto em fluxo linear, sem retenção de scroll, com tipografia/metadata reposicionadas e entrada curta de OWL. Reduced motion usa fluxo direto e posters estáticos, sem autoplay, hover 3D ou scrub. Nenhum cursor customizado em touch/mobile ou reduced motion.

Cursor Side: ponto de 9 px em `#3919BD`, quickTo de 220 ms / power3.out para movimento mais suave, sem trail; links aumentam discretamente e mídia ganha label contextual. Contextos editáveis, teclado, saída da viewport, mudança de preferência e desmontagem restauram cursor nativo. A regra que oculta o cursor nativo depende da presença efetiva do cursor visual no DOM.

Vídeos em loop contínuo enquanto visíveis, sem interrupção no hover e sem botão/estado manual de pausa, conforme decisão do usuário. Carregamento no viewport, pausa fora da viewport/aba ou quando o projeto sai de leitura, `muted`, `playsInline`, `preload="none"` e posters. Resolução tardia de `play()` também respeita viewport e cleanup. A Hero não solicita MP4s no primeiro paint.

Refinamento das bordas: removida a máscara do conjunto que cortava as folhas, e o palco mantém clipping somente vertical durante a troca. Ambas têm borda de 1 px, radius de 14 px e sombras reforçadas; o fundo claro da Route fica distinguível do branco. O fade inferior atua somente nos últimos 10% da mídia, com opacidade final de 85%, preservando bordas e sombras completas. Margens mobile ajustadas para manter as folhas dentro da viewport.

Scrollbar nativa personalizada: 10 px, thumb cinza quase branco `#e9e9e9` arredondado, fundo branco, sem botões/setas; hover `#dcdcdc`. Firefox usa as propriedades padronizadas de cor/largura. Scroll programático suave em motion normal, instantâneo em reduced motion, inclusive após mudança dinâmica da preferência. A roda, o toque e o arraste do thumb continuam nativos; nenhuma biblioteca de smooth scrolling adicionada.

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
- Testes existentes relacionados: not applicable; não havia suíte no repositório. Verificação funcional via scripts temporários Playwright/esbuild, fora das dependências do projeto.
- Nove combinações de viewport/locale/motion mais intro/sessão/replay: pass. Desktop 1440 × 900; mobile 390 × 844 e 320 × 568; tablet 768 × 1024; desktop baixo 1280 × 600; pt-BR/EN e reduced motion.
- Console e hidratação sem erros ou warnings nos cenários executados.
- Bordas e sombra: pass em 1440 × 900, mínimo desktop 1000 × 680 e mobile 320 × 568; folhas dentro da viewport com hover aberto, sem clipping horizontal do palco ou overflow. Entrada do título medida após 220 ms e ao final, confirmando o fade mais lento.
- Cursor: ativação com ponteiro parado durante campo roxo, cor exata, estados, saída imediata do contexto, teclado, campo editável, limite direito e fallback se o DOM visual for removido: pass.
- Vídeos/posters, pausa/reprodução, entrada/saída de viewport, mudança dinâmica de reduced motion: pass. MP4s não solicitados na Hero; reduced motion não carrega MP4 até reprodução voluntária.
- Tab/Shift+Tab atravessam mídia de cada projeto e fazem a troca quando necessário; sem controles de reprodução ou links individuais duplicados. A revisão mantém a Hero sem alterações.
- Cinco desmontagens StrictMode: nenhum timer, listener próprio, ScrollTrigger ou animação da aplicação restante. GSAP retém seu cache interno pausado `_refreshAll`, identificado no relatório; não há animação ativa ali.
- Hero/falso erro: fontes e motion aprovados preservados nesta revisão. A alteração global autorizada é a scrollbar e o scroll programático. A comparação de pixels registrada na implementação inicial precede essa alteração global.
- Novas gravações desktop, mobile, EN e reduced motion; gravação da intro/cursor e reels originais mantidos na página de revisão.
- Zero MP4 no primeiro paint, confirmado novamente. A observação de LCP da implementação inicial não foi reutilizada como benchmark desta revisão.

Resultados atuais: [revisão funcional, teclado e scrollbar](selected-work/revision-results.json), [bordas, sombras e timing do título](selected-work/refinement-edges.json), [cleanup da revisão](selected-work/revision-cleanup-results.json), [novas gravações](selected-work/revision-recordings.json), [playback da revisão](selected-work/revision-review-playback.json). Os demais JSONs registram a primeira implementação e permanecem como histórico.

Limites: Edge/Chromium, mobile/touch emulados. Não houve teste em aparelho físico, Safari ou Firefox.

## Evidências

- [Desktop / Route](selected-work/revision-desktop-pt-route.png), [OWL](selected-work/revision-desktop-pt-owl.png), [entrada editorial](selected-work/revision-desktop-pt-chapter.png).
- [Mobile pt-BR](selected-work/revision-mobile-pt-route.png), [mobile EN](selected-work/revision-mobile-en-route.png), [desktop EN](selected-work/revision-desktop-en-route.png).
- [Troca das folhas](selected-work/revision-desktop-pt-handoff.png), [hover em perspectiva](selected-work/revision-desktop-pt-hover.png), [cursor no campo roxo original](selected-work/cursor-purple.png).
- [Desktop MP4](selected-work/revision-desktop.mp4), [mobile MP4](selected-work/revision-mobile.mp4), [EN MP4](selected-work/revision-en.mp4), [reduced motion MP4](selected-work/revision-reduced.mp4), [intro/cursor preservados](selected-work/intro-cursor.mp4).

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

- [ ] Desktop aprovado visualmente pelo usuário.
- [ ] Mobile aprovado visualmente pelo usuário.
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

Aprovação visual explícita dos reels, composição desktop/mobile, cursor, passagem Hero → Selected Work e handoff Route → OWL. Após aprovação: avaliar necessidade de otimização final de peso, publicar branch e abrir PR com as evidências. Issue permanece aberta até validação e integração conforme o fluxo definido pelo usuário.
