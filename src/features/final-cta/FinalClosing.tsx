import { FinalCta } from "./FinalCta";
import { FinalFooter } from "./FinalFooter";

export function FinalClosing({ locale, active = true }: { locale: "pt-BR" | "en"; active?: boolean }) {
  return <div hidden={!active} data-final-closing>
    <FinalCta locale={locale} active={active} />
    <FinalFooter locale={locale} />
  </div>;
}
