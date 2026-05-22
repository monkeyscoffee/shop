import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Monkeys" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { t } = useI18n();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-20">
        <img src={logo} alt="" className="mx-auto h-20 w-20 rounded-full" />
        <h1 className="mt-6 text-center font-display text-3xl">{t("sign_up")}</h1>
        <form
          className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            const { error } = await signUp(u, p);
            setBusy(false);
            if (error) return toast.error(error);
            toast.success(t("saved"));
            navigate({ to: "/login" });
          }}
        >
          <div>
            <Label>{t("username")}</Label>
            <Input value={u} onChange={(e) => setU(e.target.value)} required autoFocus />
          </div>
          <div>
            <Label>{t("password")}</Label>
            <Input type="password" value={p} onChange={(e) => setP(e.target.value)} required minLength={6} />
          </div>
          <Button type="submit" disabled={busy} className="w-full rounded-full">{t("sign_up")}</Button>
          <p className="text-center text-sm text-muted-foreground">
            {t("have_account")} <Link to="/login" className="text-accent underline">{t("sign_in")}</Link>
          </p>
        </form>
      </section>
    </div>
  );
}
