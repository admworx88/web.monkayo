"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type News = Database["public"]["Tables"]["news"]["Row"];
type NewsInsert = Database["public"]["Tables"]["news"]["Insert"];
type NewsUpdate = Database["public"]["Tables"]["news"]["Update"];

// ============================================
// PRESS RELEASES
// ============================================

export async function getAllPressReleases(): Promise<News[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("category", "press_release")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching press releases:", error);
    return [];
  }
  return data || [];
}

export async function createPressRelease(
  item: Omit<NewsInsert, "id" | "created_at" | "updated_at" | "category">
): Promise<{ success: boolean; error?: string; data?: News }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .insert({ ...item, category: "press_release" })
    .select()
    .single();

  if (error) {
    console.error("Error creating press release:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/news/press-releases");
  return { success: true, data };
}

export async function updatePressRelease(
  id: string,
  updates: Omit<NewsUpdate, "category">
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("news")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating press release:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/news/press-releases");
  return { success: true };
}

export async function deletePressRelease(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) {
    console.error("Error deleting press release:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/news/press-releases");
  return { success: true };
}

// ============================================
// ADVISORIES
// ============================================

export async function getAllAdvisories(): Promise<News[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("category", "advisory_announcement")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching advisories:", error);
    return [];
  }
  return data || [];
}

export async function createAdvisory(
  item: Omit<NewsInsert, "id" | "created_at" | "updated_at" | "category">
): Promise<{ success: boolean; error?: string; data?: News }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .insert({ ...item, category: "advisory_announcement" })
    .select()
    .single();

  if (error) {
    console.error("Error creating advisory:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/news/advisories");
  return { success: true, data };
}

export async function updateAdvisory(
  id: string,
  updates: Omit<NewsUpdate, "category">
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("news")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating advisory:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/news/advisories");
  return { success: true };
}

export async function deleteAdvisory(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) {
    console.error("Error deleting advisory:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/news/advisories");
  return { success: true };
}
