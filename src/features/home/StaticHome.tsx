import { BrandWordmark } from "@/features/hero/BrandWordmark";
import styles from "./home.module.css";

// Localized content and navigation remain available without hydration.
export function StaticHome({ english, description }: { english: boolean; description: string }) {
  const paths = english
    ? [["Work", "/en/work"], ["Services", "/en/services"], ["Why Side", "/en/why-side"], ["Contact", "/en/contact"], ["Português", "/"]]
    : [["Trabalhos", "/trabalhos"], ["Serviços", "/servicos"], ["Por que Side", "/por-que-side"], ["Contato", "/contato"], ["English", "/en"]];
  return <noscript>
    <style>{"#home-top { display: none !important; }"}</style>
    <main className={styles.staticHome}>
      <h1 aria-label="Side"><BrandWordmark /></h1>
      <p>{description}</p>
      <nav aria-label={english ? "Main navigation" : "Navegação principal"}>{paths.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a href="mailto:contato@sidecode.com.br">contato@sidecode.com.br</a>
    </main>
  </noscript>;
}
