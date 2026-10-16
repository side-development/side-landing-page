import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { socialMetadata } from "@/lib/seo";
import { WhySideExperience } from "./WhySideExperience";
import { ManifestoChapters } from "./ManifestoChapters";
import { manifestoContent, manifestoPaths } from "./manifesto-content";

export type WhySidePageProps = { params: Promise<{ locale: string }> };

export async function whySideMetadata({ params }: WhySidePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  const copy = manifestoContent[locale];
  return {
    title: copy.title,
    description: copy.description,
    ...socialMetadata({ title: copy.title, description: copy.description, locale, path: manifestoPaths[locale] }),
    alternates: {
      canonical: manifestoPaths[locale],
      languages: { ...manifestoPaths, "x-default": manifestoPaths["pt-BR"] },
    },
  };
}

export async function WhySidePage({ params, route }: WhySidePageProps & { route: "por-que-side" | "why-side" }) {
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  if ((locale === "en") !== (route === "why-side")) redirect(manifestoPaths[locale]);
  const h = await getTranslations({ locale, namespace: "Hero" });
  return <WhySideExperience locale={locale} nav={{ work: h("work"), services: h("services"), why: h("why"), contact: h("contact"), menu: h("menu"), closeMenu: h("closeMenu"), navigation: h("navigation") }}>
    <ManifestoChapters locale={locale} />
  </WhySideExperience>;
}
