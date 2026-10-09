# Final CTA / footer / contact — issue #12

## Entrega aprovada

Em 08/10, após os checkpoints de CTA, footer e Contact Flow, o usuário aprovou tudo e pediu espera inicial da Hero de1,5s. O scroll vertical sobre os depoimentos também voltou a usar a suavização existente; gestos horizontais permanecem nativos. [Validação final](../../validation/final-cta-footer-contact/final.md). As seções abaixo registram a evolução e decisões substituídas.

## Revisão atual do footer

O usuário pediu a wordmark vazada como marca d'água atrás do footer e forneceu a [referência de grid](footer-detail-reference.png). Usar para: marca compacta à esquerda, títulos semibold, colunas enxutas, campo de inscrição e ícones sociais abaixo. Adaptar para: Side oficial, paleta clara aprovada no CTA, contato autorizado, PT/EN e apenas Instagram/LinkedIn. Não inventar perfis oficiais. Newsletter e redes agora fazem parte do pedido explícito, prevalecendo sobre as exclusões históricas abaixo. [Validação e pendências](../../validation/final-cta-footer-contact/footer-watermark.md).

## Direção aprovada — card roxo e branco com dispositivos

Em 08/10, o usuário aprovou explicitamente o card com fundo líquido roxo/branco, movimento ambiente contínuo e deformação mínima pelo mouse. Frase com gradiente violeta/magenta, mockup com alpha real e botão escuro. O estado Você + Side permanece intacto. [Validação da superfície](../../validation/final-cta-footer-contact/liquid-card.md).

Footer editorial em continuidade com o card, grid de assinatura/navegação/email/idioma e wordmark oficial oversized. Usar a referência A para proporção e relação entre bloco superior, conteúdo institucional e branding, adaptados à paleta clara aprovada. [Checkpoint CTA + footer](../../validation/final-cta-footer-contact/cta-footer.md). Contact Flow implementado e aprovado nas revisões seguintes.

### Histórico do pivot para CTA branco

O usuário substituiu explicitamente a transformação de Você + Side e o card com gradiente. Nova instrução: preservar o estado aprovado de Why Side, apenas fazer o CTA aparecer e seguir [a referência branca com mockups](white-cta-reference.png). Esta decisão prevalece sobre a coreografia original da issue e sobre as propostas históricas abaixo.

**Usar para:** título grande em duas linhas, primeira preta e segunda cinza; mockup dominante abaixo à esquerda; apoio compacto alinhado à direita e botão preto em cápsula; fundo branco e espaço negativo.

**Não copiar:** telas de fitness, cores da marca da referência, textos, avaliações/estrelas ou números de social proof.

**Adaptação Side:** copy-base “Vamos construir o próximo.” e segunda linha “Da sua ideia para o mundo.”; laptop/tablet/celular do mockup enviado pelo usuário; três interfaces ilustrativas próprias com identidade Side; entrada por fade curto, sem mover ou transformar o Você + Side anterior. [Origem do asset, telas e prompt](mockup-production.md).

Os arquivos WhySide.tsx, useWhySideMotion.ts e why-side.module.css foram restaurados à main aprovada. FinalCta é agora um componente irmão, imediatamente após WhySide.

Refinamento posterior solicitado: composição menor para caber na viewport, segunda linha com gradiente roxo/violeta contínuo em ciclo de 4s e entrada por blur/fade curto. Reduced motion mantém visual estático. [Validação atual](../../validation/final-cta-footer-contact/compact-cta.md).

As seções seguintes preservam o histórico das referências e revisões substituídas.

## Referências fornecidas pelo usuário

### CTA e footer

Original: `Captura de tela 2026-10-07 110112.png`, preservado em [cta-footer-reference.png](cta-footer-reference.png).

**Usar para:** uma única superfície de encerramento; CTA dominante na parte superior; grid de conteúdo institucional abaixo; wordmark muito grande como base da composição. A referência usa margens externas pequenas, subdivisão interna sutil e hierarquia por escala.

**Não copiar:** gráfico orbital, social icons, newsletter, marca SupaPoster, borda luminosa, paleta ou layout literal.

**Adaptação Side:** preto, branco e ponto roxo oficial; conteúdo enxuto; CTA editorial; continuidade com a parceria apresentada por Why Side. A wordmark oversized será composta na segunda etapa, após revisão da transformação inicial.

### Contato

Original: `Captura de tela 2026-10-07 170401.png`, preservado em [contact-reference.png](contact-reference.png).

**Usar para:** viewport quase vazia, coluna de aproximadamente 700px centrada, marca pequena alinhada à coluna, número discreto, pergunta com peso, resposta grande sobre hairline, confirmação compacta e hint de Enter. Uma única pergunta recebe atenção.

**Não copiar:** fundo creme/textura, verde, branding, tipografia literal, wording ou proporções rígidas.

**Adaptação Side:** experiência de seis etapas em PT/EN com foco, blur/fade curto, teclado e linguagem da Home. Implementação após a revisão do CTA/footer.

## Etapa 1 — proposta local

Base: `main` / `4d045a9`, sem alterações preexistentes. Issues #12 e #1 lidas integralmente, junto de AGENTS.md e registros das entregas aprovadas. Guias locais Next 16.3.8 de Server/Client Components e CSS Modules consultados.

Os cinco estados de Why Side conservam o percurso e os timings anteriores. Após o hold de Você + Side, os mesmos elementos diminuem e se reposicionam no alto à esquerda. O próprio palco escurece, a marca clareia preservando o ponto roxo original, e o convite aparece no espaço liberado. O scroll reverso desfaz a transformação. Não há painel cobrindo o estado anterior nem troca da geometria da marca.

Prévia isolada: `/review/final-cta`; integrada: `/`. Sem publicação. Footer e Contact Flow aguardam as revisões intermediárias solicitadas pelo usuário. O link já usa os destinos finais, ainda não implementados nesta etapa.

Decisão de envio autorizada pelo usuário: Resend, domínio `sidecode.com.br`, endereço oficial `contato@sidecode.com.br`. Integração e configuração segura serão feitas na etapa do Contact Flow; nenhum envio ou sucesso simulado nesta etapa.

## Revisão solicitada — CTA em card

O usuário gostou da estrutura e pediu um card como na referência, gradiente em movimento contínuo dentro dele e botão mais próximo do exemplo. A revisão contém uma superfície arredondada com margens de 40px no desktop, gradientes roxos animados em ciclos alternados de 16s/21s e botão claro em cápsula com seta horizontal. A frase existente agora se alinha ao padding interno do card. Gradientes ficam recortados pela superfície e param antes/depois do handoff; reduced motion usa composição estática. Sem bibliotecas adicionais. Footer continua reservado ao próximo checkpoint.
