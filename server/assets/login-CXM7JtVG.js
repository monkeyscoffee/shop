import { r as reactExports, U as jsxRuntimeExports } from "./server-Dv4XnJ5I.js";
import { u as useI18n, a as useAuth, b as useNavigate, t as toast } from "./router-KRXBmr3w.js";
import { N as Navbar, l as logo } from "./Navbar-DOqmYanO.js";
import { I as Input } from "./input-XvwpRPKB.js";
import { B as Button } from "./button-D7CdEUrV.js";
import { L as Label } from "./label-Bij1hbXI.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function LoginPage() {
  const {
    t
  } = useI18n();
  const {
    signIn
  } = useAuth();
  const navigate = useNavigate();
  const [u, setU] = reactExports.useState("");
  const [p, setP] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-md px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "", className: "mx-auto h-20 w-20 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-center font-display text-3xl", children: t("sign_in") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 space-y-4 rounded-xl border border-border bg-card p-6", onSubmit: async (e) => {
        e.preventDefault();
        setBusy(true);
        const {
          error
        } = await signIn(u, p);
        setBusy(false);
        if (error) return toast.error(t("auth_err"));
        navigate({
          to: "/admin"
        });
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("username") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: u, onChange: (e) => setU(e.target.value), required: true, autoFocus: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("password") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: p, onChange: (e) => setP(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, className: "w-full rounded-full", children: t("sign_in") })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
