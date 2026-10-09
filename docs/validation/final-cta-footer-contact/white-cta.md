# Issue #12 — pivot: CTA branco com mockup

Revisão posterior vigente: [CTA compacto com gradiente no texto e blur de chegada](compact-cta.md). A composição original abaixo permanece como histórico do pivot.

Status: **Ready for review — CTA**, sem push/PR. Esta revisão substitui o card escuro e a transformação anterior. O usuário pediu explicitamente preservar Você + Side como aprovado e apenas fazer o CTA aparecer, seguindo a nova referência de fundo branco.

## Prévia

- [Revisão isolada](http://localhost:3012/review/final-cta): clicar **Ver encerramento ↓** e rolar após Você + Side.
- [Home integrada](http://localhost:3012/).
- [Desktop PT](white-cta/desktop-pt-cta.png), [EN](white-cta/desktop-en-cta.png), [mobile](white-cta/mobile-pt-cta.png), [320px](white-cta/small-mobile-cta.png), [reduced motion](white-cta/reduced-cta.png).
- [Passagem para o CTA](white-cta/closing.mp4).

## Implementação

WhySide.tsx, useWhySideMotion.ts, why-side.module.css e home.module.css estão idênticos à main aprovada. O CTA virou um irmão de WhySide dentro de TrustChapter, com motion local independente. Mantidos os cinco estados, a marca final, a descrição, o percurso original de 500svh e a saída natural pelo scroll.

O CTA tem fundo branco, título preto/cinza em duas linhas, mockup de laptop/tablet/celular à esquerda, apoio alinhado à direita e botão preto em cápsula. A headline preserva a copy-base e acrescenta a segunda linha “Da sua ideia para o mundo.”. As três telas simuladas usam a identidade Side. [Procedência e prompt do asset](../../references/final-cta-footer-contact/mockup-production.md).

Entrada única de 850ms por opacidade, sem pin, blur ou transformação da frase anterior. Reduced motion mostra o conteúdo diretamente. Botão tem foco visível e destinos localizados; as páginas de contato ainda pertencem ao próximo checkpoint. Nenhuma dependência nova no site.

## Verificação

Lint, typecheck e diff-check passaram. [Cinco cenários no navegador](white-cta/checks.json): desktop PT/EN 1440×900, mobile 390×844, mobile 320×667 e reduced motion. Sem overflow horizontal ou pageerrors. Imagem carregada, CTA legível ao concluir o fade, fundo branco, link com destino correto e foco por teclado. Desktop conserva sequência de 600svh total, sem transform no grupo ou na wordmark final; ida/volta ao estado anterior verificada.

A captura aguarda a conclusão real do fade, em vez de depender apenas de um timeout fixo. As capturas finais mostram opacity 1.

Limites: Edge/Chromium com viewports emulados; não é a validação final de produção. O asset ilustrativo ainda usa PT na rota EN; sua localização completa fica para o checkpoint de EN. Footer, Contact Flow/Resend, validação completa de lifecycle e build final seguem pendentes no workflow aprovado.
