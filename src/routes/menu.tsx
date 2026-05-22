import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { productsQuery } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [{ title: "Menu — Monkeys Coffee" }, { name: "description", content: "Browse our specialty coffee menu." }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery()),
  component: MenuPage,
});

function MenuPage() {
  const { t } = useI18n();
  const { data } = useSuspenseQuery(productsQuery());
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">{t("menu_eyebrow")}</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{t("menu_title")}</h1>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
