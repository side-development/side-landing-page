# Hero 02 — evidências e revisão visual local (#4)

## Status

Ready for review. Implementação local, sem push ou PR. A #4 continua aberta. A aprovação humana do ritmo, da composição e da qualidade percebida está pendente.

Escopo restrito à Hero completa; sem Work, novas páginas, header de scroll ou novas issues. Base: `origin/main`, merge da #2 em `91ca36f`. `FakeErrorIntro.tsx` permanece sem alterações.

## Prévia

- Gravações e capturas (servidor local de revisão): http://localhost:3204
- pt-BR: http://localhost:3104/?intro=replay
- EN: http://localhost:3104/en?intro=replay
- Sem query, uma sessão já concluída abre a Hero final; `?intro=replay` sempre começa no erro.
- Após a sequência, “Rever intro” / “Replay intro” permite repetir sem limpar storage. Também disponível em desenvolvimento.
- O erro inicia a intro automaticamente após 4 s. Recarregar continua antecipando a mesma sequência; não há dois disparos concorrentes.
- Reduced motion: ativar a preferência no sistema/DevTools e recarregar a prévia.

## Referências e decisões

- Composição editorial: [referência fornecida](../references/hero/final-layout.png), inspecionada antes de implementar. Wordmark ocupa a maior parte da largura útil e tem protagonismo maior que o lettering da referência. Marca pequena no topo, navegação à direita, apoio e assinatura em âncoras inferiores.
- [Pixel Broke](https://21st.dev/community/components?q=pixel+broke&preview=%2F%40nextjsshop%2Fcomponents%2Fpixel-broke-button): preview oficial aberto e observado no navegador, inclusive em hover. Adaptada somente a mecânica de fragmentos desaparecendo, sem copiar componente, identidade ou dependências.
- BrandWordmark contém a geometria exata do SVG fornecido `side-wordmark-parts.svg`, com identificadores internos convertidos para `data-part`. Letras mantêm `currentColor`; ponto mantém `#3919BD`. Os assets originais permanecem intactos.
- A mesma instância do SVG forma símbolo, recebe as letras e chega à posição final. O ponto muda de posição/proporção entre símbolo e wordmark seguindo os assets oficiais.
- ScrambleTextPlugin usado só no código pós-clique. SplitText não foi necessário: as três frases têm wrappers próprios e copy sem splits para leitores de tela. Nenhuma nova dependência.
- Reconstrução por 32 regiões desiguais no desktop e 16 no mobile. Quando o roxo completa a tela, essas regiões cedem lugar a um círculo SVG que cobre todo o viewport. Seu centro fica fixo no ponto oficial e o raio converge até o raio desse ponto, sempre circular, sem torção ou deformação fluida. A contração dura 3,1 s, com interpolação do raio que suaviza a chegada ao ponto e velocidade nula nas extremidades. O círculo temporário termina na posição/tamanho do ponto oficial e desaparece sobre ele. Esta direção segue as correções explícitas do usuário na revisão.
- Até 100 fragments na versão desktop e 50 no mobile; zero na alternativa reduced motion. DOM temporário removido após a intro, timelines revertidas, overflow temporário do body restaurado. Na Hero final, timers nativos agendam os glitches pontuais; não há loop de animação permanente entre as interações.
- Em telas baixas, o scroll inicial fica preservado durante o delay; o retorno ao topo acontece sob a tela preta. Não há salto visível do falso erro ao ativar.
- `sessionStorage` é lido via snapshot cliente após hidratação. Um gate de visibilidade evita mostrar o erro por um frame em visitas repetidas. Conclusão só é gravada quando toda a intro termina; storage indisponível não interrompe a experiência.
- Decisão explícita do usuário: Trabalhos, Serviços, Por que Side e contato sem destino, com aparência de navegação. A revisão posterior removeu EN/PT da navbar; as rotas localizadas continuam disponíveis diretamente. A futura troca de idioma no footer está fora desta entrega.

## Refinamentos solicitados na revisão

- Destruição pós-clique mais lenta: maior intervalo entre textos/links, lista, código, headline e botões; fragments permanecem visíveis por mais tempo. O delay inicial de 340 ms e o erro anterior ao clique permanecem iguais.
- “Frustrante”, “seus clientes” e “trabalhar por você” em negrito e `#3919BD`, com equivalentes em EN. O tom exato sobre preto foi escolhido explicitamente pelo usuário, após apresentar a alternativa de um roxo mais claro para contraste.
- Frases de impacto sem ponto final nos dois idiomas. A interrogação da primeira frase permanece; apoio e assinatura final mantêm a copy existente.
- Sobre a tela roxa, o texto permanece branco e somente o trecho em destaque passa gradualmente a preto, mantendo o negrito. A interpolação de cor dura 900 ms e acompanha a reconstrução do fundo, sem troca instantânea. A frase permanece visível nesse estado antes da convergência.
- Navbar sem seletor EN/PT. Nenhum footer implementado.
- Contato e replay em `#3919BD`, exatamente a cor do ponto da marca. Os outros textos da navbar permanecem pretos (`#080808`) e com peso padrão 400, conforme a última correção do usuário. Contato com peso semibold 600, usando Segoe UI/system-ui para dispor de um peso intermediário real. Todos os itens de texto da navbar ficam sem sublinhado em repouso; o sublinhado roxo de 1,5 px entra da esquerda em 280 ms no hover com mouse e também indica foco de teclado. Em reduced motion, aparece sem animação; em touch, não há hover persistente.
- Convergência inteiramente circular, substituindo o movimento fluido anterior. Reduced motion mantém a alternativa por fade, sem contração grande de tela.
- Início automático em 4 s após a hidratação, somente enquanto o erro está ativo. Clique antecipado cancela o timer; visitas com sessão concluída continuam abrindo diretamente a Hero final. Replay também reinicia esse intervalo.
- Menu mobile: três traços SVG sem borda, com as rotações, easings e duração de 300 ms da referência fornecida. O painel entra e sai por fade, deslocamento leve e máscara em 340 ms. Fechado, fica `inert` e fora dos anúncios/foco. Escape fecha e devolve o foco ao botão. Sublinhado roxo vindo da esquerda em hover/foco; em touch aparece durante a pressão, sem permanecer preso.
- Apoio e assinatura alternam pequenos glitches de letras a cada 8–14 s, em pulsos de 680 ms. A copy original mantém a geometria do parágrafo e uma versão semântica estável; as camadas visuais são `aria-hidden`. Timers e timelines são cancelados no replay/unmount. Reduced motion deixa esses textos estáveis.
- Hover da marca baseado no [frame da gravação fornecida](../references/hero/logo-hover.png), extraído de `Gravação de Tela 2026-10-02 093525.mp4` (16 s). Luz branca difusa e discreta acompanha o cursor, limitada ao desenho oficial por máscara SVG; deslocamento máximo de 5 px horizontal / 3 px vertical e inclinação máxima de 1°. Entrada/saída suaves, sem modificar os paths da marca. Touch não ativa o efeito. Reduced motion preserva somente a luz sob o cursor, sem deslocamento/inclinação.
- A adaptação do ícone usa React e CSS Modules existentes. Não foram adicionados shadcn, Tailwind, Radix ou componentes genéricos do boilerplate fornecido como referência.

## Sequência

Delay pressionado de 340 ms → corrupção neutra → fragmentação de textos/links, lista, código, headline, botões/ícone e superfícies brancas → silêncio preto por aproximadamente 370 ms → três frases na ordem aprovada → reconstrução em `#3919BD` → convergência no ponto real → S e símbolo → i/d/e e wordmark → composição final e assinatura.

Versão principal dura aproximadamente 23,1 s após a ativação; sem clique, começa automaticamente após 4 s. A destruição até o preto passou de aproximadamente 2,6 s para 4 s. Reduced motion dura aproximadamente 16,8 s, com fades, frases, roxo, ponto, símbolo, wordmark e Hero; sem scramble, slices ou fragments. Mudanças da preferência durante a sequência são tratadas com cleanup e reinício na variante correspondente. No estado final, a preferência também desativa os glitches periódicos e a movimentação da marca.

## Evidências

- [Hero desktop pt-BR](hero-cinematic/desktop-pt-BR-final.png)
- [Hero mobile pt-BR](hero-cinematic/mobile-pt-BR-final.png)
- [Hero desktop EN](hero-cinematic/desktop-en-final.png)
- [Hero mobile EN](hero-cinematic/mobile-en-final.png)
- [Sequência desktop](hero-cinematic/desktop-pt-BR.mp4)
- [Sequência mobile](hero-cinematic/mobile-pt-BR.mp4)
- [Sequência EN](hero-cinematic/desktop-en.mp4)
- [Reduced motion](hero-cinematic/reduced-pt-BR.mp4)
- [Destaque roxo sobre preto](hero-cinematic/narrative-black.png)
- [Texto branco e destaque preto sobre roxo](hero-cinematic/narrative-purple.png)
- [Convergência circular](hero-cinematic/convergence.png)
- [Contato com sublinhado no hover](hero-cinematic/contact-hover.png)
- [Luz suave na marca](hero-cinematic/logo-light.png)
- [Menu mobile e sublinhado](hero-cinematic/mobile-menu-hover.png)
- [Interações desktop e glitch de texto](hero-cinematic/desktop-interactions.mp4)
- [Menu mobile e glitch de texto](hero-cinematic/mobile-menu.mp4)

## Validações

- lint: pass, zero warnings.
- typecheck: pass.
- build: pass, duas Homes pré-renderizadas.
- Testes existentes: não havia suíte. Verificações funcionais via Playwright temporário fora das dependências do projeto.
- [Resultados no navegador](hero-cinematic/results.json): mouse/Enter/Space, delay sem mudança de posição, narrativa sem ponto final e destaques nos dois idiomas, amostras de cores intermediárias na mudança gradual dos destaques, geometria circular e redução progressiva do raio por pelo menos 2,8 s, cores/pesos dos itens da navbar, sublinhado vindo da esquerda no hover/foco, contato semibold, replay roxo, navbar sem EN/PT, fragments reduzidos no mobile/ausentes com reduced motion, final estático, DOM pesado removido, sessão/replay e acesso direto às rotas localizadas, foco e menu por teclado, vinte layouts finais.
- [Contato em touch](hero-cinematic/contact-touch.json): o sublinhado não fica preso após toque; botão segue sem destino.
- [Cleanup](hero-cinematic/cleanup-results.json): dez desmontagens em React StrictMode de desenvolvimento, durante destruição, narrativa, convergência e após conclusão, inclusive durante hover/glitch; zero animações e timers restantes. Eventos enviados à marca já desmontada não reativam o efeito.
- [Novas interações](hero-cinematic/interaction-results.json): início automático medido em aproximadamente 4,04–4,06 s, primeira visita e visita repetida, textos periódicos sem alterar copy original, luz/parallax no desktop e ausência de parallax/glitch com reduced motion, menu via Enter/Escape, console sem erros/warnings.
- [Frames intermediários do menu](hero-cinematic/menu-motion.json): fade do painel e transformação dos traços confirmados durante a abertura, com foco desativado no painel fechado.
- [Timer inicial](hero-cinematic/idle-cleanup.json): desmontar ainda no erro cancela o início automático; nenhuma ativação tardia após 4 s, em StrictMode.
- [Navbar, preferência e touch](hero-cinematic/final-delta.json): sublinhado exatamente roxo em todos os itens, copy restaurada ao ativar reduced motion durante um glitch, marca sem movimento nessa variante e menu funcional em contexto touch sem hover preso/overflow.
- [Resiliência](hero-cinematic/resilience-results.json): preferência de movimento alterada durante a sequência e storage indisponível.
- [Estado inicial](hero-cinematic/starting-state.json): capturas pt-BR desktop e mobile idênticas byte a byte às capturas aprovadas da #2.
- [Integridade da marca](hero-cinematic/asset-integrity.json): os seis paths do wordmark têm o mesmo hash no asset original e no componente.
- [Sessão e hidratação](hero-cinematic/session-hydration.json): scripts atrasados artificialmente, sem exibir o erro em uma sessão já concluída.
- [Prévia de revisão](hero-cinematic/review-preview.json): página local funcional e seis MP4s carregados no navegador, incluindo luz/glitch desktop e menu/glitch mobile.
- O círculo temporário declara `cx`, `cy` e `r` iniciais válidos. O revert do GSAP restaura esses valores e evita avisos de atributos SVG vazios na conclusão, no replay e em mudanças de reduced motion.
- Console e hidratação: sem erros ou warnings nos cenários executados. Browser: Edge/Chromium 154.0.4258.48.
- Inspeção visual local da sequência, estados intermediários e Hero final comparados às referências. Qualidade subjetiva aguarda revisão humana.

## Limites da validação

Mobile emulado; sem validação em aparelho físico, Safari ou Firefox. Tipografia depende da disponibilidade das fontes do sistema. Testes temporários ficam em `artifacts/`, fora do pacote e do bundle. Os itens de navbar/contato sem destino seguem a decisão explícita desta entrega.

## Critérios de aceite da issue

Checkboxes abaixo distinguem verificações realizadas de julgamentos visuais que precisam da aprovação humana. Pendências de aprovação não são bloqueios técnicos.

### Starting state
- [x] Existing approved fake-error screen remains visually intact before activation.
- [x] Reload trigger still works with mouse and keyboard without actual reload.

### Cinematic transition
- [ ] Post-click delay/pressed state feels believable before the reveal starts.
- [x] Glitch language is black/white/neutral — no RGB split effect.
- [ ] Text corruption looks authored rather than like a generic preset.
- [x] Error UI breaks apart using irregular pixel/fragment behavior inspired by the approved Pixel Broke reference.
- [x] Breakup is hierarchical and not a uniform retro grid.
- [x] Error interface fully resolves into a black viewport.

### Narrative copy
- [x] All three approved sentences appear in the correct order in pt-BR.
- [x] English route uses the approved equivalent copy.
- [ ] Copy remains readable and is not overwhelmed by continuous glitch effects.

### Brand transition
- [x] Black transitions into full Side purple (`#3919BD`).
- [x] Purple surface visually collapses/converges into one brand dot.
- [x] Brand dot uses the supplied asset/geometry.
- [x] Side symbol is revealed from that moment without a hard cut.
- [x] Individual wordmark parts reconstruct into complete `side.`.
- [ ] Wordmark moves naturally into its final Hero composition.

### Final Hero
- [x] Final background is white.
- [x] Large Side wordmark is the primary visual element.
- [x] Small Side symbol appears top-left.
- [x] Desktop navigation is aligned to the right and localized correctly.
- [x] Supporting copy and signature are present in both locales.
- [ ] Final composition clearly follows the approved editorial-layout reference without copying its identity.
- [ ] Final state feels intentionally designed even when no animation is running.

### Responsive/accessibility
- [x] Desktop, laptop, tablet and common mobile widths are visually validated.
- [x] Mobile version preserves the narrative rather than simply shrinking desktop.
- [x] No horizontal overflow.
- [x] Reduced-motion version preserves the complete story without aggressive glitch.
- [x] Keyboard navigation/focus works in the final Hero.

### Session/quality
- [x] Full intro can be shown on first session visit and bypassed on subsequent Home visits.
- [x] A development/review replay mechanism exists.
- [x] No leaked GSAP animations after transition/unmount.
- [x] No console/hydration errors.
- [x] lint passes.
- [x] typecheck passes.
- [x] build passes.

## Registro da entrega

Implementação inicial em `0bc13f9`; assets e referência em `b78b66e`; seis refinamentos em `a3f0764`; revisão de copy, cor gradual, convergência circular e hover da navbar em `09e2674`; início automático, menu e interações finais em `f05839b`. Esta revisão substitui as evidências anteriores pelas capturas e gravações atualizadas. Sete sequências completas, incluindo 320×568, vinte layouts finais e 28 verificações de hover/cor/peso na navbar passaram. As amostras de motion registram treze cores ao longo da mudança dos destaques e 39 raios na contração circular das variantes principais. As gravações completas incluem o início automático; mais duas mostram as novas interações. MP4s verificados no navegador: [sequências](hero-cinematic/recording-results.json) e [prévia com seis vídeos](hero-cinematic/review-preview.json).

A validação humana pendente deve avaliar principalmente ritmo, força da ruptura, continuidade da convergência/ponto/marca, composição final, chegada do menu mobile, sutileza da luz e frequência/intensidade dos glitches finais. Após aprovação, publicar esta branch e abrir PR com estas evidências. A issue permanece aberta até aprovação e integração conforme o fluxo solicitado.
