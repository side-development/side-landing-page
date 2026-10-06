# Navbar: traços e abertura

Referência fornecida pelo usuário: `Gravação de Tela 2026-10-06 104634.mp4` (650 × 546, 30 fps, 23,2 s). Frames analisados em [navbar-motion-frames.jpg](navbar-motion-frames.jpg).

## Usar para

- Sublinhado fino, irregular, desenhado progressivamente da esquerda para a direita; cada item tem um gesto diferente.
- Superfície que abre de cima para baixo, seguida pela entrada sequencial do conteúdo.
- Cantos arredondados e movimento contínuo ao abrir/fechar.

## Não copiar

- Paleta laranja/azul, marca, imagens, conteúdo e submenus da referência.
- Projetos ou serviços adicionais, destinos de navegação ou estrutura de mega menu.

## Adaptação Side

- Quatro paths SVG decorativos: ondulação para Trabalhos, pequeno laço para Serviços, curva inclinada para Por que Side e gesto duplo para o contato. Mesmos desenhos nos equivalentes EN.
- Desenho em 480 ms por stroke-dashoffset; saída em 220 ms, com opacity de 100 ms para ocultar também as pontas arredondadas do traço inativo. Hover, teclado e foco/toque no mobile. `currentColor`: preto no claro, texto claro no terminal e roxo oficial `#3919BD` no contato.
- Itens semibold (600) e contato bold (700), com Segoe UI/system-ui, já presente na stack tipográfica do projeto.
- Mobile continua preenchendo somente o topo e a área dos links, lateralmente até as bordas. Máscara abre em 560 ms; itens entram com delays de 90/150/210 ms, opacity e deslocamento de 9 px. Cantos inferiores de 18 px. Conteúdo restante e scroll continuam disponíveis.
- Reduced motion: fade de 140 ms, sem máscara/deslocamento/cascata; traços aparecem diretamente.
- Animações CSS finitas, sem timers/timelines adicionais; markup visual aria-hidden. Mantidos menu sem destinos, Escape/foco/resize, ícone aprovado e navbar fechada transparente.

Prévia funcional na Home local: `http://localhost:3000/` e `/en`. Evidências em [services-integration.md](../../validation/services-integration.md). Aguardar aprovação visual; sem push/PR.
