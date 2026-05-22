import { J as jsxRuntimeExports } from "./server-CmVoqoVv.js";
import { u as useSuspenseQuery, P as ProductCard } from "./ProductCard-BYTHkeZx.js";
import { N as Navbar } from "./Navbar-e_eBN0rx.js";
import { F as Footer } from "./Footer-Vw5YSYqy.js";
import { x as useI18n, g as productsQuery } from "./router-Bmf9N68K.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./button-2GRxm62b.js";
import "./dialog-BTl0P-6M.js";
function MenuPage() {
  const {
    t
  } = useI18n();
  const {
    data
  } = useSuspenseQuery(productsQuery());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-16 lg:py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-accent", children: t("menu_eyebrow") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl md:text-6xl", children: t("menu_title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-divider w-24 mx-auto mt-6" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: data.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  MenuPage as component
};
