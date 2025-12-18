"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type Document = Database["public"]["Tables"]["documents"]["Row"];
type DocumentInsert = Database["public"]["Tables"]["documents"]["Insert"];
type DocumentUpdate = Database["public"]["Tables"]["documents"]["Update"];
type DocumentCategory = Database["public"]["Enums"]["document_category"];

// ============================================
// GENERIC DOCUMENT FUNCTIONS
// ============================================

async function getDocumentsByCategory(category: DocumentCategory): Promise<Document[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("category", category)
    .order("document_number", { ascending: false });

  if (error) {
    console.error(`Error fetching ${category}:`, error);
    return [];
  }
  return data || [];
}

async function createDocument(
  item: Omit<DocumentInsert, "id" | "created_at" | "updated_at" | "category">,
  category: DocumentCategory
): Promise<{ success: boolean; error?: string; data?: Document }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .insert({ ...item, category })
    .select()
    .single();

  if (error) {
    console.error(`Error creating ${category}:`, error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

async function updateDocument(
  id: string,
  updates: DocumentUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("documents")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating document:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

async function deleteDocument(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("documents").delete().eq("id", id);

  if (error) {
    console.error("Error deleting document:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ============================================
// EXECUTIVE ORDERS
// ============================================

export async function getAllExecutiveOrders(): Promise<Document[]> {
  return getDocumentsByCategory("executive_order");
}

export async function createExecutiveOrder(
  item: Omit<DocumentInsert, "id" | "created_at" | "updated_at" | "category">
): Promise<{ success: boolean; error?: string; data?: Document }> {
  const result = await createDocument(item, "executive_order");
  if (result.success) revalidatePath("/content/documents/executive-orders");
  return result;
}

export async function updateExecutiveOrder(
  id: string,
  updates: Omit<DocumentUpdate, "category">
): Promise<{ success: boolean; error?: string }> {
  const result = await updateDocument(id, updates);
  if (result.success) revalidatePath("/content/documents/executive-orders");
  return result;
}

export async function deleteExecutiveOrder(id: string): Promise<{ success: boolean; error?: string }> {
  const result = await deleteDocument(id);
  if (result.success) revalidatePath("/content/documents/executive-orders");
  return result;
}

// ============================================
// MEMORANDUM ORDERS
// ============================================

export async function getAllMemorandumOrders(): Promise<Document[]> {
  return getDocumentsByCategory("memorandum_order");
}

export async function createMemorandumOrder(
  item: Omit<DocumentInsert, "id" | "created_at" | "updated_at" | "category">
): Promise<{ success: boolean; error?: string; data?: Document }> {
  const result = await createDocument(item, "memorandum_order");
  if (result.success) revalidatePath("/content/documents/memorandum-orders");
  return result;
}

export async function updateMemorandumOrder(
  id: string,
  updates: Omit<DocumentUpdate, "category">
): Promise<{ success: boolean; error?: string }> {
  const result = await updateDocument(id, updates);
  if (result.success) revalidatePath("/content/documents/memorandum-orders");
  return result;
}

export async function deleteMemorandumOrder(id: string): Promise<{ success: boolean; error?: string }> {
  const result = await deleteDocument(id);
  if (result.success) revalidatePath("/content/documents/memorandum-orders");
  return result;
}

// ============================================
// ORDINANCES
// ============================================

export async function getAllOrdinances(): Promise<Document[]> {
  return getDocumentsByCategory("municipal_ordinance");
}

export async function createOrdinance(
  item: Omit<DocumentInsert, "id" | "created_at" | "updated_at" | "category">
): Promise<{ success: boolean; error?: string; data?: Document }> {
  const result = await createDocument(item, "municipal_ordinance");
  if (result.success) revalidatePath("/content/documents/ordinances");
  return result;
}

export async function updateOrdinance(
  id: string,
  updates: Omit<DocumentUpdate, "category">
): Promise<{ success: boolean; error?: string }> {
  const result = await updateDocument(id, updates);
  if (result.success) revalidatePath("/content/documents/ordinances");
  return result;
}

export async function deleteOrdinance(id: string): Promise<{ success: boolean; error?: string }> {
  const result = await deleteDocument(id);
  if (result.success) revalidatePath("/content/documents/ordinances");
  return result;
}

// ============================================
// OTHER FORMS
// ============================================

export async function getAllOtherForms(): Promise<Document[]> {
  return getDocumentsByCategory("other_form");
}

export async function createOtherForm(
  item: Omit<DocumentInsert, "id" | "created_at" | "updated_at" | "category">
): Promise<{ success: boolean; error?: string; data?: Document }> {
  const result = await createDocument(item, "other_form");
  if (result.success) revalidatePath("/content/documents/other-forms");
  return result;
}

export async function updateOtherForm(
  id: string,
  updates: Omit<DocumentUpdate, "category">
): Promise<{ success: boolean; error?: string }> {
  const result = await updateDocument(id, updates);
  if (result.success) revalidatePath("/content/documents/other-forms");
  return result;
}

export async function deleteOtherForm(id: string): Promise<{ success: boolean; error?: string }> {
  const result = await deleteDocument(id);
  if (result.success) revalidatePath("/content/documents/other-forms");
  return result;
}
