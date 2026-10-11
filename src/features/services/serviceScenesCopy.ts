export const identityCopy = {
  "pt-BR": {
    service: "Identidade visual & marcas",
    description: "Uma identidade que traduz quem você é. E faz sua marca ser reconhecida.",
    territories: "Estratégia de marca · Logotipo · Sistema visual · Direção de arte",
    headline: ["Uma identidade.", "Muitas expressões."],
    structure: "Forma com intenção", palette: "Uma linguagem de cor", type: "Presença em cada letra",
    signature: "O começo de um sistema.", caption: "Forma, cor e tipografia. Uma mesma identidade.",
    accessible: "Sistema visual da SIDE: logo oficial sobre um grid de construção, paleta roxa, preta, lavanda e branca, e tipografia.",
  },
  en: {
    service: "Visual identity & brands",
    description: "An identity that expresses who you are. And makes your brand recognizable.",
    territories: "Brand strategy · Logo design · Visual system · Art direction",
    headline: ["One identity.", "Many expressions."],
    structure: "Form with intention", palette: "A language of color", type: "Presence in every letter",
    signature: "The start of a system.", caption: "Form, color and typography. One shared identity.",
    accessible: "SIDE visual system: official logo on a construction grid, purple, black, lavender and white palette, and typography.",
  },
} as const;

export const aiCopy = {
  "pt-BR": {
    service: "Atendimento com IA & gestão",
    description: "Conversas que avançam. WhatsApp, equipe e CRM conectados em uma operação só.",
    territories: "WhatsApp com IA · Atendimento compartilhado · Gestão de equipe · CRM",
    headline: ["Cada conversa.", "Um próximo passo."],
    note: "Da primeira mensagem à pessoa certa. Com contexto em cada etapa.",
    store: "Luma Store", online: "online", typing: "digitando…", today: "Hoje", input: "Mensagem",
    intent: "Intenção identificada", intentValue: "Fone Pulse · Preto", team: "Equipe em sintonia", teamValue: "Bia · Vendas", crm: "Tudo no CRM", crmValue: "Pagamento pendente", next: "Próximo passo: link de pagamento",
    caption: "IA para começar. Pessoas para continuar. Gestão para conectar.",
    messages: [
      { sender: "customer", text: "Oi! Vocês têm fone sem fio?" },
      { sender: "ai", text: "Oi! Sou a assistente de IA da Luma 😊 Temos o Pulse, com até 30h de bateria." },
      { sender: "customer", text: "Legal! Quero um na cor preta." },
      { sender: "ai", text: "Temos sim! Vou passar seu pedido para a Bia finalizar a compra com você." },
      { sender: "human", text: "Oi! Bia aqui 😊 Reservei o Pulse preto. Te envio o link para pagar?" },
    ],
  },
  en: {
    service: "AI customer service & management",
    description: "Conversations that move forward. WhatsApp, your team and CRM in one connected operation.",
    territories: "WhatsApp AI · Shared inbox · Team management · CRM",
    headline: ["Every conversation.", "A next step."],
    note: "From the first message to the right person. With context at every step.",
    store: "Luma Store", online: "online", typing: "typing…", today: "Today", input: "Message",
    intent: "Intent identified", intentValue: "Pulse headphones · Black", team: "Team in sync", teamValue: "Bia · Sales", crm: "All in the CRM", crmValue: "Payment pending", next: "Next step: payment link",
    caption: "AI to start. People to continue. Management to connect.",
    messages: [
      { sender: "customer", text: "Hi! Do you have wireless headphones?" },
      { sender: "ai", text: "Hi! I'm Luma's AI assistant 😊 Our Pulse model has up to 30h of battery life." },
      { sender: "customer", text: "Great! I'd like a pair in black." },
      { sender: "ai", text: "We have them! I'll pass your order to Bia so she can complete your purchase." },
      { sender: "human", text: "Hi! Bia here 😊 I've reserved your black Pulse. Shall I send the payment link?" },
    ],
  },
} as const;
