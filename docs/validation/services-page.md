# Serviços / Services — validação local da #17

15/10/2026. Branch `feat/services-editorial-index`, a partir de `origin/main` (`1f17d85`, Work/PR #16). **Aprovação visual e publicação autorizadas pelo usuário em15/10:** “O corpo só apareece depois do primeiro scrol, fora isso aprovado! pode subir”. A última observação foi reproduzida e corrigida na primeira galeria de Work. Integração por PR, sem merge automático.

Prévia funcional: <http://localhost:3017/servicos> e <http://localhost:3017/en/services>.

Capturas da build de produção: [desktop](services-page/desktop.png), [mobile EN](services-page/mobile-en.png) e [Integrações](services-page/integrations.png). [Resultado de produção](services-page/production-checks.json).

## Entrega atual — refinamentos de 15/10

- Índice editorial com os cinco serviços da Home; primeiro aberto e seleção exclusiva. Mesmo conteúdo/DOM em painel lateral desktop e accordion mobile.
- Problema, entregas possíveis e mudança buscada por serviço, com contato compartilhado. PT-BR/EN completos, sem métricas, preços, prazos ou case fictício.
- Cada seleção revela uma composição SVG própria ligada ao serviço da Home: site e escultura, identidade e aplicações, interface de software, conversa com IA e encaixe sob medida. Chegadas locais e pequenas reações ao hover, sem novos demos ou loops; o conteúdo acessível permanece nos textos do serviço.
- Intro com o mesmo CSS e movimento de Work, um único parágrafo alinhado à direita em PT/EN. Intro e corpo recebem a chegada (blur14/y16,750ms,stagger120ms), com `gsap.matchMedia` para reduced motion inclusive durante a sessão. Work também recebeu o alinhamento e o rodapé existente, com slugs corretos para troca de idioma.
- Removidos conforme pedido: processo, mini-CTA, cabeçalho do índice, contador de seleção, links por serviço e nota/link do fim da lista. O contato segue disponível pela navbar e pelo rodapé.
- Metadados locais/canonical/hreflang e redirects dos slugs trocados. Navegação Home/Work/Serviços/Contato e rodapé conectados. `aria-current` preservado sem sublinhado persistente na página selecionada; hover e foco das demais entradas continuam funcionando. A navbar fica oculta/inert quando o rodapé cobre a viewport, nas duas páginas internas e na Home.
- [Computer Vision](computer-vision-update.md): três imagens fornecidas convertidas em WebP e enquadradas inteiras; case PT/EN revisto para objetos, veículos/placas, produtos em produção e detecção multiclasse urbana. Demais projetos preservados.
- [Referências e decisões](../references/services-page/study.md).

## Browser e evidências

Edge/Chromium via Playwright temporário já disponível no ambiente; sem instalar ferramentas no projeto. Scripts de refinamento `%TEMP%/side-landing-qa/services-refinement-qa.cjs`, `services-refine-capture.cjs` e `services-refine-diagnose.cjs`; resultado e capturas em `%TEMP%/side-services-page/refinement/`. O teste funcional inicial confirmou RED (404) antes da implementação e GREEN após a criação da rota e seleção exclusiva.

| Idioma | Viewport | Motion |
| --- | --- | --- |
| PT-BR / EN | 1440 × 1000 | normal |
| PT-BR | 1024 × 900 | normal |
| EN | 820 × 900 | normal |
| PT-BR | 800 × 1024 | normal |
| EN | 768 × 1024 | normal |
| PT-BR / EN | 390 × 844 | normal |
| PT-BR / EN | 320 × 568 | normal e reduced |
| EN | 1440 × 900 | reduced |

Os 13 cenários passaram: cinco seleções, exclusividade, composição visual correspondente, entregas e conteúdo completos, remoções solicitadas, intro única alinhada, Enter/Space, menu móvel/Escape, rodapé e navbar, ausência de overflow e erros de console/hidratação. Capturas das cinco composições desktop e mobile inspecionadas visualmente. Reduced motion apresenta as composições completas, sem animações; painéis fechados não executam animações. A hierarquia de títulos passou a H1 → H2 (serviço) → H3 (detalhes), acompanhando a remoção do antigo cabeçalho de seção.

Navegação coberta nos dois idiomas: Home → Serviços; Work ↔ Serviços; refresh; Back/Forward; contato da navbar; PT ↔ EN pelos rodapés de Work e Serviços. Os redirects `/services` → `/servicos` e `/en/servicos` → `/en/services` e a seleção preservada ao mudar desktop/mobile já passaram na etapa inicial e não foram alterados.

## Regressões corrigidas durante a validação

- Primeiro scroll: teste antes da correção confirmou Serviços PT/EN visível na montagem, mas Work PT/EN com a primeira galeria em `opacity:0` e `blur(14px)` após1,8s, sem rolar. O primeiro projeto agora executa a chegada na montagem; só os seguintes dependem do ScrollTrigger. O teste `%TEMP%/side-landing-qa/services-first-arrival.cjs` passou de RED para GREEN com `scrollY:0` nas quatro rotas.

- Refinamento de motion/arte: chat sobre fundo sólido, balões iguais (430×84) e texto de17px, mensagens em sequência (200ms/1200ms), fluxo em1900ms e replay na reabertura. Reduced motion deixa todos visíveis imediatamente. O antigo hub de Integrações foi substituído por peças de encaixe e composição tipográfica própria. Script específico `%TEMP%/side-landing-qa/services-motion-art-qa.cjs`; capturas/resultado em `%TEMP%/side-services-page/motion-art/`. Os seis cenários específicos passaram (PT/EN,1440/390/320,normal/reduced): chegada do corpo observada por mutações reais de estilo, sequência testada por estados intermediários das animações e dimensões medidas no browser com tolerância subpixel. Os 13 cenários gerais e a navegação também passaram novamente; revisão independente confirmou reduced motion dinâmico, ausência de animações nos painéis fechados e foco móvel preservado.

- Em 390 × 844, fechar o primeiro serviço ao abrir o segundo deslocava o título selecionado de y369 para y−104. Após a transição, apenas quando necessário, o título volta a y96. Scroll normal continua nativo. Reduced motion faz a correção no próximo frame, sem animação.
- A revisão independente verificou Tab durante a expansão em 320 × 568. Com a remoção dos CTAs, o alvo seguinte passou a ser o próximo serviço, que podia sair da viewport enquanto a composição aumentava de altura. A correção final considera o controle atualmente focado, respeita a viewport e é cancelada por nova intenção de ponteiro/rolagem/teclas de rolagem. Clique foca o botão sem rolar. O cenário também verificou que a conclusão da expansão não puxa o leitor de volta do rodapé.

## Checks

- Build servida em produção local: seis cenários PT/EN em desktop, mobile e 320px com reduced motion passaram. O corpo já aparece com `scrollY:0`, sem overflow ou erros; resultado em `services-page/production-checks.json`.
- `npm run lint`: sem erros ou warnings.
- `npm run typecheck`: tipos de rota e TypeScript válidos.
- `npm run build`: build de produção, geração de 32 páginas e verificação TypeScript.
- `git diff --check`: sem erros de whitespace.

Limite de validação: browser Chromium/Edge; sem teste em aparelho físico ou leitor de tela. Nenhum formulário ou email real foi enviado. Não foram alteradas as configurações operacionais pendentes de Resend/redes sociais.

Aprovação visual recebida e autorização de envio registradas. Commits separados por responsabilidade; a issue permanece aberta durante a revisão do PR.
