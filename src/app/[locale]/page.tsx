import { getLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/features/hero/Hero";

export default async function Home() {
  const t = await getTranslations("FakeError");
  const h = await getTranslations("Hero");
  const locale = await getLocale();

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
    }} locale={locale} finalCopy={{
      narrative: [h("narrative.0"), h("narrative.1"), h("narrative.2")],
      support: h("support"), signature: h("signature"), work: h("work"),
      services: h("services"), why: h("why"), contact: h("contact"),
      menu: h("menu"), closeMenu: h("closeMenu"), navigation: h("navigation"),
      switchLocale: h("switchLocale"), replay: h("replay"),
    }} />
  );
}
