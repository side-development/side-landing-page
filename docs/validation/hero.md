# Validação — Home / Hero 01 #2

> Evidência histórica da entrega inicial. A [revisão pela referência](hero-reference.md) registra a copy, os timings e os controles atuais autorizados posteriormente pelo usuário.

**Status: Ready for review.** A implementação está tecnicamente validada; a credibilidade da ilusão e a percepção do timing aguardam aprovação humana. A issue deve permanecer aberta.

## Ambiente e evidências

01/10/2026, Windows, Node 22.19.0, npm 10.9.3, Edge/Chromium instalado. Checks da aplicação realizados sobre `npm run build` + `npm start`. Playwright e esbuild foram ferramentas temporárias fora do projeto, sem alteração das dependências de produto/desenvolvimento.

- Lint: pass, zero warnings.
- Typecheck: pass.
- Build: pass; `/pt-BR` (rota interna) e `/en` pré-renderizadas.
- Testes existentes: não havia suíte. Checks funcionais automatizados no navegador: pass.
- [Resultados dos checks](hero/results.json), incluindo eventos de texto, viewports e cleanup.
- [Antes: placeholder da foundation](hero/before-foundation.png).
- Depois: [desktop pt-BR](hero/desktop-pt-BR.png), [desktop EN](hero/desktop-en.png), [mobile pt-BR](hero/mobile-pt-BR.png), [mobile EN](hero/mobile-en.png).

## Comportamento comprovado

- `/` e `/en`: HTTP 200, `lang` correto, cópias exatas aprovadas e botão sem mistura de idiomas. Não há header, nav, footer, logo, wordmark ou cor roxa na tela.
- Tela inicialmente estática. A primeira corrupção está programada para 1,86 s após a montagem; a pista para 2,4 s, retornando em 2,54 s. A captura confirmou a pista por aproximadamente 134 ms nos dois idiomas. Os timestamps do JSON começam na instalação do observer após o carregamento, não na montagem do componente.
- Idle recorrente com atraso aleatório entre 1,8–4,8 s após cada pulso. Na captura final, os intervalos entre inícios foram aproximadamente 4,92 s, 3,22 s e 2,40 s. Os frames e a duração também variam.
- Clique, Tab + Enter e Tab + Space: disparo nos dois idiomas sem nova navegação/reload. A identidade do documento permanece a mesma.
- Após o clique: `data-hero-state="triggered"`, código original restaurado e nenhuma nova corrupção durante a observação de 5,2 s. Não há armazenamento de conclusão em cookie/sessionStorage.
- Reduced motion nos dois idiomas: somente `ERR_DIGITAL_EXPERIENCE` e retorno ao código original, com fades de opacidade e tempo maior de leitura; nenhuma repetição de jitter. Disparo por teclado continua funcionando.
- Mudar a preferência enquanto o idle está ativo limpa a sequência anterior, restaura o código e inicia a alternativa reduzida. Não há frames corrompidos nessa alternativa.
- Sem overflow ou botão fora da viewport em 18 cenários: ambas as línguas em 1920×1080, 1366×768, 1024×768, 768×1024, 412×915, 390×844, 375×667, 360×800 e 320×568.
- Focus visível verificado no botão. Código animado é oculto da árvore de acessibilidade; o código original permanece disponível de forma estática, evitando anúncios repetidos.
- Sem erros/warnings de console ou hidratação nos cenários de produção.
- Harness temporário compilou os componentes reais com React Strict Mode: desmontagem após 500 ms, 2 s e 4,9 s, nos dois modos de motion. Zero animações GSAP restantes nos seis casos. Cliques/Enter/Space repetidos chamam o callback uma única vez e deixam zero animações restantes.

## Limites da validação

As dimensões mobile/tablet foram emuladas em Edge/Chromium, sem teste em aparelhos físicos ou outros motores. Capturas foram inspecionadas, mas a avaliação subjetiva com um novo visitante continua pendente. A análise automatizada não substitui essa aprovação.

## Roteiro de revisão humana

1. Executar `npm ci`, `npm run build`, `npm start`; abrir `/` e `/en` em abas novas.
2. Nos primeiros ~2 segundos, avaliar se a tela parece uma falha real de navegador. Avaliar se as anomalias discretas criam curiosidade suficiente para pressionar o botão.
3. Conferir o posicionamento e a naturalidade do texto no desktop, tablet e mobile, inclusive 320–390 px.
4. Testar mouse e Tab + Enter/Space; o estado final desta entrega conserva o erro e o botão pressionado. Não há revelação da Side nesta fase.
5. Ativar `prefers-reduced-motion: reduce`, reabrir a URL e avaliar a pista única, sem jitter. A preferência também pode ser alterada com a página aberta.
6. Confirmar a direção visual e o timing na issue #2 antes de definir/implementar a fase 02.

## Boundary para a próxima fase

`Hero` possui apenas `idle | triggered` e expõe `onReloadTriggered` para um orquestrador cliente futuro. `FakeErrorIntro` reverte o matchMedia e cancela timelines/delayed calls antes de chamar `onReload`. Não há persistência, reveal, copy pós-clique, navegação ou tecnologia extra.
