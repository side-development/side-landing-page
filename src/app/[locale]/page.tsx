import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionProbe } from "@/components/MotionProbe";
import styles from "./page.module.css";

export default async function Home() {
  const t = await getTranslations("Home");
  const locale = await getLocale();

  return (
    <main className={styles.home}>
      <MotionProbe />
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link href="/" locale={locale === "en" ? "pt-BR" : "en"}>
        {t("otherLocale")}
      </Link>
    </main>
  );
}
