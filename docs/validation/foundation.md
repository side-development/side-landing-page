# Validação — Foundation #1

Executada em 01/10/2026, Windows, Node 22.19.0, npm 10.9.3 e Edge/Chromium, com `npm run build` seguido de `npm start`.

## Resultado

- Lint: pass, zero warnings (`npm run lint`).
- Typecheck: pass (`npm run typecheck`, com geração dos tipos de rotas).
- Build: pass; ambas as Homes pré-renderizadas.
- Não havia testes existentes. Checks funcionais de navegador executados com Playwright instalado temporariamente fora do repositório.
- HTTP 200, conteúdo e `html lang` corretos em `/` e `/en`.
- `/` continua em pt-BR com navegador em inglês; `/pt-BR` redireciona para `/`.
- Títulos/descrições localizados, canonical e `hreflang` para as duas versões.
- Navegação por links de idioma nos dois sentidos, montando/desmontando o componente GSAP sem erros.
- Animação de demonstração finaliza normalmente; reduced motion mantém a marca estática e visível, sem transformação.
- Desktop 1440 × 900 e mobile 390 × 844: sem overflow horizontal.
- Nenhum erro/warning de console ou hidratação nos cenários acima.
- Os quatro SVGs fornecidos em `public/brand/` foram preservados.

## Decisões

Next.js 16.3.8 foi confirmado como stable pelo registro npm. TypeScript 6.0.3 respeita o peer `<6.1` do tooling atual; ESLint 9.39.5 respeita o peer do `eslint-plugin-react`. As versões estão fixadas no lockfile. Sem dependências de produto fora da stack aprovada.

O provider de locale tem `messages={null}`: textos são traduzidos no servidor, e links localizados recebem o contexto de idioma sem enviar os dicionários ao cliente. Usa-se a API estável `next/root-params` de Next.js 16.3 para a configuração de locale, conforme a documentação atual de `next-intl`.

## Escopo e status

A implementação inicial da #1 está **Completed**. A issue permanece aberta porque seu texto exige mantê-la como registro técnico vivo. A dependência técnica da #2 está atendida.

As Homes desta entrega são placeholders, com um componente GSAP mínimo para comprovar SSR, cleanup e reduced motion. A #2 substitui somente esse conteúdo de demonstração pelo primeiro recorte do Hero; não requer mudança da foundation.
