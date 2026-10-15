# Referências Visuais — Página de Trabalhos / Work

Direção e estudos de design para a galeria editorial e esteira de folhas dos projetos em `/trabalhos` e `/en/work`.

---

## 1. Selected Work da Home (Side)

A principal referência de linguagem visual, acabamento de superfície e materiais do próprio sistema Side.

### Usar para:
- Superfície das folhas: fundo neutro `#f3f3f3`, borda sutil `1px solid #08080814`, `border-radius: 14px`;
- Sistema de elevação e sombra editorial: três camadas com profundidade calma (`box-shadow: 0 26px 60px #00000024, 0 8px 24px #00000017, 0 1px 3px #00000014`);
- Tipografia limpa, peso editorial e uso das wordmarks reais com proporção idêntica à aprovada na Home;
- Cursor customizado Side (`#3919bd`) com affordance contextual (`abrir case` / `open case`, `←`, `→`).

### Não copiar:
- Composição de duas folhas sobrepostas inclinadas em 3D da Home;
- Sticky scroll horizontal sequestrando o eixo da página;
- Animação cinematográfica pesada ou excesso de efeitos.

### Adaptação Side:
- Uma única esteira horizontal calma por projeto;
- Folha central protagonista e nítida;
- Folhas vizinhas com blur progressivo (`blur(9px)` calibrado), escala ligeiramente reduzida e presença rebaixada;
- Navegação contínua por autoplay lento, setas circulares minimalistas, drag/swipe e teclado.

---

## 2. Editoriais Impressos e Monografias de Arquitetura / Design

Referência para apresentação de páginas sequenciais e ritmo de leitura.

### Usar para:
- Sensação física de folhas de papel/páginas reais sendo folheadas;
- Ritmo de abertura espaçosa e respiro entre o título do projeto, metadados e o palco de mídia;
- Índices numéricos tabulares de precisão (`01`, `02`, `01 / 05`).

### Não copiar:
- Grids estáticos rígidos sem interatividade;
- Mockups sintéticos de laptops flutuantes ou celulares genéricos;
- Carousel SaaS convencional com indicadores de bolinha ("dots") ou cards agrupados.

### Adaptação Side:
- Proporção 16:10 para a mídia, simulando folhas reais de projeto em tela widescreen;
- Controles discretos logo abaixo da folha ativa, sem poluir a imagem;
- Transição com inércia calibrada (`power3.out`), respondendo à velocidade do gesto (flick vs drag lento).

---

## 3. Portfólios Editoriais de Estúdios de Produto (Awwwards / Red Square / Z1)

Referência para galerias horizontais calmas e foco absoluto na substância do projeto.

### Usar para:
- Desfoque lateral progressivo para focar o olhar na folha central;
- Pausa rigorosa de autoplay em hover, foco de teclado, arraste ou quando fora do viewport;
- Adaptação responsiva para toque onde as laterais dão o "peek" convidando ao swipe natural.

### Não copiar:
- Efeitos WebGL distorcidos, curvaturas de lente, shaders de água ou aberração cromática;
- Sequestro de scroll vertical (wheel hijack);
- Loops rápidos ou frenéticos.

### Adaptação Side:
- Zero bibliotecas externas de carousel (implementação matemática pura nativa + GSAP);
- Respeito integral a `prefers-reduced-motion` com transição instantânea e desativação de autoplay;
- Renderização inicial perfeitamente consistente entre SSR e cliente para evitar qualquer salto de layout.
