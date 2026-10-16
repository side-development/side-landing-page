import type { ManifestoLocale } from "./opening-copy";

export const manifestoPaths = { "pt-BR": "/por-que-side", en: "/en/why-side" } as const;

export const manifestoContent = {
  "pt-BR": {
    title: "Por que Side | Side",
    description: "Não do outro lado. Do mesmo lado. Conheça o significado de Side e o que move nossa forma de entender, construir e cuidar de cada projeto.",
    home: "Side — Página inicial",
    skip: "Ir para o manifesto",
    nameTitle: ["Side não é só um nome.", "É uma posição."],
    origin: "De “by your side”.",
    nameText: "Acreditamos que bons projetos nascem quando há proximidade de verdade. Quando alguém entende o problema, participa das decisões e acompanha a construção até o resultado.",
    principlesLabel: "O que significa trabalhar ao lado",
    principles: [
      { action: "Entender", rest: "antes de construir.", text: "Escutar o contexto, os objetivos e as restrições. Fazer as perguntas certas antes de propor uma solução." },
      { action: "Executar", rest: "com intenção.", text: "Decidir com clareza. Conectar cada escolha ao que o projeto precisa e construir com atenção aos detalhes." },
      { action: "Cuidar", rest: "também depois da entrega.", text: "Manter proximidade, comunicação e suporte conforme o escopo do projeto. Acompanhar o que foi construído também faz parte do cuidado." },
    ],
    closingLabel: "O próximo passo, juntos",
    closingTitle: "Grandes ideias não precisam caminhar sozinhas.",
    closingText: "Conte o que você tem em mente. Vamos entender o desafio e construir o caminho ao seu lado.",
    contact: "Começar projeto",
  },
  en: {
    title: "Why Side | Side",
    description: "Not across from you. Right beside you. Discover what Side means and how partnership shapes the way we understand, build and care for every project.",
    home: "Side — Home",
    skip: "Skip to the manifesto",
    nameTitle: ["Side is more than a name.", "It's where we stand."],
    origin: "From “by your side”.",
    nameText: "We believe great work comes from genuine partnership: understanding the challenge, making decisions together, and staying involved from idea to delivery.",
    principlesLabel: "What working beside you means",
    principles: [
      { action: "Understand", rest: "before building.", text: "Listen to the context, goals and constraints. Ask the right questions before proposing a solution." },
      { action: "Build", rest: "with intention.", text: "Make clear decisions. Connect each choice to what the project needs and build with attention to detail." },
      { action: "Care", rest: "beyond delivery.", text: "Stay close through communication and support within the project scope. Looking after what we build is part of the work." },
    ],
    closingLabel: "The next step, together",
    closingTitle: "Big ideas don't have to move forward alone.",
    closingText: "Tell us what you have in mind. Let's understand the challenge and find the way forward, together.",
    contact: "Start a project",
  },
} satisfies Record<ManifestoLocale, unknown>;
