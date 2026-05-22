import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Upload } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { productsQuery } from "@/lib/products";
import { settingsQuery, type SiteSettings } from "@/lib/settings";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import type { Product } from "@/components/ProductCard";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Dashboard — Monkeys" }] }),
  component: AdminPage,
});

type Draft = Partial<Product> & { file?: File | null };

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: products = [] } = useQuery(productsQuery({ adminAll: true }));
  const [editing, setEditing] = useState<Draft | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading) return <div className="p-10 text-center">…</div>;
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-md px-6 py-20 text-center">
          <h1 className="font-display text-3xl">⛔</h1>
          <p className="mt-4 text-muted-foreground">
            Your account is not an admin yet. Ask an existing admin to promote it, or — for the first admin — open the backend (Cloud → Database → user_roles) and set this user's role to <code>admin</code>.
          </p>
        </div>
      </div>
    );
  }

  const refresh = () => qc.invalidateQueries({ queryKey: ["products"] });

  const move = async (p: Product, dir: -1 | 1) => {
    const idx = products.findIndex((x) => x.id === p.id);
    const swap = products[idx + dir];
    if (!swap) return;
    await supabase.from("products").update({ sort_order: swap.sort_order }).eq("id", p.id);
    await supabase.from("products").update({ sort_order: p.sort_order }).eq("id", swap.id);
    refresh();
  };

  const toggleVisible = async (p: Product) => {
    await supabase.from("products").update({ is_visible: !(p as any).is_visible }).eq("id", p.id);
    refresh();
  };

  const remove = async (p: Product) => {
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else { toast.success(t("deleted")); refresh(); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl">{t("admin_title")}</h1>
          <Button onClick={() => setEditing({ price: 0, sort_order: (products.at(-1)?.sort_order ?? 0) + 1, is_visible: true, is_available: true })} className="rounded-full">
            <Plus className="me-2 h-4 w-4" /> {t("admin_add")}
          </Button>
        </div>

        <div className="space-y-3">
          {products.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                {p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg truncate">{p.name_en} · {p.name_ar}</div>
                <div className="text-sm text-muted-foreground">{p.price} {t("sar")}</div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" onClick={() => move(p, -1)} disabled={i === 0}><ArrowUp className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => move(p, 1)} disabled={i === products.length - 1}><ArrowDown className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => toggleVisible(p)}>
                  {(p as any).is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t("confirm_delete")}</AlertDialogTitle>
                      <AlertDialogDescription>{p.name_en}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t("admin_cancel")}</AlertDialogCancel>
                      <AlertDialogAction onClick={() => remove(p)}>{t("admin_delete")}</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <ProductEditor
            draft={editing}
            onClose={() => setEditing(null)}
            onSaved={() => { setEditing(null); refresh(); }}
          />
        )}
      </section>
      <Footer />
    </div>
  );
}

function ProductEditor({ draft, onClose, onSaved }: { draft: Draft; onClose: () => void; onSaved: () => void }) {
  const { t } = useI18n();
  const [d, setD] = useState<Draft>(draft);
  const [busy, setBusy] = useState(false);

  const upload = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `items/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
    if (error) { toast.error(error.message); return null; }
    return supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
  };

  const save = async () => {
    setBusy(true);
    let image_url = d.image_url ?? null;
    if (d.file) {
      const url = await upload(d.file);
      if (!url) { setBusy(false); return; }
      image_url = url;
    }
    const payload = {
      name_en: d.name_en ?? "",
      name_ar: d.name_ar ?? "",
      description_en: d.description_en ?? null,
      description_ar: d.description_ar ?? null,
      price: Number(d.price ?? 0),
      sort_order: Number(d.sort_order ?? 0),
      is_visible: d.is_visible ?? true,
      is_available: d.is_available ?? true,
      image_url,
    };
    const { error } = d.id
      ? await supabase.from("products").update(payload).eq("id", d.id)
      : await supabase.from("products").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(t("saved"));
    onSaved();
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{d.id ? t("admin_edit") : t("admin_add")}</DialogTitle></DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>{t("field_name_en")}</Label><Input value={d.name_en ?? ""} onChange={(e) => setD({ ...d, name_en: e.target.value })} /></div>
          <div><Label>{t("field_name_ar")}</Label><Input value={d.name_ar ?? ""} onChange={(e) => setD({ ...d, name_ar: e.target.value })} dir="rtl" /></div>
          <div className="sm:col-span-2"><Label>{t("field_desc_en")}</Label><Textarea value={d.description_en ?? ""} onChange={(e) => setD({ ...d, description_en: e.target.value })} /></div>
          <div className="sm:col-span-2"><Label>{t("field_desc_ar")}</Label><Textarea value={d.description_ar ?? ""} onChange={(e) => setD({ ...d, description_ar: e.target.value })} dir="rtl" /></div>
          <div><Label>{t("admin_price")}</Label><Input type="number" step="0.01" value={d.price ?? 0} onChange={(e) => setD({ ...d, price: Number(e.target.value) })} /></div>
          <div><Label>{t("admin_order")}</Label><Input type="number" value={d.sort_order ?? 0} onChange={(e) => setD({ ...d, sort_order: Number(e.target.value) })} /></div>
          <div className="sm:col-span-2">
            <Label>{t("admin_image")}</Label>
            <div className="flex items-center gap-3">
              {(d.image_url || d.file) && (
                <img
                  src={d.file ? URL.createObjectURL(d.file) : d.image_url!}
                  alt=""
                  className="h-20 w-20 rounded-md object-cover border border-border"
                />
              )}
              <label className="inline-flex items-center gap-2 cursor-pointer rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-secondary">
                <Upload className="h-4 w-4" /> {t("admin_upload")}
                <input type="file" accept="image/*" hidden onChange={(e) => setD({ ...d, file: e.target.files?.[0] ?? null })} />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border p-3"><Label>{t("admin_visible")}</Label><Switch checked={d.is_visible ?? true} onCheckedChange={(v) => setD({ ...d, is_visible: v })} /></div>
          <div className="flex items-center justify-between rounded-md border border-border p-3"><Label>{t("admin_available")}</Label><Switch checked={d.is_available ?? true} onCheckedChange={(v) => setD({ ...d, is_available: v })} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{t("admin_cancel")}</Button>
          <Button onClick={save} disabled={busy}>{t("admin_save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
