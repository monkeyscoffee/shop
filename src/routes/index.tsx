import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Coffee, Leaf, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { productsQuery } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery()),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const { data: products } = useSuspenseQuery(productsQuery());
  const featured = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 lg:pt-32 lg:pb-40 text-center fade-up">
          <img src={logo} alt="" className="mx-auto mb-8 h-32 w-32 rounded-full shadow-[var(--shadow-soft)]" />
          <p className="text-xs uppercase tracking-[0.4em] text-accent">{t("tagline")}</p>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl text-balance leading-[1.05]">
            {t("hero_title_1")}<br />
            <span className="italic text-accent">{t("hero_title_2")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-balance">
            {t("hero_sub")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 h-12">
              <Link to="/menu">{t("hero_cta")} <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12">
              <Link to="/contact">{t("hero_secondary")}</Link>
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-3 max-w-2xl mx-auto gap-6 text-sm">
            {[
              { icon: Coffee, label: t("brand") },
              { icon: Leaf, label: "Single Origin" },
              { icon: Award, label: "Est. 2023" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-muted-foreground">
                <f.icon className="h-5 w-5 text-accent" />
                <span className="text-xs tracking-widest uppercase">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">{t("featured_eyebrow")}</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{t("featured_title")}</h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
          <p className="mt-4 text-muted-foreground">{t("featured_sub")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/menu">{t("view_full_menu")} <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
