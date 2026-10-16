import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { socialMetadata } from "@/lib/seo";
import { ServicesExperience } from "./ServicesExperience";
import { servicesPageContent } from "./services-page-content";

export type ServicesPageProps = { params: Promise<{ locale: string }> };
const paths = { "pt-BR": "/servicos", en: "/en/services" } as const;

export async function servicesMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  const copy = servicesPageContent[locale];
  return {
    title: copy.title,
    description: copy.description,
    ...socialMetadata({ title: copy.title, description: copy.description, locale, path: paths[locale] }),
    alternates: {
      canonical: paths[locale],
      languages: { "pt-BR": paths["pt-BR"], en: paths.en, "x-default": paths["pt-BR"] },
    },
  };
}

export async function ServicesPage({ params, route }: ServicesPageProps & { route: "servicos" | "services" }) {
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  if ((locale === "en") !== (route === "services")) redirect(paths[locale]);
  const h = await getTranslations({ locale, namespace: "Hero" });
  return <ServicesExperience locale={locale} nav={{ work: h("work"), services: h("services"), why: h("why"), contact: h("contact"), menu: h("menu"), closeMenu: h("closeMenu"), navigation: h("navigation") }} />;
}
