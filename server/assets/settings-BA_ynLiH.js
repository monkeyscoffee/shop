import { u as useBaseQuery, Q as QueryObserver } from "./Footer-Vw5YSYqy.js";
import { q as queryOptions, o as supabase } from "./router-Bmf9N68K.js";
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
