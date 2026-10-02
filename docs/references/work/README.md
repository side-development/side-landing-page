# Selected Work — referências da #6

A direção vem da [issue #6](https://github.com/side-development/side-landing-page/issues/6), do pacote `../side-selected-work-package-v2/` e dos dois projetos públicos. Nenhuma referência externa de art direction foi acrescentada.

## Route Security

Fonte: https://routesecurity.com.br/ — visitada e capturada em 2026-10-02, Edge/Chromium, viewport 1440 × 900, escala 1, zoom 100%.

Usar para: Hero real, scroll intermediário, rigor técnico e sequência existente da câmera fechada → girada → explodida. Composição sólida, mídia grande e pouca copy.

Não copiar: identidade Route na interface Side, site inteiro, navegação, formulários ou quaisquer elementos de produto reconstruídos. Nenhum overlay foi acrescentado à câmera.

Adaptação Side: três trechos da LP real cortados num reel curto. Tipografia, metadata e CTA ficam em HTML, fora do vídeo. O handoff transforma somente os containers dos dois reels.

## OWL

Fonte: https://owlloc.com/ — visitada e capturada nas mesmas condições.

Usar para: frases reais da Hero, mapa/geolimits/violação que efetivamente aparecem na LP e dashboard existente. A UI gravada é a protagonista.

Não copiar: identidade OWL na interface Side, páginas internas, mapa, gráficos ou tracking reconstruídos. Os pontos e a violação presentes no vídeo pertencem à própria LP.

Adaptação Side: três trechos reais, sem hardware adicional porque o fechamento no dashboard já cumpre o teaser. Nenhum HUD, radar, glitch ou continuidade câmera → mapa.

## Captura e edição

Captura de frames renderizados via CDP `Page.startScreencast`, JPEG quality 100. Os timestamps preservam o tempo dos movimentos reais; imagens com pouca alteração mantêm o frame até o próximo frame capturado. Não há interpolação de elementos, reconstrução de UI ou geração de imagens.

Edição: cortes entre momentos escolhidos, codificação H.264 / CRF 18 / preset slow, 30 fps, 1440 × 900, yuv420p, sem áudio, faststart. Cursor invisível somente na captura; nenhuma alteração visual de conteúdo. Posters WebP extraídos dos próprios reels.

Os registros em `capture-manifest.json` identificam fontes, trechos, timestamps, especificações e hashes dos arquivos finais. Capturas de referência: `route-camera.png`, `owl-map.png`, `owl-dashboard.png`. Frames brutos permanecem em `artifacts/` e não entram na aplicação.

Esta é a versão local para revisão. A compressão final só deve ocorrer depois da aprovação visual, caso necessária.
