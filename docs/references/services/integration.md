# Services — integração dos capítulos

Issue [#8](https://github.com/side-development/side-landing-page/issues/8), checkpoint 4, 06/10/2026. O usuário aprovou avançar após a revisão da experiência digital: “Siga para a próxima fase!”. Este checkpoint permanece local para revisão das transições.

## Direção preservada

As três demonstrações aprovadas mantêm composição, copy e interações. `Services` reúne experiência, produto e integrações após Selected Work. A headline é `O que construímos.` / `What we build.`. Não há nova seção posterior, página Services, rede de ferramentas fictícia ou dependência adicional.

Usar das referências já pesquisadas:
- WKNDHRS: hierarquia de título, apoio e demonstração;
- Stellare/Z1: ritmo e identificação discreta dos capítulos;
- StratusGrid: mudança de atmosfera para infraestrutura;
- RANGE RAK: relação entre reorganização e scroll.

Não copiar:
- panels cobrindo a cena anterior, navegação lateral, mockups ou 3D;
- acrescentar glitch, wipes, overlays tecnológicos ou novos elementos ao terminal.

Adaptação Side:
- um fundo contínuo, scroll natural e dissoluções locais;
- passagem natural da peça editorial, com transformação acompanhando o scroll e sem retenção sticky;
- a fita abre em linhas paralelas, a composição perde texto/detalhes e a arte se dissolve antes da entrada do produto;
- o dashboard mantém a altura de uma viewport aprovada na revisão, com título/copy fora do frame;
- os valores perdem presença, os gráficos desaparecem, a interface se dissolve e o fundo passa de branco a charcoal;
- o terminal só assume presença após essa passagem, centralizado em um stage com respiro e sem ficar fullscreen.

## Decisões de implementação

Não aplicar um pin da viewport a toda a sequência: ele impediria percorrer o dashboard de uma página aprovado, especialmente no teclado/mobile. A continuidade é dada pelo fundo, alinhamento e timing, sem três telas sobrepostas. Mobile/reduced motion usam fluxo natural, sem sticky prolongado; reduced mantém o dashboard legível e interativo até sair da viewport, com fades curtos e terminal sem typing longo.

`useServicesMotion` é local à seção. A Hero não controla capítulos ou timelines. O sinal de fase final já existente apenas ativa Services e monta os demos, preservando a intro e evitando processamento durante o falso erro/reveal.

A pausa do dashboard usa um atributo local, observado pelos gráficos e pelo reveal. Métricas/gráficos deixam de receber interação durante a dissolução; período/modal continuam disponíveis. A transição atua nos wrappers permanentes, preservando o resultado após alternar 30/7 dias.

A navbar fechada conserva posição, espaçamento, fundo transparente, contato roxo e comportamentos aprovados. No trecho escuro, links recebem contraste claro e o símbolo usa `/brand/side-logo-white.svg`, mantendo o ponto `#3919BD`. A adaptação de contraste fica no CSS da Home. O menu mobile aberto foi corrigido conforme o pedido abaixo; Selected Work continua preservado.

Durante a validação dinâmica de reduced motion, a recriação de gatilhos avulsos dentro de matchMedia zerava o scroll registrado durante o refresh. Entradas/visibilidade permanecem fora desse ciclo; as animações adaptáveis são timelines locais. O repro originalmente falhou com `scrollY=0` e terminal `waiting`; a correção preservou uma posição não zero e terminal `settled`, inclusive em React Strict Mode. Nenhum log de debug foi adicionado ao produto.

Referências técnicas consultadas: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) e [CSS content](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content). Nenhuma nova referência de art direction.

## Refinamento da entrada — 06/10/2026

Os títulos e subtítulos passam a ocupar o mesmo grupo, separados por 20 px no desktop e 16 px no mobile. A entrada é calculada pelo centro desse título na viewport, compartilhada com o reveal de cada demonstração. A subida acompanha o scroll natural: não há uma segunda animação deslocando o título, pin da introdução ou espera para mostrar o subtítulo.

O fade/blur principal usa 1,8 s nas três partes. Counters, desenho dos charts e typing mantêm seus ritmos internos aprovados; sua construção não exige clique. Reduced motion conserva fades curtos, sem blur intenso.

A scrollbar acompanha a mesma interpolação do fundo branco→charcoal, incluindo track, thumb e hover. Ao voltar, recupera a aparência clara; o cleanup restaura as propriedades da página. A seleção global usa `#3919BD` com letras brancas, conforme a nova referência fornecida pelo usuário (`Captura de tela 2026-10-06 085925.png`), adaptando a cor verde do exemplo à marca Side.

Na revisão anterior, o run fixo de 145svh mantinha a peça sticky mesmo depois de concluir a perspectiva. O repro avançou 270 px na página, mas a composição saiu apenas 29,7 px. A primeira correção alinhou o espaço da saída à altura real da peça + 38svh e passou nesse trecho final; ainda existia retenção durante a transformação. Esse ajuste foi substituído pela revisão abaixo.

`O que construímos.` recebe os mesmos valores tipográficos responsivos de `Trabalhos selecionados`. Por pedido explícito do usuário, a única alteração na Hero é mover o controle de review/replay para abaixo da copy de apoio, dentro de `FinalHero`. O botão deixa de ser fixo na viewport e sai junto com a Hero; as regras existentes de sessão/review, intro, marca e navegação continuam preservadas.

## Continuidade da primeira demonstração e mobile

O usuário confirmou que a barreira ainda era perceptível em `Sites & experiências digitais`. Um novo repro percorre toda a primeira transformação, em vez de testar somente sua saída: nove trechos avançavam 35–44 px na página com deslocamento visual zero da peça. A amostra mantinha frames regulares (mediana 16,7 ms), distinguindo retenção de perda de frames.

A integração deixa de usar sticky e espaço artificial nesse capítulo. Copy, roxo→vermelho e abertura das linhas acompanham a peça no fluxo natural. A perspectiva integra-se ao intervalo `top 35%`→`top -5%`, com scrub de 0,55 s; a dissolução começa conforme a peça sai. A integração é reconhecida pelo ancestral presente no DOM, sem depender de um ref do container pai durante o layout effect do componente filho. A mesma medição passa com zero trechos retidos. Não há alterações no smooth scroll global.

Para compactar mobile (até 800 px), o gráfico final `Da presença à conversão` fica oculto; o observer existente o mantém pausado e seus controles deixam de estar disponíveis por teclado/leitor de tela. Desktop conserva os três gráficos. KPIs, receita, origem, período e modal continuam funcionando. A pergunta sobre qual “última parte” o usuário pretendia remover foi enviada; esta interpretação foi informada durante o trabalho e permanece sujeita à revisão visual. Nenhum dos três serviços foi removido.

## Revisão

### Navbar mobile preenchida

Após o screenshot de 06/10 e a clarificação do usuário, o menu mobile aberto preenche somente a faixa superior e a área dos links, de ponta a ponta. O restante da página permanece visível. A superfície usa branco nas seções claras e `#101011` no trecho escuro, com texto e asset da marca acompanhando o contraste. Gutters ficam somente dentro da superfície; o fundo não recebe margem lateral. O contato conserva o roxo oficial.

A correção fica em `FinalHero` e seus estilos, autorizada especificamente pelo usuário. A navegação permanece não modal e o scroll livre. Abrir transfere o foco para o primeiro item; Escape/fechamento restaura o foco. Atravessar o breakpoint fecha o menu e recupera a navbar desktop. A animação do ícone e o fade de chegada dos links permanecem, com alternativa reduced motion. Navbar fechada continua transparente.

Na revisão seguinte, o vídeo `Gravação de Tela 2026-10-06 104634.mp4` passa a orientar os traços escritos de cada link e a abertura do painel. Itens semibold e contato bold, quatro desenhos SVG diferentes, máscara descendente e entrada sequencial dos links substituem os sublinhados retos e o fade conjunto. Referência, limites e timings em [navbar-motion.md](navbar-motion.md).

Após pedir uma reprodução mais fiel da expansão, o usuário autorizou substituir essa faixa por uma janela arredondada única, com borda/sombra discretas, crescimento da altura, divisórias entre itens e CTA preenchido na base. A navbar fechada mantém sua posição e transparência. A paleta acompanha a seção clara/escura. Os traços engrossados agora são renderizados em coordenadas equivalentes aos pixels CSS de cada palavra, preservando espessura uniforme também no mobile; o observer de tamanho tem cleanup local. Não há nova dependência nem mudança dos destinos.

### Interação dos gráficos durante o scroll

O usuário reportou perda das interações. O repro na Home confirmou que, ao iniciar a dissolução (`bottom 86%`), o dashboard recebia `inert` mesmo com os gráficos a 98,02% de opacity. Mover o mouse retornava sempre o dia 30; remover somente o bloqueio restaurava a seleção. A disponibilidade agora combina presença na viewport com a aparência real dos gráficos: permanece ativa até os panels chegarem a 10% de opacity, pausa ao desaparecer e volta ao reverter a rolagem. A coreografia e os timings aprovados não foram alterados.

A validação também encontrou uma falha em touch: `pointerleave` e foco substituíam o ponto selecionado pelo dia final. Receita e conversão passam a limpar a seleção ao sair com mouse, preservando o toque; foco inicial mantém uma seleção já feita. Teclado continua usando Home/End/setas e blur limpa a leitura. Correção local, sem dependências ou controlador global. Evidências em `docs/validation/services/chart-interaction.json` e `chart-interaction-cleanup.json`.

### Estabilidade no término da intro

Com a scrollbar clássica visível, o término da intro liberava `overflow: hidden` e a largura útil passava de 1440 para 1430 px. O wordmark encolhia 10 px e a borda direita da navbar se deslocava 10 px. O repro headless inicial ocultava a scrollbar por padrão; o harness passa a remover `--hide-scrollbars`, reproduzindo o comportamento desktop.

`scrollbar-gutter: stable` reserva o espaço desde o primeiro layout, inclusive durante o bloqueio da intro, conforme a [documentação CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter). A área reservada acompanha preto/roxo/branco pela mesma timeline local, sem faixa clara durante as frases; o cleanup restaura o fundo anterior do body. Não há medição manual de scrollbar, dependência nova ou alteração de timings/copy. A medição original passa com variação zero de largura/posição da marca e navbar.

Prévia isolada: `/review/services/sequence` e `/en/review/services/sequence`, somente em desenvolvimento. A Home local também contém a sequência completa. Evidências e limites da validação em [services-integration.md](../../validation/services-integration.md).

Aprovação visual explícita recebida em 06/10/2026 (“Pode subir!”), incluindo o ritmo 01→02, a dissolução 02→03 e a entrada após Selected Work. Push/PR autorizados; a issue permanece aberta até o merge. A fase 5 foi concluída; matriz, gravações e limites em [services-final-review.md](../../validation/services-final-review.md).
