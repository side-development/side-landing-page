# Services — checkpoint 1 / dashboard

Issue [#8](https://github.com/side-development/side-landing-page/issues/8), base `main` `e3077a2`. Data: 05/10/2026. Branch local `feat/issue-8-services`.

## Status

**Partial. Dashboard isolado: Ready for review.** A #8 inteira ainda não está concluída. O usuário exige aprovação deste checkpoint antes de integrar a seção. Nenhum push/PR foi feito.

## Prévia funcional

- pt-BR: http://localhost:3000/review/services
- EN: http://localhost:3000/en/review/services
- `Abrir produto / Open product` repete a construção; a primeira entrada é automática.
- Período de 30/7 dias efetivamente modifica dados e gráfico.
- Legenda anterior ativa/desativa a comparação.
- Gráfico: mouse/touch consulta dias; teclado usa setas, Home/End.
- `Explorar dados / Explore data` abre a tabela da série.

A rota é temporária e só existe em desenvolvimento: produção responde 404 nos dois idiomas. O dashboard não foi conectado à Home. O wrapper de review e a rota serão removidos ao concluir a integração aprovada.

## Implementação

- Pesquisa de todas as referências registrada em `docs/references/services/README.md`, com imagens reais e amostras dos vídeos. Limites de acesso e registros históricos descritos sem atribuir motion a screenshots estáticas.
- Frame claro com hairlines, pouca sombra, faixa de quatro KPIs, receita diária em SVG próprio, comparação, origens e atividade contextual.
- `Demo data` explícito nos dois idiomas; textos acessíveis explicam que não são resultados Side/clientes.
- Série de setembro/2026 determinística: soma exata de R$ 248.420, comparação anterior de aproximadamente +18,7%. Período de sete dias compara com os sete dias imediatamente anteriores.
- Reveal local: frame → shell → KPIs/count-up → paths → barras → activity. Pausa fora da viewport/aba; termina estático; replay explícito.
- Números ganham presença sem layout shift; barras e linhas de activity reagem discretamente. Tooltip usa valores reais do dataset.
- Reflow próprio mobile; dados finais imediatos em reduced motion; nenhum framework ou biblioteca de charts adicionado.

## Validações

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | pass, zero warnings |
| `npm run typecheck` | pass |
| `npm run build` | pass |
| Console / hydration da prévia | pass, oito cenários sem erros/warnings |
| Desktop 1440×900 e 1920×1080 | pass |
| Mobile 390×844, 320×568, tablet 768×1024 | pass, sem overflow horizontal |
| pt-BR / EN / EN mobile | pass |
| Reduced motion e mudança dinâmica da preferência | pass |
| Seletor, comparação, tooltip, tabela e teclado | pass |
| Cursor Side desktop / nativo touch e reduced motion | pass |
| Replay com contagem intermediária | pass |
| Pausa fora da viewport e retomada | pass |
| Cinco ciclos de desmontagem em React StrictMode | pass, zero observers/listeners/GSAP animations da demonstração após cleanup |
| Gate de produção da rota review | pass, HTTP 404 pt-BR/EN |
| Home de produção nos dois idiomas | pass, sem Services; Hero e Selected Work existentes presentes, console sem erros/warnings |
| Diff nas seções aprovadas, global CSS, i18n e dependências | zero |

Não existe suíte persistente de testes no repositório. Verificações funcionais executadas com Playwright/Edge temporários fora das dependências do produto. Relatórios: `services/dashboard-results.json`, `services/dashboard-cleanup.json`, `services/phase-one-production.json`.

### Evidências

- `services/dashboard-desktop.png`, `dashboard-wide.png`, `dashboard-en.png`;
- `services/dashboard-mobile.png`, `dashboard-small-mobile.png`, `dashboard-tablet.png`, `dashboard-mobile-en.png`;
- arquivos `*-hover.png` demonstram crosshair/tooltip;
- `services/dashboard-desktop.mp4`: construção, KPI hover, consulta de dias, troca de período e replay;
- `services/dashboard-en.mp4`, `dashboard-mobile.mp4`, `dashboard-reduced.mp4`.

## Critérios do checkpoint

- [x] Pesquisa Linear/Stripe/Vercel/Awwwards registrada.
- [x] Quatro KPIs, período/comparação, gráfico principal e suporte contextual.
- [x] Dados claramente demonstrativos e coerentes.
- [x] Count-up, path drawing, barras e stagger na entrada automática.
- [x] Estado final estático e replay funcional.
- [x] Interação real no gráfico, hovers contidos e informação sem dependência de hover.
- [x] Mobile/EN/reduced motion/teclado/cleanup verificados.
- [x] Seções aprovadas preservadas; nenhuma dependência adicionada.
- [ ] Direção visual do dashboard aprovada pelo usuário.
- [ ] Terminal isolado e comparação com referências aprovados.
- [ ] Experiência original de sites implementada e revisada.
- [ ] Integração dos três capítulos e transições 01→02 / 02→03.
- [ ] Validação completa da seção integrada.
- [ ] Aprovação visual final antes de push/PR.

## Limites

QA em Edge/Chromium, com emulação de viewport/touch/reduced motion; nenhum teste em dispositivos físicos ou Safari/Firefox. O dashboard interativo foi testado na rota de desenvolvimento. O build de produção validou a Home preservada e o bloqueio da rota de review; a seção integrada terá sua própria validação de produção após os checkpoints.
