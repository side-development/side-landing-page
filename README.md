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

Documentação consultada: [Next.js](https://nextjs.org/docs/app/getting-started/installation), [next-intl](https://next-intl.dev/docs/routing/setup), [GSAP/React](https://gsap.com/resources/React/).
