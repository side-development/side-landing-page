# CTA em card — revisão da etapa 1

**Histórico substituído:** o usuário pivotou para fundo branco e mockup de dispositivos. Consulte [a revisão atual](white-cta.md).

Pedido do usuário: preservar a estrutura, colocar o CTA em um card como na referência, acrescentar gradiente em movimento contínuo e melhorar o botão seguindo o exemplo.

## Resultado local

- Card de 60vh no desktop, limitado entre 440 e 640px, com margens de 40px, raio de 24px e borda sutil.
- Você + Side continua usando os mesmos elementos e a marca oficial. A transformação agora calcula a posição pela borda e pelo padding reais do card.
- Dois campos de gradiente roxo se deslocam em ciclos de 16s e 21s, recortados no card. Não dependem do scroll para continuar se movendo. IntersectionObserver e visibilitychange pausam fora da viewport e com aba oculta; desktop também pausa antes do handoff. Reduced motion mantém fundo estático.
- Botão claro em cápsula, seta SVG horizontal e feedback discreto em hover/foco. Destinos de contato preservados para a etapa posterior.
- Mobile conserva o fallback em fluxo e margens de 16px; refinamento completo mobile/EN segue no checkpoint planejado.

## Prévia e evidências

[Prévia funcional](http://localhost:3012/review/final-cta), botão **Ver transformação ↓**; [Home](http://localhost:3012/).

[Desktop PT](card-revision/desktop-pt-cta.png), [desktop EN](card-revision/desktop-en-cta.png), [mobile](card-revision/mobile-smoke-cta.png), [reduced motion](card-revision/reduced-smoke-cta.png), [gravação](card-revision/handoff.mp4).

Lint e typecheck passaram. [Verificações no navegador](card-revision/checks.json) cobrem geometria, foco, destino do link, reversão, ausência de overflow e pageerrors. O movimento contínuo foi conferido comparando transformações do gradiente com o scroll parado; reduced motion conserva a transformação estática. A espera da regressão de retorno usa a conclusão do scrub, além do intervalo inicial, para evitar medir a animação ainda em andamento.

A verificação encontrou o gradiente pausado em uma viewport mobile onde o card estava visível mas o último estado ainda não havia cruzado o limite do tema da navbar. A visibilidade do gradiente foi desvinculada desse limite em fluxo natural e a regressão de movimento no mobile foi executada novamente.

Status: **Ready for review — etapa 1 revisada**. Sem push/PR. Footer e Contact Flow não foram iniciados nesta revisão.
