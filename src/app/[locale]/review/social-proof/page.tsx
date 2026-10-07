import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SocialProofReview } from "@/features/why-side/SocialProofReview";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function SocialProofReviewPage({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  return <SocialProofReview locale={locale} />;
}
