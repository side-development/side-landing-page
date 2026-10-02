# Selected Work — issue #6

Status: **Ready for review**. Implementação e evidências locais, aguardando aprovação visual explícita. Sem push, PR ou fechamento da issue.

Base: `main` em `932d795`, merge do PR #5. Issue #6 e #1 lidas integralmente; AGENTS.md e os dois documentos do pacote v2 respeitados. Hero e falso erro preservados. Nenhuma dependência adicionada.

## Prévia

- Experiência pt-BR: http://localhost:3106/?intro=replay
- Experiência EN: http://localhost:3106/en?intro=replay
- Gravações, reels e evidências: http://localhost:3206/

A intro mantém o início automático de 4 s e o botão Recarregar. Após o reveal, role naturalmente até a seção. O cursor aparece no campo roxo, inclusive se o ponteiro já estiver parado ali. Na sessão concluída, Home abre na Hero final. Replay continua disponível em review.

## Implementado

Entrada editorial com whitespace, título e contador; dois projetos somente, cada um com um reel, nome/categoria/ano, teaser e CTA. Os CTAs de projeto abrem as LPs reais em outra guia. Não existem cases ou páginas Work nesta entrega.

No desktop com espaço suficiente, a área de mídia permanece brevemente na viewport enquanto o usuário avança pela seção. Scroll solicita o handoff; o fim real do reel Route e o hold de aproximadamente 500 ms incorporado ao arquivo precedem a saída. Scale 1 → 0,92 e deslocamento para cima; OWL entra de baixo, escala 0,96 → 1. Os dois reels coexistem por aproximadamente 600 ms. Copy/metadata OWL começam a entrar depois da mídia estabilizar, aos 740 ms do handoff. Não há glitch, blur, match-cut forçado, overlays, HUD ou produto reconstruído.

Scroll rápido e navegação por teclado priorizam acesso ao conteúdo, sem travar ou corrigir o scroll do usuário. Ao voltar ao início da área, Route volta a ser o projeto principal. A Hero só informa os marcos idle/roxo/final a um shell local; Work e cursor possuem hooks/cleanup próprios.

Mobile/tablet e viewports baixos usam composição linear: mídia até as bordas, metadata/copy reposicionadas e fade/deslocamento de 18 px na entrada de OWL, sem retenção de scroll. Reduced motion usa fluxo direto e posters, com reprodução voluntária pelo controle acessível. Nenhum cursor customizado em touch/mobile ou reduced motion.

Cursor Side: ponto de 9 px em `#3919BD`, quickTo de 120 ms, sem trail; links aumentam discretamente e mídia ganha label contextual. Contextos editáveis, teclado, saída da viewport, mudança de preferência e desmontagem restauram cursor nativo. A regra que oculta o cursor nativo depende da presença efetiva do cursor visual no DOM.

Vídeos sem loop automático: carregamento no viewport, pausa fora da viewport/aba, `muted`, `playsInline`, `preload="none"`, posters e controles de reprodução/pausa. Resolução tardia de `play()` também respeita viewport e cleanup. A Hero não solicita MP4s no primeiro paint.

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
- Cursor: ativação com ponteiro parado durante campo roxo, cor exata, estados, saída imediata do contexto, teclado, campo editável, limite direito e fallback se o DOM visual for removido: pass.
- Vídeos/posters, pausa/reprodução, entrada/saída de viewport, mudança dinâmica de reduced motion: pass. MP4s não solicitados na Hero; reduced motion não carrega MP4 até reprodução voluntária.
- Tab/Shift+Tab atravessam mídia/CTA/controle de cada projeto; projeto focado é visível. Enter/Escape e foco do menu mobile da Hero preservados.
- Cinco desmontagens StrictMode: nenhum timer, listener próprio, ScrollTrigger ou animação da aplicação restante. GSAP retém seu cache interno pausado `_refreshAll`, identificado no relatório; não há animação ativa ali.
- Falso erro: pixels idênticos à captura aprovada da #4 no mesmo viewport. Hero final desktop/mobile: pixels idênticos na área de 1440 × 868 / 390 × 812, excluindo a faixa inferior de 32 px do controle de replay. Sem alterações em FakeErrorIntro.tsx, hero.module.css, marca ou motion aprovado.
- Cinco gravações de experiência + dois reels reproduzíveis na página de revisão.
- Medição local, produção, sem throttling: LCP ~392 ms; zero MP4 no primeiro paint. É uma observação local, não benchmark Lighthouse nem promessa para dispositivos/rede reais.

Resultados: [funcionais](selected-work/results.json), [delta final/fallback/erro aprovado](selected-work/final-delta.json), [cleanup](selected-work/cleanup-results.json), [teclado e requisições](selected-work/keyboard-performance.json), [playback de evidências](selected-work/review-playback.json).

Limites: Edge/Chromium, mobile/touch emulados. Não houve teste em aparelho físico, Safari ou Firefox.

## Evidências

- [Desktop pt-BR / Route](selected-work/desktop-pt-route.png), [OWL / dashboard](selected-work/section-desktop-owl-dashboard.png), [entrada editorial](selected-work/desktop-pt-chapter.png).
- [Mobile pt-BR](selected-work/mobile-pt-route.png), [mobile EN](selected-work/mobile-en-route.png), [desktop EN](selected-work/desktop-en-route.png).
- [Handoff](selected-work/section-desktop-handoff.png), [cursor contextual](selected-work/cursor-project.png), [cursor no campo roxo](selected-work/cursor-purple.png).
- [Seção desktop MP4](selected-work/section-desktop.mp4), [mobile MP4](selected-work/section-mobile.mp4), [EN MP4](selected-work/section-en.mp4), [reduced motion MP4](selected-work/section-reduced.mp4), [intro e cursor MP4](selected-work/intro-cursor.mp4).

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
- [x] Handoff transforma somente os vídeos reais.
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
