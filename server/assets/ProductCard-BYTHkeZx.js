import { u as useBaseQuery, Q as QueryObserver, d as defaultThrowOnError } from "./Footer-Vw5YSYqy.js";
import { J as jsxRuntimeExports } from "./server-CmVoqoVv.js";
import { x as useI18n } from "./router-Bmf9N68K.js";
import { B as Button } from "./button-2GRxm62b.js";
import { b as Dialog, h as DialogTrigger, c as DialogContent, f as DialogHeader, g as DialogTitle, d as DialogDescription } from "./dialog-BTl0P-6M.js";
import { i as createLucideIcon } from "./Navbar-e_eBN0rx.js";
function useSuspenseQuery(options, queryClient) {
  return useBaseQuery(
    {
      ...options,
      enabled: true,
      suspense: true,
      throwOnError: defaultThrowOnError,
      placeholderData: void 0
    },
    QueryObserver
  );
}
const __iconNode = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
];
const Coffee = createLucideIcon("coffee", __iconNode);
function ProductCard({ p }) {
  const { t, lang } = useI18n();
  const name = lang === "ar" ? p.name_ar : p.name_en;
  const desc = lang === "ar" ? p.description_ar : p.description_en;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
        p.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: p.image_url,
            alt: name,
            loading: "lazy",
            className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { className: "h-12 w-12" }) }),
        !p.is_available && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm text-sm", children: t("unavailable") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 font-display text-lg text-accent", children: [
            p.price,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t("sar") })
          ] })
        ] }),
        desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-sm text-muted-foreground", children: desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-auto rounded-full", children: t("view_details") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: desc })
      ] }),
      p.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: name, className: "w-full rounded-lg aspect-[4/3] object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl text-accent", children: [
          p.price,
          " ",
          t("sar")
        ] }),
        !p.is_available && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t("unavailable") })
      ] })
    ] })
  ] });
}
export {
  Coffee as C,
  ProductCard as P,
  useSuspenseQuery as u
};
