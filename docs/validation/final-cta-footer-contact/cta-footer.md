# CTA + footer — checkpoint local de 08/10

O tratamento visual do footer desta versão foi substituído pela [revisão com marca d'água, inscrição e redes](footer-watermark.md). As capturas na pasta `footer/` refletem a versão atual.

O usuário aprovou explicitamente o CTA roxo/branco com “Aprovado!”. Esta etapa mantém esse card e acrescenta o footer, antes da revisão intermediária solicitada e do Contact Flow.

## Composição

CTA e footer formam um fechamento contínuo em branco, com a mesma largura máxima de 1640px e alinhamentos internos. O card aprovado preserva proporções, mockup, gradiente da frase e fundo líquido discreto. Abaixo, um grid enxuto reúne assinatura, navegação, email oficial e PT/EN. A wordmark oficial `/brand/side-wordmark-black.svg` ocupa toda a largura da base, preservando seu ponto roxo. Sem novas redes sociais ou conteúdo institucional inventado.

No mobile, a assinatura abre o footer; navegação e idioma dividem a próxima linha, e o email ocupa uma linha inteira. A marca continua grande, seguida de copyright e retorno ao topo.

## Navegação

- Trabalhos, Serviços e Por que Side levam às seções existentes da Home, com âncoras localizadas. As seções receberam apenas IDs/tabIndex; layouts e motion aprovados permanecem.
- Se uma âncora chega antes da intro terminar, a Home posiciona e foca o destino após revelar as seções.
- PT/EN mantêm a página atual e retornam ao footer no idioma escolhido, inclusive na prévia isolada.
- Email: `mailto:contato@sidecode.com.br`, endereço explicitamente autorizado pelo usuário.
- Retorno ao topo usa âncora nativa e respeita reduced motion via CSS existente.
- Contato e Começar projeto usam `/contato` e `/en/contact`. Essas páginas pertencem ao próximo checkpoint e ainda não foram implementadas. Não existe envio simulado.

## Validação

Lint, typecheck, build e diff-check passaram. [Verificação no navegador](footer/checks.json): desktop PT/EN 1440×900, mobile 390×844 e 320×568, reduced motion; sem overflow ou erros de página. Navegação PT → EN → PT, retorno ao topo e entrada na Home pelas âncoras (incluindo primeira visita/intro) passaram.

Capturas da composição completa: [desktop](footer/desktop-closing.png), [EN](footer/english-closing.png), [mobile](footer/mobile-closing.png), [mobile pequeno](footer/small-mobile-closing.png), [reduced motion](footer/reduced-closing.png).

Prévia local: http://localhost:3012/review/final-cta — o footer fica logo abaixo do card. Home integrada: http://localhost:3012/. Mantido local, sem push/PR; issue #12 permanece aberta. Aguarda revisão visual de CTA + footer antes de implementar o Contact Flow.
