import { Link, useNavigate } from "@tanstack/react-router";
import { Settings, Globe, LogIn, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.jpg";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/menu", label: t("nav_menu") },
    { to: "/about", label: t("nav_about") },
    { to: "/hours", label: t("nav_hours") },
    { to: "/contact", label: t("nav_contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2 justify-self-start">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={t("settings")}
              className="relative z-10 rounded-full border border-border bg-card p-2.5 text-foreground transition hover:border-accent hover:text-accent"
            >
              <Settings className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 z-[60]">
              <DropdownMenuLabel>{t("settings")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Globe className="me-2 h-4 w-4" />
                  {t("language")}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setLang("ar")} className={lang === "ar" ? "font-bold" : ""}>
                    {t("arabic")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLang("en")} className={lang === "en" ? "font-bold" : ""}>
                    {t("english")}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              {!user && (
                <DropdownMenuItem onClick={() => navigate({ to: "/login" })}>
                  <LogIn className="me-2 h-4 w-4" /> {t("admin_login")}
                </DropdownMenuItem>
              )}

              {user && isAdmin && (
                <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>
                  <LayoutDashboard className="me-2 h-4 w-4" /> {t("dashboard")}
                </DropdownMenuItem>
              )}
              {user && (
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="me-2 h-4 w-4" /> {t("logout")}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link to="/" className="flex items-center gap-3 justify-self-center">
          <img src={logo} alt="Monkeys" className="h-12 w-12 rounded-full object-contain" />
          <span className="hidden sm:block font-display text-xl tracking-[0.3em] uppercase">{t("brand")}</span>
        </Link>

        <div className="justify-self-end flex items-center">
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-accent" }}
                className="text-muted-foreground transition hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            aria-label="menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full border border-border bg-card p-2.5"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
