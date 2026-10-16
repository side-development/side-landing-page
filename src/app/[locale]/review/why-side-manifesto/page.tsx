import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManifestoPrototype } from "@/features/why-side-page/ManifestoPrototype";

export const metadata: Metadata = {
  title: "Why Side — estudo de movimento",
  robots: { index: false, follow: false },
};

// Deliberately isolated until the signature scene receives visual approval.
export default async function ManifestoReview({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  return <ManifestoPrototype locale={locale} />;
}
