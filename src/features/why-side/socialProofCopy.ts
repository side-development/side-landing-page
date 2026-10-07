export type SocialProofEntry = { id: string; text: string; theme: string; context: string };

export const socialProofEmphasis: Record<"pt-BR" | "en", Record<string, string[]>> = {
  "pt-BR": {
    agility: ["muito rápido", "bem resolvido"], assertiveness: ["certeiras", "melhor"],
    quality: ["cuidado", "impecável"], support: ["não ficamos sozinhos", "próximo para ajudar"],
    precision: ["comunicação clara", "execução muito precisa"], partnership: ["do nosso lado", "pensando no problema junto"],
  },
  en: {
    agility: ["quickly", "carefully resolved"], assertiveness: ["spot on", "exceeded"],
    quality: ["care", "impeccable"], support: ["not left on our own", "close by to help"],
    precision: ["clear communication", "precise execution"], partnership: ["on our side", "thinking through the problem with us"],
  },
};

// Editorial copy approved in issue #10. These are not attributed testimonials.
export const socialProofEntries: Record<"pt-BR" | "en", SocialProofEntry[]> = {
  "pt-BR": [
    { id: "agility", theme: "AGILIDADE", context: "EXPERIÊNCIA DIGITAL", text: "Tudo aconteceu muito rápido, mas em nenhum momento pareceu apressado. Cada detalhe chegou bem resolvido." },
    { id: "assertiveness", theme: "ASSERTIVIDADE", context: "LANDING PAGE", text: "Entenderam o que precisávamos quase de primeira. As decisões foram certeiras e o resultado ficou melhor do que imaginávamos." },
    { id: "quality", theme: "QUALIDADE", context: "PRODUTO DIGITAL", text: "O nível de cuidado chamou atenção desde os primeiros detalhes. O resultado final ficou realmente impecável." },
    { id: "support", theme: "SUPORTE", context: "SOFTWARE", text: "O mais importante foi saber que não ficamos sozinhos depois da entrega. Sempre tivemos alguém próximo para ajudar." },
    { id: "precision", theme: "PRECISÃO", context: "EXPERIÊNCIA DIGITAL", text: "Poucas idas e vindas, comunicação clara e uma execução muito precisa. Tudo tinha um motivo para estar ali." },
    { id: "partnership", theme: "PARCERIA", context: "SOLUÇÃO SOB MEDIDA", text: "Não parecia uma relação de cliente e fornecedor. Parecia que havia alguém do nosso lado pensando no problema junto com a gente." },
  ],
  en: [
    { id: "agility", theme: "AGILITY", context: "DIGITAL EXPERIENCE", text: "Everything moved quickly, but never felt rushed. Every detail arrived carefully resolved." },
    { id: "assertiveness", theme: "ASSERTIVENESS", context: "LANDING PAGE", text: "They understood what we needed almost immediately. The decisions were spot on, and the result exceeded what we had imagined." },
    { id: "quality", theme: "QUALITY", context: "DIGITAL PRODUCT", text: "The level of care stood out from the very first details. The final result felt genuinely impeccable." },
    { id: "support", theme: "SUPPORT", context: "SOFTWARE", text: "What mattered most was knowing we were not left on our own after delivery. There was always someone close by to help." },
    { id: "precision", theme: "PRECISION", context: "DIGITAL EXPERIENCE", text: "Very little back and forth, clear communication and extremely precise execution. Everything felt intentional." },
    { id: "partnership", theme: "PARTNERSHIP", context: "CUSTOM SOLUTION", text: "It never felt like a client-vendor relationship. It felt like someone was on our side, thinking through the problem with us." },
  ],
};

export const socialProofCopy = {
  "pt-BR": {
    heading: "O que mais valorizam ao trabalhar com a Side.",
    region: "Percepções editoriais sobre a experiência Side", carousel: "roleta horizontal",
    previous: "Frase anterior", next: "Próxima frase", pause: "Pausar movimento automático", resume: "Retomar movimento automático",
    instructions: "Frases editoriais. Arraste, deslize ou use as teclas de seta para navegar. O movimento é lento e contínuo; pausa durante a interação e em foco. Há um controle para pausar ou retomar.",
    drag: "Arraste", review: "Percepções editoriais da experiência Side.",
  },
  en: {
    heading: "What people value most about working with Side.",
    region: "Editorial perceptions of the Side experience", carousel: "horizontal reel",
    previous: "Previous phrase", next: "Next phrase", pause: "Pause automatic movement", resume: "Resume automatic movement",
    instructions: "Editorial phrases. Drag, swipe or use the arrow keys to navigate. Movement is slow and continuous; it pauses during interaction and on focus. A control lets you pause or resume.",
    drag: "Drag", review: "Editorial perceptions of the Side experience.",
  },
} as const;
