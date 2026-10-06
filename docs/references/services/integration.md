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
- breve permanência sticky da peça editorial apenas no desktop confortável;
- a fita abre em linhas paralelas, a composição perde texto/detalhes e a arte se dissolve antes da entrada do produto;
- o dashboard mantém a altura de uma viewport aprovada na revisão, com título/copy fora do frame;
- os valores perdem presença, os gráficos desaparecem, a interface se dissolve e o fundo passa de branco a charcoal;
- o terminal só assume presença após essa passagem, centralizado em um stage com respiro e sem ficar fullscreen.

## Decisões de implementação

Não aplicar um pin da viewport a toda a sequência: ele impediria percorrer o dashboard de uma página aprovado, especialmente no teclado/mobile. A continuidade é dada pelo fundo, alinhamento e timing, sem três telas sobrepostas. Mobile/reduced motion usam fluxo natural, sem sticky prolongado; reduced mantém o dashboard legível e interativo até sair da viewport, com fades curtos e terminal sem typing longo.

`useServicesMotion` é local à seção. A Hero não controla capítulos ou timelines. O sinal de fase final já existente apenas ativa Services e monta os demos, preservando a intro e evitando processamento durante o falso erro/reveal.

A pausa do dashboard usa um atributo local, observado pelos gráficos e pelo reveal. Métricas/gráficos deixam de receber interação durante a dissolução; período/modal continuam disponíveis. A transição atua nos wrappers permanentes, preservando o resultado após alternar 30/7 dias.

A navbar conserva posição, espaçamento, fundo transparente, contato roxo e comportamentos aprovados. No trecho escuro, links recebem contraste claro e o símbolo usa `/brand/side-logo-white.svg`, mantendo o ponto `#3919BD`. A adaptação fica no CSS da Home, sem alterar arquivos da Hero/Selected Work. O menu mobile aberto mantém sua superfície clara e texto preto.

Durante a validação dinâmica de reduced motion, a recriação de gatilhos avulsos dentro de matchMedia zerava o scroll registrado durante o refresh. Entradas/visibilidade permanecem fora desse ciclo; as animações adaptáveis são timelines locais. O repro originalmente falhou com `scrollY=0` e terminal `waiting`; a correção preservou uma posição não zero e terminal `settled`, inclusive em React Strict Mode. Nenhum log de debug foi adicionado ao produto.

Referências técnicas consultadas: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) e [CSS content](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content). Nenhuma nova referência de art direction.

## Refinamento da entrada — 06/10/2026

Os títulos e subtítulos passam a ocupar o mesmo grupo, separados por 20 px no desktop e 16 px no mobile. A entrada é calculada pelo centro desse título na viewport, compartilhada com o reveal de cada demonstração. A subida acompanha o scroll natural: não há uma segunda animação deslocando o título, pin da introdução ou espera para mostrar o subtítulo.

O fade/blur principal usa 1,8 s nas três partes. Counters, desenho dos charts e typing mantêm seus ritmos internos aprovados; sua construção não exige clique. Reduced motion conserva fades curtos, sem blur intenso. A peça editorial mantém apenas o sticky local já aprovado.

A scrollbar acompanha a mesma interpolação do fundo branco→charcoal, incluindo track, thumb e hover. Ao voltar, recupera a aparência clara; o cleanup restaura as propriedades da página. A seleção global usa `#3919BD` com letras brancas, conforme a nova referência fornecida pelo usuário (`Captura de tela 2026-10-06 085925.png`), adaptando a cor verde do exemplo à marca Side.

Na revisão seguinte, o run fixo de 145svh mantinha a peça sticky mesmo depois de concluir a perspectiva. O repro avançou 270 px na página, mas a composição saiu apenas 29,7 px, reproduzindo a sensação de travada. O espaço agora acompanha a altura real da peça + 38svh (offset sticky de 8svh + percurso de 30svh); ao concluir a abertura, começa a dissolução/saída. O mesmo repro passou com saída visual contínua de 271,2 px. Não foi alterado o smooth scroll global para mascarar essa permanência.

`O que construímos.` recebe os mesmos valores tipográficos responsivos de `Trabalhos selecionados`. Por pedido explícito do usuário, a única alteração na Hero é mover o controle de review/replay para abaixo da copy de apoio, dentro de `FinalHero`. O botão deixa de ser fixo na viewport e sai junto com a Hero; as regras existentes de sessão/review, intro, marca e navegação continuam preservadas.

## Revisão

Prévia isolada: `/review/services/sequence` e `/en/review/services/sequence`, somente em desenvolvimento. A Home local também contém a sequência completa. Evidências e limites da validação em [services-integration.md](../../validation/services-integration.md).

Aguardar revisão visual do ritmo 01→02, da dissolução 02→03 e da entrada após Selected Work. Push/PR e fechamento permanecem pendentes de aprovação explícita. A fase 5 continua sendo a revisão final de mobile/reduced motion, incorporando ajustes desta integração.
