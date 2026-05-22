import { J as jsxRuntimeExports } from "./server-CmVoqoVv.js";
import { u as useQuery, s as settingsQuery } from "./settings-BA_ynLiH.js";
import { N as Navbar, l as logo } from "./Navbar-e_eBN0rx.js";
import { F as Footer } from "./Footer-Vw5YSYqy.js";
import { x as useI18n } from "./router-Bmf9N68K.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function About() {
  const {
    t,
    lang
  } = useI18n();
  const {
    data: s
  } = useQuery(settingsQuery());
  const p1 = lang === "ar" ? s?.about_ar ?? t("about_body") : s?.about_en ?? t("about_body");
  const p2 = lang === "ar" ? s?.about_p2_ar ?? t("about_p2") : s?.about_p2_en ?? t("about_p2");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-6 py-20 lg:py-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-accent", children: t("about_eyebrow") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl md:text-6xl", children: t("about_title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-divider w-24 mx-auto mt-6" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "", className: "mx-auto my-12 h-44 w-44 rounded-full shadow-[var(--shadow-soft)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-lg leading-relaxed text-muted-foreground text-center max-w-2xl mx-auto whitespace-pre-line", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: p1 }),
        p2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: p2 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  About as component
};
