import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettings = {
  phone: string | null;
  email: string | null;
  address_en: string | null;
  address_ar: string | null;
  about_en: string | null;
  about_ar: string | null;
  about_p2_en: string | null;
  about_p2_ar: string | null;
  hours_weekdays_time: string | null;
  hours_friday_time: string | null;
  map_url: string | null;
};

export const settingsQuery = () =>
  queryOptions({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", true).maybeSingle();
      return (data as SiteSettings) ?? null;
    },
  });
