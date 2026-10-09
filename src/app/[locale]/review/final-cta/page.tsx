import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhySideReview } from "@/features/why-side/WhySideReview";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function FinalCtaReviewPage({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  return <WhySideReview locale={locale} finalCta />;
}
