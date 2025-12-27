"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadToStorage, deleteFromStorage, extractStoragePath } from "@/lib/supabase/storage";
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

/**
 * Upload official image to storage
 */
export async function uploadOfficialImage(
  formData: FormData
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Upload to officials bucket in portraits folder
    const result = await uploadToStorage(file, 'officials', 'portraits');

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return {
      success: true,
      publicUrl: result.publicUrl,
    };
  } catch (error) {
    console.error('Error uploading official image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Delete official image from storage
 */
export async function deleteOfficialImage(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract path from URL
    const path = await extractStoragePath(imageUrl);

    if (!path) {
      // If it's not a storage URL, just return success (external URL)
      return { success: true };
    }

    // Delete from storage
    const result = await deleteFromStorage('officials', path);

    return result;
  } catch (error) {
    console.error('Error deleting official image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
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

// ============================================
// ELECTED OFFICIALS BACKGROUNDS
// ============================================

export type ElectedOfficialBg = Database['public']['Tables']['elected_officials_bg']['Row'];
export type ElectedOfficialBgInsert = Database['public']['Tables']['elected_officials_bg']['Insert'];
export type ElectedOfficialBgUpdate = Database['public']['Tables']['elected_officials_bg']['Update'];

/**
 * Get all backgrounds for an official
 */
export async function getOfficialBackgrounds(
  officialId: string
): Promise<{ success: boolean; data?: ElectedOfficialBg[]; error?: string }> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('elected_officials_bg')
      .select('*')
      .eq('official_id', officialId)
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching official backgrounds:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Create a new background
 */
export async function createOfficialBackground(
  background: Omit<ElectedOfficialBgInsert, 'id' | 'created_at' | 'updated_at'>
): Promise<{ success: boolean; error?: string; data?: ElectedOfficialBg }> {
  try {
    const supabase = await createClient();

    // If this is marked as featured, unset other featured backgrounds for this official
    if (background.is_featured) {
      await supabase
        .from('elected_officials_bg')
        .update({ is_featured: false })
        .eq('official_id', background.official_id);
    }

    const { data, error } = await supabase
      .from('elected_officials_bg')
      .insert(background)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/content/about/officials');
    revalidatePath('/about/elected-officials');

    return { success: true, data };
  } catch (error) {
    console.error('Error creating official background:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Update a background
 */
export async function updateOfficialBackground(
  id: string,
  updates: ElectedOfficialBgUpdate
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    // If setting as featured, unset other featured backgrounds for this official
    if (updates.is_featured) {
      const { data: current } = await supabase
        .from('elected_officials_bg')
        .select('official_id')
        .eq('id', id)
        .single();

      if (current) {
        await supabase
          .from('elected_officials_bg')
          .update({ is_featured: false })
          .eq('official_id', current.official_id)
          .neq('id', id);
      }
    }

    const { error } = await supabase
      .from('elected_officials_bg')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/content/about/officials');
    revalidatePath('/about/elected-officials');

    return { success: true };
  } catch (error) {
    console.error('Error updating official background:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Delete a background
 */
export async function deleteOfficialBackground(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    // Get the background to delete its image from storage
    const { data: background } = await supabase
      .from('elected_officials_bg')
      .select('image_url')
      .eq('id', id)
      .single();

    if (background?.image_url) {
      await deleteFromStorage(background.image_url, 'officials');
    }

    const { error } = await supabase
      .from('elected_officials_bg')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/content/about/officials');
    revalidatePath('/about/elected-officials');

    return { success: true };
  } catch (error) {
    console.error('Error deleting official background:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Upload background image
 */
export async function uploadOfficialBackgroundImage(
  formData: FormData
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;
    const officialId = formData.get('officialId') as string;

    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    if (!officialId) {
      return { success: false, error: 'No official ID provided' };
    }

    const result = await uploadToStorage(file, 'officials', `backgrounds/${officialId}`);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return { success: true, publicUrl: result.publicUrl };
  } catch (error) {
    console.error('Error uploading background image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Reorder backgrounds
 */
export async function reorderOfficialBackgrounds(
  backgrounds: Array<{ id: string; sort_order: number }>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const updates = backgrounds.map((bg) =>
      supabase
        .from('elected_officials_bg')
        .update({ sort_order: bg.sort_order })
        .eq('id', bg.id)
    );

    await Promise.all(updates);

    revalidatePath('/content/about/officials');
    revalidatePath('/about/elected-officials');

    return { success: true };
  } catch (error) {
    console.error('Error reordering backgrounds:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
