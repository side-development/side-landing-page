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
- forma abstrata autoral em SVG, com cor roxa e gradientes contidos;
- máscaras tipográficas, reorganização suave e CTA funcional;
- pointer motion limitado, com retorno ao centro e sem loops permanentes.

Foram reexaminados os frames das gravações originais já registrados nesta pasta: `services-layout-wkndhrs-frames.jpg` e `interactive-homepage-range-rak-frames.jpg`. A ferramenta web não conseguiu reabrir as páginas Awwwards nesta revisão; a análise visual utiliza as mídias previamente capturadas, não uma descrição presumida do conteúdo inacessível.

## Composição e interação Side

- Branco como base, preto na tipografia, `#3919BD` no ponto, controles e arte.
- Texto autoral da peça: “Da ideia / à experiência.”, “Forma, movimento e intenção.”, “Uma página. Muitas possibilidades.”; EN idiomático. A copy comercial do serviço permanece exatamente a da #8.
- Arte abstrata de fita dobrada criada em SVG; não é logo Side, interface de cliente, mockup ou asset externo.
- Scroll dispara máscaras de texto, revelação da arte e detalhes. Uma segunda timeline local ajusta escala/alinhamento da arte durante a passagem natural da viewport, sem pinning.
- CTA “Mude a perspectiva / Shift your perspective” desfaz as fitas emaranhadas, passa a arte à esquerda e alinha o texto à direita. É um botão real com `aria-pressed`, não um link sem destino. Nova frase e mudança de cor aguardam definição do usuário.
- Desktop: reação sutil ao ponteiro e CTA magnético. Mobile: composição vertical e menos layers, sem magnetismo/cursor customizado.
- Reduced motion: fade curto, estado refinado, CTA muda imediatamente a composição, sem pointer motion ou reflow por scroll.

Nenhuma dependência, fonte, asset raster ou referência visual adicional foi introduzida. Não integra os três capítulos nem modifica Hero/Selected Work nesta fase.
