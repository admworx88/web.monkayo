"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type History = Database["public"]["Tables"]["history"]["Row"];
type HistoryInsert = Database["public"]["Tables"]["history"]["Insert"];
type HistoryUpdate = Database["public"]["Tables"]["history"]["Update"];

type OrgStructure = Database["public"]["Tables"]["organizational_structure"]["Row"];
type OrgStructureInsert = Database["public"]["Tables"]["organizational_structure"]["Insert"];
type OrgStructureUpdate = Database["public"]["Tables"]["organizational_structure"]["Update"];

type ElectedOfficial = Database["public"]["Tables"]["elected_officials"]["Row"];
type ElectedOfficialInsert = Database["public"]["Tables"]["elected_officials"]["Insert"];
type ElectedOfficialUpdate = Database["public"]["Tables"]["elected_officials"]["Update"];

type Committee = Database["public"]["Tables"]["committees"]["Row"];
type CommitteeInsert = Database["public"]["Tables"]["committees"]["Insert"];
type CommitteeUpdate = Database["public"]["Tables"]["committees"]["Update"];

// ============================================
// HISTORY
// ============================================

export async function getAllHistory(): Promise<History[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching history:", error);
    return [];
  }
  return data || [];
}

export async function createHistory(
  item: Omit<HistoryInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: History }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("history")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating history:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/history");
  return { success: true, data };
}

export async function updateHistory(
  id: string,
  updates: HistoryUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("history")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating history:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/history");
  return { success: true };
}

export async function deleteHistory(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("history").delete().eq("id", id);

  if (error) {
    console.error("Error deleting history:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/history");
  return { success: true };
}

// ============================================
// ORGANIZATIONAL STRUCTURE
// ============================================

export async function getAllOrgStructure(): Promise<OrgStructure[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizational_structure")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching org structure:", error);
    return [];
  }
  return data || [];
}

export async function createOrgStructure(
  item: Omit<OrgStructureInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: OrgStructure }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizational_structure")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating org structure:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/org-structure");
  return { success: true, data };
}

export async function updateOrgStructure(
  id: string,
  updates: OrgStructureUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("organizational_structure")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating org structure:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/org-structure");
  return { success: true };
}

export async function deleteOrgStructure(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("organizational_structure").delete().eq("id", id);

  if (error) {
    console.error("Error deleting org structure:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/org-structure");
  return { success: true };
}

// ============================================
// ELECTED OFFICIALS
// ============================================

export async function getAllElectedOfficials(): Promise<ElectedOfficial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("elected_officials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching elected officials:", error);
    return [];
  }
  return data || [];
}

export async function createElectedOfficial(
  item: Omit<ElectedOfficialInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: ElectedOfficial }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("elected_officials")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating elected official:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/officials");
  return { success: true, data };
}

export async function updateElectedOfficial(
  id: string,
  updates: ElectedOfficialUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("elected_officials")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating elected official:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/officials");
  return { success: true };
}

export async function deleteElectedOfficial(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("elected_officials").delete().eq("id", id);

  if (error) {
    console.error("Error deleting elected official:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/officials");
  return { success: true };
}

// ============================================
// COMMITTEES
// ============================================

export async function getAllCommittees(): Promise<Committee[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("committees")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching committees:", error);
    return [];
  }
  return data || [];
}

export async function createCommittee(
  item: Omit<CommitteeInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: Committee }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("committees")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating committee:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/committees");
  return { success: true, data };
}

export async function updateCommittee(
  id: string,
  updates: CommitteeUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("committees")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating committee:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/committees");
  return { success: true };
}

export async function deleteCommittee(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("committees").delete().eq("id", id);

  if (error) {
    console.error("Error deleting committee:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/about/committees");
  return { success: true };
}
