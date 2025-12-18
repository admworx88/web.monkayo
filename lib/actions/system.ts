"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type Media = Database["public"]["Tables"]["media"]["Row"];
type MediaInsert = Database["public"]["Tables"]["media"]["Insert"];
type MediaUpdate = Database["public"]["Tables"]["media"]["Update"];

type User = Database["public"]["Tables"]["users"]["Row"];
type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

type Setting = Database["public"]["Tables"]["site_settings"]["Row"];
type SettingUpdate = Database["public"]["Tables"]["site_settings"]["Update"];

type AuditLog = Database["public"]["Tables"]["audit_logs"]["Row"];

// ============================================
// MEDIA LIBRARY
// ============================================

export async function getAllMedia(): Promise<Media[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching media:", error);
    return [];
  }
  return data || [];
}

export async function createMedia(
  item: Omit<MediaInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: Media }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating media:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/media");
  return { success: true, data };
}

export async function updateMedia(
  id: string,
  updates: MediaUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("media")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating media:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/media");
  return { success: true };
}

export async function deleteMedia(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("media").delete().eq("id", id);

  if (error) {
    console.error("Error deleting media:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/media");
  return { success: true };
}

// ============================================
// USER MANAGEMENT (Admin Only)
// ============================================

export async function getAllUsers(): Promise<User[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }
  return data || [];
}

export async function updateUser(
  id: string,
  updates: UserUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating user:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/users");
  return { success: true };
}

export async function toggleUserStatus(
  id: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error toggling user status:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/users");
  return { success: true };
}

// ============================================
// SITE SETTINGS (Admin Only)
// ============================================

export async function getAllSettings(): Promise<Setting[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key", { ascending: true });

  if (error) {
    console.error("Error fetching settings:", error);
    return [];
  }
  return data || [];
}

export async function getSetting(key: string): Promise<Setting | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", key)
    .single();

  if (error) {
    console.error("Error fetching setting:", error);
    return null;
  }
  return data;
}

export async function updateSetting(
  id: string,
  updates: SettingUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating setting:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/settings");
  return { success: true };
}

export async function upsertSetting(
  key: string,
  value: string,
  description?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({
      key,
      value,
      description,
      updated_at: new Date().toISOString(),
    }, { onConflict: "key" });

  if (error) {
    console.error("Error upserting setting:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/settings");
  return { success: true };
}

// ============================================
// AUDIT LOGS (Read Only)
// ============================================

export async function getAuditLogs(limit: number = 100): Promise<AuditLog[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching audit logs:", error);
    return [];
  }
  return data || [];
}

export async function getAuditLogsByTable(
  tableName: string,
  limit: number = 50
): Promise<AuditLog[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("table_name", tableName)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching audit logs by table:", error);
    return [];
  }
  return data || [];
}

export async function getAuditLogsByUser(
  userId: string,
  limit: number = 50
): Promise<AuditLog[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching audit logs by user:", error);
    return [];
  }
  return data || [];
}
