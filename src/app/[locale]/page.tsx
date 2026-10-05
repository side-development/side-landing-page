import { getLocale, getTranslations } from "next-intl/server";
import { HomeExperience } from "@/features/home/HomeExperience";

export default async function Home() {
  const t = await getTranslations("FakeError");
  const h = await getTranslations("Hero");
  const w = await getTranslations("SelectedWork");
  const locale = await getLocale();

  return (
    <HomeExperience errorCopy={{
      heading: t("heading"),
      description: t("description"),
      tryLabel: t("tryLabel"),
      checkConnection: t("checkConnection"),
      checkProxy: t("checkProxy"),
      runDiagnostics: t("runDiagnostics"),
      reload: t("reload"),
      learnMore: t("learnMore"),
    }} heroCopy={{
      narrative: [h("narrative.0"), h("narrative.1"), h("narrative.2")],
      emphasis: [h("emphasis.0"), h("emphasis.1"), h("emphasis.2")],
      support: h("support"), signature: h("signature"), work: h("work"),
      services: h("services"), why: h("why"), contact: h("contact"),
      menu: h("menu"), closeMenu: h("closeMenu"), navigation: h("navigation"),
      replay: h("replay"),
    }} workCopy={{
      heading: w("heading"), count: w("count"), view: w("view"), all: w("all"),
      allHref: locale === "en" ? "/en/work" : "/trabalhos",
      route: { name: "Route Security", category: w("route.category"), teaser: w("route.teaser") },
      owl: { name: "OWL", category: w("owl.category"), teaser: w("owl.teaser") },
    }} />
  );
}
