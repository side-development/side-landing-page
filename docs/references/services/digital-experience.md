# Serviço 01 — experiência digital

Issue [#8](https://github.com/side-development/side-landing-page/issues/8). Checkpoint 3, 05/10/2026. Dashboard e terminal aprovados para avançar; integração ainda pertence ao próximo checkpoint.

## Referências da issue

### WKNDHRS — Services Layout

Fonte: https://www.awwwards.com/inspiration/services-layout-wkndhrs

Usar para:
- tipografia com presença e pouco texto de apoio;
- whitespace e hierarquia entre capacidade e composição;
- entrada de texto acompanhando o scroll.

Não copiar:
- layout literal, fotos, caixa alta ou identidade da agência;
- transformar o serviço em uma lista de serviços.

Adaptação Side:
- título/copy de serviço exatamente como aprovados na #8;
- uma composição editorial interativa, com duas linhas de texto e arte original;
- composição limpa, sem cards ou chrome de navegador falso; índice e rótulos internos removidos na revisão do usuário.

### RANGE RAK — Interactive Homepage

Fonte: https://www.awwwards.com/inspiration/interactive-homepage-range-rak

Usar para:
- composição que mantém coerência ao mudar escala e alinhamento;
- relação entre movimento, ponteiro e exploração;
- hierarquia entre elemento visual dominante e copy.

Não copiar:
- fotos, mapa, conteúdo imobiliário ou a composição literal;
- vídeos/screenshots como implementação da experiência Side.

Adaptação Side:
- forma abstrata autoral em SVG, com gradientes contidos e mudança de paleta no scroll;
- máscaras tipográficas e reorganização suave pelo scroll;
- pointer motion limitado, com retorno ao centro e sem loops permanentes.

Foram reexaminados os frames das gravações originais já registrados nesta pasta: `services-layout-wkndhrs-frames.jpg` e `interactive-homepage-range-rak-frames.jpg`. A ferramenta web não conseguiu reabrir as páginas Awwwards nesta revisão; a análise visual utiliza as mídias previamente capturadas, não uma descrição presumida do conteúdo inacessível.

## Composição e interação Side

- Branco como base; título, apoio e legenda permanecem pretos (`#171719`) nos dois estados e durante a transformação. Arte inicial em `#3919BD`. Ponto decorativo removido por solicitação do usuário.
- Texto inicial: “Da ideia / à experiência.” e “Forma, movimento e intenção.”. Segundo estado solicitado pelo usuário: “Da experiência / à ação.”; apoio “Clareza, direção e resultado.”. EN: “From experience / to action.” e “Clarity, direction and results.”. A copy comercial do serviço permanece exatamente a da #8.
- Arte abstrata de fita dobrada criada em SVG; não é logo Side, interface de cliente, mockup ou asset externo.
- Scroll dispara máscaras de texto, revelação da arte e detalhes. Uma timeline local com scrub suave desfaz as fitas, passa a arte à esquerda e revela a nova frase à direita; apoio muda de copy/posição. A transformação ocorre entre o topo da peça em 20% e 4% da viewport, mantendo o resultado visível, sem pinning. Ao voltar, forma, frase e gradiente retornam progressivamente ao estado inicial.
- Botão “Mude a perspectiva / Shift your perspective” removido por instrução explícita do usuário. Nenhum controle de interação dentro da peça; mouse apenas complementa o scroll. Replay permanece somente no wrapper de revisão, reposicionando o scroll antes da transformação.
- Arte passa para vermelho: accent `#C62D3C`, luz `#ED6470`, sombras `#831326`/`#76101F` e highlight `#F17B84`. Mantém stops e profundidade do gradiente roxo, com interpolação gradual. A correção posterior do usuário determina textos pretos em ambos os estados, substituindo a proposta anterior de texto vermelho. Cursor Side e navegação externa à peça permanecem na identidade aprovada.
- Curvas abertas inteiramente em Béziers cúbicas com tangentes contínuas, sem segmentos retos nas junções. Quantidade/tipo de comandos compatíveis com o estado fechado, mantendo interpolação no GSAP existente. Easing suave e scrub de 1s; nenhum loop permanente acrescentado.
- Título e apoio têm camadas decorativas com crossfade, mantendo apenas a frase atual no nome acessível. A máscara contém o deslocamento das camadas sem overflow. Removida a indicação “Explore com o scroll / Explore as you scroll”.
- Desktop: reação sutil da arte ao ponteiro. Mobile: composição vertical e menos layers, sem magnetismo/cursor customizado.
- Reduced motion: scroll controla fades e mudança de cor; geometrias/alinhamentos trocam diretamente no intervalo de dissolução, sem morph prolongado, pointer motion ou deslocamentos contínuos.
- Trigger de entrada permanece estável enquanto a timeline de perspectiva é reconstruída por preferências/breakpoints, preservando a posição do scroll durante reduced motion. Cleanup no contexto local GSAP.

Nenhuma dependência, fonte, asset raster ou referência visual adicional foi introduzida. Não integra os três capítulos nem modifica Hero/Selected Work nesta fase.
