# Contact Flow — checkpoint local

CTA + footer aprovados pelo usuário em 08/10: “organize melhor o footer no mobile e pode aprovar”. O grid mobile foi reorganizado, preservando desktop, wordmark inteira e glass. Aprovação registrada para essa etapa; Contact Flow e revisão final da issue continuam locais.

## Experiência

Rotas compartilháveis `/contato` e `/en/contact`, com canonical e alternates próprios. As combinações `/contact` e `/en/contato` redirecionam para o idioma correto sem alterar o roteamento já aprovado da Home.

A referência do formulário foi revisada novamente: coluna central, espaço negativo, uma pergunta grande e resposta sobre uma linha fina. A adaptação usa branco, preto e roxo Side; asset oficial da marca no topo e confirmação glass compartilhada com o CTA/footer. Sem textura, kit de UI, dependência nova ou wizard horizontal.

Seis etapas: nome, tipo de projeto, estágio, objetivo, prazo e email. Nenhum campo extra de orçamento, telefone ou empresa visível. Cada pergunta entra por fade/blur curto (6px), depois da saída suave da resposta anterior (5px); reduced motion usa apenas fades de 60–80ms.

### Refinamento após revisão do contato

Topo com símbolo oficial `side-logo-black.svg`, substituindo a wordmark. Fechar mostra apenas o X, com área de toque transparente de 44px; sem legenda ou círculo. A seta de voltar fica ao lado do contador da pergunta, preservando o histórico e respostas; foi removida da base.

Enter tinha cobertura apenas dentro do formulário: preencher, clicar no espaço negativo e pressionar Enter deixava a pergunta parada. O repro `node artifacts/cta-12/contact-enter-check.cjs` falhou no estado 1 antes da correção e passou no estado 2 depois. O atalho agora pertence à tela enquanto o contato está montado, respeita composição/Shift+Enter e mantém a ativação nativa de links/botões. Números selecionam alternativas, sem interceptar os dígitos digitados nos campos abertos.

A última alternativa de cada pergunta com opções é um campo de resposta livre. Tipo de projeto mantém quatro opções fixas (incluindo “Ainda não sei exatamente”); “Algo diferente” passa a ser respondido no campo aberto. Estágio e prazo mantêm suas quatro opções e ganham o campo ao final. Respostas livres são validadas, limitadas a 500 caracteres e convertidas em texto legível no email. Não criam novas etapas.

Opções têm 13px entre o início do card e o número. Campos de texto têm apenas 8px de padding inferior. O objetivo começa com `rows=1`, altura medida de 54px no desktop e 39px no mobile, crescendo com quebra de linha/conteúdo e encolhendo ao apagar. O placeholder foi encurtado para não ocupar uma segunda linha antes da resposta.

[Verificação dos refinamentos](contact/refinement-checks.json): desktop, mobile390 e EN320/reduced; Enter fora do campo, resposta livre nas três perguntas, números dentro do texto, retorno pela seta, foco/resposta preservados, crescimento/redução do objetivo, ausência de legenda/círculo no X e logo oficial. [Resposta aberta mobile](contact/mobile-custom-type.png), [objetivo vazio](contact/mobile-goal-empty.png), [objetivo expandido](contact/mobile-goal-grown.png). Nenhum envio real foi feito.

Enter confirma; Shift+Enter permite nova linha no objetivo; números selecionam alternativas, com rádios nativos e navegação por setas. Validação localizada, foco na resposta atual, retorno por botão ou histórico do navegador com respostas preservadas em memória. As respostas não entram no URL nem em armazenamento persistente. Reload começa novamente. Fechar retorna à Home.

Mobile usa `dvh`, safe areas, campos acima de 16px e controles com altura de toque adequada. O contato ocupa a área visível, sem scroll da página. Com teclado aberto ou zoom, somente a região de respostas pode rolar, mantendo a pergunta e a confirmação disponíveis. Textos auxiliares e números têm contraste reforçado; placeholders têm tamanho de texto grande. Testes em Edge/Chromium emulado; Safari/iPhone físico não foi testado.

### Segunda revisão: clique, viewport e retorno ao card

O OK tinha duas causas de clique perdido: a chegada decorativa bloqueava a confirmação enquanto o botão já estava visível; a inclinação 3D do glass também podia mudar o alvo entre pressionar e soltar (pointerdown no conteúdo, pointerup/click no container, sem submit). A chegada agora aceita confirmação; somente a saída bloqueia avanço duplicado. No contato, o glass conserva reflexos, sombra e resposta de hover, com a inclinação de pressão desativada. O teste de chegada falhou antes e passou depois; a reprodução com eventos isolou também a geometria da pressão.

O campo aberto não recebe outline de ponteiro; Tab mantém indicação de foco. Os indicadores tracejados da base foram removidos. A seta tem SVG de 12px e área de toque de 44px, junto ao contador no topo e ao X. O espaçamento entre número e card permanece 13px, inclusive na composição compacta.

O layout anterior atingia 919px de conteúdo numa janela de 768px. A tela agora usa grid com espaço central limitado e [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries) para ajustar espaçamentos conforme a altura disponível. Em paisagem baixa, as opções usam duas colunas. A [Visual Viewport API](https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API) acompanha a área disponível quando o teclado abre, preservando o input aberto e o OK; não interfere no zoom por pinça.

X retorna para `/#start-project` ou `/en#start-project`, posiciona e foca o card. Essa âncora revela a Home sem repetir a introdução, inclusive quando o visitante abriu contato diretamente numa sessão nova. A composição e a animação original da Hero permanecem preservadas nas entradas normais e no replay explícito.

[Verificação desta revisão](contact/fullscreen-checks.json): seis cenários desktop1440, laptop1366, mobile390, mobile320, paisagem EN e EN320/reduced. Todas as seis perguntas, objetivo expandido, erros, OK com um clique, foco por ponteiro/Tab, ausência de scroll externo e opções sem scroll em viewport normal, X até o card sem intro, restauração do scroll da Home e ausência de erros de runtime. Teclado simulado com VisualViewport de 300px; sem teste em aparelho físico. [Desktop](contact/fullscreen-desktop-02.png), [mobile320](contact/fullscreen-small-02.png), [paisagem](contact/fullscreen-landscape-02.png), [teclado simulado](contact/fullscreen-mobile-keyboard.png).

## Envio Resend

`POST /api/contact` usa a [API oficial de envio](https://resend.com/docs/api-reference/emails/send-email) com `fetch` apenas no servidor, sem SDK. Remetente `Side <contato@sidecode.com.br>`, destinatário fixo `contato@sidecode.com.br` e `reply_to` com o email validado do visitante. Email em texto simples com as seis respostas localizadas. Nenhum email automático adicional é enviado ao visitante.

O servidor valida origem, JSON/tamanho, campos/IDs permitidos, email, honeypot e identificador de tentativa. Há limite de três tentativas por email/minuto em mapa limitado a mil entradas por instância; não substitui proteção distribuída da infraestrutura. Conteúdo do visitante não é registrado em logs nem banco.

Retries do mesmo conteúdo usam uma [chave de idempotência](https://resend.com/docs/dashboard/emails/idempotency-keys) estável; editar respostas muda a chave. O cliente bloqueia submit duplicado, mantém respostas nos erros e aborta ao sair ou voltar durante o envio. A confirmação exige HTTP de sucesso do provedor **e ID de email**. Isso confirma aceite pela API, não entrega na caixa postal.

Configuração pendente: `RESEND_API_KEY` no ambiente do servidor e domínio `sidecode.com.br` verificado no Resend. `.env.example` documenta o necessário. A chave não está configurada neste checkout. O servidor local retorna 503 e a UI informa indisponibilidade; nenhum envio real foi realizado. Newsletter usa a mesma chave e requer acesso a Contacts.

## Evidência

- [Validação do navegador](contact/checks.json): seis cenários (desktop, mobile390/320, EN desktop/mobile e reduced), teclado, histórico, seleção/foco, validação, retenção no erro real 503 e sucesso exclusivamente com interceptação de teste.
- [Validação do servidor](contact/server-checks.json): payload/destinatário/reply-to, idempotência, edição, limite, ausência de chave, erro/timeout/resposta sem ID; chamadas ao provedor inteiramente simuladas, sem rede externa.
- Integração CTA → contato → Home verificada no navegador: caret/cursor nativo no campo, sem overflow e retorno à Home durante a saída sem callback residual alterando o histórico.
- [Desktop](contact/desktop-01.png), [opções mobile](contact/mobile-02.png), [mobile pequeno](contact/small-mobile-01.png), [espaço de teclado](contact/mobile-keyboard-viewport.png), [EN](contact/english-01.png), [erro real sem configuração](contact/desktop-unconfigured.png), [confirmação testada com mock](contact/desktop-success-mocked.png).

Lint, typecheck e build passaram. Após as duas rodadas de refinamento, o usuário aprovou tudo em08/10. [Validação e entrega final](final.md) registra mobile/EN/reduced, Hero1,5s e restauração do scroll suave. Configuração Resend permanece explícita; a #1 recebe o registro técnico junto da PR.

Prévia funcional: http://localhost:3012/contato — http://localhost:3012/en/contact.
