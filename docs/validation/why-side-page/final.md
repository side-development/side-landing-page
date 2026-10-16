# Why Side #19 — manifesto completo

Prévia final local, em 16/10/2026. A cena-assinatura e seus refinamentos foram aprovados pelo usuário antes da implementação dos demais capítulos. A página completa aguarda aprovação visual final; não foi feito push, PR ou publicação e a issue permanece aberta.

**Revisão atual:** por pedido explícito do usuário, foram removidos o capítulo completo de projetos, o rótulo “O nome é uma posição” e a logo/assinatura abaixo do parágrafo do nome, em PT e EN. Os três compromissos agora aparecem somente quando alcançados pelo scroll. Todos os demais textos do corpo seguem a mesma chegada suave. Esta revisão substitui o escopo anterior de evidências de Work; os cases existentes permanecem na página Work.

## Avaliar

- [Página PT](http://localhost:3019/por-que-side) e [página EN](http://localhost:3019/en/why-side).
- [Apresentação com os dois vídeos, ápice e capítulos](final/review.html).
- [Vídeo desktop](final/desktop.mp4) e [vídeo mobile](final/mobile.mp4): scroll completo do navegador, incluindo a chegada separada dos três compromissos, sem composição adicionada na edição.
- [Ápice desktop](final/desktop-peak.png) e [ápice mobile](final/mobile-peak.png).
- Reiniciar a prévia: `npm run dev -- --hostname 0.0.0.0 --port 3019`.

## Direção e implementação

A abertura preserva **O eixo comum**: distância física se transforma em direção compartilhada. A faixa principal roxa, o exterior branco contínuo e a retirada dos dois pontos móveis seguem a revisão aprovada. Mobile conserva sua recomposição vertical própria. O scroll é nativo e reversível; o player aparece somente na rota de revisão do protótipo, disponível em desenvolvimento.

Depois do ápice, a página desacelera. O nome abre uma leitura editorial com tipografia grande e três compromissos em linhas abertas. Cada fase chega como bloco: número, título e descrição juntos. Os textos do nome, rótulos e encerramento têm a mesma chegada por scroll, com opacity 0→1, blur 6→0px e deslocamento de 20px em 0,8s, começando quando o topo alcança 86% da viewport. Uma vez apresentados, permanecem visíveis. O encerramento usa um convite curto e o acabamento glass existente.

- **Nome:** “Side não é só um nome. É uma posição.”, origem em *by your side* e texto do brief, sem o rótulo repetido, logo ou assinatura adicional.
- **Princípios:** entender antes de construir; executar com intenção; cuidar também depois da entrega. Conteúdo correspondente em inglês.
- **Encerramento:** “Grandes ideias não precisam caminhar sozinhas.”, link para Contact e footer existente.
- **Integração:** apenas destinos necessários em Home, WorkNav e footer. Sem novas dependências, fontes ou assets comerciais.

Os capítulos são renderizados no servidor, com pequena camada client para movimento. Rotas canônicas `/por-que-side` e `/en/why-side`, redirecionamento dos slugs trocados, title/description, OpenGraph e alternates PT/EN/x-default. Um único h1, hierarquia de headings, skip link, links nativos e foco visível. Reduced motion apresenta o cartaz final estático e todo o texto imediatamente; o HTML permanece legível sem JavaScript. As propriedades de entrada são aplicadas apenas pelo GSAP, sem CSS que esconda o HTML inicial. Foco por teclado torna o botão imediatamente visível mesmo antes de sua animação.

## Verificação

- `npm run lint`, `npm run typecheck`, `npm run build` e `git diff --check`: passaram. Build de produção com 38 rotas geradas.
- [Contrato de rotas](manifesto-routes.mjs): RED com 404 antes da implementação; GREEN em PT/EN depois. Conteúdo, idioma, metadata/canonical/hreflang, navegação atual, footer, ausência do player e remoções solicitadas.
- [Chegadas por scroll](manifesto-arrivals.mjs), [resultados](final/arrivals.json): RED com opacity 1 antes da alteração; GREEN em quatro cenários PT/EN desktop/mobile. A fase começa oculta, passa por opacidade intermediária ao entrar e termina visível, enquanto a próxima espera seu próprio ponto de scroll. Foco imediato no CTA, trocas repetidas de reduced motion restaurando todos os textos e ausência dos elementos removidos.
- [Regressão de viewport](manifesto-viewport.mjs): RED ao girar 390×844 para 740×390 e ao reduzir apenas a altura para 500px. GREEN após remedição do palco. Pequenas mudanças verticais em touch mantêm a cena estável; mudanças grandes recalculam. O foco em campo editável evita remedição causada pelo teclado em touch.
- [QA de produção](manifesto-browser.mjs), [resultados](final/checks.json): nove cenários de tela, PT/EN, desktop/laptop, mobile390, mobile320, tablet768, landscape844×390 e reduced desktop/mobile. Scroll rápido e reverso, troca dinâmica de reduced, bounds da composição, headings e ausência de overflow/erros de runtime. `height` no JSON registra a altura total do documento.
- Menu mobile: Escape fecha e restaura foco. Ida/volta por Services, Work e Home. Idioma preserva o footer. Contact com retorno pelo histórico. Footer fullscreen desativa a navbar coberta. Slugs trocados redirecionam. Leitura sem JS em desktop e mobile.
- Trilho da scrollbar transparente em todos os cenários. Evidências anteriores do ajuste global em dez rotas e no dashboard permanecem em [palette-scrollbar-checks.json](prototype/palette-scrollbar-checks.json) e [palette-layout-checks.json](prototype/palette-layout-checks.json).
- A primeira entrega passou por revisão independente; o achado importante sobre resize apenas vertical foi corrigido e coberto pela regressão RED→GREEN. A revisão atual de conteúdo/movimento foi conferida no diff e nos testes de chegadas e produção descritos acima.
- [Gravação reproduzível](manifesto-record.mjs) e [metadados dos arquivos](final/recordings.json): capturas reais do browser e codificação H.264/30fps. O movimento não é acrescentado na edição.
- [Reprodução da apresentação local](final/playback.json): os dois vídeos carregaram, buscaram o segundo 12 e reproduziram frames decodificados em Edge, sem erro de mídia. Nenhuma imagem quebrada.

Validação feita em Edge/Chromium com emulação de viewport/touch. Safari, aparelho móvel físico e leitor de tela não foram testados.

## Estado de envio

Branch local `feat/19-why-side-manifesto`, partindo do protótipo aprovado em `5f414fa`. Commits separados para promoção da abertura, manifesto/rotas, integração de navegação e evidências. Nenhum push, PR, merge, fechamento de issue ou publicação. Próxima etapa: avaliação visual explícita da página completa pelo usuário, conforme o brief e `AGENTS.md`.
