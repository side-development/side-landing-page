import { getTranslations } from "next-intl/server";
import { Hero } from "@/features/hero/Hero";

export default async function Home() {
  const t = await getTranslations("FakeError");
  const h = await getTranslations("Hero");

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
    }} finalCopy={{
      narrative: [h("narrative.0"), h("narrative.1"), h("narrative.2")],
      emphasis: [h("emphasis.0"), h("emphasis.1"), h("emphasis.2")],
      support: h("support"), signature: h("signature"), work: h("work"),
      services: h("services"), why: h("why"), contact: h("contact"),
      menu: h("menu"), closeMenu: h("closeMenu"), navigation: h("navigation"),
      replay: h("replay"),
    }} />
  );
}
