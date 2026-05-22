import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

const dict: Dict = {
  brand: { ar: "مونكيز", en: "MONKEYS" },
  tagline: { ar: "قهوة مختصة منذ ٢٠٢٣", en: "Specialty Coffee · Est. 2023" },
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_menu: { ar: "القائمة", en: "Menu" },
  nav_about: { ar: "من نحن", en: "About" },
  nav_contact: { ar: "تواصل معنا", en: "Contact" },
  nav_hours: { ar: "ساعات العمل", en: "Hours" },
  settings: { ar: "الإعدادات", en: "Settings" },
  language: { ar: "اللغة", en: "Language" },
  arabic: { ar: "العربية", en: "Arabic" },
  english: { ar: "الإنجليزية", en: "English" },
  admin_login: { ar: "دخول المالك", en: "Owner Login" },
  admin_register: { ar: "تسجيل حساب", en: "Register" },
  logout: { ar: "تسجيل الخروج", en: "Logout" },
  dashboard: { ar: "لوحة التحكم", en: "Dashboard" },

  hero_title_1: { ar: "كل فنجان", en: "Every cup," },
  hero_title_2: { ar: "حكاية تُروى", en: "a story brewed." },
  hero_sub: {
    ar: "حبوب مختارة بعناية، تحميص يدوي، وأجواء راقية تجعل لحظتك تستحق التذكر.",
    en: "Hand-picked beans, slow-roasted with intention, served in a space made to linger.",
  },
  hero_cta: { ar: "استعرض القائمة", en: "Explore the menu" },
  hero_secondary: { ar: "زرنا اليوم", en: "Visit today" },

  featured_eyebrow: { ar: "الأكثر طلباً", en: "House favourites" },
  featured_title: { ar: "مختاراتنا المميزة", en: "Featured selections" },
  featured_sub: {
    ar: "نخبة من المشروبات التي صنعت سمعتنا.",
    en: "A taste of what keeps our regulars coming back.",
  },
  view_full_menu: { ar: "عرض القائمة كاملة", en: "View full menu" },
  view_details: { ar: "التفاصيل", en: "View details" },
  sar: { ar: "ل.س", en: "S.P" },
  unavailable: { ar: "غير متوفر حالياً", en: "Currently unavailable" },

  menu_eyebrow: { ar: "القائمة", en: "The menu" },
  menu_title: { ar: "كل ما نقدمه", en: "Everything we brew" },

  about_eyebrow: { ar: "قصتنا", en: "Our story" },
  about_title: { ar: "مكان وُلد من حب القهوة", en: "Built on a love for the craft" },
  about_body: {
    ar: "في ٢٠٢٣ فتحنا أبوابنا لنقدّم قهوة صادقة في مدينة تتسارع. كل حبة نختارها، كل فنجان نصبّه، هو دعوة للتمهّل قليلاً والاستمتاع بالتفاصيل.",
    en: "We opened in 2023 with one obsession: honest coffee for a fast city. Every bean is sourced, every cup is poured with the same idea — slow down, taste the detail.",
  },
  about_p2: {
    ar: "نؤمن أن المقاهي الجيدة تُبنى على ثلاثة: حبوب طازجة، باريستا شغوف، وضيف يستحق الأفضل.",
    en: "Good cafés are built on three things: fresh beans, a barista who cares, and a guest who deserves the best.",
  },

  contact_eyebrow: { ar: "تواصل", en: "Get in touch" },
  contact_title: { ar: "زرنا، أو راسلنا", en: "Visit us, or drop a line" },
  contact_address: { ar: "العنوان", en: "Address" },
  contact_address_value: { ar: "شارع الملك فهد، الرياض", en: "King Fahd Road, Riyadh" },
  contact_phone: { ar: "الهاتف", en: "Phone" },
  contact_email: { ar: "البريد", en: "Email" },
  contact_name_ph: { ar: "اسمك", en: "Your name" },
  contact_msg_ph: { ar: "رسالتك", en: "Your message" },
  contact_send: { ar: "إرسال", en: "Send message" },
  contact_thanks: { ar: "شكراً لتواصلك معنا!", en: "Thanks — we'll be in touch." },

  hours_eyebrow: { ar: "متى نفتح", en: "When we're open" },
  hours_title: { ar: "ساعات العمل", en: "Opening hours" },
  hours_weekdays: { ar: "السبت – الخميس", en: "Saturday – Thursday" },
  hours_friday: { ar: "الجمعة", en: "Friday" },
  hours_weekdays_time: { ar: "٧:٠٠ ص – ١٢:٠٠ ص", en: "7:00 AM – 12:00 AM" },
  hours_friday_time: { ar: "٢:٠٠ م – ١:٠٠ ص", en: "2:00 PM – 1:00 AM" },

  username: { ar: "اسم المستخدم", en: "Username" },
  password: { ar: "كلمة المرور", en: "Password" },
  sign_in: { ar: "تسجيل الدخول", en: "Sign in" },
  sign_up: { ar: "إنشاء حساب", en: "Create account" },
  no_account: { ar: "ليس لديك حساب؟", en: "No account yet?" },
  have_account: { ar: "لديك حساب؟", en: "Already have an account?" },
  auth_err: { ar: "بيانات غير صحيحة", en: "Invalid credentials" },

  admin_title: { ar: "إدارة المنتجات", en: "Manage products" },
  admin_add: { ar: "إضافة منتج", en: "Add product" },
  admin_edit: { ar: "تعديل", en: "Edit" },
  admin_delete: { ar: "حذف", en: "Delete" },
  admin_save: { ar: "حفظ", en: "Save" },
  admin_cancel: { ar: "إلغاء", en: "Cancel" },
  admin_visible: { ar: "ظاهر", en: "Visible" },
  admin_available: { ar: "متوفر", en: "Available" },
  admin_image: { ar: "صورة المنتج", en: "Product image" },
  admin_upload: { ar: "رفع صورة", en: "Upload image" },
  admin_order: { ar: "الترتيب", en: "Order" },
  admin_price: { ar: "السعر", en: "Price" },
  field_name_en: { ar: "الاسم (إنجليزي)", en: "Name (English)" },
  field_name_ar: { ar: "الاسم (عربي)", en: "Name (Arabic)" },
  field_desc_en: { ar: "الوصف (إنجليزي)", en: "Description (English)" },
  field_desc_ar: { ar: "الوصف (عربي)", en: "Description (Arabic)" },
  confirm_delete: { ar: "تأكيد الحذف؟", en: "Delete this product?" },
  saved: { ar: "تم الحفظ", en: "Saved" },
  deleted: { ar: "تم الحذف", en: "Deleted" },

  admin_settings: { ar: "إعدادات الموقع", en: "Site settings" },
  field_phone: { ar: "رقم الهاتف", en: "Phone number" },
  field_email: { ar: "البريد الإلكتروني", en: "Email" },
  field_address_en: { ar: "العنوان (إنجليزي)", en: "Address (English)" },
  field_address_ar: { ar: "العنوان (عربي)", en: "Address (Arabic)" },
  field_about_en: { ar: "من نحن (إنجليزي)", en: "About us (English)" },
  field_about_ar: { ar: "من نحن (عربي)", en: "About us (Arabic)" },
  field_about_p2_en: { ar: "فقرة ثانية (إنجليزي)", en: "Second paragraph (English)" },
  field_about_p2_ar: { ar: "فقرة ثانية (عربي)", en: "Second paragraph (Arabic)" },
  field_hours_weekdays: { ar: "ساعات السبت-الخميس", en: "Weekdays hours" },
  field_hours_friday: { ar: "ساعات الجمعة", en: "Friday hours" },

  footer_rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof dict) => string;
  dir: "rtl" | "ltr";
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: keyof typeof dict) => dict[k]?.[lang] ?? String(k);

  return (
    <I18nCtx.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
