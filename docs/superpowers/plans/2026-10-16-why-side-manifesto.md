# Why Side — implementação do manifesto

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. O estado de execução fica em claude-mem/work_state, lista issue-19.

**Goal:** Concluir a página PT/EN mantendo a abertura aprovada e entregar a prévia final para aprovação visual.

**Architecture:** Promover a cena para um componente isolado compartilhado com a rota de revisão. Conteúdo editorial renderizado no servidor, com uma pequena camada client para movimento dos capítulos; shell, cursor e footer reutilizados. Seguir os pares de slugs e metadados de Services/Work.

**Tech Stack:** Next.js 16.3.8, React 19, TypeScript, CSS Modules, GSAP/ScrollTrigger/@gsap/react e next-intl existentes.

**Spec:** [Issue #19](https://github.com/side-development/side-landing-page/issues/19), [pesquisa e cena aprovada](../../references/why-side-page/README.md). Aprovação do usuário em16/10: “Aprovado continue”.

## Global Constraints

- Preservar a composição aprovada: faixa roxa, exterior branco, sem os dois pontos móveis.
- Não adicionar dependências, fontes, métricas, história da empresa ou material de cliente novo.
- Home, Work e Services recebem apenas os destinos de navegação necessários.
- PT `/por-que-side`, EN `/en/why-side`; slugs trocados redirecionam como Services.
- Conteúdo e controles disponíveis sem hover; reduced motion e HTML sem JS legíveis.
- Commits locais por responsabilidade. Nenhum push, PR, fechamento da issue ou publicação antes da aprovação visual final.

## Review Focus

- Scroll rápido/reverso e chegada por histórico não deixam palavras escondidas ou timeline ativa após saída.
- Resize no mesmo breakpoint e mudança de orientação mantêm a composição dentro da viewport.
- Footer fullscreen não deixa navbar focável sobre ele; o menu mobile mantém Escape e foco.
- Locale mantém o destino Why Side, com canonical e alternates corretos.
- Evidências de Work usam somente mídias existentes e preservam o aviso de confidencialidade do Computer Vision.

## Tarefas

1. **Promover a abertura aprovada.** Criar `ManifestoOpening.tsx`, renomear o hook/CSS de abertura e reutilizá-los em `ManifestoPrototype.tsx`. O player permanece exclusivo da revisão. Conferir os estados inicial/ápice/reverso desktop/mobile contra a composição aprovada.
2. **Conteúdo e rotas.** Criar `WhySidePage.tsx`, `WhySideExperience.tsx`, `manifesto-content.ts`, `ManifestoChapters.tsx`, `ManifestoChapterMotion.tsx` e `manifesto-chapters.module.css`; criar os dois `page.tsx`. Teste de navegação/metadados `docs/validation/why-side-page/manifesto-routes.mjs` deve primeiro falhar com404, depois passar com headings completos PT/EN, footer e destinos reais. Nome: título aprovado e wordmark oficial. Princípios: três linhas grandes, sem accordion/cards. Work: duas imagens existentes Route/OWL e referência textual confidencial Computer Vision. Fechamento: convite curto com link glass para Contact e footer existente.
3. **Integração.** Ajustar `WorkNav.tsx` para `currentPage="why"`, conectar os destinos Why Side de Home e footer e usar destinos de idioma explícitos. Verificar ida/volta PT/EN, Home→Why, Work→Why, Services→Why, casos reais, Contact e menu mobile.
4. **Robustez e entrega.** QA de produção desktop/mobile320/390/tablet/landscape, reduced dinâmico, teclado, sem JS, scroll rápido/reverso/resize/back, cleanup e ausência de overflow/erros. Executar lint/typecheck/build/diffcheck. Revisão final independente conforme skill de execução, corrigir problemas importantes. Gravar scroll completo e screenshots, atualizar evidências e entregar prévia local para aprovação final.

**Verificação:** `PLAYWRIGHT_MODULE` aponta para a instalação externa de Playwright já utilizada no projeto; nenhum pacote de testes é adicionado ao bundle. Os testes de navegador exercitam rotas, leitura, interação e layout reais, sem unit tests que apenas reproduzam CSS.

**Execução:** aprovação atual autoriza continuar a implementação nesta sessão. A decisão de conteúdo e estrutura acima desenvolve o brief já autorizado; não introduz um novo gate intermediário.
