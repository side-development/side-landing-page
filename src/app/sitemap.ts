import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routePairs = [
  { "pt-BR": "/", en: "/en" },
  { "pt-BR": "/trabalhos", en: "/en/work" },
  { "pt-BR": "/servicos", en: "/en/services" },
  { "pt-BR": "/por-que-side", en: "/en/why-side" },
  { "pt-BR": "/contato", en: "/en/contact" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routePairs.flatMap(paths => {
    const languages = {
      "pt-BR": new URL(paths["pt-BR"], SITE_URL).href,
      en: new URL(paths.en, SITE_URL).href,
      "x-default": new URL(paths["pt-BR"], SITE_URL).href,
    };

    return [paths["pt-BR"], paths.en].map(path => ({
      url: new URL(path, SITE_URL).href,
      alternates: { languages },
    }));
  });
}
