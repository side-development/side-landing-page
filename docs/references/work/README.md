# Selected Work — referências da #6

A direção vem da [issue #6](https://github.com/side-development/side-landing-page/issues/6), do pacote `../side-selected-work-package-v2/`, dos dois projetos públicos e da gravação editorial fornecida pelo usuário na revisão de 02/10/2026.

## Duas folhas — revisão do usuário

Referência concreta: [gravação fornecida](editorial-sheets-reference.mp4), originalmente `Gravação de Tela 2026-10-02 161550.mp4`; [frame para comparação](editorial-sheets-reference.png). A origem do site mostrado na gravação não foi informada.

Usar para: duas páginas sobrepostas em perspectiva, deslocamentos suaves e independentes ao mouse, composição de mídia à esquerda/copy à direita e dissolução inferior no fundo.

Não copiar: fundo preto, conteúdo JOBS/ARTICLES, textos, thumbnails, marcas ou UI desse site.

Adaptação Side: fundo branco solicitado pelo usuário, um print real atrás e o reel real em loop na frente em cada projeto. Os prints vêm dos reels já capturados: Route em 6,4 s, câmera explodida; OWL em 3,5 s, geolimits/violação real. Dois pares de folhas, um por projeto; nunca dois vídeos sobrepostos do mesmo projeto. Folhas lateralizadas, radius de 14 px e abertura suave/oposta no hover, sem acompanhar a posição do ponteiro. Não existe botão de pausa, conforme refinamento solicitado; reduced motion fica com posters estáticos. Scroll mantém o palco desktop parado e troca o par Route pelo par OWL, junto da copy. A revisão substitui a apresentação anterior de vídeo grande e handoff condicionado ao fim do reel. A mídia é o único link individual; o CTA textual restante é o acesso a todos os trabalhos.

## Route Security

Fonte: https://routesecurity.com.br/ — visitada e capturada em 2026-10-02, Edge/Chromium, viewport 1440 × 900, escala 1, zoom 100%.

Usar para: Hero real, scroll intermediário, rigor técnico e sequência existente da câmera fechada → girada → explodida. Composição sólida, mídia grande e pouca copy.

Não copiar: identidade Route no restante da interface Side, site inteiro, navegação, formulários ou quaisquer elementos de produto reconstruídos. Nenhum overlay foi acrescentado à câmera. A identificação do projeto usa a wordmark real fornecida pelo usuário, conforme revisão explícita.

Adaptação Side: três trechos da LP real cortados num reel curto. Tipografia e metadata ficam em HTML, fora do vídeo. A revisão usa print e vídeo em folhas; o link fica no conjunto de mídia.

## OWL

Fonte: https://owlloc.com/ — visitada e capturada nas mesmas condições.

Usar para: frases reais da Hero, mapa/geolimits/violação que efetivamente aparecem na LP e dashboard existente. A UI gravada é a protagonista.

Não copiar: identidade OWL no restante da interface Side, páginas internas, mapa, gráficos ou tracking reconstruídos. Os pontos e a violação presentes no vídeo pertencem à própria LP. A identificação do projeto usa a wordmark real fornecida pelo usuário, conforme revisão explícita.

Adaptação Side: três trechos reais, sem hardware adicional porque o fechamento no dashboard já cumpre o teaser. Nenhum HUD, radar, glitch ou continuidade câmera → mapa.

## Captura e edição

Wordmarks fornecidas pelo usuário em 02/10/2026: `C:\Users\vitol\Downloads\wordmark-route.svg` e `C:\Users\vitol\Downloads\wordmark-owl.svg`. Cópias integrais em `public/work/route/route-wordmark.svg` e `public/work/owl/owl-wordmark.svg`, preservando paths, cores e proporções. Usar somente para identificar os projetos no lugar dos nomes tipográficos. Não reconstruir com fonte nem alterar a marca. Route preserva o amarelo `#FFDD0F` e o lettering Security; OWL permanece preta. Nomes acessíveis continuam disponíveis no alt dentro de cada heading.

SHA-256 Route: `769ede668f94767c5c5eda83837171924b2d58bcc4a2e3867f91026a100cfa10`; OWL: `3ffa4f1b97dab282fa55f4ee17abda4334e6ca257a1ddfa8dd449d6659c11647`.

Captura de frames renderizados via CDP `Page.startScreencast`, JPEG quality 100. Os timestamps preservam o tempo dos movimentos reais; imagens com pouca alteração mantêm o frame até o próximo frame capturado. Não há interpolação de elementos, reconstrução de UI ou geração de imagens.

Edição: cortes entre momentos escolhidos, codificação H.264 / CRF 18 / preset slow, 30 fps, 1440 × 900, yuv420p, sem áudio, faststart. Cursor invisível somente na captura; nenhuma alteração visual de conteúdo. Posters WebP extraídos dos próprios reels.

Os registros em `capture-manifest.json` identificam fontes, trechos, timestamps, especificações e hashes dos arquivos finais. Capturas de referência: `route-camera.png`, `owl-map.png`, `owl-dashboard.png`. Frames brutos permanecem em `artifacts/` e não entram na aplicação.

Versão aprovada visualmente pelo usuário em 2026-10-05, com publicação autorizada. Os reels somam cerca de 2,5 MB; nenhuma compressão adicional foi necessária para esta entrega.
