import { useI18n } from "@/lib/i18n";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription,
} from "@/components/ui/dialog";

export type Product = {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  is_visible: boolean;
  sort_order: number;
};

export function ProductCard({ p }: { p: Product }) {
  const { t, lang } = useI18n();
  const name = lang === "ar" ? p.name_ar : p.name_en;
  const desc = lang === "ar" ? p.description_ar : p.description_en;

  return (
    <Dialog>
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {p.image_url ? (
            <img
              src={p.image_url}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <Coffee className="h-12 w-12" />
            </div>
          )}
          {!p.is_available && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm text-sm">
              {t("unavailable")}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl">{name}</h3>
            <span className="shrink-0 font-display text-lg text-accent">
              {p.price} <span className="text-xs text-muted-foreground">{t("sar")}</span>
            </span>
          </div>
          {desc && <p className="line-clamp-2 text-sm text-muted-foreground">{desc}</p>}
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-auto rounded-full">
              {t("view_details")}
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{name}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        {p.image_url && (
          <img src={p.image_url} alt={name} className="w-full rounded-lg aspect-[4/3] object-cover" />
        )}
        <div className="flex items-center justify-between pt-2">
          <span className="font-display text-2xl text-accent">{p.price} {t("sar")}</span>
          {!p.is_available && <span className="text-sm text-muted-foreground">{t("unavailable")}</span>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
