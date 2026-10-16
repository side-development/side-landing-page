# Why Side #19 — checkpoint da cena-assinatura

Escopo: Fase 0 + Fase 1. Protótipo local **O eixo comum**. Nenhuma aprovação visual inferida dos checks técnicos. Parar antes dos capítulos do manifesto.

## Avaliar

- Prévia funcional PT: <http://localhost:3019/review/why-side-manifesto>
- EN: <http://localhost:3019/en/review/why-side-manifesto>
- [Apresentação local com os dois vídeos e o ápice](prototype/review.html).
- [Vídeo desktop](prototype/desktop.mp4), [vídeo mobile](prototype/mobile.mp4).
- [Ápice desktop](prototype/desktop-peak.png), [ápice mobile](prototype/mobile-peak.png).
- Para reiniciar: `npm run dev -- --hostname 0.0.0.0 --port 3019`.

As gravações de 17,2s incluem a coreografia completa de 15s e uma pequena pausa antes/depois. São gravações do browser, sem composição ou movimento adicionado na edição; o arquivo é apenas recortado e codificado em H.264 para reprodução.

## Resultado observado

- Roxo e preto começam separados por um espaço branco. Os planos mudam de relação espacial e encontram uma inclinação comum; a janela de “OUTRO” passa a “DO MESMO”. O exterior branco mantém continuidade com a navbar e com o fim da cena. Os dois pontos móveis da primeira versão foram retirados conforme solicitado pelo usuário; o ponto final da marca foi preservado.
- Mobile começa com campos acima/abaixo, tem quebra de texto própria e uma faixa superior em duas linhas. O tamanho do palco fica estável durante a mudança vertical da viewport móvel.
- Scroll nativo, reversível, sem listener que bloqueie wheel/touch. O player de revisão pode pausar e é interrompido pelo usuário. Não é um vídeo de fundo.
- Heading semântico completo PT/EN, skip link, links e botões nativos e foco visível. Reduced motion e HTML sem JS mantêm o cartaz final e a contraposição textual no topo.
- As rotas de revisão retornam 404 em produção. Slugs canônicos, navbar final, SEO de página publicada, restante do manifesto e aprovação visual final pertencem à etapa posterior.

## Verificações

- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- `git diff --check`: passou.
- Primeira versão: 13 cenários em Edge/Chromium, detalhados em [checks.json](prototype/checks.json). Oito estados (incluindo reverso) por viewport animada, PT/EN 1440×1000, laptop 1280×720, mobile 390×844, 320×568, tablet 768×1024 e landscape 844×390. Sem overflow horizontal ou erros de runtime capturados; composição final dentro do palco.
- Reduced motion inicial desktop EN/mobile PT e troca dinâmica motion → reduced → motion. Sem estado invisível ou altura de sequência presa ao scrub.
- Reprodução/pausa, interrupção por wheel, ida/volta de locale, resize dentro do breakpoint e HTML sem JS em desktop/mobile. Texto final disponível.
- [recordings.json](prototype/recordings.json): desktop 1440×1000 e mobile 390×844, 30fps, sem erros de runtime, progresso final 1.000.
- [production-routes.json](prototype/production-routes.json): respostas das páginas existentes e bloqueio da rota de revisão em produção.

### Revisão de paleta e scrollbar

- [palette-layout-checks.json](prototype/palette-layout-checks.json): sete cenários atuais PT/EN desktop/mobile320/390 e reduced; faixa roxa, texto claro, exterior igual à navbar/final, nenhum ponto móvel ou overflow. Retorno ao início e mudança para reduced preservados. Scrollbar interna do dashboard inspecionada com o modal real aberto: trilho e borda do thumb transparentes.
- [palette-scrollbar-checks.json](prototype/palette-scrollbar-checks.json): dez rotas PT/EN (Home, Work, Services, Contact e protótipo). Track e corner transparentes, inclusive nos trechos escuros de Services e na volta ao branco do TrustChapter da Home. O thumb mantém as cores e o hover existentes; nenhuma regra volta a pintar o trilho.
- Vídeos, ápices, aberturas e imagens reduced foram atualizados. [continuous-ending.png](prototype/continuous-ending.png) registra a junção com o bloco seguinte sem mudança de fundo.

Não foi testado em Safari, hardware móvel real ou com leitor de tela. Estes checks são evidência do protótipo, não da página final completa.

## Estado de envio

Branch local `prototype/19-why-side-manifesto`, base `origin/main` em `73de4a8`. Fora do protótipo, somente as regras de scrollbar solicitadas foram ajustadas (global, animação de cores da Home e scrollbar interna do dashboard). Sem mudanças no layout ou conteúdo das páginas existentes, dependências ou configuração. Sem push/PR/publicação; issue #19 permanece aberta. Aguardar avaliação explícita do usuário antes de avançar.
