import { r as reactExports, U as jsxRuntimeExports } from "./server-Dv4XnJ5I.js";
import { u as useQuery, s as settingsQuery } from "./settings-B9kvpiVA.js";
import { c as createLucideIcon, N as Navbar } from "./Navbar-DOqmYanO.js";
import { F as Footer } from "./Footer-4ZjUq1nZ.js";
import { I as Input } from "./input-XvwpRPKB.js";
import { T as Textarea } from "./textarea-BQvmpQe3.js";
import { B as Button } from "./button-D7CdEUrV.js";
import { u as useI18n, t as toast } from "./router-KRXBmr3w.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function Contact() {
  const {
    t,
    lang
  } = useI18n();
  const {
    data: s
  } = useQuery(settingsQuery());
  const [name, setName] = reactExports.useState("");
  const [msg, setMsg] = reactExports.useState("");
  const address = lang === "ar" ? s?.address_ar ?? t("contact_address_value") : s?.address_en ?? t("contact_address_value");
  const phone = s?.phone ?? "+966 50 000 0000";
  const email = s?.email ?? "hello@monkeys.coffee";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-accent", children: t("contact_eyebrow") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl md:text-6xl", children: t("contact_title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-divider w-24 mx-auto mt-6" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [{
          icon: MapPin,
          label: t("contact_address"),
          value: address
        }, {
          icon: Phone,
          label: t("contact_phone"),
          value: phone
        }, {
          icon: Mail,
          label: t("contact_email"),
          value: email
        }].map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 rounded-xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(row.icon, { className: "h-5 w-5 text-accent mt-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: row.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-lg break-words", children: row.value })
          ] })
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
          e.preventDefault();
          toast.success(t("contact_thanks"));
          setName("");
          setMsg("");
        }, className: "rounded-xl border border-border bg-card p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: t("contact_name_ph"), value: name, onChange: (e) => setName(e.target.value), required: true, maxLength: 80 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: t("contact_msg_ph"), value: msg, onChange: (e) => setMsg(e.target.value), required: true, rows: 6, maxLength: 1e3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full rounded-full", children: t("contact_send") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Contact as component
};
