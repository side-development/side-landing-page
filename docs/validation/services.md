# Services — checkpoint 1 / dashboard

Issue [#8](https://github.com/side-development/side-landing-page/issues/8), base `main` `e3077a2`. Revisão: 05/10/2026. Branch local `feat/issue-8-services`.

## Status

**Partial. Dashboard isolado: Ready for review.** A #8 inteira ainda está incompleta. A aprovação visual deste checkpoint precede terminal, experiência de sites e integração. Nenhum push/PR foi feito. Hero e Selected Work permanecem intactos.

## Prévia funcional

- pt-BR: http://localhost:3000/review/services
- EN: http://localhost:3000/en/review/services
- Título aparece do blur no centro e segue somente para cima pelo scroll, até o topo da composição. Subtítulo e dashboard surgem depois, também do blur. Sem botão de abrir produto e sem prender a página.
- KPIs: hover em desktop valoriza o valor demonstrativo, torna o número verde e revela uma seta. Fonte e escala permanecem iguais; ao sair, retorna ao valor base. Percentuais usam pontos percentuais conforme o indicador.
- Lista de período própria, com seleção de 30/7 dias, navegação por setas, Escape e fechamento externo. Muda os dados efetivamente.
- Legenda anterior ativa/desativa a comparação. Gráfico responde a mouse/touch e teclado com setas, Home/End.
- Explorar dados abre modal responsivo com tabela, cabeçalho fixo e scroll interno. Escape fecha, Tab permanece na janela e foco retorna ao acionador.
- Blur de 0,7px restrito ao dashboard; backdrop global transparente. Cursor nativo no modal evita que o cursor Side fique abaixo da camada superior do dialog. O cursor Side retoma fora do modal.

A rota existe somente em desenvolvimento: produção responde 404 nos dois idiomas. O dashboard ainda não está conectado à Home. A rota e o wrapper de review serão removidos na integração aprovada.

## Implementação e dados

- Pesquisa de todas as referências em `docs/references/services/README.md`, incluindo fontes reais, imagens/vídeos e limites de acesso.
- Dashboard em DOM/CSS/SVG, sem dependências novas: hierarquia contínua de quatro KPIs, receita diária com comparação, origens, atividade e dados contextuais.
- `Demo data` explícito em PT/EN; descrição acessível informa que os números não representam resultados da Side/clientes. Hover é uma simulação local, sem modificar a série de dados.
- Setembro/2026: soma exata de R$ 248.420 e comparação anterior de aproximadamente +18,7%. Sete dias compara com os sete dias imediatamente anteriores.
- Entrada automática: frame → shell → KPIs/count-up → traçados → barras → atividade. Pausa fora da viewport/aba e termina estática.
- Reflow mobile, cursor nativo touch/reduced motion e dados finais imediatos em reduced motion.
- Entrada revisada: blur transitório de 10px no título, 6px no subtítulo e 4px no dashboard, removido ao finalizar cada reveal. Título mantém sua âncora no documento e sobe pelo scroll natural, sem tween de posição descendente. Reduced motion preserva composição estática sem blur.

## Correção do gráfico

A regressão frame a frame reproduziu progresso normalizado arredondado para apenas `1px`/`0px`: o desenho saltava em vez de avançar continuamente. `autoRound: false` preserva valores intermediários. Máscaras SVG ao longo dos próprios paths revelam as linhas sem transformar o pontilhado da comparação em traço contínuo durante a animação.

Formatadores numéricos agora são reutilizados: a amostra anterior criava 304 instâncias durante o count-up; a posterior cria zero. O teste posterior observou 62/64 frames intermediários, sem pausa de desenho acima de 100ms, em CPU normal e limitação 4×. Isso não é uma garantia de FPS em outros dispositivos. Relatório: `services/chart-reveal.json`.

## Validações

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | pass, zero warnings |
| `npm run typecheck` | pass |
| `npm run build` | pass |
| Console / hydration | pass, oito cenários sem erros/warnings |
| Desktop 1440×900 e 1920×1080 | pass |
| Mobile 390×844, 320×568 e tablet 768×1024 | pass, sem overflow horizontal |
| pt-BR / EN / EN mobile | pass |
| Reduced motion | pass |
| Título central → topo; entrada por scroll | pass |
| Entrada com blur, título sem movimento descendente, filtros removidos | pass, desktop/mobile/EN; sem blur em reduced motion |
| KPI verde, valor maior, fonte igual e sem transform | pass |
| Seletor customizado, comparação, tooltip e teclado | pass |
| Modal, scroll interno, foco, Escape, blur local e cursor visível | pass |
| Desenho contínuo e pontilhado estável, CPU normal/4× | pass |
| Pausa fora da viewport e retomada | pass |
| Cinco desmontagens em React StrictMode | pass, zero observers/listeners/animações da demonstração após cleanup |
| Desmontagem com modal/lista abertos | pass, scroll restaurado e janelas removidas |
| Rota review em produção | pass, HTTP 404 pt-BR/EN |
| Home de produção PT/EN | pass, seções aprovadas presentes e console sem erros/warnings |
| Diff em Hero, Work, cursor, estilos globais, i18n e dependências | zero |

Não há suíte persistente de testes no repositório. QA e regressões foram executados com Playwright/Edge temporários, fora das dependências do produto. Scripts descartáveis em `artifacts/services-8/` (ignorado pelo Git); resultados em `services/revision-results.json`, `services/blur-entrance-results.json`, `services/dashboard-cleanup.json`, `services/chart-reveal.json` e `services/phase-one-production.json`.

## Evidências atuais

- `services/revision-desktop.png`, `revision-wide.png`, `revision-en.png`;
- `services/revision-mobile.png`, `revision-small-mobile.png`, `revision-tablet.png`, `revision-mobile-en.png`, `revision-reduced.png`;
- `revision-*-intro.png`, `revision-*-kpi.png`, `revision-*-period.png` e `revision-*-modal.png` demonstram as interações aplicáveis;
- `services/blur-desktop.mp4`, `blur-en.mp4`, `blur-mobile.mp4`, `blur-reduced.mp4`: entrada atual por scroll com blur, construção, gráfico, seletor e modal.
- `services/blur-*-mid.png` e `blur-*-final.png`: fases da entrada revisada.

Os arquivos `dashboard-*` registram a primeira proposta. Os vídeos `revision-*.mp4` registram a revisão anterior à entrada com blur. Para avaliar o motion atual, use `blur-*.mp4`.

## Critérios e pendências

- [x] Pesquisa das referências obrigatórias registrada.
- [x] Quatro KPIs, período/comparação, gráfico e contexto.
- [x] Dados demonstrativos coerentes e sinalizados.
- [x] Construção automática e estado final estático.
- [x] Ajustes solicitados de título, hover, período, modal e gráfico.
- [x] Mobile/EN/reduced motion/teclado/cleanup verificados.
- [x] Seções aprovadas preservadas; nenhuma dependência adicionada.
- [ ] Aprovação visual do dashboard pelo usuário.
- [ ] Terminal isolado e comparação com referências aprovados.
- [ ] Experiência original de sites implementada e revisada.
- [ ] Integração dos três capítulos e transições 01→02 / 02→03.
- [ ] Validação da seção integrada e aprovação final antes de push/PR.

QA em Edge/Chromium com emulação de viewport/touch/reduced motion. Sem testes em dispositivos físicos ou Safari/Firefox. O build de produção valida a Home preservada e o bloqueio do review; a seção integrada terá validação própria após os checkpoints.
