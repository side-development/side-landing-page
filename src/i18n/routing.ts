import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-BR", "en"],
  defaultLocale: "pt-BR",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
  // Page metadata and the sitemap provide the translated canonical slugs.
  // Automatic Link headers would only prefix the current language's slug.
  alternateLinks: false,
});
