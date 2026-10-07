export type WhySideLocale = "pt-BR" | "en";

export const whySideCopy = {
  "pt-BR": {
    heading: "Por que Side",
    you: "Você",
    values: [
      { id: "agility", label: "Agilidade", description: "Avanço rápido, sem sacrificar qualidade." },
      { id: "precision", label: "Precisão", description: "Decisões assertivas. Execução impecável." },
      { id: "support", label: "Suporte", description: "Presença real antes, durante e depois da entrega." },
      { id: "excellence", label: "Excelência", description: "Trabalho impecável não é excesso. É padrão." },
      { id: "side", label: "Side", description: "Sempre ao seu lado. By your side." },
    ],
  },
  en: {
    heading: "Why Side",
    you: "You",
    values: [
      { id: "agility", label: "Agility", description: "Move fast without sacrificing quality." },
      { id: "precision", label: "Precision", description: "Assertive decisions. Impeccable execution." },
      { id: "support", label: "Support", description: "Real presence before, during and after delivery." },
      { id: "excellence", label: "Excellence", description: "Impeccable work is not excess. It is the standard." },
      { id: "side", label: "Side", description: "Always by your side." },
    ],
  },
} as const;
