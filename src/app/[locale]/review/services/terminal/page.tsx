import { notFound } from "next/navigation";
import { TerminalReview } from "@/features/services/TerminalReview";

export default async function TerminalReviewPage({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  return <TerminalReview locale={locale} />;
}
