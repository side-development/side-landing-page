export type ContactLocale = "pt-BR" | "en";
export const projectTypes = ["website", "product", "automation", "unsure"] as const;
export const projectStages = ["idea", "evolve", "development", "urgent"] as const;
export const projectTimings = ["asap", "weeks", "months", "undecided"] as const;
export type ContactAnswers = {
  name: string;
  type: string;
  stage: string;
  goal: string;
  timing: string;
  email: string;
};
export const contactFields = ["name", "type", "stage", "goal", "timing", "email"] as const;
export type ContactField = typeof contactFields[number];
export const emptyAnswers: ContactAnswers = { name: "", type: "", stage: "", goal: "", timing: "", email: "" };
export const choiceValues: Partial<Record<ContactField, readonly string[]>> = {
  type: projectTypes, stage: projectStages, timing: projectTimings,
};
const customPrefix = "custom:";
export const customChoice = (text: string) => customPrefix + text;
export const customChoiceText = (value: string) => value.startsWith(customPrefix) ? value.slice(customPrefix.length) : null;

export const contactContent = {
  "pt-BR": {
    title: "Vamos construir o próximo. | Side",
    description: "Conte sua ideia à Side em seis perguntas rápidas. Vamos construir o próximo, juntos.",
    close: "Voltar à Home", back: "Voltar", eyebrow: "SEU PRÓXIMO PROJETO",
    estimate: "Uma ideia. Um minuto. Um começo.",
    questions: {
      name: "Como podemos te chamar?",
      type: "O que você tem em mente?",
      stage: "Onde esse projeto está hoje?",
      goal: "O que precisa mudar quando terminarmos?",
      timing: "Quando você gostaria de colocar isso no mundo?",
      email: "Onde continuamos essa conversa?",
    },
    placeholders: {
      name: "Seu nome e sobrenome", goal: "Seu objetivo…", email: "Seu melhor email",
    },
    choices: {
      type: ["Site ou experiência digital", "Produto ou software", "Integração ou automação", "Ainda não sei exatamente"],
      stage: ["É só uma ideia", "Já existe, mas precisa evoluir", "Já temos algo em desenvolvimento", "Precisamos começar praticamente agora"],
      timing: ["O quanto antes", "Nas próximas semanas", "Nos próximos meses", "Ainda não temos uma data"],
    },
    customPlaceholder: "Ou escreva aqui…", customLabel: "Outra resposta",
    errors: {
      name: "Conta pra gente como você se chama.", type: "Escolha uma opção ou conte sua ideia com suas palavras.",
      stage: "Escolha uma opção ou descreva onde o projeto está.", goal: "Conte, em poucas palavras, o que você quer alcançar.",
      timing: "Escolha uma opção ou conte o prazo que faz sentido pra você.", email: "Confira seu email para continuarmos a conversa.",
    },
    confirm: "OK", send: "Enviar projeto", sending: "Enviando…", enter: "PRESSIONE ENTER",
    choose: "USE OS NÚMEROS PARA ESCOLHER", multiline: "SHIFT + ENTER PARA UMA NOVA LINHA",
    progress: "Pergunta", of: "de", privacy: "Usaremos seu email apenas para conversar sobre seu projeto.",
    unavailable: "O envio está indisponível por enquanto. Suas respostas continuam aqui. Você também pode falar com a gente em contato@sidecode.com.br.",
    failed: "Não conseguimos confirmar o envio. Suas respostas estão salvas nesta tela. Tente novamente em instantes.",
    limited: "Vamos dar um instante? Aguarde um minuto e tente enviar novamente.",
    successLabel: "PROJETO ENVIADO", successTitle: "Recebemos.", successNext: "Agora é com a gente.",
    successBody: "Vamos analisar o que você compartilhou e continuar essa conversa por perto.",
    signature: "Sempre ao seu lado.", returnHome: "Voltar à Home",
  },
  en: {
    title: "Let’s build what’s next. | Side",
    description: "Tell Side about your idea in six quick questions. Let’s build what’s next, together.",
    close: "Back to home", back: "Back", eyebrow: "YOUR NEXT PROJECT",
    estimate: "One idea. One minute. A new beginning.",
    questions: {
      name: "What should we call you?", type: "What do you have in mind?",
      stage: "Where is the project today?", goal: "What should change when we’re done?",
      timing: "When would you like to put this into the world?", email: "Where can we keep talking?",
    },
    placeholders: { name: "Your first and last name", goal: "Your goal…", email: "Your best email" },
    choices: {
      type: ["Website or digital experience", "Product or software", "Integration or automation", "I’m not sure yet"],
      stage: ["It’s still an idea", "It exists, but needs to evolve", "We’re already developing something", "We need to get started right away"],
      timing: ["As soon as possible", "In the next few weeks", "In the next few months", "We don’t have a date yet"],
    },
    customPlaceholder: "Or write your own…", customLabel: "Another answer",
    errors: {
      name: "Tell us what we should call you.", type: "Choose an option or describe your idea in your own words.",
      stage: "Choose an option or tell us where the project stands.", goal: "Tell us, in a few words, what you’d like to achieve.",
      timing: "Choose an option or tell us the timing that works for you.", email: "Check your email so we can keep the conversation going.",
    },
    confirm: "OK", send: "Send project", sending: "Sending…", enter: "PRESS ENTER",
    choose: "USE THE NUMBERS TO CHOOSE", multiline: "SHIFT + ENTER FOR A NEW LINE",
    progress: "Question", of: "of", privacy: "We’ll only use your email to talk about your project.",
    unavailable: "Sending is unavailable for now. Your answers are still here. You can also reach us at contato@sidecode.com.br.",
    failed: "We couldn’t confirm your submission. Your answers are still on this screen. Please try again shortly.",
    limited: "Let’s give it a moment. Please wait a minute and try sending again.",
    successLabel: "PROJECT SENT", successTitle: "Got it.", successNext: "We’ll take it from here.",
    successBody: "We’ll look through what you shared and be in touch to keep the conversation going.",
    signature: "Always by your side.", returnHome: "Back to home",
  },
};

export function validContactField(field: ContactField, value: string) {
  const choices = choiceValues[field];
  if (choices) {
    const custom = customChoiceText(value)?.trim();
    return choices.includes(value) || (!!custom && custom.length <= 500 && !/[\r\n]/.test(custom));
  }
  const trimmed = value.trim();
  if (field === "name") return trimmed.length > 0 && trimmed.length <= 120 && !/[\r\n]/.test(trimmed);
  if (field === "goal") return trimmed.length > 0 && trimmed.length <= 2000;
  return trimmed.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}
