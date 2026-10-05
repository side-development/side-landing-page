export type TerminalLocale = "pt-BR" | "en";

export const terminalCopy = {
  "pt-BR": {
    service: "Integrações & soluções sob medida",
    description: "Quando o problema não cabe em uma categoria, conectamos ferramentas, automatizamos fluxos e construímos a solução ao redor dele.",
    territories: "Integrações · Automações · MCPs · Ferramentas internas · MVPs",
    replay: "Rever terminal",
    accessible: "Representação editorial da abertura do Claude Code com Side MCP conectado. Não é uma conexão real.",
    dashboard: "Dashboard aprovado",
  },
  en: {
    service: "Integrations & custom solutions",
    description: "When the problem does not fit a category, we connect tools, automate workflows and build the solution around it.",
    territories: "Integrations · Automations · MCPs · Internal tools · MVPs",
    replay: "Replay terminal",
    accessible: "An editorial Claude Code welcome screen with Side MCP connected. This is not a live connection.",
    dashboard: "Approved dashboard",
  },
} as const;

export const terminalScreenCopy = {
  lastLogin: "Last login: Mon Mar 9 14:26:11 on ttys014",
  welcome: "Welcome back, developer!",
  environment: "Opus 5.5 · API Usage Billing · Side",
  userDirectory: "/Users/developer",
  tips: "Tips for getting started",
  init: "Run /init to create a CLAUDE.md file",
  note: "Note: You have launched Claude Code",
  recent: "Recent activity",
  noActivity: "No recent activity",
  manage: "Manage MCP servers",
  serverCount: "1 server",
  userMcps: "User MCPs",
  connected: "connected",
  help: "for help",
  keys: ["↑↓ to navigate", "Enter to confirm", "Esc to cancel"],
} as const;

// Editorial reproduction of the referenced welcome screen; no real process or MCP connection.
export function terminalTranscript() {
  const copy = terminalScreenCopy;
  return `${copy.lastLogin}\n→ ~ claude\n\nClaude Code v2.1.72\n${copy.welcome}\n${copy.environment}\n${copy.userDirectory}\n\n${copy.tips}\n${copy.init}\n${copy.note}\n${copy.recent}\n${copy.noActivity}\n\n> /mcp\n\n${copy.manage}\n${copy.serverCount}\n${copy.userMcps} (${copy.userDirectory}/.claude.json)\n› side mcp · ✓ ${copy.connected}\n\nhttps://code.claude.com/docs/en/mcp ${copy.help}\n${copy.keys.join(" · ")}`;
}
