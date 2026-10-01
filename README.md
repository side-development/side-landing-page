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

Sem outras páginas, bibliotecas visuais, CMS ou infraestrutura antecipada.

## Hero 01 — issue #2

As duas Homes começam no erro fictício com HTTP 200. O texto vem dos dicionários e o SVG do documento quebrado é próprio. Não há header, marca ou revelação pós-clique.

A revisão visual local usa a referência `ERR_CONNECTION_CLOSED imagem br 1.png`, conforme a instrução posterior à issue: título, descrição com `sidecode.com.br`, lista de tentativas, código `ERR_CONNECTION_CLOSED` e botão “Saiba mais”, com versão EN completa. Os textos azuis e “Saiba mais” mantêm hover/focus e aparência clicável, sem destinos ou navegação, conforme pedido. O indicador de desenvolvimento do Next está oculto para permitir avaliar a ilusão também em `npm run dev`.

`src/features/hero/Hero.tsx` mantém `idle | triggered`; `FakeErrorIntro` cancela sua animação antes de chamar `onReload`. `Hero` expõe `onReloadTriggered` para um futuro componente cliente que orquestre a próxima fase. Sem reload real ou persistência; recarregar a URL reinicia a experiência.

A sequência fica estática por 1,86 s após montar, mostra cada corrupção inicial por 200 ms e a pista em 2,6 s por 400 ms, conforme o pedido de desacelerar. Depois usa intervalos aleatórios e pulsos de 580–720 ms. Reduced motion troca apenas a opacidade para mostrar uma pista única com tempo de leitura maior, sem corrupção rápida, e acompanha mudanças da preferência.

Depois do clique, esta fase conserva a tela e o botão em estado pressionado, sem repetir o callback. A experiência seguinte depende de uma nova issue e de aprovação visual desta fase.

Para revisão: abrir `/` e `/en`, observar os primeiros segundos sem interação, depois testar clique/Tab+Enter/Space e a preferência de movimento reduzido. Ver [validação da revisão visual](docs/validation/hero-reference.md) e [validação da foundation](docs/validation/foundation.md).

Documentação consultada: [Next.js](https://nextjs.org/docs/app/getting-started/installation), [next-intl](https://next-intl.dev/docs/routing/setup), [GSAP/React](https://gsap.com/resources/React/).
