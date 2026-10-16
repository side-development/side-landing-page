# Release candidate — issue #21

Base: `main` / `5f7e85c54ce6ee7caafb539415d9cbae562ad380` (2026-10-16).
Spec: [#21](https://github.com/side-development/side-landing-page/issues/21), [#1](https://github.com/side-development/side-landing-page/issues/1), `AGENTS.md`.

## Plano da Fase 1

Objetivo: preparar o site aprovado com correções pequenas e evidências reproduzíveis. Stack preservada: Next.js, React, TypeScript, GSAP, next-intl, CSS Modules e fetch nativo para Resend. Sem publicação, DNS, serviços pagos, push ou PR antes da aprovação.

- [x] Ler issues/instruções e confirmar SHA da main; criar branch local.
- [x] Baseline: instalação limpa, lint, typecheck, build, servidor de produção e medições.
- [x] Corrigir segurança/privacidade: limites de body antes da alocação, abuso proporcional; newsletter pausada; conteúdo sensível em quarentena se não houver comprovação.
- [x] Corrigir acessibilidade/SEO: fallback sem JS, skip/reduced motion, foco modal, identificação editorial; sitemap, robots, OG/Twitter localizado com marca oficial.
- [x] QA: dez rotas canônicas, redirects, 404/reviews, navegação/idiomas, galerias/cases, contato em seis etapas, estados de integração e viewport 320–1440.
- [x] Comparar performance; registrar navegadores/dispositivos realmente executados.
- [x] Revisão independente e verificações finais; preencher relatório e plano de infraestrutura/rollback.
- [x] Apresentar prévia local e Go/No-Go; parar para aprovação.

Verificações focam: bodies grandes sem Content-Length; erros/timeouts do provedor sem falso sucesso; entrada direta em case e retorno de foco; crawlers sem JS; bloqueio real de review em produção. Mocks não comprovam entrega real de email. Conteúdo sintético/autorização e operação de privacidade dependem do responsável.

## Entregáveis

- [Auditoria](audit.md)
- [Performance e QA](performance.md)
- [Deployment](deployment-plan.md)
- [Go/No-Go](go-no-go.md)
- [Após lançamento](post-launch.md)

Artefatos de execução e capturas ficam em `artifacts/launch/` (ignorado pelo Git). Não publicar PII, capturas confidenciais ou segredos. A issue #21 permanece aberta até o Gate 2.
