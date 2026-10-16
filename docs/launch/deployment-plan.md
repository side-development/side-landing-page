# Proposta de publicação — aguardando aprovação

Nenhuma hospedagem, DNS, contratação ou publicação foi executada. Valores consultados em 2026-10-16, em USD, sem impostos/câmbio/excedentes; confirmar no momento da contratação.

## Hospedagem e custo

**Recomendação: Vercel Pro**, por executar Next App Router, imagens, Proxy e APIs Node com previews e rollback integrados, sem adaptar o projeto. Base publicada de **US$20/mês**, sujeita a assentos/uso. Hobby não é apropriado para este uso comercial. Fontes: [preços](https://vercel.com/pricing), [limites do Hobby](https://vercel.com/docs/plans/hobby).

Alternativa: **Render Web Service**, Node com `npm ci`, `npm run build` e `npm start -- --hostname 0.0.0.0 --port $PORT`. Compute inicial anunciado a partir de US$7/mês; validar memória/latência e orçamento antes de escolher o menor plano. Há mais responsabilidade sobre cache, memória e região. Não usar serviço gratuito com suspensão para leads comerciais. [Preços](https://render.com/pricing), [compute](https://render.com/docs/compute-plans).

Cloudflare DNS Free: US$0. Resend transacional Free: até 3.000/mês e 100/dia; Pro a partir de US$20/mês para 50.000/mês. Caixa postal Zoho já aparece no MX; preço/licença e acesso são operação separada. **Orçamento inicial sugerido: US$20/mês + caixa postal/domínio + excedentes**; com Resend Pro, US$40/mês + demais itens. Não há compromisso de gasto aprovado. [Cloudflare](https://www.cloudflare.com/plans/), [Resend](https://resend.com/pricing).

## Build, ambientes e configuração

- Runtime Node **22.x com patch de segurança atual** no host; QA local usa 22.19.0. Confirmar suporte do host e repetir smoke no runtime provisionado. Node 22 tem manutenção até abril/2027; não provisionar Node 20 descontinuado. [Ciclo oficial](https://github.com/nodejs/Release).
- Manter Next 16.3.8/React 19.3.0 e lockfile verificados; sem export estático, pois Work e APIs são dinâmicos.
- CI futuro: checkout privado, `npm ci`, `npm run lint`, `npm run typecheck`, `node --test scripts/api-security.test.cjs`, `npm run build`; fazer preview protegido antes de promover exatamente esse artefato. Não executar `resend-smoke.cjs` automaticamente.
- Preview precisa autenticação e `X-Robots-Tag: noindex, nofollow` do provedor em todas as respostas. Robots sozinho não protege preview. Não reutilizar segredo de produção em forks/PRs de terceiros.
- Branch local atual não foi enviada; push/PR e promoção exigem aprovação visual conforme `AGENTS.md`. Configurar deploy automático só depois de decidir se merge promove produção ou apenas prepara preview.

| Variável | Tipo/momento | Política |
|---|---|---|
| `RESEND_API_KEY` | Segreta; runtime servidor | Chave distinta para produção, somente envio e limitada ao domínio. Inserir no painel seguro; não colocar em build args públicos/logs. |
| `NEXT_PUBLIC_SIDE_INSTAGRAM_URL` | Pública; build | URL oficial HTTPS ou vazio. Rebuild se alterar. |
| `NEXT_PUBLIC_SIDE_LINKEDIN_URL` | Pública; build | URL oficial HTTPS ou vazio. Rebuild se alterar. |

Esses nomes estão em `.env.example`. Newsletter está pausada no código/UI/API; não existe variável que habilite coleta. `NODE_ENV=production` é gerenciado pelo host; porta é fornecida pelo host. O segredo usado na auditoria ficou em memória, não em arquivo. Usar chaves novas, de menor privilégio, para os ambientes definitivos.

## Cloudflare, domínio e email

1. Exportar/salvar a configuração DNS atual em local privado antes de qualquer alteração autorizada. Conservar nameservers na Cloudflare e **todos os MX/TXT de email**. A leitura atual encontrou MX Zoho, SPF e DMARC `p=reject`; não substituir esses registros por configurações genéricas.
2. Adicionar `sidecode.com.br` e `www.sidecode.com.br` no host escolhido. Copiar os alvos **exatamente apresentados pelo painel**, incluindo validações; não adivinhar IP/CNAME.
3. Para Vercel: registros web em **DNS only** na Cloudflare, TLS/HTTPS e redirect `www → apex` no host. Vercel desaconselha proxy/CDN adicional por cache e visibilidade de segurança. Não alterar os nameservers nem transferir o DNS. [Orientação oficial](https://vercel.com/kb/guide/cloudflare-with-vercel).
4. Se Render + proxy Cloudflare for escolhido: certificado válido no origin, modo **Full (strict)**, Universal SSL ativo; nunca Flexible. Evitar cache de HTML/RSC, `/api/*` e POST; não usar Cache Everything, Rocket Loader ou minificação que altere scripts. Respeitar `Vary` e `Cache-Control` do Next; `_next/static` é versionado. Configuração final depende do host aprovado.
5. `https://sidecode.com.br` é o host canônico em metadata/sitemap. Redirecionar HTTP → HTTPS e `www` → apex preservando path/query. Validar `/pt-BR`, slugs cruzados e `?case=`. HSTS apenas após HTTPS estável; sem preload inicial.
6. Resend informou domínio verificado; dois envios reais PT/EN foram entregues e confirmados pelo responsável. Na configuração final, conferir SPF/DKIM no painel e alinhamento com DMARC existente; registros de email são DNS only. Verificar remetente/destinatário `contato@sidecode.com.br`, Reply-To do lead, spam, bounce e alertas. Recepção de caixa Zoho não deve ser substituída por MX de envio/recebimento do Resend. [Domínios](https://resend.com/docs/dashboard/domains/introduction), [DMARC](https://resend.com/docs/dashboard/domains/dmarc).

## Abuso, privacidade e observação

- Map local limita 3 tentativas/email/minuto + 30/minuto/instância; não é proteção distribuída. Antes de tráfego público, configurar WAF do host por IP confiável para POST `/api/contact`: proposta inicial 5/minuto/IP, bloqueio 429, testar vários IPs legítimos. Rever orçamento global/alertas de envio. Confirmar custo de WAF antes de habilitar. Sem confiar em `X-Forwarded-For` fornecido pelo visitante. [WAF Vercel](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting).
- Logs de status/erros HTTP sem body/email/Authorization. Monitorar disponibilidade de `/`, `/en` e uma rota dinâmica; API de contato não deve receber probes que enviem email continuamente. Verificar 5xx, falhas Resend, bounces e limites diariamente na primeira semana. Usar ferramentas do host inicialmente; não adicionar tracker de visitantes.
- Responsável deve aprovar aviso de dados e operação: quem acessa caixa/Resend, prazo real de retenção, processo de exclusão e resposta via `contato@…`; verificar termos/DPA dos provedores e transferências. Não definir prazo fictício. Newsletter só retorna após consentimento específico, prova de consentimento e descadastro testado (incluindo contato previamente descadastrado).

## Rollback e sequência autorizável

1. Registrar SHA/ID do artefato candidato e do último deployment bom; guardar configuração anterior de env/DNS privadamente, sem valores em Git.
2. Publicar preview protegido, repetir HTTP/QA e um lead sintético aprovado. Confirmar custos, WAF, secrets e monitoramento antes do corte.
3. Promover o artefato aprovado; só então efetuar a mudança DNS aprovada. TTL temporário sugerido de 300 s, se suportado; mudanças de DNS não são instantâneas.
4. Smoke no domínio real usando [post-launch.md](post-launch.md). Se houver 5xx persistente, navegação quebrada, vazamento ou perda de leads: reverter imediatamente ao deployment anterior no host; manter email/DNS de correio intactos. Se necessário, restaurar apenas os registros web anteriores. Na primeira publicação sem versão anterior, retirar a promoção e voltar ao destino previamente registrado.
5. Repetir smoke após rollback e verificar leads pendentes, pois código revertido não recupera mensagens perdidas. Não encerrar #21 antes da confirmação positiva do Gate 2.

**Aprovações necessárias:** visual do candidato; host/plano/teto de gasto; ambiente e contas de produção com acesso mínimo; aviso e retenção de dados; regras/custo WAF; preview externo; push/PR/merge; valores exatos de DNS e janela de corte; promoção ao domínio real. Esta proposta não autoriza nenhuma dessas ações.
