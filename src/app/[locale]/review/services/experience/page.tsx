import { notFound } from "next/navigation";
import { DigitalExperienceReview } from "@/features/services/DigitalExperienceReview";

export default async function DigitalExperienceReviewPage({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  return <DigitalExperienceReview locale={locale} />;
}
