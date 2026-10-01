import { getTranslations } from "next-intl/server";
import { Hero } from "@/features/hero/Hero";

export default async function Home() {
  const t = await getTranslations("FakeError");

  return (
    <Hero copy={{
      heading: t("heading"),
      description: t("description"),
      reload: t("reload"),
    }} />
  );
}
