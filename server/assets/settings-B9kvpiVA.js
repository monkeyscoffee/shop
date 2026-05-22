import { u as useBaseQuery, Q as QueryObserver } from "./Footer-4ZjUq1nZ.js";
import { q as queryOptions, s as supabase } from "./router-KRXBmr3w.js";
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
const settingsQuery = () => queryOptions({
  queryKey: ["site_settings"],
  queryFn: async () => {
    const { data } = await supabase.from("site_settings").select("*").eq("id", true).maybeSingle();
    return data ?? null;
  }
});
export {
  settingsQuery as s,
  useQuery as u
};
