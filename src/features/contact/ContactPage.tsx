import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { socialMetadata } from "@/lib/seo";
import { ContactFlow } from "./ContactFlow";
import { contactContent } from "./contact-content";

export type ContactPageProps = { params: Promise<{ locale: string }> };

export async function contactMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  const copy = contactContent[locale];
  return {
    title: copy.title, description: copy.description,
    ...socialMetadata({ title: copy.title, description: copy.description, locale, path: locale === "en" ? "/en/contact" : "/contato" }),
    alternates: {
      canonical: locale === "en" ? "/en/contact" : "/contato",
      languages: { "pt-BR": "/contato", en: "/en/contact", "x-default": "/contato" },
    },
  };
}

export async function ContactPage({ params, route }: ContactPageProps & { route: "contato" | "contact" }) {
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  if (locale === "en" && route !== "contact") redirect("/en/contact");
  if (locale === "pt-BR" && route !== "contato") redirect("/contato");
  return <ContactFlow locale={locale} />;
}
