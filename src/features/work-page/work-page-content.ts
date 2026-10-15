import type { WorkLocale } from "./projects";

export const workPageContent = {
  "pt-BR": {
    title: "Trabalhos | Side",
    description: "Uma seleção dos projetos da Side: de experiências públicas a sistemas que operam nos bastidores.",
    heading: "Trabalhos",
    intro: "Entre experiências públicas e sistemas que operam nos bastidores, esta é uma seleção do nosso trabalho.",
    openCase: "Abrir case",
    openCaseCursor: "abrir case",
    closeCase: "Fechar case",
    escHint: "ESC",
    previous: "Folha anterior",
    next: "Próxima folha",
    gallery: (name: string) => `Galeria do projeto ${name}`,
    slide: (position: number, total: number) => `Folha ${position} de ${total}`,
    projectIndex: (position: number) => `Projeto ${position}`,
    home: "Side — Página inicial",
    skip: "Ir para os projetos",
    challenge: "O Desafio",
    solution: "O que construímos",
    selectedMedia: "Mídia em destaque",
    impact: "Resultado & Impacto",
    scope: "Escopo de entrega",
    confidentialBadge: "Confidencial",
    publicBadge: "Público",
    nextCase: "Próximo case",
    prevCase: "Case anterior",
    backToWork: "Voltar para Trabalhos",
    caseOverlayLabel: (name: string) => `Case editorial do projeto ${name}`,
    onThisPage: "Neste case",
    overview: "Visão Geral",
    backToTop: "Voltar ao topo",
    casesNav: "Projetos Selecionados",
    copyLink: "Copiar link",
    linkCopied: "Link copiado!",
  },
  en: {
    title: "Work | Side",
    description: "A selection of Side's projects: from public experiences to systems operating behind the scenes.",
    heading: "Work",
    intro: "From public experiences to systems operating behind the scenes, this is a selection of our work.",
    openCase: "Open case",
    openCaseCursor: "open case",
    closeCase: "Close case",
    escHint: "ESC",
    previous: "Previous sheet",
    next: "Next sheet",
    gallery: (name: string) => `${name} project gallery`,
    slide: (position: number, total: number) => `Sheet ${position} of ${total}`,
    projectIndex: (position: number) => `Project ${position}`,
    home: "Side — Home",
    skip: "Skip to projects",
    challenge: "The Challenge",
    solution: "What We Built",
    selectedMedia: "Selected Media",
    impact: "Outcome & Impact",
    scope: "Scope of Work",
    confidentialBadge: "Confidential",
    publicBadge: "Public",
    nextCase: "Next case",
    prevCase: "Previous case",
    backToWork: "Back to Work",
    caseOverlayLabel: (name: string) => `Editorial case study for ${name}`,
    onThisPage: "On this page",
    overview: "Overview",
    backToTop: "Back to top",
    casesNav: "Selected Projects",
    copyLink: "Copy link",
    linkCopied: "Link copied!",
  },
} satisfies Record<WorkLocale, unknown>;

export type WorkPageContent = (typeof workPageContent)[WorkLocale];

export type WorkNavCopy = {
  work: string;
  services: string;
  why: string;
  contact: string;
  menu: string;
  closeMenu: string;
  navigation: string;
};
