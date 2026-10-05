export type TerminalLocale = "pt-BR" | "en";

export const terminalCopy = {
  "pt-BR": {
    service: "Integrações & soluções sob medida",
    description: "Quando o problema não cabe em uma categoria, conectamos ferramentas, automatizamos fluxos e construímos a solução ao redor dele.",
    territories: "Integrações · Automações · MCPs · Ferramentas internas · MVPs",
    final: "Você já tem acesso a tudo o que precisa.",
    replay: "Rever terminal",
    accessible: "Demonstração editorial de um terminal com servidores MCP conectados. Não é uma conexão real.",
    dashboard: "Dashboard aprovado",
  },
  en: {
    service: "Integrations & custom solutions",
    description: "When the problem does not fit a category, we connect tools, automate workflows and build the solution around it.",
    territories: "Integrations · Automations · MCPs · Internal tools · MVPs",
    final: "You already have access to everything you need.",
    replay: "Replay terminal",
    accessible: "An editorial terminal demonstration with connected MCP servers. This is not a live connection.",
    dashboard: "Approved dashboard",
  },
} as const;

// Editorial representation based on Claude Code commands; no real process or MCP connection.
export function terminalTranscript(locale: TerminalLocale) {
  return `$ claude\n\n> /mcp\n\nMCP servers\n  side        connected\n  github      connected\n  figma       connected\n\n✓ MCP side connected\n✓ context ready\n✓ tools available\n\n> ${terminalCopy[locale].final}`;
}
