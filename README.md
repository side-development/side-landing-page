# Side landing page

Fonte de verdade: [Foundation #1](https://github.com/side-development/side-landing-page/issues/1).

## Desenvolvimento

Node.js >= 20.9 e npm. O lockfile fixa as versões da entrega.

Next.js 16.3.8 era a versão estável no npm nesta implementação. TypeScript 6.0.3 e ESLint 9.39.5 foram fixados para respeitar as faixas dos plugins de lint do Next; atualizar esses plugins antes de migrar para TypeScript 7 / ESLint 10.

```sh
npm ci
npm run dev
```

- `http://localhost:3000/`: pt-BR, inclusive com navegador em inglês.
- `http://localhost:3000/en`: inglês.
- `/pt-BR` redireciona para `/`, sem duplicar a Home.

## Validação

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Estrutura e decisões

- Next.js App Router + TypeScript. Layout e páginas são Server Components.
- `next-intl`: roteamento em `src/i18n/routing.ts`, dicionários em `src/i18n/messages/`, metadata localizada e `hreflang`. Não há detecção automática nem cookie de idioma: a URL determina a experiência.
- CSS Modules para estilos locais; reset e tokens mínimos em `src/styles/globals.css`.
- GSAP + `@gsap/react` em componentes de experiência isolados. `useGSAP` controla escopo e cleanup; `gsap.matchMedia` oferece uma alternativa para reduced motion e responde a mudanças da preferência.
- `src/features/`: experiências; `src/components/`: UI reutilizável; `src/lib/`: utilitários quando necessários.
- `public/brand/`: assets existentes preservados; `public/media/`: mídia futura.
- Guia com título “Side” nos dois idiomas e favicon derivado da logo existente: preto no tema claro, branco no escuro, com fundo transparente e ponto roxo preservado.

Sem outras páginas, bibliotecas visuais, CMS ou infraestrutura antecipada.

## Hero 01 — issue #2

Na primeira visita da sessão, as duas Homes começam no erro fictício com HTTP 200. O texto vem dos dicionários e o SVG do documento quebrado é próprio. Antes do clique, não há header ou marca visíveis.

A revisão visual local usa a referência `ERR_CONNECTION_CLOSED imagem br 1.png`, conforme a instrução posterior à issue: título, descrição com `sidecode.com.br`, lista de tentativas, código `ERR_CONNECTION_CLOSED` e botão “Saiba mais”, com versão EN completa. Os textos azuis e “Saiba mais” mantêm hover/focus e aparência clicável, sem destinos ou navegação, conforme pedido. O indicador de desenvolvimento do Next está oculto para permitir avaliar a ilusão também em `npm run dev`.

`FakeErrorIntro` preserva a implementação aprovada e cancela sua animação antes de chamar `onReload`. Na #4, `Hero` conecta esse mesmo limite `triggered` à sequência cinematográfica, sem reload real.

A sequência fica estática por 1,86 s após montar, mostra cada corrupção inicial por 200 ms e a pista em 2,6 s por 400 ms, conforme o pedido de desacelerar. Depois usa intervalos aleatórios e pulsos de 580–720 ms. Reduced motion troca apenas a opacidade para mostrar uma pista única com tempo de leitura maior, sem corrupção rápida, e acompanha mudanças da preferência.

Depois do clique, o botão mantém o estado pressionado por 340 ms antes da sequência da #4.

Para revisão: abrir `/` e `/en`, observar os primeiros segundos sem interação, depois testar clique/Tab+Enter/Space e a preferência de movimento reduzido. Ver [validação da revisão visual](docs/validation/hero-reference.md) e [validação da foundation](docs/validation/foundation.md).

Documentação consultada: [Next.js](https://nextjs.org/docs/app/getting-started/installation), [next-intl](https://next-intl.dev/docs/routing/setup), [GSAP/React](https://gsap.com/resources/React/).

## Hero 02 — issue #4

Erro aprovado → corrupção neutra → quebra hierárquica → preto e três frases → reconstrução roxa → convergência no ponto → símbolo → wordmark oficial → Hero editorial. A versão reduced motion mantém a narrativa com fades e revelações leves, sem fragments ou scramble. `ScrambleTextPlugin` já pertence ao GSAP aprovado; não há novas dependências.

`CinematicReveal` e sua timeline ficam restritos à Hero. Os fragments são descartados ao terminar; a mesma instância do wordmark chega à composição final. Paths e composição vêm de `public/brand/parts/side-wordmark-parts.svg`, sem redesenho. Referência editorial em `docs/references/hero/final-layout.png`.

A conclusão completa grava `side:hero-complete:v1` em `sessionStorage`. As próximas visitas à Home, inclusive pelo endereço direto de outro idioma, entram na Hero final. Se storage estiver indisponível, a experiência continua funcionando sem persistência.

Para revisar sempre a intro, abrir `/?intro=replay` ou `/en?intro=replay`. Ao terminar, “Rever intro” / “Replay intro” reinicia o erro sem limpar o storage. Em desenvolvimento, o controle também aparece na Hero final. Para testar uma primeira sessão, abrir uma nova guia sem copiar a sessão ou uma janela privada nova.

Trabalhos, Serviços, Por que Side e contato mantêm aparência de navegação, sem destino, conforme decisão do usuário nesta entrega. EN/PT foi removido da navbar na revisão visual; `/en` continua disponível diretamente. A futura troca de idioma no footer está fora deste escopo. Não há outras seções ou páginas.

A revisão alonga a destruição e destaca palavras em negrito/roxo nas frases de impacto, sem ponto final. Sobre o fundo roxo, o texto continua branco e apenas o destaque passa gradualmente a preto. A superfície roxa converge circularmente até o ponto em 3,1 s, mantendo seu centro fixo e suavizando a chegada. Contato e replay usam o roxo Side; o contato tem peso semibold, enquanto os outros itens da navbar continuam pretos e com peso padrão. Todos os textos da navbar recebem sublinhado que entra da esquerda somente no hover/foco, sem animação com reduced motion.

Evidências e critérios: [validação da Hero completa](docs/validation/hero-cinematic.md). Aprovação visual explícita recebida em 2026-10-02.

Na revisão, o erro passa a iniciar a intro automaticamente após 4 s, mantendo Recarregar funcional. O menu mobile usa três traços que se transformam em X e painel com entrada/saída animadas, sem novas dependências. Apoio e assinatura recebem glitches curtos a cada 8–14 s; a marca tem luz difusa e movimento discreto sob o cursor. Reduced motion mantém os textos estáveis e a marca sem deslocamento/inclinação. Os textos da navbar usam sublinhado no hover/foco: preto nos itens comuns e roxo no contato, acompanhando a cor de cada texto.
