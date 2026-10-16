import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { socialMetadata } from "@/lib/seo";
import { WorkExperience } from "./WorkExperience";
import { workPageContent } from "./work-page-content";

export type WorkPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const paths = { "pt-BR": "/trabalhos", en: "/en/work" } as const;

export async function workMetadata({ params }: Pick<WorkPageProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  const copy = workPageContent[locale];
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

/**
 * The same page lives under both slugs (like Contact). The wrong slug for a locale
 * redirects to the right one and keeps ?case= so shared links survive.
 */
export async function WorkPage({ params, searchParams, route }: WorkPageProps & { route: "trabalhos" | "work" }) {
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  const query = await searchParams;
  const slug = Array.isArray(query.case) ? query.case[0] : query.case;
  if ((locale === "en") !== (route === "work")) redirect(`${paths[locale]}${slug ? `?case=${encodeURIComponent(slug)}` : ""}`);

  const h = await getTranslations({ locale, namespace: "Hero" });
  return (
    <WorkExperience
      locale={locale}
      initialCase={slug}
      nav={{
        work: h("work"),
        services: h("services"),
        why: h("why"),
        contact: h("contact"),
        menu: h("menu"),
        closeMenu: h("closeMenu"),
        navigation: h("navigation"),
      }}
    />
  );
}
