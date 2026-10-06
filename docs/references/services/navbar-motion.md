# Navbar: traços e abertura

Referência fornecida pelo usuário: `Gravação de Tela 2026-10-06 104634.mp4` (650 × 546, 30 fps, 23,2 s). Frames analisados em [navbar-motion-frames.jpg](navbar-motion-frames.jpg).

## Usar para

- Sublinhado irregular, desenhado progressivamente da esquerda para a direita; cada item tem um gesto diferente. Espessura reforçada conforme revisão do usuário.
- Superfície que abre de cima para baixo, seguida pela entrada sequencial do conteúdo.
- Cantos arredondados e movimento contínuo ao abrir/fechar.

## Não copiar

- Paleta laranja/azul, marca, imagens, conteúdo e submenus da referência.
- Projetos ou serviços adicionais, destinos de navegação ou estrutura de mega menu.

## Adaptação Side

- Quatro paths SVG decorativos: ondulação para Trabalhos, pequeno laço para Serviços, curva inclinada para Por que Side e gesto duplo para o contato. Mesmos desenhos nos equivalentes EN.
- Desenho em 480 ms por stroke-dashoffset; saída em 220 ms, com opacity de 100 ms para ocultar também as pontas arredondadas do traço inativo. Hover, teclado e foco/toque no mobile. `currentColor`: preto no claro, texto claro no terminal e roxo oficial `#3919BD` no contato.
- Itens semibold (600) e contato bold (700), com Segoe UI/system-ui, já presente na stack tipográfica do projeto.
- Na revisão seguinte, o usuário autorizou pivotar a expansão para a janela da referência. Um único painel envolve logo, ícone e links: borda fina, sombra, cantos de 18 px e crescimento de altura em 540 ms. Os links entram com delays de 90/150/210 ms; o CTA roxo preenchido aparece na base em 240 ms. Essa direção substitui a faixa anterior até as bordas. Conteúdo restante e scroll continuam disponíveis.
- O usuário também identificou perda de qualidade nos traços engrossados do mobile. O viewBox passa a acompanhar o tamanho real do SVG; somente as coordenadas do desenho se adaptam à palavra. O stroke permanece uniforme: 2,4 px no desktop e 2,2 px nos links do menu mobile, com pontas arredondadas. Não há esticamento anisotrópico da espessura. ResizeObserver local atualiza as dimensões e é desconectado ao desmontar.
- Reduced motion: fade de 140 ms, sem deslocamento/cascata; traços aparecem diretamente.
- Animações CSS finitas, sem timers/timelines adicionais; markup visual aria-hidden. Mantidos menu sem destinos, Escape/foco/resize, ícone aprovado e navbar fechada transparente. Apenas um contato fica disponível por estado: topo no menu fechado/desktop, base no mobile aberto.

Prévia funcional na Home local: `http://localhost:3000/` e `/en`. Evidências em [services-integration.md](../../validation/services-integration.md). Aguardar aprovação visual; sem push/PR.
