import { notFound } from "next/navigation";
import { DashboardReview } from "@/features/services/DashboardReview";

export default async function ServicesReview({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { locale } = await params;
  if (locale !== "pt-BR" && locale !== "en") notFound();
  return <DashboardReview locale={locale} />;
}
