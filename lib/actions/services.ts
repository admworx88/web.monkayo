"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type EService = Database["public"]["Tables"]["eservices"]["Row"];
type EServiceInsert = Database["public"]["Tables"]["eservices"]["Insert"];
type EServiceUpdate = Database["public"]["Tables"]["eservices"]["Update"];

type Disclosure = Database["public"]["Tables"]["disclosure_documents"]["Row"];
type DisclosureInsert = Database["public"]["Tables"]["disclosure_documents"]["Insert"];
type DisclosureUpdate = Database["public"]["Tables"]["disclosure_documents"]["Update"];

type Charter = Database["public"]["Tables"]["citizens_charter"]["Row"];
type CharterInsert = Database["public"]["Tables"]["citizens_charter"]["Insert"];
type CharterUpdate = Database["public"]["Tables"]["citizens_charter"]["Update"];

// ============================================
// E-SERVICES
// ============================================

export async function getAllEServices(): Promise<EService[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("eservices")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching e-services:", error);
    return [];
  }
  return data || [];
}

export async function createEService(
  item: Omit<EServiceInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: EService }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("eservices")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating e-service:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/services/e-services");
  return { success: true, data };
}

export async function updateEService(
  id: string,
  updates: EServiceUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("eservices")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating e-service:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/services/e-services");
  return { success: true };
}

export async function deleteEService(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("eservices").delete().eq("id", id);

  if (error) {
    console.error("Error deleting e-service:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/services/e-services");
  return { success: true };
}

// ============================================
// FULL DISCLOSURE
// ============================================

export async function getAllDisclosures(): Promise<Disclosure[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("disclosure_documents")
    .select("*")
    .order("fiscal_year", { ascending: false });

  if (error) {
    console.error("Error fetching disclosures:", error);
    return [];
  }
  return data || [];
}

export async function createDisclosure(
  item: Omit<DisclosureInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: Disclosure }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("disclosure_documents")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating disclosure:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/services/disclosure");
  return { success: true, data };
}

export async function updateDisclosure(
  id: string,
  updates: DisclosureUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("disclosure_documents")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating disclosure:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/services/disclosure");
  return { success: true };
}

export async function deleteDisclosure(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("disclosure_documents").delete().eq("id", id);

  if (error) {
    console.error("Error deleting disclosure:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/services/disclosure");
  return { success: true };
}

// ============================================
// CITIZENS CHARTER
// ============================================

export async function getAllCharters(): Promise<Charter[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("citizens_charter")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching charters:", error);
    return [];
  }
  return data || [];
}

export async function createCharter(
  item: Omit<CharterInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: Charter }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("citizens_charter")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating charter:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/services/citizens-charter");
  return { success: true, data };
}

export async function updateCharter(
  id: string,
  updates: CharterUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("citizens_charter")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating charter:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/services/citizens-charter");
  return { success: true };
}

export async function deleteCharter(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("citizens_charter").delete().eq("id", id);

  if (error) {
    console.error("Error deleting charter:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/services/citizens-charter");
  return { success: true };
}
