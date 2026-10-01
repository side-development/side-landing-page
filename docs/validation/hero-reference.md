# Validação — revisão local do Hero 01 #2

**Status: Ready for review.** Revisão em 01/10/2026. O usuário autorizou o envio da revisão visual e solicitou título “Side” e favicon adaptativo antes do push. A issue #2 permanece aberta, com entrega pelo PR #3.

## Escopo aprovado na conversa

O usuário pediu reproduzir `ERR_CONNECTION_CLOSED imagem br 1.png`, incluindo posicionamento, ícone, textos, lista e “Saiba mais”, usando `sidecode.com.br`; desacelerar as pequenas corrupções; e remover destinos dos controles de ajuda, preservando sua aparência clicável. Essas instruções substituem a copy e os timings originais da #2 somente nesses pontos. A foundation #1 e o limite anterior à revelação da Side permanecem válidos.

Em seguida pediu: “Deixe a guia apenas com Side e coloque a logo na guia também, preta no fundo claro e branca no fundo preto, depois já pode subir!”. A marca aparece somente na guia; o conteúdo do erro não exibe logo ou wordmark.

## Implementado

- Composição da referência em 1251×769: conteúdo em x=274, ícone próprio SVG de 45×54 em y≈79, título em y≈191, código em y≈440 e ações em y≈531. “Saiba mais” começa em x=900. Fonte Segoe UI, fundo branco e cores neutras/azuis.
- Título, descrição, lista e botões completos nos dois idiomas. Domínio em negrito e código original `ERR_CONNECTION_CLOSED`.
- Corrupções iniciais de 200 ms; pista `ERR_DIGITAL_EXPERIENCE` de 400 ms, iniciada em 2,6 s. Pulsos seguintes de 580–720 ms e intervalos aleatórios de 1,8–4,8 s após cada pulso. Alternativa reduzida preservada.
- Textos azuis e “Saiba mais” são botões sem destino ou handler; conservam hover, cursor e foco. “Recarregar” conserva o gatilho local, sem recarregar/navegar.
- Ajustes de quebra e espaçamento mobile; indicador de desenvolvimento do Next oculto para a prévia.
- Título “Side” nos dois idiomas. Favicon SVG derivado da logo existente, com fundo transparente e marca preta/branca segundo `prefers-color-scheme`, preservando o ponto roxo dos assets originais. Os quatro assets de marca permanecem intactos.

## Validações realizadas

- lint: pass, zero warnings.
- typecheck: pass.
- build: pass; rotas dos dois idiomas pré-renderizadas.
- testes existentes: not applicable, sem suíte existente. Checks funcionais em Edge/Chromium com Playwright temporário fora do projeto: pass.
- validação manual: capturas desktop/mobile inspecionadas e composição comparada com a referência. O usuário autorizou o envio após a prévia. Renderizações do favicon em 32×32 também inspecionadas nos temas claro e escuro.

[Resultados completos](hero-reference/results.json). Capturas: [desktop pt-BR](hero-reference/desktop-pt-BR.png), [desktop EN](hero-reference/desktop-en.png), [mobile pt-BR](hero-reference/mobile-pt-BR.png), [mobile EN](hero-reference/mobile-en.png).

[Checks adicionais da guia](hero-reference/tab-results.json): título exato, link SVG único, tipo/sizes e HTTP 200 nos dois idiomas e temas; preenchimento preto no claro e branco no escuro; mudança de tema em funcionamento sem navegação. Console da aplicação sem erros/warnings. Renderizações: [claro](hero-reference/favicon-light.png), [escuro](hero-reference/favicon-dark.png). Estes checks validam a metadata da guia e a renderização do SVG; não capturam a interface externa das abas do navegador.

Os checks cobrem HTTP 200, idioma/copy, ausência de marca/header/footer, timings registrados por MutationObserver, ajuda inerte por clique/Enter/Space sem nova aba ou navegação, gatilho por mouse/teclado, foco visível, cancelamento do idle e identidade do documento preservada. Layout sem overflow e controles dentro da viewport em 18 cenários: 1920×1080, 1366×768, 1024×768, 768×1024, 412×915, 390×844, 375×667, 360×800 e 320×568, nos dois idiomas.

Reduced motion validado nos dois idiomas, sem frames corrompidos. Harness com os componentes reais em React Strict Mode verificou desmontagem em 500, 2500 e 4900 ms nos dois modos de motion: zero animações GSAP restantes. Ativação repetida chamou o callback uma vez, inclusive durante a pista/fade. Sem erros/warnings de console ou hidratação nos cenários de produção. Os timestamps começam na instalação do observer, não na montagem do componente.

## Critérios de aceite

- [x] `/` em pt-BR e `/en` em inglês, sem mistura de idiomas.
- [x] Sem logo, wordmark, roxo ou navegação da Side no conteúdo inicial; logo na guia conforme solicitação posterior.
- [x] Código original e corrupção adaptados à referência expressamente aprovada pelo usuário.
- [x] Pista temporária retorna ao código original; idle irregular.
- [x] Gatilho funciona com mouse, Enter e Space, sem reload real, com cancelamento e callback isolado.
- [x] Reduced motion utilizável; layout responsivo sem overflow nos cenários testados.
- [x] Sem erros de console/hidratação ou animações vazadas; lint/typecheck/build passam.
- [x] Controles de ajuda preservam o visual e não têm destinos.
- [x] Usuário autoriza envio da revisão visual após prévia em funcionamento.
- [x] Guia com título “Side” e logo adaptada aos temas claro/escuro.

## Pendências

- Integração do PR #3. Nenhuma fase posterior foi implementada; a issue visual continua aberta para o fluxo de revisão humana.

## Observações

Sem novas dependências ou assets externos de runtime. Dimensões mobile/tablet emuladas no Edge; sem validação em aparelho físico ou outros motores. Tipografia pode variar em sistemas sem Segoe UI.

Esta documentação acompanha a revisão autorizada para envio. O [relatório inicial](hero.md) preserva a evidência histórica anterior a esta revisão.
