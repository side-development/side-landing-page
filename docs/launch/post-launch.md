# Smoke após publicação

**Status: NÃO EXECUTADO.** O domínio de produção não foi publicado nesta fase. Preencher data, SHA/deployment, executor e resultado somente após autorização e execução reais.

- [ ] HTTPS e certificado válidos no apex/www; HTTP/www redirecionam preservando path/query.
- [ ] 200 nas dez URLs: `/`, `/en`, `/trabalhos`, `/en/work`, `/servicos`, `/en/services`, `/por-que-side`, `/en/why-side`, `/contato`, `/en/contact`.
- [ ] Navegação, PT/EN, refresh, Back/Forward, mobile, intro/skip/reduced motion, vídeos, galerias e case direto/fechamento funcionam no domínio real.
- [ ] Lead sintético autorizado percorre seis perguntas PT/EN, confirma envio e chega à caixa com Reply-To correto; testar um erro controlado sem perder respostas.
- [ ] Newsletter permanece pausada/503; se reativada futuramente, comprovar consentimento e descadastro antes de testar inscrição real.
- [ ] sitemap/robots/OG/favicon: 200, metadata/canonical/hreflang corretos e preview social real. Nenhum `noindex` herdado do preview em páginas públicas.
- [ ] As oito rotas review retornam 404 nos dois idiomas; `.env`, `.git`, fonte e mapas não são servidos.
- [ ] Headers, WAF/429 e ausência de cache de POST/RSC indevido confirmados no edge real.
- [ ] Safari/iOS e Android físicos: teste manual ou registrar explicitamente cobertura pendente.
- [ ] Monitoramento de uptime/5xx/leads/bounces ativo, limite de gastos conferido; rollback com versão anterior identificado.
- [ ] Search Console: verificar propriedade aprovada, enviar sitemap e inspecionar Home PT/EN. Indexação não é instantânea nem garantida.
- [ ] Repetir Lighthouse no domínio real e iniciar observação de Web Vitals de campo; não declarar INP p75 sem dados.
- [ ] Acompanhar primeiras 24 h e primeira semana; registrar incidentes/rollback. Confirmar Gate 2 com o responsável antes de fechar #21.

| Data/artefato | Resultado | Evidência | Decisão |
|---|---|---|---|
| Aguardando autorização | Não executado | — | Publicação bloqueada por gate |
