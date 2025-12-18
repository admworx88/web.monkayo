"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];

export interface AdminMenuItem {
  id: string;
  title: string;
  url: string | null;
  icon: string | null;
  item_type: string | null;
  sort_order: number | null;
  is_active: boolean | null;
  children?: AdminMenuItem[];
}

/**
 * Fetch admin sidebar menu with nested items
 */
export async function getAdminSidebar(): Promise<AdminMenuItem[]> {
  const supabase = await createClient();

  // Fetch the admin-sidebar menu
  const { data: menu, error: menuError } = await supabase
    .from("menus")
    .select("id")
    .eq("slug", "admin-sidebar")
    .eq("is_active", true)
    .single();

  if (menuError || !menu) {
    console.error("Error fetching admin sidebar menu:", menuError);
    return [];
  }

  // Fetch all menu items for this menu
  const { data: items, error: itemsError } = await supabase
    .from("menu_items")
    .select("*")
    .eq("menu_id", menu.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (itemsError || !items) {
    console.error("Error fetching menu items:", itemsError);
    return [];
  }

  // Build hierarchical structure
  const buildTree = (
    items: MenuItem[],
    parentId: string | null = null
  ): AdminMenuItem[] => {
    return items
      .filter((item) => item.parent_id === parentId)
      .map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        icon: item.icon,
        item_type: item.item_type,
        sort_order: item.sort_order,
        is_active: item.is_active,
        children: buildTree(items, item.id),
      }))
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  };

  return buildTree(items);
}

/**
 * Fetch menu by slug using the database function
 */
export async function getMenuBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_menu_with_items", {
    menu_slug: slug,
  });

  if (error) {
    console.error("Error fetching menu:", error);
    return null;
  }

  return data;
}

/**
 * Fetch all menus
 */
export async function getAllMenus() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching menus:", error);
    return [];
  }

  return data || [];
}
