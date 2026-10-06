import { notFound } from "next/navigation";
import { ServicesReview } from "@/features/services/ServicesReview";

export default async function ServicesReviewPage({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  return <ServicesReview locale={locale} />;
}
