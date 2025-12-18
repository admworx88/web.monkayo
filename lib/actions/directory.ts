"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type Department = Database["public"]["Tables"]["departments"]["Row"];
type DepartmentInsert = Database["public"]["Tables"]["departments"]["Insert"];
type DepartmentUpdate = Database["public"]["Tables"]["departments"]["Update"];

type Barangay = Database["public"]["Tables"]["barangays"]["Row"];
type BarangayInsert = Database["public"]["Tables"]["barangays"]["Insert"];
type BarangayUpdate = Database["public"]["Tables"]["barangays"]["Update"];

// ============================================
// DEPARTMENTS
// ============================================

/**
 * Fetch active departments
 */
export async function getDepartments(): Promise<Department[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching departments:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch all departments for admin
 */
export async function getAllDepartments(): Promise<Department[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching all departments:", error);
    return [];
  }

  return data || [];
}

/**
 * Get single department by ID
 */
export async function getDepartmentById(id: string): Promise<Department | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching department:", error);
    return null;
  }

  return data;
}

/**
 * Create department
 */
export async function createDepartment(
  department: Omit<DepartmentInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: Department }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("departments")
    .insert(department)
    .select()
    .single();

  if (error) {
    console.error("Error creating department:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/directory/departments");
  return { success: true, data };
}

/**
 * Update department
 */
export async function updateDepartment(
  id: string,
  updates: DepartmentUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("departments")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating department:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/directory/departments");
  return { success: true };
}

/**
 * Delete department
 */
export async function deleteDepartment(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("departments").delete().eq("id", id);

  if (error) {
    console.error("Error deleting department:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/directory/departments");
  return { success: true };
}

// ============================================
// BARANGAYS
// ============================================

/**
 * Fetch active barangays
 */
export async function getBarangays(): Promise<Barangay[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("barangays")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching barangays:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch all barangays for admin
 */
export async function getAllBarangays(): Promise<Barangay[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("barangays")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching all barangays:", error);
    return [];
  }

  return data || [];
}

/**
 * Get single barangay by ID
 */
export async function getBarangayById(id: string): Promise<Barangay | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("barangays")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching barangay:", error);
    return null;
  }

  return data;
}

/**
 * Create barangay
 */
export async function createBarangay(
  barangay: Omit<BarangayInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: Barangay }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("barangays")
    .insert(barangay)
    .select()
    .single();

  if (error) {
    console.error("Error creating barangay:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/directory/barangays");
  return { success: true, data };
}

/**
 * Update barangay
 */
export async function updateBarangay(
  id: string,
  updates: BarangayUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("barangays")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating barangay:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/directory/barangays");
  return { success: true };
}

/**
 * Delete barangay
 */
export async function deleteBarangay(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("barangays").delete().eq("id", id);

  if (error) {
    console.error("Error deleting barangay:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/directory/barangays");
  return { success: true };
}
