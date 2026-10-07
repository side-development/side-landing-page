# Issue #10 — fase 1 / Why Side isolado

Status: **Fase 1 aprovada para avançar**. Em 06/10, o usuário pediu “deixe mais lento e aprove!”. Aplicada a desaceleração e interpretada a mensagem como aprovação da direção desta fase para montar a fase 2 isolada. A issue #10 permanece aberta; não houve push nem PR. Esta aprovação não conclui a entrega integral nem substitui a revisão da roleta e a aprovação final.

## Prévia funcional local

- PT: http://localhost:3000/review/why-side
- EN: http://localhost:3000/en/review/why-side
- Rota disponível apenas em desenvolvimento e marcada como `noindex`.
- Servidor: `npm run dev -- --hostname 0.0.0.0`.

## Implementação

- Cinco estados na ordem e com as microcopies da issue. Revisões do usuário em 06/10 alteram o prefixo visual/semântico para `Você` / `You` e os valores para inicial maiúscula; todos com peso bold.
- Desktop: composição central em stage sticky CSS; scroll nativo dirige timeline GSAP com scrub de 0,9s. Percurso de 500svh (stage total de 600svh), ampliado de 360svh para desacelerar os cinco estados. Nenhum wheel listener novo, pin GSAP ou snap de scroll vertical.
- Quatro ciclos com foco de 42%, hold de 28%, blur de saída de 26% e respiro de 4%; último estado mantém hold de 58% até a saída natural do stage.
- Prefixo `Você +` / `You +` persistente e nítido no desktop, reposicionado lateralmente em 42% de cada ciclo para centralizar a frase pela largura real do termo atual. A tipografia segue em linha de base comum, sem reservar o espaço dos termos maiores para a marca final.
- Valores textuais roxos `#3919BD`, em bold 700, com inicial maiúscula. Blur desktop de até 22px apenas na segunda palavra; um termo variável visível por vez. A microcopy acompanha por fade sem blur.
- Mobile/tablet até 800px e landscape baixo: estados no fluxo natural de 96svh cada, composição em três linhas nas telas estreitas, blur máximo de 12px, hold de 40% e scrub de 0,55s. Continua sem pinning.
- Reduced motion: cinco estados no fluxo natural, sem sticky, sem blur, fade de entrada/saída de 15% e hold de 70%.
- Sem autoplay, timers de troca de texto ou loops contínuos. ScrollTrigger controla somente a seção e cada trecho móvel.
- Todos os títulos e microcopies existem em uma lista semântica independente da visibilidade das camadas decorativas.
- Marca original `BrandWordmark` reutilizada em preto `#080808`, somente ponto roxo, com altura de `0.82em` e alinhamento de baseline. Side cursor existente reutilizado sem alteração.
- Sem JavaScript, os cinco estados permanecem visíveis no fluxo normal.

## Validações realizadas em 06/10/2026

- `npm run lint`: passou, zero warnings.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- Edge/Chromium via Playwright existente fora do projeto, sem adicionar dependências.
- Desktop PT/EN 1440×900; mobile PT 390×844; EN pequeno 320×667; tablet PT 768×1024; landscape EN 844×390; reduced motion desktop PT e mobile EN.
- Todos os cinco estados nítidos durante hold; nenhum overflow horizontal; ordem semântica e textos disponíveis na árvore de acessibilidade.
- Blur de saída, ausência de camadas sobrepostas e retorno ao valor anterior ao inverter scroll.
- PageDown, cursor com mouse e retorno ao cursor nativo ao pressionar Tab.
- Alteração de reduced motion com página aberta e resize desktop → mobile removem sticky e recompõem a sequência.
- Navegação repetida PT ↔ EN sem duplicar a seção e sem erros de execução. Cleanup de `gsap.matchMedia()` e `useGSAP` revisado no código.
- Fallback sem JavaScript: todos os cinco estados visíveis.
- Sem erros de console ou hidratação nos oito cenários. Limite: emulação Chromium, sem teste em hardware iOS/Safari.
- Diff das seções anteriores, Home, estilos globais, manifests e lockfile: vazio.
- Segunda revisão: centralização dos cinco estados nos dois idiomas, incluindo retorno de Side para Excelência e avanço para Side; composição dentro de 1,5px do centro da área útil da seção. Prefixo permanece nítido e com opacidade 1. Valores em bold 700; marca preta e apenas ponto roxo.
- Cenários da segunda revisão: desktop PT/EN 1440×900, mobile PT 390×844, tablet EN 768×1024 e reduced motion PT 1440×900, sem erros de console/hidratação ou overflow. Evidência atual: [centering-revision.json](phase-one/centering-revision.json). `prefix-revision.json` documenta a revisão anterior, substituída pelo pedido de centralização por estado.
- Desaceleração: esses cinco cenários foram novamente verificados após ampliar o percurso e scrub; cinco estados legíveis e centrados, prefixo nítido, retorno de Side para Excelência e resize preservados. Capturas, resultados e gravações atualizados com a versão mais lenta.

Evidências: [resultados de viewports](phase-one/results.json), [interações](phase-one/interaction.json), capturas em `phase-one/` e gravações [desktop](phase-one/why-side-desktop.mp4), [mobile](phase-one/why-side-mobile.mp4) e [EN com reduced motion](phase-one/why-side-en-reduced.mp4). Ferramentas de inspeção locais em `artifacts/issue-10/`, ignoradas pelo Git.

## Blast radius / pendências

- Novos arquivos apenas em `src/features/why-side/`, rota `/review/why-side` e documentação.
- Home aprovada preservada; integração prevista para a fase 4.
- Referências e adaptações registradas em `docs/references/why-side-social-proof/README.md`.
- Fase 2 liberada após pedido de desaceleração e aprovação da direção da fase 1: roleta horizontal isolada com placeholders explícitos.
- A issue #10 foi posteriormente atualizada pelo usuário com seis copies editoriais aprovadas em PT/EN. Elas substituem a pendência de feedbacks reais e já foram inseridas na [revisão da roleta](reel-revision.md), sem atribuição a clientes.
- Fases 4 e 5: integração e validação completa da Home, mobile/tablet, EN, reduced motion, roleta, drag/swipe e performance.
- Push, PR e fechamento da issue exigem aprovação visual explícita final, conforme #10 e `AGENTS.md`.
