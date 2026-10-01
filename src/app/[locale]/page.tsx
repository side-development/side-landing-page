import { getTranslations } from "next-intl/server";
import { Hero } from "@/features/hero/Hero";

export default async function Home() {
  const t = await getTranslations("FakeError");

  return (
    <Hero copy={{
      heading: t("heading"),
      description: t("description"),
      tryLabel: t("tryLabel"),
      checkConnection: t("checkConnection"),
      checkProxy: t("checkProxy"),
      runDiagnostics: t("runDiagnostics"),
      reload: t("reload"),
      learnMore: t("learnMore"),
    }} />
  );
}
