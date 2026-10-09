# Footer com marca d'água e inscrição — revisão de 08/10

O usuário pediu seguir de perto o grid da [referência de detalhe](../../references/final-cta-footer-contact/footer-detail-reference.png), com títulos semibold, entrada para emails e Instagram/LinkedIn. Este pedido inclui explicitamente newsletter e redes, substituindo a exclusão anterior desses elementos nesta issue.

## Resultado visual

Revisão seguinte, após a captura do usuário de 18:09: assinatura à esquerda e copyright logo abaixo, sem repetir a logo pequena. Navegação, contato e idioma têm colunas próprias; inscrição e redes fecham o grid. A linha inferior e o link “Voltar ao topo” foram removidos. Títulos com peso 600, texto secundário compacto. A base continua branca, em continuidade com o CTA roxo/branco aprovado.

A wordmark oficial é uma marca d'água absoluta atrás do conteúdo, sem preencher os paths. A geometria do componente oficial BrandWordmark permanece intacta; o tratamento CSS usa `fill: none`, stroke de 0.75px e cor cinza/lilás muito leve. O viewBox recebe somente 3 unidades de respiro nas bordas, e `preserveAspectRatio` mantém toda a geometria visível, sem crop, no desktop e mobile. No mobile, a marca ocupa o espaço final abaixo dos ícones e o formulário ocupa uma linha inteira.

Após o feedback seguinte, o acabamento foi refeito a partir do componente GlassButton fornecido pelo usuário. A assinatura PT/EN tem peso 700. O componente reutilizável fica em `src/components/ui/glass-button.tsx`, resolvido pelo alias existente `@/components/ui/glass-button`; estilos em CSS Modules. O repositório já usa TypeScript e CSS Modules, então Tailwind, shadcn, CVA e ícones externos não são necessários para reproduzir este efeito. Nenhuma dependência foi adicionada.

Campo, botão e ícones compartilham o material óptico da referência: gradiente transparente, borda cônica mascarada, reflexo diagonal separado, bevel interno e sombra vazada externa. O blur é de 2px, reduzido no hover dos controles para preservar transparência. Hover muda o ângulo da borda e desloca o reflexo; botão e links reais comprimem levemente e inclinam ao pressionar. O campo não sofre transformações durante a digitação. Os ícones ainda não configurados permanecem não interativos. Foco visível preservado, transições/transformações desativadas em reduced motion e forced-colors com cores do sistema.

## Inscrição

- Formulário localizado com validação nativa, Enter, foco, pending, erro anunciado e sucesso condicionado à API.
- `POST /api/newsletter` valida email/origem/honeypot, limita tamanho e repetições por email, e usa `fetch` server-side para a API oficial de Contacts do Resend. Sem SDK ou dependência nova.
- Sucesso exige resposta HTTP bem-sucedida do provedor com ID de contato. Nenhuma chave está configurada no checkout: inscrições locais retornam 503 e mostram erro honesto; nada é coletado nem enviado nos testes reais do navegador.
- A chave fica só no servidor. `.env.example` registra `RESEND_API_KEY` e um segmento opcional `RESEND_NEWSLETTER_SEGMENT_ID`. A chave precisa de acesso a Contacts. Os limites locais por instância não substituem controles de infraestrutura.
- As URLs oficiais de Instagram e LinkedIn foram solicitadas ao usuário e ainda não foram fornecidas. Os ícones aparecem como elementos não interativos; sem href inventado. Campos públicos opcionais de configuração estão em `.env.example`.

Referência técnica utilizada: [Create Contact — Resend](https://resend.com/docs/api-reference/contacts/create-contact). Essa API salva contatos; a revisão não cria Broadcasts nem dispara campanhas.

## Verificação

ESLint, typecheck, build e diff-check passaram nesta revisão. Cinco cenários desktop PT/EN, mobile 390/320 e reduced motion passaram sem overflow ou erros de página; a geometria inteira da wordmark está contida no footer. Locale switch e links de seção continuam funcionais, com alinhamento do footer após a rota localizada estabilizar.

[Observações do glass no navegador](footer/glass-observations.json): ângulo da borda -75°→-125° no hover, reflexão 0%→25%, inclinação medida no press, foco roxo de 2px, assinatura em peso 700 e nenhuma transformação em reduced motion. [Detalhe](footer/glass-detail.png) e [hover](footer/glass-hover.png) capturados em escala 2x. A validação da inscrição foi repetida após integrar o botão, sem chamadas ao provedor.

Refinamento de foco seguinte: o contorno do campo aparece somente ao navegar com Tab; clique/toque não cria stroke roxa. Como inputs de texto podem corresponder a `:focus-visible` mesmo após clique, a modalidade Tab/ponteiro é rastreada no footer com eventos que são removidos ao desmontar. O footer continua recebendo foco programático para navegação por âncora/idioma, sem desenhar contorno no container. Links e botões preservam `:focus-visible`. Verificado no navegador em 1440px e 390px: clique no input, Tab, clique após Tab, foco programático e clique no footer. [Prévia após clique](footer/pointer-focus.png).

[Teste da inscrição](footer/newsletter-checks.json): ausência de chave, email inválido, honeypot, origem externa, erro/timeout do provedor e resposta sem ID não produzem sucesso. Respostas do Resend foram simuladas apenas em testes isolados, sem chamadas externas. No navegador, email inválido impede submit; falta de configuração mostra erro. Sucesso da UI foi verificado com interceptação somente de teste. Todos os paths da marca d'água foram inspecionados como transparentes com stroke.

[Desktop](footer/desktop.png), [composição completa](footer/desktop-closing.png), [mobile](footer/mobile.png), [mobile pequeno](footer/small-mobile.png), [erro sem configuração](footer/newsletter-unconfigured.png).

Refinamento mobile final: navegação à esquerda; contato e idioma alinhados na coluna direita; inscrição ocupa a largura inteira abaixo. O grid com áreas explícitas elimina a linha vazia à direita do idioma e encurta o footer, mantendo assinatura/copyright juntos e a wordmark inteira. Cinco cenários e navegação passaram novamente.

CTA + footer aprovados pelo usuário em 08/10: “organize melhor o footer no mobile e pode aprovar”. Prévia local: http://localhost:3012/review/final-cta#side-footer. Contact Flow avançou para [checkpoint próprio](contact-flow.md); sem push/PR. Configuração real da newsletter e URLs das redes permanecem pendentes.
