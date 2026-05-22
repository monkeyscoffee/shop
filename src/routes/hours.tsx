import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/hours")({
  head: () => ({ meta: [{ title: "Hours — Monkeys Coffee" }, { name: "description", content: "Opening hours." }] }),
  component: Hours,
});

function Hours() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">{t("hours_eyebrow")}</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{t("hours_title")}</h1>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>
        <div className="rounded-xl border border-border bg-card p-8 space-y-6">
          {[
            { day: t("hours_weekdays"), time: t("hours_weekdays_time") },
            { day: t("hours_friday"), time: t("hours_friday_time") },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent" />
                <span className="font-display text-xl">{r.day}</span>
              </div>
              <span className="font-display text-lg text-muted-foreground">{r.time}</span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
