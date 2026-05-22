import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Monkeys Coffee" }, { name: "description", content: "Visit or message us." }] }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">{t("contact_eyebrow")}</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{t("contact_title")}</h1>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: t("contact_address"), value: t("contact_address_value") },
              { icon: Phone, label: t("contact_phone"), value: "+966 50 000 0000" },
              { icon: Mail, label: t("contact_email"), value: "hello@monkeys.coffee" },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <row.icon className="h-5 w-5 text-accent mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{row.label}</div>
                  <div className="mt-1 font-display text-lg">{row.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(t("contact_thanks"));
              setName(""); setMsg("");
            }}
            className="rounded-xl border border-border bg-card p-6 space-y-4"
          >
            <Input placeholder={t("contact_name_ph")} value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} />
            <Textarea placeholder={t("contact_msg_ph")} value={msg} onChange={(e) => setMsg(e.target.value)} required rows={6} maxLength={1000} />
            <Button type="submit" className="w-full rounded-full">{t("contact_send")}</Button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
