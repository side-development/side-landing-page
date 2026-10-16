# Auditoria de produção — #21

Data: 2026-10-16. Base `main`: `5f7e85c54ce6ee7caafb539415d9cbae562ad380`. Branch local: `audit/issue-21-production-readiness`. Issues #21/#1 e AGENTS.md lidos integralmente; main local e remota coincidem.

P0 = impede publicação por perda de serviço/exposição; P1 = relevante antes do lançamento; P2 = melhoria limitada ou pós-lançamento. Não houve evidência de invasão ou vazamento real.

| Achado | Risco | Evidência | Ação/status |
|---|---|---|---|
| Capturas clínicas aparentavam conter dados identificáveis | P0 se reais | Inspeção de todas as 12 variantes de Psicologia: 9 com identificadores/contexto aparente | **Esclarecido pelo responsável:** todas as informações são simuladas. Conteúdo preservado; não afirmar incidente. Autorização/direitos de divulgação continuam responsabilidade editorial do proprietário. |
| Contato não tinha entrega real comprovada | P1 | Baseline só possuía teste isolado, sem env local | **Validado:** domínio verificado no Resend; dois fluxos reais PT/EN HTTP200, dois eventos delivered, retry idempotente sem terceiro email; responsável confirmou ambos na caixa, seis respostas e resposta ao remetente. |
| Newsletter coletava sem operação de consentimento/descadastro comprovada | P1 | UI enviava email; POST criava Contact `unsubscribed:false`, sem prova de consentimento | **Pausada:** campo/botão desativados e aviso PT/EN; API503 sem ler body ou contactar Resend. Restaurar só com fluxo revisado; nenhuma inscrição real criada na auditoria. |
| Limite de body aplicado após buffering completo | P1 | `request.text()` antes da checagem de tamanho | **Corrigido:** stream limitado a 8192 bytes UTF-8, cancelamento antecipado, deadline5s, erros400/408/413; testes executados. |
| Abuso com emails rotativos/instâncias | P1 | Map3/email/minuto contornável por novos emails | **Mitigado localmente:** teto adicional30/minuto/instância. **Pendente no host:** WAF com IP confiável e orçamento/alertas; memória local não é proteção distribuída. |
| Home vazia sem JavaScript | P1 | CSS ocultava Hero até hidratação e demais seções estavam hidden | **Corrigido:** fallback SSR/noscript com marca, descrição localizada, navegação e email; confirmado em navegador sem JS. |
| Intro longa sem saída e reduced motion ainda aguardava narrativa | P1 | Primeiro acesso aproximadamente24,5s; reduced aproximadamente18s pela timeline | **Corrigido:** skip acessível durante intro; reduced motion acessa conteúdo diretamente. Timeline artística original preservada. Reentrada da sessão mantém comportamento aprovado. |
| Navegação Home por botões | P1 SEO/a11y | `router.push` em vez de links | **Corrigido:** links semânticos com os mesmos estilos/underlines e menu. |
| Foco escapava de case modal | P1 | Shift+Tab saía para rodapé/fundo; trigger podia desaparecer durante autoplay | **Corrigido:** irmãos inert, ciclo de Tab, Escape e fallback ao H1 quando trigger desconectado. Bug de autoplay reproduzido antes da correção. |
| Galeria automática sem pausa persistente | P1 a11y | Hover/foco pausavam temporariamente | **Corrigido:** controle pausa/retomada; preferência reduced interrompe tween em curso. |
| Frases editoriais pareciam depoimentos | P1 conteúdo | Aspas/primeira pessoa; identificação somente oculta/ARIA | **Corrigido:** identificação editorial visível PT/EN. Sem atribuições, métricas ou ratings inventados. |
| Descoberta e previews incompletos | P1 SEO | Sem sitemap/robots/imagem social; OG incompleto | **Corrigido:** dez canônicas no sitemap, alternates recíprocos/x-default, robots, OG/Twitter por família, PNG oficial1200×630. Metadata existente preservada. |
| Header hreflang apontava a slugs de outro idioma | P1 SEO | Middleware anunciava `/services` em vez de `/servicos` | **Corrigido:** desativado Link automático; HTML/sitemap mantêm pares corretos. |
| Link de idioma da Home incorreto no HTML inicial | P1 SEO | `usePathname` no SSR expunha `/pt-BR`, produzindo `/en/pt-BR` no rodapé; o clique após hidratação ia a `/en` | **Corrigido:** pares explícitos `/` e `/en` no fechamento da Home, como nas páginas internas. |
| Rótulos acessíveis e contraste insuficiente nas demos | P1 a11y | Axe: abreviações PT/EN ausentes dos aria-labels; `aria-label` proibido em parágrafo; pequenos textos com contraste2,48–4,24:1 | **Corrigido:** nomes incluem rótulo visível, parágrafo com texto acessível e nove cores pontuais ajustadas. Sem mudar cenas/timelines; estados de scroll fora da tela são examinados separadamente. |
| Transparência operacional/retenção sem definição comprovada | P1 operacional | Aviso anterior dizia somente uso do email | **Parcial:** aviso explicita respostas/email, finalidade, Resend e contato para exclusão. Responsável deve aprovar aviso, acesso, retenção real e atendimento; nenhuma conformidade jurídica presumida. |
| Ausência de headers proporcionais | P2 | `next.config.ts` só tinha devIndicators | **Corrigido:** nosniff, DENY/frame-ancestors, referrer/permissions, base-uri/object/form-action; powered-by removido. CSP não é política estrita de scripts/estilos; evita quebrar hidratação/GSAP. |
| Dependências sem uso e advisories transitivos | P2 | Nextra e tema sem imports/config; npm audit inicial15 achados | **Removidos** os dois pacotes e381 instalações, sem mudar versões retidas. Restam5 achados high no encadeamento de lint por braces, sem caminho de runtime encontrado; não aplicado downgrade automático para Next14. |
| Verificação automatizada em PR ausente | P2 | Sem `.github/workflows` no baseline | **Preparada localmente:** CI com ações oficiais fixadas por SHA, somente leitura, sem secrets/deploy; instalação/lint/tipos/API/build/HTTP. Sintaxe validada; execução no GitHub aguarda aprovação de push/PR. |
| Scroll de case ignorava reduced motion | P2 | `scrollIntoView({behavior:'smooth'})` explícito | **Corrigido:** instant quando preferência está ativa. |
| Reviews apontados como possível exposição | Verificação | Oito páginas já chamavam notFound fora de development | **Nenhum defeito confirmado:** HTTP404 em todas as variantes PT/EN/pt-BR. Não foi usado robots como barreira de acesso. |
| Loop PT ao bindar localhost por IP | Ambiente | `127.0.0.1` + normalização NextURL causava rewrite externo; localhost não | **Resolvido na execução:** prévia usa `--hostname localhost`. Mesmo build respondeu200 nas dez rotas; nenhuma correção especulativa no Proxy. |

## Escopo comprovado e limites

- Fontes/mídias: scan textual de357 arquivos sem candidatos a tokens; somente `.env.example` versionado. Metadados de46 imagens e dois reels sem GPS/credenciais encontrados; dois PNGs têm apenas Software. Não é auditoria de todo histórico Git nem de contas externas.
- Sem tracker ou analytics remoto encontrado; localeCookie desativado. sessionStorage é usado na experiência. Nenhum banner/tracker instalado. CSP atual não substitui validação de entrada ou WAF.
- A chave de teste fornecida pelo responsável foi usada somente em memória. Relatórios/artefatos não contêm o valor, respostas reais de leads ou conteúdo de emails. Produção deve receber chave nova de menor privilégio no painel seguro.
- A validação de envio real é evidência distinta dos mocks; a newsletter permanece deliberadamente não validada para coleta/marketing. [Criar Contact](https://resend.com/docs/api-reference/contacts/create-contact) não comprova consentimento nem envio de confirmação. `segments:[{id}]` era válido; não foi registrado falso defeito de payload.
- Não foi criado JSON-LD: sem necessidade de adicionar endereços/perfis/ratings não comprovados. Não foi instalada biblioteca, tracker ou novo serviço no projeto. Ferramentas de QA ficam temporariamente fora das dependências do app.
- Mudanças visuais necessárias permanecem locais para aprovação: skip, pausa, aviso editorial, newsletter pausada e aviso de dados. Sem redesenho ou alteração das timelines aprovadas.

Resultados e cobertura: [performance.md](performance.md). Decisão e pendências: [go-no-go.md](go-no-go.md). Publicação: [deployment-plan.md](deployment-plan.md). #21 e #1 continuam abertas; sem push, PR, merge ou alterações de DNS.
