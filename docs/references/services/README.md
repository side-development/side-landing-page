# Services — pesquisa visual e adaptação Side

Issue fonte: [#8](https://github.com/side-development/side-landing-page/issues/8). Pesquisa realizada em 05/10/2026, antes da composição do dashboard. Foundation #1 e `main` em `e3077a2` revisadas; Hero e Selected Work aprovados permanecem intactos.

## Método e limites

Foram abertas as fontes oficiais de Linear, Stripe e Vercel em Edge/Chromium, lida a documentação e examinadas as imagens reais das interfaces. Para Awwwards, foram examinadas as páginas e os vídeos originais disponíveis, com amostras de seis instantes por vídeo. As capturas de análise estão nesta pasta; as páginas HTML e mídias brutas estão em `artifacts/services-8/`, ignorado pelo Git.

A leitura textual via web não conseguiu acessar algumas páginas Awwwards/Stripe; elas foram recuperadas diretamente e/ou pelo navegador. Lygon atualmente redireciona para venda de domínio: usamos o registro histórico do Awwwards. As páginas de Lygon, Stellare e StratusGrid fornecem imagens estáticas do elemento principal, não uma gravação desse elemento; não atribuímos timings observados a essas imagens. A direção de motion Side nesses casos vem da especificação da #8. Nenhuma imagem de referência é usada como interface do produto.

## Linear Insights

Fonte: https://linear.app/insights

Usar para:
- relação entre pergunta operacional, métrica e visualização;
- superfície discreta e hierarquia entre conteúdo principal e suporte;
- transição de visão geral para informação específica.

Não copiar:
- sidebar, identidade escura, tokens ou disposição literal;
- decoração de marketing e inclinação dos mockups.

Adaptação Side:
- visão de uma operação digital demonstrativa, sem sidebar;
- quatro métricas legíveis, gráfico dominante e contexto secundário;
- frame claro, neutros e accent `#3919BD`.

## Linear Dashboards

Fonte: https://linear.app/docs/dashboards

Usar para:
- documentação distingue métricas, gráficos e tabelas dentro de um mesmo dashboard;
- filtros com significado e leitura de overview para detalhe;
- alinhamento entre blocos de tamanhos diferentes.

Não copiar:
- cards, navegação, ícones ou categorias de issues Linear;
- paleta multicolorida dos gráficos de prioridades.

Adaptação Side:
- KPIs em faixa contínua com divisores; gráfico e atividade compartilham grid;
- período modifica o conjunto demonstrativo efetivamente;
- crosshair consulta valores do dataset, não texto decorativo.

## Stripe Dashboard

Fonte: https://support.stripe.com/questions/dashboard-home-page-charts-for-business-insights

Usar para:
- contexto financeiro antes do gráfico;
- intervalo explícito e comparação com período anterior;
- unidades monetárias e cadência diária consistentes.

Não copiar:
- visual Stripe, widgets e menus literais;
- botões de configuração que não existem na demonstração.

Adaptação Side:
- receita em BRL nos dois idiomas, total igual à soma de 30 dias;
- série atual roxa e anterior neutra, com tooltip comparativo;
- seletor funcional de 30/7 dias, sem backend ou menus fictícios.

## Vercel Web Analytics

Fonte: https://vercel.com/docs/analytics

Usar para:
- clareza entre métrica, período e detalhamento;
- gráfico sem chrome excessivo e eixos discretos;
- breakdowns rápidos de origem.

Não copiar:
- navegação, identidade, tabs ou composição literal;
- badges verde/vermelho sem necessidade funcional.

Adaptação Side:
- preto e roxo na faixa de números; hairlines entre regiões;
- origens com barras na mesma escala e valores textuais;
- detalhes disponíveis por teclado e tabela acessível da série.

## Google Data GIF Maker / Awwwards

Fonte: https://www.awwwards.com/inspiration/sample-data-gif-creations-google-data-gif-maker

Usar para:
- construção visual de proporções antes da leitura final;
- relação direta entre dado e tamanho, observada nos círculos da gravação.

Não copiar:
- círculos sobrepostos, fundo fotográfico e cores da referência;
- looping da apresentação como comportamento do dashboard.

Adaptação Side:
- barras de origem crescem da baseline uma vez;
- comprimentos representam proporções do dataset;
- estado final para completamente.

## Sovereign AI Ecosystems — data visualisation

Fonte: https://www.awwwards.com/inspiration/animated-scroll-sovereign-ai-ecosystems

Usar para:
- alternância entre narrativa, números e gráfico no scroll;
- revelação gradual de informação, observada na sequência editorial.

Não copiar:
- background abstrato, tipografia serifada, gráficos e composição literal;
- progressão de uma reportagem inteira dentro da Home Side.

Adaptação Side:
- scroll dispara a montagem de um único objeto de produto;
- ordem frame → shell → métricas → curva → suporte;
- motion serve à leitura e depois se encerra.

## Lygon — animated charts and numbers

Fontes: https://www.awwwards.com/inspiration/thumbnail-submission-63d0c8e2ed7af874494917 e https://www.awwwards.com/inspiration/animated-charts-and-numbers-lygon

Usar para:
- números proeminentes ligados a um contexto de produto;
- linha principal acompanhada por dado secundário;
- contraste de escala entre label e valor.

Não copiar:
- azul, donuts, objetos 3D ou painéis sobrepostos;
- usar a screenshot como prova do timing: o registro disponível é estático.

Adaptação Side:
- valores com dígitos tabulares e unidade menor;
- contagem `0 → valor`, seguindo a #8;
- gráfico SVG próprio e origens em barras, sem donuts.

## Austin Urology Institute — stats counter

Fonte: https://www.awwwards.com/inspiration/stats-counter-austin-urology-institute

Usar para:
- contagem ativada ao entrar na viewport;
- labels permanecem estáveis enquanto os números crescem;
- parada perceptível ao atingir o valor final.

Não copiar:
- verde, números de pacientes ou logotipos;
- contagem repetitiva contínua ou claim de resultado real.

Adaptação Side:
- contadores uma vez na entrada, com replay explícito;
- valores finais semanticamente disponíveis durante a animação;
- `Demo data` presente nos dois idiomas.

## Tear The Paper Ceiling — stats scroll interaction

Fonte: https://www.awwwards.com/inspiration/scrolling-stats-tear-the-paper-ceiling

Usar para:
- número grande, contexto e respiro;
- progressão comandada pelo visitante;
- acomodação de informação sem disputar protagonismo.

Não copiar:
- painéis pretos, pessoas, claims ou mecanismo literal de capítulos;
- transições que cobrem a cena anterior.

Adaptação Side:
- capítulos no stage local, com dissolução/reorganização posterior;
- estado do dashboard previsível e estável;
- mobile reorganiza dados em vez de comprimir desktop.

## WKNDHRS — services layout

Fonte: https://www.awwwards.com/inspiration/services-layout-wkndhrs

Usar para:
- serviço com presença tipográfica e copy curta de apoio;
- whitespace e ritmo entre capacidades.

Não copiar:
- caixa alta, imagens, tipografia, identidade ou layout literal.

Adaptação Side:
- copies exatas da #8, título de seção `O que construímos.`;
- cada demonstração domina seu capítulo; metadata é secundária.

## RANGE RAK — interactive homepage

Fonte: https://www.awwwards.com/inspiration/interactive-homepage-range-rak

Usar para:
- composição que responde ao movimento e ao scroll;
- alternância de escala e alinhamento sem poluir a tela.

Não copiar:
- arquitetura, fotografias, mapa e conteúdo imobiliário.

Adaptação Side:
- experiência 01 construída em DOM/CSS/SVG;
- reflow e reação ao ponteiro com limites menores no mobile.

## Stellare Agency — process scroll interaction

Fonte: https://www.awwwards.com/inspiration/process-scroll-interaction-stellare-agency

Usar para:
- hierarquia entre índice, nome do capítulo e apoio;
- noção de progressão num palco contínuo.

Não copiar:
- mockup de laptop, objetos decorativos ou textos;
- atribuir motion exato à imagem estática disponível.

Adaptação Side:
- índice discreto, demonstração central;
- progressão por scroll conforme a #8, sem panels sobrepostos.

## StratusGrid — integrations section

Fonte: https://www.awwwards.com/inspiration/integrations-section-stratusgrid

Usar para:
- percepção de ferramentas conectadas e mudança de atmosfera;
- organização do tema integrações.

Não copiar:
- hexágonos, logos de parceiros, 3D e paleta;
- adicionar uma rede de ferramentas decorativa ao terminal aprovado.

Adaptação Side:
- conexões representadas pelas poucas linhas plausíveis de MCP;
- atmosfera escura com janela central e espaço negativo.

## Z1 Digital Studio — process navigation

Fonte: https://www.awwwards.com/inspiration/process-navigation-side-scrolling-z1-digital-studio

Usar para:
- progressão narrativa numerada e relação entre etapa e detalhe;
- tempo de leitura entre capítulos.

Não copiar:
- painéis laterais que cobrem o conteúdo, layout ou branding;
- esse mecanismo entra em conflito com a transição exigida na #8.

Adaptação Side:
- usar somente ritmo/identificação de etapas;
- dissolução, alinhamento e mudança gradual de fundo.

## Terminal — referências diretas do usuário

Arquivos: `terminal-claude-code.jpg`, `terminal-cli.jpg` e original `terminal-cli.webp`.

Usar para:
- titlebar separada e traffic lights na primeira imagem;
- hairline, janela charcoal, margens, monospace e densidade de saída na segunda;
- janela como objeto central, com fundo externo visível.

Não copiar:
- comandos Meta, números publicitários ou marca Claude como marca Side;
- screenshot como implementação final.

Adaptação Side:
- janela HTML/CSS com poucos comandos plausíveis e typing finito;
- integração editorial explicitamente demonstrativa, sem conexão real.

Verificação técnica: https://code.claude.com/docs/en/cli-usage e https://code.claude.com/docs/en/mcp. Os links históricos da #8 redirecionam: CLI para `code.claude.com`; MCP geral para a especificação do protocolo. `/mcp` e `claude mcp list` foram verificados na documentação específica de Claude Code. A frase final é copy Side, não saída oficial Anthropic.

## Direção para o checkpoint 1

Dashboard claro e original, sem navegação fictícia: overview/período, quatro KPIs, receita diária e comparação, origens e conversão. Na revisão atual, frame com altura de uma viewport desktop, margens de 40px e largura máxima de 1800px. Cantos contidos e sombra quase imperceptível. Mobile: dois KPIs por linha e gráficos empilhados. SVG próprio, nenhuma dependência adicional. A integração com Services só começa após aprovação visual deste checkpoint.

## Refinamento dos gráficos — referência enviada em 05/10/2026

Arquivo: `dashboard-user-reference.png`. Referência direta enviada pelo usuário durante o checkpoint; sem fonte externa atribuída. O usuário confirmou aplicar a direção aos gráficos atuais e acrescentar gráficos da referência, exceto o mapa. Depois solicitou movimento contínuo e suave, números pequenos junto ao crosshair sem card preto e remoção da atividade. A última revisão substitui a proposta compacta por um dashboard do tamanho de uma página normal; título ocupa espaço adicional acima. Entrada fica mais fluida, com reveals sobrepostos, blur mais lento e sem reorganização de altura durante o scroll.

Usar para:
- curvas contínuas e delicadas, áreas de cor leves, gridlines discretas;
- paleta verde, laranja/vermelho e cinza frio com leitura clara;
- gauge aberto e fino, bandas de fluxo e valores destacados;
- marcadores vazados e crosshair pontilhado;
- superfícies brancas, espaçamento e cantos refinados.

Não copiar:
- mapa australiano, dados de empréstimos, textos ou imagens como interface;
- widgets de calendário/menu sem ação;
- layout literal de quatro cards idênticos, tooltip preto rejeitado na revisão ou gráficos sem contexto.

Adaptação Side:
- manter série de receita e comparação anterior; transformar origens em gauge interativo e acrescentar um fluxo de usuários ativos, retidos e convertidos;
- interpolar os dados com curvas sem ultrapassar máximos/mínimos entre amostras;
- usar tons quentes na receita, comparação cinza e verde nos deltas positivos;
- associar quatro cores estáveis aos canais de aquisição e mostrar contagens coerentes com o total;
- inspeção por mouse/touch/teclado e seleção das origens, mantendo Demo data explícito;
- mover suavemente a curvatura entre as amostras, preservando valores e pontos reais da série demonstrativa; pausar fora da viewport/aba e manter estático em reduced motion;
- substituir os cards de hover por valores pequenos junto à linha de inspeção, limitados à área do gráfico nas extremidades;
- retirar atividade e agrupar os três gráficos em uma linha desktop, preenchendo o frame de uma viewport; empilhar em mobile preservando leitura;
- preservar roxo Side no cursor, marca, navegação e foco. A nova direção de cor dos gráficos atende à solicitação visual do usuário e substitui o tratamento monocromático anterior neste checkpoint.

O movimento contínuo dos gráficos e a remoção da atividade são alterações explícitas do usuário ao estado final estático e à tabela inicialmente descritos na #8. Counters, construção e reveals continuam finitos. Nenhum mapa, gráfico geográfico ou dependência nova foi criado.

## Checkpoint 2 — terminal isolado

Dashboard aprovado pelo usuário em 05/10/2026: “Feito, vamos para a próxima fase!”. Após os refinamentos do terminal, o usuário autorizou avançar em 05/10/2026: “pode prosseguir para a próxima fase”. A experiência 01 segue isolada, aguardando revisão antes da integração.

### Referência principal corrigida

Arquivo: `terminal-claude-mcp.png`, fornecido diretamente pelo usuário. Substitui a referência anterior com lettering gigante: o usuário informou que o exemplo anterior estava errado e autorizou copiar a interface completa, traduzindo, mudando a saudação para “desenvolvedor” e mantendo apenas Side MCP.

Usar para:
- titlebar cinza escura, traffic lights, pasta/título central e monospace;
- painel coral com legend, boas-vindas, mascote pixelado, contexto, dicas e atividade;
- barra `/mcp`, separador/heading lavanda, contagem, configuração e servidor conectado;
- hierarquia, alinhamentos, spacing e rodapé.

Não copiar:
- usuário Sriram, servidor DeCode ou outros servidores;
- screenshot como interface;
- proporção que tornaria a janela fullscreen, contrariando a #8.

Adaptação Side:
- HTML/CSS e mascote em SVG, sem dependências novas;
- terminal `min(78vw, 1240px)` × `70svh` desktop, com limites de altura; espaço preto externo;
- por instrução posterior do usuário, interface do terminal em inglês nos dois locales, “Welcome back, developer!” e caminho demonstrativo `/Users/developer`; copy Services e controles externos continuam localizados;
- apenas `side mcp` conectado, versão reproduzida da referência e Opus 5.5 solicitado pelo usuário, como conteúdo demonstrativo;
- typing em `claude` e `/mcp`, pausa breve e bloco MCP completo aparecendo de uma vez, incluindo ajuda/legenda; estado final estável sem caret;
- espaçamento ampliado na área MCP e entre os três grupos de teclas, preservando a janela em desktop baixo e mobile;
- padding inferior de 32px reservado abaixo da legenda; painel de boas-vindas ajusta sua altura quando necessário, mantendo tamanho da janela e espaçamento MCP;
- transcript estático acessível e cursor nativo para selecionar texto;
- mobile com janela de 552px, mascote/MCP legíveis e detalhes auxiliares só no transcript;
- reduced motion: conteúdo final com fade curto, sem typing ou caret;
- cleanup, pausa fora da viewport/aba e replay exclusivo da prévia.

A caixa coral criada em `MCP servers` foi rejeitada. O lettering antigo foi removido. Esta revisão substitui a lista de três servidores e a mensagem final da proposta original por instrução explícita do usuário. Controles macOS/legenda de teclas são elementos da representação; não existe processo/auth/MCP real.

Referências anteriores `terminal-claude-code.jpg` e `terminal-cli.webp` permanecem como pesquisa histórica. A referência MCP corrigida determina a composição atual. Comparação: `docs/validation/services/terminal-comparison.png`. Transição dashboard → terminal somente na fase de integração.

Verificação de comandos: `claude` inicia sessão interativa na [documentação oficial](https://code.claude.com/docs/en/cli-usage); `/mcp` verifica/gerencia servidores conforme a [documentação MCP](https://code.claude.com/docs/en/mcp). A versão exibida vem da imagem; o modelo Opus 5.5 segue solicitação posterior do usuário. São conteúdo editorial, não identificação da instalação da Side. O aumento de altura para 70vh e a remoção do caret também foram solicitados explicitamente.

Recurso tipográfico: [JetBrains Mono](https://www.jetbrains.com/lp/mono/), Regular WOFF2 de 92.380 bytes em `public/fonts/jetbrains-mono/`, com [licença SIL OFL](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt) incluída. Uso restrito ao terminal para consistência entre sistemas. Nenhuma biblioteca npm adicional.

## Checkpoint 3 — experiência de sites

O usuário autorizou a próxima fase após os refinamentos do terminal. Referências WKNDHRS/RANGE reexaminadas; decisões específicas e adaptação Side em [digital-experience.md](digital-experience.md). Peça original DOM/CSS/SVG com máscaras tipográficas, reflow ao scroll, CTA funcional e reação limitada ao ponteiro. Versões pt-BR/EN, composição mobile e alternativa reduced motion isoladas para revisão antes da integração.

Nesta mesma revisão, o usuário pediu remover todos os textos “Demo”. Header/modal/sufixos do dashboard foram simplificados; a identificação dos números fictícios fica discretamente no rodapé como “Dados ilustrativos / Illustrative data”. Esse ajuste substitui os labels `Demo data` registrados nas revisões históricas acima, preservando a clareza de que os números não são resultados reais.

Refinamento posterior: removidos divisórias, rótulos internos, ponto decorativo e indicação de scroll. O CTA desfaz a fita em curvas contínuas, revela “Da experiência / à ação.” à direita e troca o apoio para “Clareza, direção e resultado.”, reposicionando-o. Toda a peça passa gradualmente do gradiente roxo para uma família vermelha equivalente, conforme instrução explícita do usuário. EN idiomático, mobile e reduced motion preservados. Evidências atuais e validações em `docs/validation/services-digital-experience.md`. Checkpoint isolado pronto para revisão; integração ainda pendente.

Correção mais recente: removido o botão de perspectiva; agora o scroll controla progressivamente abertura, paleta, alinhamento e troca de copy, revertendo ao voltar. Título, apoio e legenda permanecem pretos nos dois estados. Somente a arte/sombra muda para vermelho. Replay continua exclusivo do ambiente de revisão. Essa instrução substitui o CTA e a coloração vermelha dos textos descritos na revisão anterior.

## Checkpoint 4 — integração

Em 06/10/2026, o usuário autorizou seguir após revisar a experiência: “Siga para a próxima fase!”. Os demos aprovados agora compõem Services na Home local, com scroll natural, dissolução/reorganização 01→02 e mudança gradual de atmosfera 02→03. Decisões em [integration.md](integration.md); evidências em [services-integration.md](../../validation/services-integration.md). Checkpoint Ready for review, sem push/PR; fase 5 e aprovação final permanecem pendentes.
