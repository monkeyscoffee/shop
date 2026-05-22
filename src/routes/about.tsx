import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { settingsQuery } from "@/lib/settings";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Monkeys Coffee" }, { name: "description", content: "Our story, our craft." }] }),
  component: About,
});

function About() {
  const { t, lang } = useI18n();
  const { data: s } = useQuery(settingsQuery());
  const p1 = lang === "ar" ? (s?.about_ar ?? t("about_body")) : (s?.about_en ?? t("about_body"));
  const p2 = lang === "ar" ? (s?.about_p2_ar ?? t("about_p2")) : (s?.about_p2_en ?? t("about_p2"));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">{t("about_eyebrow")}</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{t("about_title")}</h1>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>
        <img src={logo} alt="" className="mx-auto my-12 h-44 w-44 rounded-full shadow-[var(--shadow-soft)]" />
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground text-center max-w-2xl mx-auto whitespace-pre-line">
          <p>{p1}</p>
          {p2 && <p>{p2}</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
}
