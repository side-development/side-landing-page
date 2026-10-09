# Issue #12 — primeira revisão: Você + Side → CTA

**Histórico substituído:** o usuário pivotou para preservar Você + Side sem transformação. Consulte [a revisão atual de CTA branco com dispositivos](white-cta.md).

Status: **Ready for review — somente etapa 1**. Alterações locais; sem push/PR e issue aberta. Aguardar revisão visual desta transformação antes de construir o footer, conforme workflow explícito do usuário.

Revisão posterior: o usuário aprovou a estrutura como direção e solicitou CTA em card, gradiente contínuo e botão em cápsula. As [evidências da revisão do card](card-revision/) substituem as capturas iniciais abaixo. A prévia funcional permanece na mesma URL. A frase passa a se alinhar ao padding do card; as coordenadas antigas abaixo descrevem a primeira versão.

## Prévia

- [Prévia isolada](http://localhost:3012/review/final-cta): clicar em **Ver transformação ↓**, aguardar a frase e rolar para baixo. Rolar para cima reverte o movimento.
- [Home integrada](http://localhost:3012/).
- [Gravação da transformação e retorno](phase-one/handoff.mp4).
- [Antes](phase-one/desktop-pt-partnership.png) e [CTA](phase-one/desktop-pt-cta.png).

O servidor local usa a porta 3012 porque a porta 3000 pertence a outro projeto. Rotas de review seguem o padrão existente: apenas desenvolvimento e noindex.

## O que foi implementado

Os cinco estados e a pausa final de Why Side mantêm 500svh de percurso. A extensão acrescenta 160svh para deslocamento, leitura e encerramento: a mesma frase reduz para 32% e se posiciona à esquerda, a 7% da largura e 16% da altura. O palco clareado de Why Side escurece até `#101011`; a geometria original de Side clareia e preserva o ponto roxo. O título aparece em duas linhas com movimento vertical curto e blur/fade discreto. O apoio e o link concluem a composição.

As coordenadas se baseiam no layout sem transformações para permitir refresh, resize e scroll reverso. O CTA fica oculto e inert antes da entrada. Header acompanha o tema; GSAP e matchMedia preservam cleanup local. Sem dependências novas.

Footer e wordmark oversized pertencem à próxima revisão. `/contato` e `/en/contact` são os destinos do link, ainda não implementados nesta etapa. Nenhum envio realizado ou sucesso simulado. Resend e `contato@sidecode.com.br` estão autorizados pelo usuário para a etapa de contato.

## Verificação desta etapa

- `npm run lint` e `npm run typecheck`: passaram.
- [Checks no navegador](phase-one/checks.json): desktop PT 1440×900, desktop EN 1366×768, smoke mobile 390×844 e reduced motion 1440×900. CTA visível, sem overflow, link dentro da viewport, destino localizado e foco por teclado; tema escuro da navegação; nenhum pageerror.
- Desktop: retorno ao estado original oculta e torna inert o CTA novamente. Capturas e gravação revisadas.
- Mobile e reduced motion possuem fallback em fluxo natural, com a frase final legível na abertura do bloco escuro. Estes checks básicos não substituem a revisão completa de motion/mobile/EN solicitada para depois do Contact Flow.
- Build de produção, validação completa de lifecycle, demais browsers e envio real ficam para os checkpoints posteriores e validação final.

Referências originais e análise em [docs/references/final-cta-footer-contact](../../references/final-cta-footer-contact/README.md).
