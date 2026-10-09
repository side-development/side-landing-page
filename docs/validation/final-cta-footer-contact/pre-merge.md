# Revisão antes do merge — 09/10/2026

Correções solicitadas pelo usuário após revisar a PR #13. A composição aprovada permanece; esta revisão ajusta permanência das frases de Services, fullscreen do footer e estabilidade do terminal/botão CTA. O usuário autorizou novo envio após corrigir os problemas. Sem merge automático.

## Frases de Services

“Da ideia à experiência” e “Da experiência à ação” terminavam sua transformação quando o article chegava a `top -5%`. No mobile390, o título já estava em y≈−2px ao concluir a segunda frase. Agora, quando a composição cabe na viewport, o palco permanece sticky durante 1,6 alturas de scroll: leitura inicial, transformação e leitura final. O título fica em y≈240px no desktop1440 e y≈181px no mobile390 durante toda a mudança. O scroll reverso recupera a primeira frase.

O percurso usa a altura efetiva do container, sem espaçamento por padding que impediria o sticky. Em telas baixas onde a composição inteira não cabe, permanece o fluxo natural e a transformação termina antes; reduced motion também conserva fluxo natural sem palco prolongado.

Capturas: [primeira frase desktop](pre-merge/experience-first-desktop.png), [segunda desktop](pre-merge/experience-second-desktop.png), [segunda mobile](pre-merge/experience-second-mobile.png). [Seis cenários e geometria](pre-merge/experience-hold.json): desktop, mobile390/320, EN, reduced e paisagem; leitura, posição, estados únicos e reverso.

## Footer fullscreen

Footer com `min-height:100dvh`, grid e wordmark oficial preservados. A navbar desaparece somente quando o footer cobre toda a viewport, com tolerância de1px para arredondamento. O header fica `inert` enquanto oculto e retorna ao rolar para cima. Listeners e atributo são limpos ao sair da Home/trocar rota. Não há header na página isolada de revisão.

[Sete cenários em produção](pre-merge/footer-fullscreen.json): desktop1440×900, laptop1366×768/EN, mobile390×844, mobile320×568, tablet768×1024/EN, paisagem844×390/EN e mobile reduced/EN. Altura igual à viewport, conteúdo contido, sem overflow/runtime; header oculto/inert no footer completo e visível/interativo no footer parcial. [Desktop](pre-merge/footer-desktop.png), [mobile](pre-merge/footer-mobile.png).

## Terminal e botão CTA

O teste básico de locale aguardando seis segundos passava, mas escondia a regressão: trocar PT→EN remontava a Home e reiniciava o terminal completo. O teste imediato retornou `parts:[0,0,0,0]` e `commands:["",""]`. Remover apenas a dependência de idioma não resolveu a remontagem. Agora a conclusão é preservada na sessão da aba, como a intro da Home, e restaurada com todos os blocos/comandos. Media queries também preservam uma conclusão existente. A primeira entrada continua animada; replay explícito do terminal continua independente.

O botão glass inclinava18° durante a pressão, alterando sua área de clique. O clique no centro funcionava, mas próximo à borda inferior falhava. Remover somente a inclinação de pressão do CTA fez o mesmo clique passar; reflexos, sombra, material glass e hover permanecem. [Seis cliques em produção](pre-merge/cta-button.json): centro/borda em desktop, mobile390/PT e mobile320/EN, todos navegam para contato.

O usuário esclareceu depois que a abertura do contato também apresentava erro do Next. Reproduzido na origem HTTP real `192.168.208.1`: `TypeError: crypto.randomUUID is not a function`, com a página desmontada. Em localhost funcionava. `crypto.randomUUID` exige contexto seguro; a prévia HTTP por IP não o fornece. `contactId` usa UUID nativo quando disponível e UUID v4 com `crypto.getRandomValues` quando ausente. Mesma aleatoriedade criptográfica, sem `Math.random`, preservando histórico e idempotência. Contato abriu sem erro em localhost e nos dois IPs autorizados da rede após o fix; o teste de LAN verifica PT/EN, Enter e formato do ID.

Regressão reproduzível: [terminal-regression.mjs](terminal-regression.mjs). Verifica o terminal imediatamente após PT→EN→PT, reload, reduced↔motion e resize, sem aguardar uma segunda entrada. Também pressiona por500ms o centro/borda do CTA e confirma contato. Passou em `next start` no desktop1440 e mobile390, sem erros de página. O Playwright fica fora das dependências da aplicação:

```powershell
$env:SIDE_QA_URL = "http://localhost:3013"
$env:PLAYWRIGHT_MODULE = Join-Path $env:TEMP "side-landing-qa/node_modules/playwright"
$env:SIDE_QA_LAN_URL = "http://192.168.208.1:3013"
node docs/validation/final-cta-footer-contact/terminal-regression.mjs
```

O módulo de navegador já instalado foi reutilizado. Pode-se apontar `PLAYWRIGHT_MODULE` para outra instalação do Playwright. [Stress de entrada interrompida, viewport, media e locale](pre-merge/terminal-stress.json) também passou em desktop/mobile.

O commit inicial agregado foi reorganizado a pedido do usuário em commits por responsabilidade; as correções de Services, terminal, fullscreen do footer, clique do CTA e HTTP do contato possuem commits próprios. A árvore final foi comparada ao snapshot anterior à reorganização.

`npm run lint`, `npm run typecheck`, `npm run build` e `git diff --check` passaram. QA em Edge/Chromium, com toque e viewports emulados; não substitui Safari/iPhone físico. Nenhuma dependência ou envio real foi adicionado. A alteração preexistente em `next.config.ts` foi preservada e excluída do commit.
