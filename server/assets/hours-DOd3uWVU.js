import { U as jsxRuntimeExports } from "./server-Dv4XnJ5I.js";
import { u as useQuery, s as settingsQuery } from "./settings-B9kvpiVA.js";
import { c as createLucideIcon, N as Navbar } from "./Navbar-DOqmYanO.js";
import { F as Footer } from "./Footer-4ZjUq1nZ.js";
import { u as useI18n } from "./router-KRXBmr3w.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function Hours() {
  const {
    t
  } = useI18n();
  const {
    data: s
  } = useQuery(settingsQuery());
  const weekdays = s?.hours_weekdays_time ?? t("hours_weekdays_time");
  const friday = s?.hours_friday_time ?? t("hours_friday_time");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-6 py-20 lg:py-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-accent", children: t("hours_eyebrow") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl md:text-6xl", children: t("hours_title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-divider w-24 mx-auto mt-6" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-8 space-y-6", children: [{
        day: t("hours_weekdays"),
        time: weekdays
      }, {
        day: t("hours_friday"),
        time: friday
      }].map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 pb-6 border-b border-border last:border-0 last:pb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl", children: r.day })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-muted-foreground", children: r.time })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Hours as component
};
