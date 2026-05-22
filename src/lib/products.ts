import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/components/ProductCard";

export const productsQuery = (opts?: { adminAll?: boolean }) =>
  queryOptions({
    queryKey: ["products", opts?.adminAll ? "all" : "visible"],
    queryFn: async (): Promise<Product[]> => {
      let q = supabase.from("products").select("*").order("sort_order", { ascending: true });
      if (!opts?.adminAll) q = q.eq("is_visible", true);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });
