import logo from "@/assets/logo.jpg";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col items-center gap-4 text-center">
        <img src={logo} alt="" className="h-14 w-14 rounded-full" />
        <div className="font-display tracking-[0.3em] uppercase">{t("brand")}</div>
        <div className="gold-divider w-32" />
        <p className="text-sm text-muted-foreground">{t("tagline")}</p>
        <p className="text-xs text-muted-foreground/70">© {new Date().getFullYear()} · {t("footer_rights")}</p>
      </div>
    </footer>
  );
}
