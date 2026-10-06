# Services — revisão final / fase 5

Status: **Ready for review**. Revisão da #8, após os refinamentos dos checkpoints anteriores. Nenhuma mudança de código foi necessária na fase 5. Aprovação visual explícita recebida em 06/10/2026: “Pode subir!”. Publicação da branch e abertura do PR autorizadas; a issue permanece aberta até o merge.

## Prévia

- Home pt-BR: `http://localhost:3000/`.
- Home EN: `http://localhost:3000/en`.
- Sequência isolada em desenvolvimento: `http://localhost:3000/review/services/sequence` e `/en/review/services/sequence`.
- [Gravação desktop PT](services/final/desktop-pt.mp4).
- [Gravação mobile PT](services/final/mobile-pt.mp4).
- [Gravação mobile EN](services/final/mobile-en.mp4).
- [Gravação mobile com reduced motion](services/final/mobile-reduced-pt.mp4).

As gravações mostram a Home real, do final de Selected Work ao terminal, com scroll, consulta dos gráficos e menu mobile. MP4 H.264, 30 fps, yuv420p, sem áudio, faststart. Nenhuma UI foi reconstruída nas evidências.

## Matriz

| Configuração | Locale | Motion | Entrada |
| --- | --- | --- | --- |
| 1440 × 900 | PT | Completo | Mouse / teclado |
| 1366 × 768 | EN | Completo | Mouse / teclado |
| 390 × 844, DPR 3 | PT | Completo | Touch / teclado |
| 320 × 568, DPR 2 | EN | Completo | Touch / teclado |
| 768 × 1024, DPR 2 | PT | Completo | Touch / teclado |
| 740 × 360, horizontal | EN | Completo | Touch / teclado |
| 1440 × 900 | EN | Reduced | Mouse / teclado |
| 390 × 844 | PT | Reduced | Touch / teclado |

## Verificações

- Três serviços na ordem aprovada, copy localizada e fundo branco inicial.
- Títulos aparecem ao cruzar o centro, subtítulos próximos e demonstrações acionadas automaticamente. O harness avança 4 px além do trigger para não estacionar exatamente na fronteira de entrada; também exige opacity final 1, além de medir a posição do título.
- Passagem Selected Work → Services, perspectiva roxo → vermelho, dissolução 01 → 02, desaparecimento 02 → 03 e retorno do terminal.
- Scroll avança continuamente na primeira demonstração nas oito configurações, sem pinning ou overflow horizontal.
- Dashboard: reflow de dois KPIs por linha no mobile; gráfico de conversão omitido nesse tamanho conforme revisão anterior; valores por teclado, origem selecionável, período de 7 dias, modal dentro da viewport, scroll do modal local e foco restaurado.
- Touch sem cursor customizado; reduced motion sem cursor com inércia, sem count-up prolongado, sem desenho complexo dos charts ou typing longo.
- Terminal é uma janela central no stage, com conteúdo HTML/CSS, inglês nas duas versões e instruções finais dentro da borda, mantendo ao menos 20 px de margem interna nas configurações medidas.
- Navbar mobile abre/fecha por teclado e toque, recupera foco e acompanha a atmosfera escura. A navbar transparente e seu comportamento sobre conteúdo durante o scroll foram preservados conforme pedidos anteriores.
- Console/hydration sem erros capturados. Desenvolvimento registra separadamente o aviso LCP do Next para a mídia OWL em alguns saltos de QA; produção não apresentou esse aviso.
- Cleanup em React Strict Mode: cinco desmontagens durante a animação, sem timelines/ScrollTriggers/listeners remanescentes. Services inativo não monta demos. Reduced motion dinâmico, resize e retorno passaram.
- Produção local: Home PT/EN, primeira visita, reload automático em aproximadamente 2 s, intro completa e visita repetida na sessão. As rotas de review retornam 404 em produção.
- `npm run lint`, `npm run typecheck` e `npm run build`: pass. Sem suite npm de testes existente; verificações dirigidas por Playwright externo ao projeto.

Resultados: [matriz completa](services/final/review.json), [produção](services/final/production.json), [cleanup](services/final/cleanup.json). Evidências dos defeitos corrigidos anteriormente e da retomada dos gráficos: [regressão](services/chart-interaction.json).

## Frames

- [Serviço 01 no mobile](services/final/mobile-pt-title-1.png).
- [Experiência original](services/final/mobile-pt-experience.png) / [perspectiva aberta](services/final/mobile-pt-experience-open.png).
- [Dashboard mobile](services/final/mobile-pt-dashboard.png) / [320 px EN](services/final/small-en-dashboard.png).
- [Modal](services/final/mobile-pt-modal.png).
- [Terminal mobile](services/final/mobile-pt-terminal.png) / [320 px EN](services/final/small-en-terminal.png).
- [Menu escuro](services/final/mobile-pt-menu-dark.png).
- [Reduced motion desktop EN](services/final/reduced-en-terminal.png).

## Limites e aprovação

Validação em Edge headless com emulação de viewport, touch, densidade e preferência de movimento. Não foi realizada em dispositivo físico ou Safari/Firefox; esses browsers não estão disponíveis no ambiente de QA. Inspeção dos screenshots e frames das gravações não substitui o julgamento visual do usuário.

As revisões explícitas do usuário prevalecem sobre sugestões iniciais da issue: gráfico vivo durante a visualização, hover com valorização verde sem aumento de tamanho, remoção de activity e de botões de abertura/perspectiva, dados sinalizados como ilustrativos sem “Demo”, terminal de referência em inglês e maior, replay da intro somente na Hero, além da navbar revisada.

O arquivo `dashboardData.ts` mantém a edição preexistente do usuário (`Real time` em EN). Essa copy já estava presente na prévia e em todas as validações finais; foi incluída na publicação para que o PR corresponda ao resultado aprovado.

Pendências: revisão de código/checks do PR e merge pelo fluxo normal. A aprovação visual da experiência completa foi recebida. Manter #8 aberta em Ready for review até o merge. Nenhuma seção posterior foi iniciada.

Para o PR, [dashboard e hover](services/final/dashboard-hover.mp4) e [terminal](services/final/terminal.mp4) são recortes contínuos da gravação desktop final acima, sem alteração da UI ou da velocidade de reprodução.
