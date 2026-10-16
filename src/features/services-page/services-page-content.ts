export type ServicesLocale = "pt-BR" | "en";
export type ServiceId = "websites" | "identity" | "software" | "ai" | "integrations";
export type Service = {
  id: ServiceId;
  name: string;
  summary: string;
  problem: string;
  deliverables: readonly string[];
  outcome: string;
};
type FiveServices = readonly [Service, Service, Service, Service, Service];

export const servicesPageContent = {
  "pt-BR": {
    title: "Serviços | Side",
    description: "Sites, marcas, software, atendimento com IA e integrações. Conheça o que a Side pode construir para o seu negócio.",
    heading: "Serviços",
    intro: "Design, software e tecnologia para transformar necessidades reais em experiências e produtos que funcionam.",
    deliverables: "O que podemos entregar",
    outcome: "Para o seu negócio",
    home: "Side — Página inicial",
    skip: "Ir para os serviços",
    services: [
      { id: "websites", name: "Sites & experiências digitais", summary: "Sites que representam a qualidade do seu negócio e transformam atenção em ação.", problem: "Seu negócio evoluiu. A sua presença digital precisa acompanhar — e deixar claro por que escolher você.", deliverables: ["Landing pages", "Sites institucionais", "Portfólios", "Experiências interativas"], outcome: "Uma presença com identidade, uma mensagem clara e um caminho simples até o próximo passo." },
      { id: "identity", name: "Identidade visual & marcas", summary: "Uma identidade que traduz quem você é. E faz sua marca ser reconhecida.", problem: "Sua marca tem uma história própria, mas a forma como ela aparece ainda não comunica isso com consistência.", deliverables: ["Estratégia de marca", "Logotipo", "Sistema visual", "Direção de arte"], outcome: "Uma linguagem própria para se apresentar com clareza e manter a marca coerente em cada ponto de contato." },
      { id: "software", name: "Produtos & software", summary: "Software pensado para simplificar processos, organizar informação e acompanhar a operação.", problem: "Planilhas e ferramentas isoladas já não acompanham a rotina. Ou uma ideia de produto precisa sair do papel.", deliverables: ["Plataformas", "Dashboards", "Sistemas internos", "Produtos digitais"], outcome: "Informação organizada e fluxos pensados para as pessoas que usam o produto todos os dias." },
      { id: "ai", name: "Atendimento com IA & gestão", summary: "Conversas que avançam. WhatsApp, equipe e CRM conectados em uma operação só.", problem: "Mensagens espalhadas, tarefas repetitivas e contexto perdido entre pessoas dificultam a continuidade do atendimento.", deliverables: ["IA para WhatsApp", "Atendimento compartilhado", "Gestão de equipe", "Integração com CRM"], outcome: "Mais continuidade entre conversas, equipe e próximos passos. A automação apoia as pessoas, com escopo e integrações definidos para a sua operação." },
      { id: "integrations", name: "Integrações & soluções sob medida", summary: "Quando o problema não cabe em uma categoria, construímos a solução ao redor dele.", problem: "Ferramentas que não conversam, tarefas manuais ou uma necessidade que as soluções prontas não atendem.", deliverables: ["Integrações", "Automações", "MCPs", "Ferramentas internas", "MVPs"], outcome: "Conectar o que você já usa e construir o que falta, com uma solução do tamanho da necessidade." },
    ] satisfies FiveServices,
  },
  en: {
    title: "Services | Side",
    description: "Websites, brands, software, AI customer service and integrations. Explore what Side can build for your business.",
    heading: "Services",
    intro: "Design, software and technology turning real needs into experiences and products that work.",
    deliverables: "What we can deliver",
    outcome: "For your business",
    home: "Side — Home",
    skip: "Skip to services",
    services: [
      { id: "websites", name: "Websites & digital experiences", summary: "Websites that reflect the quality of your business and turn attention into action.", problem: "Your business has evolved. Your digital presence should keep up — and make it clear why people should choose you.", deliverables: ["Landing pages", "Corporate websites", "Portfolios", "Interactive experiences"], outcome: "A distinctive presence, a clear message and a simple path to the next step." },
      { id: "identity", name: "Visual identity & brands", summary: "An identity that expresses who you are. And makes your brand recognizable.", problem: "Your brand has a story of its own, but the way it shows up doesn't yet communicate it consistently.", deliverables: ["Brand strategy", "Logo design", "Visual system", "Art direction"], outcome: "A distinctive visual language that brings clarity and consistency to every point of contact." },
      { id: "software", name: "Products & software", summary: "Software designed to simplify processes, organize information and keep operations moving.", problem: "Spreadsheets and disconnected tools no longer fit your day-to-day work. Or a product idea needs to take shape.", deliverables: ["Platforms", "Dashboards", "Internal systems", "Digital products"], outcome: "Organized information and workflows built around the people who use the product every day." },
      { id: "ai", name: "AI customer service & management", summary: "Conversations that move forward. WhatsApp, your team and CRM in one connected operation.", problem: "Scattered messages, repetitive tasks and context lost between people make it hard to keep conversations moving.", deliverables: ["WhatsApp AI", "Shared inbox", "Team management", "CRM integration"], outcome: "Continuity across conversations, people and next steps. Automation supports your team, with scope and integrations defined for your operation." },
      { id: "integrations", name: "Integrations & custom solutions", summary: "When the problem doesn't fit a category, we build the solution around it.", problem: "Tools that don't talk to each other, manual tasks or a need that off-the-shelf products can't meet.", deliverables: ["Integrations", "Automations", "MCPs", "Internal tools", "MVPs"], outcome: "Connect what you already use and build what's missing, with a solution sized to your needs." },
    ] satisfies FiveServices,
  },
} as const;

export type ServicesPageContent = (typeof servicesPageContent)[ServicesLocale];
