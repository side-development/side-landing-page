# Services — checkpoint 1 / dashboard

Issue [#8](https://github.com/side-development/side-landing-page/issues/8), base `main` `e3077a2`. Revisão: 05/10/2026. Branch local `feat/issue-8-services`.

## Status

**Partial. Dashboard isolado aprovado pelo usuário em 05/10/2026.** Aprovação explícita: “Feito, vamos para a próxima fase!”. A #8 inteira continua incompleta. Terminal isolado segue para o checkpoint 2, registrado em `services-terminal.md`. Nenhum push/PR foi feito. Hero e Selected Work permanecem intactos.

## Prévia funcional

- pt-BR: http://localhost:3000/review/services
- EN: http://localhost:3000/en/review/services
- Entrada revisada a pedido do usuário: título parte do centro e acompanha apenas o scroll natural, sem animar a altura do layout. Blur de título/subtítulo/dashboard dura 1,8s, com reveals sobrepostos. A prévia reutiliza o smooth scroll desktop existente; touch e reduced motion mantêm scroll nativo.
- Quatro KPIs, período 30/7 dias e três gráficos: receita/comparação, gauge de aquisição e fluxo de usuários ativos → retidos → convertidos.
- Atividade recente removida. Após revisão do tamanho, o dashboard ocupa uma viewport inteira no desktop: 1360×900 em tela 1440×900; 1286×768 em 1366×768; 1800×1080 em 1920×1080. Margens de 40px, com limite de largura em telas grandes. Os gráficos se expandem junto ao frame; o título ocupa espaço adicional acima e a página continua pelo scroll, sem recorte do conteúdo. Mobile empilha os gráficos e mantém dois KPIs por linha.
- Hover dos KPIs valoriza o número demonstrativo em verde, sem alterar fonte/escala. Ao sair, retorna ao valor base; valores de conversão/retenção usam pontos percentuais.
- Receita: crosshair pontilhado, ponto vazado e valores pequenos junto à linha. Sem card preto. Home/End e setas inspecionam os dias; readout limitado à área do gráfico nas duas extremidades.
- Origem: gauge fino e aberto com seleção de canais por mouse/touch/teclado; contagens coerentes com a base. Escape restaura o total.
- Fluxo: bandas de cor suaves, seleção das três etapas e percentuais junto à linha de inspeção. Participação explicitamente calculada sobre a base de usuários ativos.
- Seletor de período próprio, estilizado e acessível; corrigida sobreposição dos KPIs que interceptava o clique na lista.
- Explorar dados abre dialog responsivo, scroll interno e tabela de 30/7 dias. Blur de 0,7px apenas no dashboard, backdrop global transparente. Cursor nativo na camada superior do dialog; cursor Side retoma fora dele. Escape/foco e desmontagem preservados.

A rota existe somente em desenvolvimento. A Home não integra o dashboard ainda. O wrapper de review será removido na integração aprovada.

## Correção da entrada

A reprodução anterior mediu redução de 322px na altura do estágio do título durante o scroll e blur do dashboard já em zero após 1s. A entrada agora não altera a geometria do documento: o título se desloca exatamente com o scroll. Reveals temporizados de 1,8s substituem o scrub da altura. O teste atual registra blur do dashboard ainda entre 3–4px após 1s, com copy e frame visíveis simultaneamente durante a dissolução. Em desktop, wheel de 160px se distribui por vários frames com o hook existente. Filtros são removidos ao concluir; reduced motion permanece estático.

## Direção e dados

Pesquisa de todas as referências em `docs/references/services/README.md`; referência direta do usuário em `docs/references/services/dashboard-user-reference.png`. Gráficos feitos em SVG/DOM/CSS/GSAP, sem biblioteca nova.

Paleta verde → âmbar → laranja/vermelho, comparação cinza, superfícies brancas sobre agrupamento cinza claro. Roxo Side preservado no cursor, marca e foco. Nenhum mapa, interface de cliente ou dado real foi inventado.

`Demo data` explícito nos dois idiomas. Receita de setembro/2026 soma exatamente R$ 248.420; comparação de aproximadamente +18,7%. Sete dias compara com os sete dias imediatamente anteriores. Aquisição distribui 4.821/1.264 usuários em 38/27/21/14%; arredondamento conserva o total. Fluxo de 30 dias: 4.821 ativos, 3.298 retidos e 617 convertidos; valores demonstrativos, sem representar resultados Side/clientes.

Construção e counters permanecem finitos. Por solicitação posterior do usuário, receita e fluxo continuam com uma oscilação suave da curvatura, em ciclo de 8s. Amostras/valores finais permanecem fixos e as curvas não ultrapassam máximos/mínimos locais. Movimento pausa fora da viewport/aba; reduced motion não cria o loop. Cleanup remove tweens, observers e listeners.

Movimento contínuo e remoção da atividade substituem explicitamente os requisitos iniciais de estado final estático e activity/table da #8. A tabela continua disponível no modal.

## Validações

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | pass, zero warnings |
| `npm run typecheck` | pass |
| `npm run build` | pass |
| Console / hydration | pass, nove cenários sem erros/warnings |
| Desktop 1366×768, 1440×900 e 1920×1080 | pass, frame com altura de uma viewport |
| Entrada lenta, contínua, sem resize do layout; wheel suave | pass, título/copy/dashboard e reduced motion |
| Mobile 390×844, 320×568 e tablet 768×1024 | pass, sem overflow horizontal |
| pt-BR / EN / EN mobile | pass |
| Reduced motion e troca dinâmica da preferência | pass, curvas estáticas; retomada ao retornar à viewport |
| Readouts pequenos e sem caixa, primeiro/último dia | pass, dentro dos limites em todos os cenários |
| Curvas contínuas e amostras preservadas | pass, sem picos/vales fora do intervalo local |
| Período, comparação, gauge e fluxo | pass, dados mudam e teclado funciona |
| KPI verde, valor maior, fonte igual e sem transform | pass |
| Modal, tabela, Escape e dimensões | pass |
| Cursor Side desktop / nativo touch | pass |
| Touch inspeciona receita | pass |
| Pausa das curvas fora da viewport e retomada | pass |
| Cinco desmontagens em React StrictMode | pass, zero observers/listeners/animações da demonstração após cleanup |
| Desmontagem com modal/lista abertos | pass, scroll restaurado e janelas removidas |
| Hero / Selected Work / cursor global / dependências | sem alterações |

Não há suíte persistente no repositório. QA e regressões executados com Playwright/Edge temporários, fora das dependências do produto. Scripts descartáveis em `artifacts/services-8/`, ignorado pelo Git. Resultados desta revisão: `services/fluid-results.json`, `fluid-extra.json`, `fluid-cleanup.json` e `fluid-entrance.json`.

A correção anterior de `autoRound: false` no traçado foi preservada; relatório de desenho inicial em `services/chart-reveal.json`. Verificação anterior das rotas em produção/Home preservada: `services/phase-one-production.json`. A revisão atual mantém o bloqueio de review e não altera rotas. O build não equivale à validação visual da futura seção integrada.

## Evidências atuais

- `services/fluid-dashboard.png`: dashboard inteiro, 1360×900, sem título;
- `services/fluid-desktop.png`, `fluid-laptop.png`, `fluid-wide.png`, `fluid-en.png`;
- `services/fluid-mobile.png`, `fluid-small-mobile.png`, `fluid-tablet.png`, `fluid-mobile-en.png`, `fluid-reduced.png`;
- `services/fluid-*-home.png` e `fluid-*-end.png`: inspeção nas extremidades;
- `services/fluid-*-blur.png`: blur durante a entrada;
- `services/fluid-desktop.mp4`, `fluid-en.mp4`, `fluid-mobile.mp4`, `fluid-reduced.mp4`: construção, movimento, KPIs, inspeção, gauge/fluxo, seletor e modal.

Evidências `dashboard-*`, `revision-*` e `blur-*` registram propostas anteriores. Use `fluid-*` para esta revisão.

## Critérios e pendências

- [x] Pesquisa das referências obrigatórias registrada.
- [x] Quatro KPIs, período/comparação, gráficos e contexto.
- [x] Dados demonstrativos coerentes e sinalizados.
- [x] Construção automática, counters finitos e curvas contínuas conforme revisão do usuário.
- [x] Gauge/fluxo adicionais, sem mapa; paleta conforme referência.
- [x] Readouts discretos, extremidades corrigidas, atividade removida e dashboard do tamanho de uma página.
- [x] Mobile/EN/reduced motion/teclado/touch/cleanup verificados.
- [x] Seções aprovadas preservadas; nenhuma dependência adicionada.
- [x] Aprovação visual do dashboard pelo usuário.
- [ ] Terminal isolado e comparação com referências aprovados.
- [ ] Experiência original de sites implementada e revisada.
- [ ] Integração dos três capítulos e transições 01→02 / 02→03.
- [x] Entrada revisada neste checkpoint, sem altura animada e com blur mais lento.
- [ ] Scroll/transições da seção integrada na fase apropriada.
- [ ] Validação da seção integrada e aprovação final antes de push/PR.

QA em Edge/Chromium com emulação de viewport/touch/reduced motion. Sem testes em dispositivos físicos ou Safari/Firefox. Issue aberta; não avançar de checkpoint antes de aprovação visual explícita.
